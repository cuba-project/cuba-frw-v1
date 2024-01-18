import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from 'src/commons/commons.controller';
import { User } from './entities/user.entity';
import { BaseService } from 'src/commons/commons.service';

@Controller('user')
export class UsersController extends BaseController<User> {

  constructor(private readonly usersService: UsersService) {
    super();
  }

  getService(): BaseService<User> {
    return this.usersService;
  }

}
