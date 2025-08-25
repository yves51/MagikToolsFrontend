import { SousCategorie } from '../../../domain/entities/SousCategorie';
import axiosInstance from "../../http/axiosInstance";


// Récupérer tous les rôles
export const fetchSousCategories = () => axiosInstance.get<{ data: SousCategorie[] }>("/api/sous-categories/index" );

// Récupérer un rôle par ID
export const fetchSousCategorieById = (id: number) => axiosInstance.get<SousCategorie>(`/api/sous-categories/show/${id}` );

// Créer un rôle
export const createSousCategorie = (data: SousCategorie) => axiosInstance.post("/api/sous-categories/store", data);

// Mettre à jour un rôle
export const updateSousCategorie = (id: number, data: SousCategorie) => axiosInstance.put(`/api/sous-categories/update/${id}`, data);

// Supprimer un rôle
export const deleteSousCategorie = (id: number) => axiosInstance.delete(`/api/sous-categories/delete/${id}`, {});