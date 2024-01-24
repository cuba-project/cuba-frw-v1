import { CartProcessProduct } from "src/cart-process-product/entities/cart-process-product.entity";
import { ProductCategory } from "src/product-category/entities/product-category.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @Column({ type: 'json'})
    image_url:Array<string>;
    
    @OneToMany(type => CartProcessProduct, cart => cart.product)
    carts: CartProcessProduct[];
}
