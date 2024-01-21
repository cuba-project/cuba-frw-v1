import { Injectable } from '@nestjs/common';
import { CreateCartProcessDto } from './dto/create-cart-process.dto';
import { UpdateCartProcessDto } from './dto/update-cart-process.dto';
import { CartProcess } from './entities/cart-process.entity';
import { BaseService } from 'src/commons/commons.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProcessProductService } from 'src/cart-process-product/cart-process-product.service';

@Injectable()
export class CartProcessService  extends BaseService<CartProcess> {

  getRepository(): Repository<CartProcess> {
    return this.cartProcessRepo;
  }

  constructor(
    @InjectRepository(CartProcess) private cartProcessRepo: Repository<CartProcess>,
    private cartProcessProducrSrv:CartProcessProductService
    ){
    super();
  }

  create(createCartProcessDto: CreateCartProcessDto) {
    return this.getRepository().insert(createCartProcessDto);
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

  async findByUserId(userId:number){
    let carts = await this.cartProcessRepo.find({
      relations: {
        cart_process_products:true
      },
      where:{
        customer_id:userId
      }
    });
    if(carts){
      return carts[0];
    }
    return null;
  }

  async updateCartProcess(cartProcessId,productId,quantity){
    let cartProcessProductId = await this.cartProcessProducrSrv.findByProductProcessId(cartProcessId,productId);
    if(quantity == 0){
      if(cartProcessProductId){
        this.cartProcessProducrSrv.delete(cartProcessProductId);
      }
    }else{
      await this.cartProcessProducrSrv.upsert({
        cartProcessId:cartProcessId,
        productId:productId,
        quantity:quantity
      });
    }
  }

  async generateUserProcessId(userId){
    const process = await this.findByUserId(userId);
    if(process){
      return process.id;
    }else{
      const token = this.generateToken();
      await this.create({customer_id:userId,token:token});
    }
  }

  generateToken(){
    return (Math.random() + 1).toString(36).substring(7);
  }
}
