import { Role } from "../../entities/Role";

export interface UpdateRoleUseCase {
  execute(id: number, data: Role): Promise<void>;
}
