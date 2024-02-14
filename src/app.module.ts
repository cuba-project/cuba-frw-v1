import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { OptionsMiddleware } from './customer-address/middleware/options.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}']
    }),
    UsersModule,
    AuthModule,
    ProductCategoryModule,
    ProductModule,
    CartProcessModule,
    CartProcessProductModule,
    OrderModule,
    OrderLineModule,
    CustomerAddressModule,
    EmailModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OptionsMiddleware).forRoutes('*');
  }
}
