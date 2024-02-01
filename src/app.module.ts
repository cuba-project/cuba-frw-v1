import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';
import { CartProcessModule } from './cart-process/cart-process.module';
import { CartProcessProductModule } from './cart-process-product/cart-process-product.module';
import { OrderModule } from './order/order.module';
import { OrderLineModule } from './order-line/order-line.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'aws-0-eu-central-1.pooler.supabase.com',
      port:5432,
      username:'postgres.vhnfputvagvzczpcntma',
      password:'x5Pf84VTSfezzEhpiG@nwHv9r7',
      database:'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}']
    }),
    UsersModule,
    AuthModule,
    ProductCategoryModule,
    ProductModule,
    CartProcessModule,
    CartProcessProductModule,
    OrderModule,
    OrderLineModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
