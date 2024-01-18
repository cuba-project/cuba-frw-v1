import { Body, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { BaseService } from "./commons.service";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesConstants } from "src/auth/constatns/roles.constants";
import { Auth } from "src/auth/decorators/auth.decorator";

export abstract class BaseController<T> {

    abstract getService(): BaseService<T>;

    @Get('all')
    //@UseGuards(AuthGuard)
    async findAll() : Promise<T[]> {
        return await this.getService().getRows();
    }

    @Get('find/:id')
    //@UseGuards(AuthGuard)
    async findOne(@Param('id') id): Promise<T> {
        return await this.getService().getOne({
            where: {
                id: id,
            },
        });
    }

    @Post('save')
    //@Auth(RolesConstants.SUPER_ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() entity: T) : Promise<T> {
        return await this.getService().save(entity);
    }

    @Post('save/many')
    //@Auth(RolesConstants.SUPER_ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async saveMany(@Body() entities: T[]) : Promise<T[]> {
        return await this.getService().saveMany(entities);
    }

    @Post('delete/:id')
    //@Auth(RolesConstants.SUPER_ADMIN)
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: any) {
        return this.getService().delete(id);
    }

    @Get('count')
    //@UseGuards(AuthGuard)
    async count() : Promise<number> {
        return await this.getService().count();
    }

    @Post('query')
    //@Auth(RolesConstants.SUPER_ADMIN)
    @HttpCode(HttpStatus.OK)
    query(@Body() query: string) {
        return this.getService().executeQuery(query);
    }
}