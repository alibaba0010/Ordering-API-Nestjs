

import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsPhoneNumber,
} from 'class-validator';

export class CreateOrder {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  contact: number;

  @IsPositive()
  @IsNotEmpty()
  price: number;
}
