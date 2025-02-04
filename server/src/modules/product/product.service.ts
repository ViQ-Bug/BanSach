import { CategoryService } from './../category/category.service';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto, file?: Express.Multer.File) {
    const existingProduct = await this.productRepository.findOne({ where: { name: createProductDto.name } });
    if (existingProduct) {
      throw new ConflictException('San pham da ton tai');
    }
  
    const category = await this.categoryService.findOne(createProductDto.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
  
    const product = new ProductEntity();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.discount = createProductDto.discount;
    product.stock = createProductDto.stock;
  
    if (file) {
      product.image = `/upload/products/${file.filename}`;
    }
  
    product.category = category;
  
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error saving product');
    }
  }

  async findAll() {
    const data = await this.productRepository.find({
      relations: ['category']
    });
    return data;
  }

  async findProduct(productId: number): Promise<ProductEntity | null> {
    const data = await this.productRepository.findOne({
      where: {id: productId},
      relations: ['category']});
    return data;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const data = await this.productRepository.find({where: {id}});
    if (!data) {
      throw new Error('Khong tim thay san pham trong gio hang');
    }
    return this.productRepository.remove(data);
  }

  async uploadFile(id:number, image:string) {
    return this.productRepository.update(id, {image});
  }
}
