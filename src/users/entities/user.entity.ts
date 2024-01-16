import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column({unique:true, nullable:false})
    email:string;

    @Column()
    phone:number;

    @Column({nullable: false})
    password:string;

    @Column({default: 'user'})
    role:string;

    @CreateDateColumn()
    created:Date;

    @DeleteDateColumn()
    deleted:Date;

    @UpdateDateColumn()
    modified:Date;
}
