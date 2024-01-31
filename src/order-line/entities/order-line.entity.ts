import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    amount:number;
}
