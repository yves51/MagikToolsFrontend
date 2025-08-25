
import { Permission } from '../../../domain/entities/Permission';
import axiosInstance from "../../http/axiosInstance";

// Récupérer tous les rôles
export const fetchPermissions = () => axiosInstance.get<{ data: Permission[] }>("/api/permissions/index" );

// Récupérer un rôle par ID
export const fetchPermissionById = (id: number) => axiosInstance.get<Permission>(`/api/permissions/show/${id}` );

// Créer un rôle
export const createPermission = (data: Permission) => axiosInstance.post("/api/permissions/store", data);

// Mettre à jour un rôle
export const updatePermission = (id: number, data: Permission) => axiosInstance.put(`/api/permissions/update/${id}`, data);

// Supprimer un rôle
export const deletePermission = (id: number) => axiosInstance.delete(`/api/permissions/delete/${id}`, {});
// (Optionnel) Assigner des permissions à un rôle
export const assignPermissionsToRole = ( roleId: number, permissionIds: number[]) =>
  axiosInstance.post(`/api/roles/assign-permissions`, { roleId, permissionIds,
  });