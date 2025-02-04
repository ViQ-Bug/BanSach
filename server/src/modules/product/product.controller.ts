import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/config';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image',{storage: storageConfig('image')}))
  async create(@Req() req,@Body() createProductDto: CreateProductDto,@UploadedFile() file:Express.Multer.File) {
    const product = await this.productService.create(createProductDto);
    return product
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findProduct(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('image',{storage: storageConfig('image')}))
  uploadFile(@UploadedFile() file:Express.Multer.File,@Param('id') id:number){
    return this.productService.uploadFile(id,file.filename)
  }
}
