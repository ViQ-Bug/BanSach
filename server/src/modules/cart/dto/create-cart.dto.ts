import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
