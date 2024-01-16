import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'david',
      password:'000000',
      database:'api_acf_dev',
      entities: [__dirname + '/**/*.entity.{js,ts}']
    }),
    UsersModule,
    AuthModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
