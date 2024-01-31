import { CartProcessProduct } from "src/cart-process-product/entities/cart-process-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    deliver_data:{};
    @Column({type:"json"})
    data:{};
    @OneToMany(() => CartProcessProduct, (cartProcessProduct) => cartProcessProduct.cart_process)
    cart_process_products:CartProcessProduct[];
}
