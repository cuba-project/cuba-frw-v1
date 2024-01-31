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

@Injectable()
export class OrderService extends BaseService<Order> {

  getRepository(): Repository<Order> {
    return this.orderRepo;
  }

  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>
    ,private readonly cartProcessService: CartProcessService
    ,private readonly orderLineService: OrderLineService
  ){
    super();
  }

  async createOrderFromCartProcessId(processId){
    let processData:CartProcess = await this.cartProcessService.findOne(processId);
    console.log("createOrderFromCartProcessId",processData);
    let newOrderId = null;
    if(processData.cart_process_products.length>0){
      //create order
      let newOrder = await this.create({
        customer_id:processData.customer_id,
        order_status_id:1,
        deliver_date:processData.deliver_data["deliver_date"],
        city:processData.deliver_data["city"],
        street:processData.deliver_data["street"],
        postal_code:processData.deliver_data["postal_code"],
        phone:processData.deliver_data["phone"]
      });
      console.log("created order",newOrder)
      if(newOrder.id){
        newOrderId = newOrder.id;
        await processData.cart_process_products.forEach(async (productData)=>{
          //insert detail
          console.log("insert this line",productData);
          await this.orderLineService.create({
            order_id:newOrder.id,
            product_id:productData.productId,
            quantity:productData.quantity,
            amount:productData.product.price*productData.quantity
          });
        });
        //delete process id
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

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
