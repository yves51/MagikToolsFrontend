import axios  from 'axios';
import { Role } from '../../../domain/entities/Role';
import axiosInstance from "../../http/axiosInstance";


// Récupérer tous les rôles
export const fetchRoles = () => axiosInstance.get<{ data: Role[] }>("/roles/index");

// Récupérer un rôle par ID
export const fetchRoleById = (id: number) => axiosInstance.get<Role>(`/roles/show/${id}` );

// Créer un rôle
export const createRole = (data: Role) => axiosInstance.post("/roles/store", data );

// Mettre à jour un rôle
export const updateRole = (id: number, data: Role) => axiosInstance.put(`/roles/update/${id}`, data);

// Supprimer un rôle
export const deleteRole = (id: number) => axiosInstance.delete(`/roles/delete/${id}`, {});

