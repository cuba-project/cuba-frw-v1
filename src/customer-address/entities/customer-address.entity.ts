import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerAddress {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    created:Date;
    @Column()
    city:string;
    @Column()
    street:string;
    @Column({name:"postal_code"})
    postal_code:string;
    @Column({name:"customer_id"})
    customer_id:number;
}
