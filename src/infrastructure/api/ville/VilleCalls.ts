import { Ville } from '../../../domain/entities/Ville';
import axiosInstance from "../../http/axiosInstance";



// Récupérer tous les rôles
export const fetchVilles = () => axiosInstance.get<{ data: Ville[] }>("/villes/index" );

// Récupérer un rôle par ID
export const fetchVilleById = (id: number) => axiosInstance.get<Ville>(`/villes/show/${id}` );

// Créer un rôle
export const createVille = (data: Ville) => axiosInstance.post("/villes/store", data);

// Mettre à jour un rôle
export const updateVille = (id: number, data: Ville) => axiosInstance.put(`/villes/update/${id}`, data);

// Supprimer un rôle
export const deleteVille = (id: number) => axiosInstance.delete(`/villes/delete/${id}`, {});