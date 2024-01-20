import { Injectable } from '@nestjs/common';
import { CreateCartProcessDto } from './dto/create-cart-process.dto';
import { UpdateCartProcessDto } from './dto/update-cart-process.dto';
import { CartProcess } from './entities/cart-process.entity';
import { BaseService } from 'src/commons/commons.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartProcessService  extends BaseService<CartProcess> {

  getRepository(): Repository<CartProcess> {
    return this.cartProcessRepo;
  }

  constructor(@InjectRepository(CartProcess) private cartProcessRepo: Repository<CartProcess>){
    super();
  }

  create(createCartProcessDto: CreateCartProcessDto) {
    return 'This action adds a new cartProcess';
  }

  findAll() {
    return `This action returns all cartProcess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartProcess`;
  }

  update(id: number, updateCartProcessDto: UpdateCartProcessDto) {
    return `This action updates a #${id} cartProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartProcess`;
  }

  findByUserId(userId:number){
    return this.cartProcessRepo.find({
      relations: {
        cart_process_products:true
      },
      where:{
        customer_id:userId
      }
    });
  }
}
