import { Injectable } from '@nestjs/common';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { BaseService } from 'src/commons/commons.service';
import { CustomerAddress } from './entities/customer-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerAddressService extends BaseService<CustomerAddress> {

  getRepository(): Repository<CustomerAddress> {
    return this.customerAddressRepo;
  }

  constructor(
    @InjectRepository(CustomerAddress) private customerAddressRepo: Repository<CustomerAddress>
  ){
    super();
  }

  create(createCustomerAddressDto: CreateCustomerAddressDto) {
    return 'This action adds a new customerAddress';
  }

  async findAll() {
    return await this.getRepository().find({});
  }

  async findAllByCustomerId(customerId) {
    return await this.getRepository().find({
      where:{
        customer_id:customerId
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} customerAddress`;
  }

  update(id: number, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return `This action updates a #${id} customerAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerAddress`;
  }
}
