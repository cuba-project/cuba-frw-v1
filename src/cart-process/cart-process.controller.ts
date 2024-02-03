import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, HttpException, HttpStatus } from '@nestjs/common';
import { CartProcessService } from './cart-process.service';
import { CreateCartProcessDto } from './dto/create-cart-process.dto';
import { UpdateCartProcessDto } from './dto/update-cart-process.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { OrderService } from 'src/order/order.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('cart-process')
export class CartProcessController {
  constructor(private readonly cartProcessService: CartProcessService
    , private orderService: OrderService
    ,private eventEmitter:EventEmitter2
  ) { }
  //,private orderService:OrderService
  @Post()
  create(@Body() createCartProcessDto: CreateCartProcessDto) {
    return this.cartProcessService.create(createCartProcessDto);
  }

  @Get("order-confirm")
  sendEmailTest(){
    this.eventEmitter.emit('order-confirm',{
      orderId:232,
      to:"test@example.com",
      subject:"Pedido confirmado"
    });
  }

  @Get('get-cart')
  @UseGuards(AuthGuard)
  async getCart(@Req() request) {
    let user = request.user;
    await this.cartProcessService.generateUserProcessId(user.id);
    return this.cartProcessService.findByUserId(user.id);
  }

  @Put('update-cart')
  @UseGuards(AuthGuard)
  async updateCartProcess(@Req() request, @Body() body: any) {
    let user = request.user;
    let process = await this.cartProcessService.findByUserId(user.id);
    await this.cartProcessService.updateCartProcess(process.id, body.productId, body.quantity);
    return await this.cartProcessService.findByUserId(user.id);

  }

  @Post('confirm-cart')
  @UseGuards(AuthGuard)
  async confirmCartProcess(@Req() request, @Body() body: any) {
    try {
      let user = request.user;
      let process = await this.cartProcessService.findByUserId(user.id);
      //save address and delivery info in cart process
      await this.cartProcessService.saveDeliverInfo(process.id, body.orderAddresInfo);
      //create order
      let orderId = await this.orderService.createOrderFromCartProcessId(process.id);
      //maybe return order full data
      return { id: orderId };
    } catch (error) {
      //log error and return 'friendly' error
      console.log(error)
      throw new HttpException("Se ha producido un error", HttpStatus.INTERNAL_SERVER_ERROR);

    }
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
