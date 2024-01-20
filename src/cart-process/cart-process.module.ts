import { Module } from '@nestjs/common';
import { CartProcessService } from './cart-process.service';
import { CartProcessController } from './cart-process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProcess } from './entities/cart-process.entity';
import { CartProcessProduct } from './entities/cart-process-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartProcess,CartProcessProduct])
  ],
  controllers: [CartProcessController],
  providers: [CartProcessService]
})
export class CartProcessModule {}
