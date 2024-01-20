import { ProductCategory } from "src/product-category/entities/product-category.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    created:Date;
    @Column()
    modified:Date;
    @Column()
    name:string;
    @Column()
    price:number;
    @OneToOne(()=>ProductCategory)
    @Column()
    product_category_id:number;
    @Column()
    is_active:number;
    @Column()
    description:Date;
}
