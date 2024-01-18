import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
import { BaseController } from 'src/commons/commons.controller';
import { BaseService } from 'src/commons/commons.service';

@Controller('product-category')
export class ProductCategoryController extends BaseController<ProductCategory> {
  constructor(private readonly productCategoryService: ProductCategoryService) {
    super();
  }

  getService(): BaseService<ProductCategory> {
    return this.productCategoryService;
  }
}
