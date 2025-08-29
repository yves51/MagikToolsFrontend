
import { Fonction } from '../../../domain/entities/Fonction';
import axiosInstance from "../../http/axiosInstance";



// Récupérer tous les rôles
export const fetchFonctions = () => axiosInstance.get<{ data: Fonction[] }>("/fonctions/index" );

// Récupérer un rôle par ID
export const fetchFonctionById = (id: number) => axiosInstance.get<Fonction>(`/fonctions/show/${id}` );

// Créer un rôle
export const createFonction = (data: Fonction) => axiosInstance.post("/fonctions/store", data);

// Mettre à jour un rôle
export const updateFonction = (id: number, data: Fonction) => axiosInstance.put(`/fonctions/update/${id}`, data);

// Supprimer un rôle
export const deleteFonction = (id: number) => axiosInstance.delete(`/fonctions/delete/${id}`, {});