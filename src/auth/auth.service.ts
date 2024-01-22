import { BadRequestException, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async register({name, email, password, phone, is_active, identity_document}: RegisterDto){
        //Comprobamos si el usuario que se va a registrar existe ya en nuesta DB.
        const user = await this.usersService.findOneByEmail(email);

        if(user){
            throw new BadRequestException('Ya existe un usuario con ese email');
        }

        //Guardamos el usuario en una variable
        return await this.usersService.create({
            name,
            email,
            phone,
            is_active,
            identity_document,
            //hasheamos la password
            password: await bcryptjs.hash(password, 10)
        });
    }

    async login({email, password}: LoginDto){
        //Comprobamos email
        const user = await this.usersService.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('El email no es correcto');
        }
        
        //TODO do not check for local development
        if(0){
            const isValidPassword = await bcryptjs.compare(password, user.password);
            if(!isValidPassword){
                throw new UnauthorizedException('La contraseña es incorrecta');
            }
        }

        //Información pública que viaja en el token para identificar el propietario
        const payload = { email:user.email, id: user.id };
        //Generamos el token
        const token = await this.jwtService.signAsync(payload);
            
        return {
            token,
            user
        };
    }
}
