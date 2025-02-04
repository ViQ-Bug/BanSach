import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ default: '' })
  avatar: string;
  @Column({ type: 'tinyint', default: 0 })
  role: number;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[];

}