import { OrderLine } from "src/order-line/entities/order-line.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    deliver_date:Date;
    @Column()
    city:string;
    @Column()
    street:string;
    @Column()
    postal_code:string;
    @Column()
    phone:string;
    @Column('decimal', { precision: 18, scale: 2 })
    amount:number;

    @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
    order_lines:OrderLine[];
}
