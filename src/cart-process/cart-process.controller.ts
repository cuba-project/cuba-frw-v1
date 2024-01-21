import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { CartProcessService } from './cart-process.service';
import { CreateCartProcessDto } from './dto/create-cart-process.dto';
import { UpdateCartProcessDto } from './dto/update-cart-process.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('cart-process')
export class CartProcessController {
  constructor(private readonly cartProcessService: CartProcessService) {}

  @Post()
  create(@Body() createCartProcessDto: CreateCartProcessDto) {
    return this.cartProcessService.create(createCartProcessDto);
  }

  @Get('get-cart')
  @UseGuards(AuthGuard)
  async getCart(@Req() request){
    let user = request.user;
    await this.cartProcessService.generateUserProcessId(user.role);
    return this.cartProcessService.findByUserId(user.id);
  }

  @Put('update-cart')
  @UseGuards(AuthGuard)
  updateCartProcess(@Req() request,@Body() body: any){
    this.cartProcessService.updateCartProcess(body.processId,body.productId,body.quantity);
    let user = request.user;
    return this.cartProcessService.findByUserId(user.id);
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
