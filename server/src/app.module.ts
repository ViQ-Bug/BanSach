import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormconfig';
import { UsersModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';import { JwtAuthModule } from './modules/jwt-auth/jwt-auth.module';
@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true
      
    }
  ),
  TypeOrmModule.forRoot(config),
  UsersModule,
  ProductModule,
  CategoryModule,
  CartModule,
  JwtAuthModule
],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
