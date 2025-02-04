import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.strategy';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getCart(@Request() req) {
    return await this.cartService.getCart(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':productId')
  async addToCart(
    @Param('productId') productId: number,
    @Body() createCartDto: CreateCartDto,
    @Req() req
  ) {
    const userID = req.user.id;
    return await this.cartService.addToCart(createCartDto, userID, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.cartService.remove(id);
  }
}
