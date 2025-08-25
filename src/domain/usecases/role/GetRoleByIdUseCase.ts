import { Role } from "../../entities/Role";

export interface GetRoleByIdUseCase {
  execute(id: number): Promise<Role>;
}
