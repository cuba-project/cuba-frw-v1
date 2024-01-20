import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryColumn()
    id:number;
    
    @Column()
    name:string;

    @Column()
    created:Date;
    
    @Column()
    image_url:string;
}
