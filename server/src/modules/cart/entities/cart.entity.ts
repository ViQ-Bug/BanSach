import { ProductEntity } from "src/modules/product/entities/product.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Or, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cart'})
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    quantity: number
    
    @ManyToOne(() => ProductEntity, (product) => product.cart)
    products: ProductEntity
    @ManyToOne(() => UserEntity, (user) => user.cart)
    user: UserEntity
}
