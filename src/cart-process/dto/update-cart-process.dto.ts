import { PartialType } from '@nestjs/mapped-types';
import { CreateCartProcessDto } from './create-cart-process.dto';

export class UpdateCartProcessDto extends PartialType(CreateCartProcessDto) {}
