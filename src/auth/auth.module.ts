import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constatns/jwt.constants';

@Module({
  imports: [UsersModule, 
    JwtModule.register({
      //Cualquier servicio puede usar jwt
      global:true,
      //Palabra secreta para verificar el token
      secret: jwtConstants.secret,
      //Tiempo en el que expira el token
      signOptions: {expiresIn: '1d'},
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
