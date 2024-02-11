import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    created:Date;
    @Column({ 'name': 'order_id' })
    order_id:string;
    @Column({ 'name': 'product_id' })
    product_id:string;
    @Column()
    quantity:number;
    @Column('decimal', { precision: 18, scale: 2 })
    amount:number;
    
    @ManyToOne(() => Order, (order) => order.order_lines)
    @JoinColumn({name: 'order_id', referencedColumnName: 'id'})
    order:Order

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product:Product;
}
