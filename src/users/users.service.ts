import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/commons/commons.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>){
    super();
  }

  create(createUserDto: CreateUserDto){
    return this.userRepo.save(createUserDto);
  }

  findOneByEmail(email:string){
    return this.userRepo.findOneBy({email});
  }

  getRepository(): Repository<User>{
      return this.userRepo;
  }
}
