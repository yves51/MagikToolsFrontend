import { Role } from "../../entities/Role";

export interface CreateRoleUseCase {
  execute(data: Role): Promise<void>;
}
