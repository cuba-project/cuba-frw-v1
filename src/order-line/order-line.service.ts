import { Injectable } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { BaseService } from 'src/commons/commons.service';
import { OrderLine } from './entities/order-line.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderLineService extends BaseService<OrderLine> {

  getRepository(): Repository<OrderLine> {
    return this.orderLineRepo;
  }

  constructor(
    @InjectRepository(OrderLine) private orderLineRepo: Repository<OrderLine>
  ){
    super();
  }

  async create(createOrderLineDto: CreateOrderLineDto) {
    let response = await this.getRepository().insert(createOrderLineDto);
    console.log("create order line",response);
  }

  findAll() {
    return `This action returns all orderLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderLine`;
  }

  update(id: number, updateOrderLineDto: UpdateOrderLineDto) {
    return `This action updates a #${id} orderLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderLine`;
  }
}
