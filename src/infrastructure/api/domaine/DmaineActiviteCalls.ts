import { DomaineActivite } from '../../../domain/entities/DomaineActivite';
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchDomaineActivites = () => axiosInstance.get<{ data: DomaineActivite[] }>("/api/domaines/index" );

// Récupérer 
export const fetchDomaineActiviteById = (id: number) => axiosInstance.get<DomaineActivite>(`/api/domaines/show/${id}` );

// Créer 
export const createDomaineActivite = (data: DomaineActivite) => axiosInstance.post("/api/domaines/store", data);

// Mettre à jour 
export const updateDomaineActivite = (id: number, data: DomaineActivite) => axiosInstance.put(`/api/domaines/update/${id}`, data);

// Supprimer 
export const deleteDomaineActivite = (id: number) => axiosInstance.delete(`/api/domaines/delete/${id}`, {});