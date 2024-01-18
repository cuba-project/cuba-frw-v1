import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product-category/product-category.module';

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
    ProductCategoryModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}