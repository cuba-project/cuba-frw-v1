import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { RequestWithUser } from './interfaces/request.with.user.interface';
import { Roles } from './decorators/roles.decorator';
import { RolesConstants } from './constatns/roles.constants';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(
        @Body()
        loginDto: LoginDto
    ){
        return this.authService.login(loginDto);
    }

     
    @Get('profile')
    @Roles(RolesConstants.USER)
    @UseGuards(AuthGuard)
    profile(
        @Request()
        req: RequestWithUser
        ){
        return req.user;
    }
}
