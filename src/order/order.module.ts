import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CartProcess } from 'src/cart-process/entities/cart-process.entity';
import { CartProcessProduct } from 'src/cart-process-product/entities/cart-process-product.entity';
import { CartProcessProductModule } from 'src/cart-process-product/cart-process-product.module';
import { CartProcessService } from 'src/cart-process/cart-process.service';
import { CartProcessModule } from 'src/cart-process/cart-process.module';
import { CartProcessProductService } from 'src/cart-process-product/cart-process-product.service';
import { CartProcessController } from 'src/cart-process/cart-process.controller';
import { CartProcessProductController } from 'src/cart-process-product/cart-process-product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order,CartProcess,CartProcessProduct]),
    CartProcessModule,CartProcessProductModule
  ],
  controllers: [OrderController,CartProcessController,CartProcessProductController],
  providers: [OrderService,CartProcessService,CartProcessProductService]
})
export class OrderModule {}
