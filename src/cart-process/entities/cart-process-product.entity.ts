import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartProcess } from "./cart-process.entity";

@Entity()
export class CartProcessProduct {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    created:Date;
    @Column({ 'name': 'cart_process_id' })
    cartProcessId:number;
    @Column()
    product_id:number;
    @Column()
    quantity:number;
    
    @ManyToOne(() => CartProcess, (cartProcess) => cartProcess.cart_process_products)
    @JoinColumn({name: 'cart_process_id', referencedColumnName: 'id'})
    cart_process:CartProcess
}
