
import { PermissionRepository } from "../../../application/repositories/PermissionRepository";
import { Permission } from "../../../domain/entities/Permission";
import { Role } from "../../../domain/entities/Role";
import * as api from "../../api/permission/PemissionCalls"

export class PermissionService implements PermissionRepository {
  // Créer une permission
  async create(permission: Permission): Promise<void> {
    await api.createPermission(permission);
  }

  // Récupérer tous les permissions
  async getAll(): Promise<any> {
    const response = await api.fetchPermissions();
    return response.data;
  }

  // Récupérer une permission par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchPermissionById(id);
    return response.data;
  }

  // Mettre à jour une permission
  async update(id: number, permission: Permission): Promise<void> {
    await api.updatePermission(id, permission);
  }

  // Supprimer une permission
 async delete(id: number): Promise<any> {
  return await api.deletePermission(id); // ✅ on retourne la réponse
}

  // // Assigner des permissions à un rôle
  async assignPermissions(roleId: number, permissionIds: number[]): Promise<void> {
    await api.assignPermissionsToRole(roleId, permissionIds);
  }
}
