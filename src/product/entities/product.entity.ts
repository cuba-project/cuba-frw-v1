import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    product_category_id:number;
    @Column()
    is_active:number;
    @Column()
    description:Date;
}
