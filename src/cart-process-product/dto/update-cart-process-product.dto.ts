import { PartialType } from '@nestjs/mapped-types';
import { CreateCartProcessProductDto } from './create-cart-process-product.dto';

export class UpdateCartProcessProductDto extends PartialType(CreateCartProcessProductDto) {}
