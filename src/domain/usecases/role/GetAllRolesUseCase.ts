import { Role } from "../../entities/Role";

export interface GetAllRolesUseCase {
  execute(): Promise<Role[]>;
}
