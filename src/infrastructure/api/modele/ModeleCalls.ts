import { Modele } from '../../../domain/entities/Modele';
import axiosInstance from "../../http/axiosInstance";

// Récupérer tous les rôles
export const fetchModeles = () => axiosInstance.get<{ data: Modele[] }>("/api/modeles/index" );

// Récupérer un rôle par ID
export const fetchModeleById = (id: number) => axiosInstance.get<Modele>(`/api/modeles/show/${id}` );

// Créer un rôle
export const createModele = (data: Modele) => axiosInstance.post("/api/modeles/store", data);

// Mettre à jour un rôle
export const updateModele = (id: number, data: Modele) => axiosInstance.put(`/api/modeles/update/${id}`, data);

// Supprimer un rôle
export const deleteModele = (id: number) => axiosInstance.delete(`/api/modeles/delete/${id}`, {});