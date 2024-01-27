import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/commons.service';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {

  getRepository(): Repository<Product> {
    return this.productRepo;
  }

  constructor(@InjectRepository(Product) private productRepo: Repository<Product>){
    super();
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(params:any) {
    let products = await this.productRepo.find({
      where:{
        name:ILike(`%${params.name}%`)
      }
    })
    return products;
  }

  findOne(id: number) {
    return this.productRepo.findOne({
      where:{
        id:id
      }
    });
  }

  findByCategoryId(id: number) {
    return this.productRepo.find({
      where:{
        product_category_id:id
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
