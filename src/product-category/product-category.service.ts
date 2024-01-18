import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { BaseService } from 'src/commons/commons.service';
import { ProductCategory } from './entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService extends BaseService<ProductCategory> {
  constructor(@InjectRepository(ProductCategory) private userRepo: Repository<ProductCategory>){
    super();
  }

  getRepository(): Repository<ProductCategory>{
      return this.userRepo;
  }
}
