import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UsersService } from '../user/user.service';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly productsService: ProductService,
    private readonly usersService: UsersService,
  ) {}

  async getCart(userId: number) {
    const data = await this.cartRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'products', 'products.category'], 
    });

    console.log(JSON.stringify(data, null, 2)); 
    return data;
}


  async addToCart(createCartDto: CreateCartDto, userId: number, productId: number) {
    const { quantity } = createCartDto;

    const user = await this.usersService.findUser(userId);
    if (!user) {
      throw new Error('Khong nguoi dung');
    }

    const product = await this.productsService.findProduct(productId);
    if (!product) {
      throw new Error('Khong tim thay san pham');
    }

    let cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, products: { id: productId } },
      relations: ['user', 'products', 'products.category'],
      
    })
    console.log('Item',cartItem);

    if (cartItem) {
      cartItem.quantity += quantity;  
    } else {

      cartItem = new CartEntity();
      cartItem.user = user;
      cartItem.products = product;
      cartItem.quantity = quantity;
    }

    await this.cartRepository.save(cartItem);  
    return JSON.parse(JSON.stringify(cartItem));;
  }

  async remove(id: number) {
    const cartItem = await this.cartRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new Error('Không tim thay san pham trong gio hang');
    }
    return this.cartRepository.remove(cartItem);
  }
}
