import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  discount: number;
  @Column()
  stock: number;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ nullable: true , default: '' })
  image: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;
  @ManyToOne(()=> CartEntity, (cart) => cart.products)
  cart: CartEntity

}