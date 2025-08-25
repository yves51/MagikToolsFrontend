
import { RoleRepository } from "../../../application/repositories/RoleRepository";
import { Role } from "../../../domain/entities/Role";
import * as api from "../../api/role/RoleCalls";

export class RoleService implements RoleRepository {
  // Créer un rôle
  async create(role: Role): Promise<void> {
    await api.createRole(role);
  }

  // Récupérer tous les rôles
  async getAll(): Promise<any> {
    const response = await api.fetchRoles();
    return response.data;
  }

  // Récupérer un rôle par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchRoleById(id);
    return response.data;
  }

  // Mettre à jour un rôle
  async update(id: number, role: Role): Promise<void> {
    await api.updateRole(id, role);
  }

  // Supprimer un rôle
  async delete(id: number): Promise<any> {
   return await api.deleteRole(id);
  }

}
