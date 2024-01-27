import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    created:Date;
    @Column({ 'name': 'customer_id' })
    customer_id:string;
    @Column({ 'name': 'order_status_id' })
    order_status_id:string;
}
