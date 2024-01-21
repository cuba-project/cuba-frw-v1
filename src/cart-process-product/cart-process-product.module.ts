import { Module } from '@nestjs/common';
import { CartProcessProductService } from './cart-process-product.service';
import { CartProcessProductController } from './cart-process-product.controller';
import { CartProcessProduct } from './entities/cart-process-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([CartProcessProduct]),
  ],
  controllers: [CartProcessProductController],
  providers: [CartProcessProductService]
})
export class CartProcessProductModule {}
