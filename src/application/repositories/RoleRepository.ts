import { Role } from "../../domain/entities/Role";

export interface RoleRepository {
  create(role: Role): Promise<void>;
  getAll(): Promise<Role[]>;
  getById(id: number): Promise<Role>;
  update(id: number, role: Role): Promise<void>;
  delete(id: number): Promise<void>;
}
