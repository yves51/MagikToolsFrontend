import { Ville } from '../../../domain/entities/Ville';
import axiosInstance from "../../http/axiosInstance";



// Récupérer tous les rôles
export const fetchVilles = () => axiosInstance.get<{ data: Ville[] }>("/api/villes/index" );

// Récupérer un rôle par ID
export const fetchVilleById = (id: number) => axiosInstance.get<Ville>(`/api/villes/show/${id}` );

// Créer un rôle
export const createVille = (data: Ville) => axiosInstance.post("/api/villes/store", data);

// Mettre à jour un rôle
export const updateVille = (id: number, data: Ville) => axiosInstance.put(`/api/villes/update/${id}`, data);

// Supprimer un rôle
export const deleteVille = (id: number) => axiosInstance.delete(`/api/villes/delete/${id}`, {});