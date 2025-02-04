import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    @IsNumber()
    discount: number

    @IsNotEmpty()
    stock: number

    image: string

    @IsNotEmpty()
    categoryId: number;  
}
