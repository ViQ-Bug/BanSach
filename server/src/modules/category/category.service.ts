import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository:  Repository <CategoryEntity>,
    
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });
    if (existingCategory) {
      throw new ConflictException('Danh muc da ton tai');
    }
    const category = new CategoryEntity();
    category.name = createCategoryDto.name;
    
    return this.categoryRepository.save(category);
  }
  async findAll() {
    const categories = await this.categoryRepository.find()   
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException('Khong tim thay danh muc');
    }
    return category;
  }
  async search(name: string){
    const data = await this.categoryRepository.find({
      where: {name: ILike(`%${name}%`)}
    })
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const data = await this.categoryRepository.findOne({
      where: {id}
    })

    if (!data) {
      throw new Error('Khong tim thay danh muc');
    }
    Object.assign(data, updateCategoryDto);
    await this.categoryRepository.save(data)
    return "Cap nhat thanh cong"
  }
  async remove(id: number) {
    const data = await this.categoryRepository.findOne({
      where:{id}
    })
    if(!data){
      throw new Error('Khong tim thay danh muc');
    }
    await this.categoryRepository.remove(data)
  }
}
