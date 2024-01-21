import { CartProcess } from "src/cart-process/entities/cart-process.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartProcessProduct {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    created:Date;
    @Column({ 'name': 'cart_process_id' })
    cartProcessId:number;
    @Column({ 'name': 'product_id' })
    productId:number;
    @Column()
    quantity:number;
    
    @ManyToOne(() => CartProcess, (cartProcess) => cartProcess.cart_process_products)
    @JoinColumn({name: 'cart_process_id', referencedColumnName: 'id'})
    cart_process:CartProcess
}
