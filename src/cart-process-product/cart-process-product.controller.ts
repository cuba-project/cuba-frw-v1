import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartProcessProductService } from './cart-process-product.service';
import { CreateCartProcessProductDto } from './dto/create-cart-process-product.dto';
import { UpdateCartProcessProductDto } from './dto/update-cart-process-product.dto';

@Controller('cart-process-product')
export class CartProcessProductController {
  constructor(private readonly cartProcessProductService: CartProcessProductService) {}

  @Post()
  create(@Body() createCartProcessProductDto: CreateCartProcessProductDto) {
    return this.cartProcessProductService.create(createCartProcessProductDto);
  }

  @Get()
  findAll() {
    return this.cartProcessProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartProcessProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartProcessProductDto: UpdateCartProcessProductDto) {
    return this.cartProcessProductService.update(+id, updateCartProcessProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartProcessProductService.remove(+id);
  }
}
