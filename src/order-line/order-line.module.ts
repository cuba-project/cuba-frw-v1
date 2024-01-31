import { Module } from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { OrderLineController } from './order-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLine } from './entities/order-line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderLine])
  ],
  controllers: [OrderLineController],
  providers: [OrderLineService],
  exports:[OrderLineService]
})
export class OrderLineModule {}
