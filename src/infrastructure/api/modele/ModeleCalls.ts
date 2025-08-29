import { Modele } from '../../../domain/entities/Modele';
import axiosInstance from "../../http/axiosInstance";

// Récupérer tous les rôles
export const fetchModeles = () => axiosInstance.get<{ data: Modele[] }>("/modeles/index" );

// Récupérer un rôle par ID
export const fetchModeleById = (id: number) => axiosInstance.get<Modele>(`/modeles/show/${id}` );

// Créer un rôle
export const createModele = (data: Modele) => axiosInstance.post("/modeles/store", data);

// Mettre à jour un rôle
export const updateModele = (id: number, data: Modele) => axiosInstance.put(`/modeles/update/${id}`, data);

// Supprimer un rôle
export const deleteModele = (id: number) => axiosInstance.delete(`/modeles/delete/${id}`, {});