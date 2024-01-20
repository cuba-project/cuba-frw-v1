import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartProcessService } from './cart-process.service';
import { CreateCartProcessDto } from './dto/create-cart-process.dto';
import { UpdateCartProcessDto } from './dto/update-cart-process.dto';

@Controller('cart-process')
export class CartProcessController {
  constructor(private readonly cartProcessService: CartProcessService) {}

  @Post()
  create(@Body() createCartProcessDto: CreateCartProcessDto) {
    return this.cartProcessService.create(createCartProcessDto);
  }

  @Get('get-cart')
  getCart(){
    let id = 1;  //get current user cart process
    //if proces does not exist create
    return this.cartProcessService.findByUserId(+id);
  }

  @Get()
  findAll() {
    return this.cartProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartProcessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartProcessDto: UpdateCartProcessDto) {
    return this.cartProcessService.update(+id, updateCartProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartProcessService.remove(+id);
  }

}
