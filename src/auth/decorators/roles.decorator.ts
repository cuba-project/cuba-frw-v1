import { SetMetadata } from "@nestjs/common";
import { RolesConstants } from "../constatns/roles.constants";

export const ROLES_KEY = "roles";
export const Roles = (role:RolesConstants) => SetMetadata(ROLES_KEY, role);