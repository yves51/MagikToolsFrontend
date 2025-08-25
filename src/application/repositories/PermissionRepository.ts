import { Permission } from "../../domain/entities/Permission";

export interface PermissionRepository {
  create(role: Permission): Promise<void>;
  getAll(): Promise<Permission[]>;
  getById(id: number): Promise<Permission>;
  update(id: number, role: Permission): Promise<void>;
  delete(id: number): Promise<void>;
}
