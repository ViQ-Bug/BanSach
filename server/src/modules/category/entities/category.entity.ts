import { ProductEntity } from "src/modules/product/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}



