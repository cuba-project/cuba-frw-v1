import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';
import { CartProcessModule } from './cart-process/cart-process.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'db.vhnfputvagvzczpcntma.supabase.co',
      port:5432,
      username:'postgres',
      password:'x5Pf84VTSfezzEhpiG@nwHv9r7',
      database:'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}']
    }),
    UsersModule,
    AuthModule,
    ProductCategoryModule,
    ProductModule,
    CartProcessModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
