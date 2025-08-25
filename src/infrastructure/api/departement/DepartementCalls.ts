
import { Departement } from '../../../domain/entities/Departement';
import { Fonction } from '../../../domain/entities/Fonction';
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchDepartements = () => axiosInstance.get<{ data: Departement[] }>("/api/departements/index" );

// Récupérer 
export const fetchDepartementById = (id: number) => axiosInstance.get<Departement>(`/api/departements/show/${id}` );

// Créer 
export const createDepartement = (data: Departement) => axiosInstance.post("/api/departements/store", data);

// Mettre à jour 
export const updateDepartement = (id: number, data: Departement) => axiosInstance.put(`/api/departements/update/${id}`, data);

// Supprimer 
export const deleteDepartement = (id: number) => axiosInstance.delete(`/api/departements/delete/${id}`, {});