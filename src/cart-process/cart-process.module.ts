import { Module } from '@nestjs/common';
import { CartProcessService } from './cart-process.service';
import { CartProcessController } from './cart-process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProcess } from './entities/cart-process.entity';
import { CartProcessProduct } from 'src/cart-process-product/entities/cart-process-product.entity';
import { CartProcessProductService } from 'src/cart-process-product/cart-process-product.service';
import { CartProcessProductModule } from 'src/cart-process-product/cart-process-product.module';
import { OrderService } from 'src/order/order.service';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartProcess,CartProcessProduct,Order]),
    CartProcessProductModule
  ],
  controllers: [CartProcessController],
  providers: [CartProcessService,CartProcessProductService,OrderService]
})
export class CartProcessModule {}
