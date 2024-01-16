import { UseGuards, applyDecorators } from "@nestjs/common";
import { RolesConstants } from "../constatns/roles.constants";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth (role:RolesConstants){
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )
}