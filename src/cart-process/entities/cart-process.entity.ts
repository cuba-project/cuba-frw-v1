import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartProcessProduct } from "./cart-process-product.entity";

@Entity()
export class CartProcess {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    created:Date;
    @Column()
    token:string;
    @Column({ 'name': 'customer_id' })
    customer_id:number;
    @Column({type:"json"})
    data:{};
    @OneToMany(() => CartProcessProduct, (cartProcessProduct) => cartProcessProduct.cart_process)
    cart_process_products:CartProcessProduct[];
}
