import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';
import { UserEntity } from '../user/entities/user.entity';
import { UsersService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity,ProductEntity, CategoryEntity,UserEntity])],
  controllers: [CartController],
  providers: [CartService,ProductService,CategoryService,UsersService],
})
export class CartModule {}
