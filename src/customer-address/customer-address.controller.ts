import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CustomerAddressService } from './customer-address.service';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('customer-address')
export class CustomerAddressController {
  constructor(private readonly customerAddressService: CustomerAddressService) {}

  @Get('get-customer-addresses')
  @UseGuards(AuthGuard)
  async getCustomerAddresses(@Req() request){
    let user = request.user;
    return await this.customerAddressService.findAllByCustomerId(user.id);
  }

  @Post()
  create(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerAddressDto);
  }

  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return this.customerAddressService.update(+id, updateCustomerAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerAddressService.remove(+id);
  }

}
