import { Injectable } from '@nestjs/common';
import { CreateCartProcessProductDto } from './dto/create-cart-process-product.dto';
import { UpdateCartProcessProductDto } from './dto/update-cart-process-product.dto';
import { CartProcessProduct } from './entities/cart-process-product.entity';
import { BaseService } from 'src/commons/commons.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartProcessProductService extends BaseService<CartProcessProduct> {

  getRepository(): Repository<CartProcessProduct> {
    return this.cartProcessProductRepo;
  }

  constructor(@InjectRepository(CartProcessProduct) private cartProcessProductRepo: Repository<CartProcessProduct>){
    super();
  }

  async create(createCartProcessProductDto: CreateCartProcessProductDto) {
    let entity = this.cartProcessProductRepo.create(createCartProcessProductDto);
    return this.getRepository().insert(entity);
  }

  async upsert(createCartProcessProductDto: CreateCartProcessProductDto) {
    let cartProcessProductId = await this.findByProductProcessId(
      createCartProcessProductDto.cartProcessId,createCartProcessProductDto.productId
    );
    if(!cartProcessProductId){
      await this.cartProcessProductRepo.insert(createCartProcessProductDto);
    }else{
      await this.cartProcessProductRepo.update(cartProcessProductId,createCartProcessProductDto);
    }
  }

  findAll() {
    return `This action returns all cartProcessProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartProcessProduct`;
  }

  async findByProductProcessId(processId: number,productId: number) {
    let cartProcessProduct = await this.getRepository().findOneBy({
      cartProcessId:processId,
      productId:productId
    });
    if(cartProcessProduct !== null){
      return cartProcessProduct.id;
    }
    return null;
  }

  update(id: number, updateCartProcessProductDto: UpdateCartProcessProductDto) {
    return `This action updates a #${id} cartProcessProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartProcessProduct`;
  }
}
