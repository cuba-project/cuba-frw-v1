import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/commons.service';
import { CartProcessService } from 'src/cart-process/cart-process.service';
import { CartProcess } from 'src/cart-process/entities/cart-process.entity';
import { OrderLineService } from 'src/order-line/order-line.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService extends BaseService<Order> {

  getRepository(): Repository<Order> {
    return this.orderRepo;
  }

  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>
    ,private readonly cartProcessService: CartProcessService
    ,private readonly orderLineService: OrderLineService
    ,private readonly eventEmitter: EventEmitter2
  ){
    super();
  }

  async createOrderFromCartProcessId(processId){
    let processData:CartProcess = await this.cartProcessService.findOne(processId);
    let newOrderId = null;
    if(processData.cart_process_products.length>0){
      let newOrder = await this.create({
        customer_id:processData.customer_id,
        order_status_id:1,
        deliver_date:processData.deliver_data["deliver_date"],
        city:processData.deliver_data["city"],
        street:processData.deliver_data["street"],
        postal_code:processData.deliver_data["postal_code"],
        phone:processData.deliver_data["phone"]
      });
      if(newOrder.id){
        newOrderId = newOrder.id;
        let totalAmount = 0;
        let lines = [];
        let orderData:any = {};
        orderData.id = newOrderId;
        await processData.cart_process_products.forEach(async (productData)=>{
          let lineAmount = productData.product.price*productData.quantity;
          totalAmount += lineAmount;
          await this.orderLineService.create({
            order_id:newOrder.id,
            product_id:productData.productId,
            quantity:productData.quantity,
            amount:lineAmount
          });
          lines.push({productName:productData.productId,quantity:productData.quantity});
        });
        await this.update(newOrder.id,{amount:totalAmount});
        orderData.amount = totalAmount;
        //save in cusomer address data to autcomplete

        //delete process id
        await this.cartProcessService.delete(processId);
        //should update user process id (in front too)
        await this.cartProcessService.generateUserProcessId(processData.customer_id);
        //todo set email to and subject

        this.eventEmitter.emit('order-confirm',{
          orderId:newOrderId,
          to:"",
          subject:"",
          userName:"XXXXX",
          orderData:orderData,
          lines:lines
        });
        
      }else{
        //error
      }
    }else{
      //error
    }
    return newOrderId;
  }

  async create(createOrderDto: CreateOrderDto) {
    return await this.getRepository().save(createOrderDto);
  }

  async findAll(customerId) {
    return await this.getRepository().find({
      relations: ['order_lines','order_lines.product'],
      where:{
        customer_id:customerId
      }
    });
  }

  async findOne(id: number) {
    return await this.getRepository().findOne({
      where:{
        id:id
      },
      relations: ['order_lines','order_lines.product'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.getRepository().update(id,updateOrderDto);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
