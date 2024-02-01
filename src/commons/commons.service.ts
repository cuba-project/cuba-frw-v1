import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

export abstract class BaseService <T>{
    abstract getRepository(): Repository<T>;

    executeQuery(query:string): Promise<T>{
        return this.getRepository().query(query);
    }

    getRows(): Promise<T[]>{
        return this.getRepository().find();
    }

    getOne(id:any): Promise<T>{
        return this.getRepository().findOne(id);
    }

    save(entity:T): Promise<T>{
        return this.getRepository().save(entity);
    }

    saveMany(entities:T[]):Promise<T[]>{
        return this.getRepository().save(entities);
    }

    async delete(id: any){
        return this.getRepository().delete(id);
    }

    count(options?:FindManyOptions<T>):Promise<number>{
        return this.getRepository().count(options);
    }

    getWhereFilter(searhc){
        
        let whereFilter:FindOptionsWhere<T> = {};

        return whereFilter;
    }

}