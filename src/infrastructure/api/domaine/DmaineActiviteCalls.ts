import { DomaineActivite } from '../../../domain/entities/DomaineActivite';
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchDomaineActivites = () => axiosInstance.get<{ data: DomaineActivite[] }>("/domaines/index" );

// Récupérer 
export const fetchDomaineActiviteById = (id: number) => axiosInstance.get<DomaineActivite>(`/domaines/show/${id}` );

// Créer 
export const createDomaineActivite = (data: DomaineActivite) => axiosInstance.post("/domaines/store", data);

// Mettre à jour 
export const updateDomaineActivite = (id: number, data: DomaineActivite) => axiosInstance.put(`/domaines/update/${id}`, data);

// Supprimer 
export const deleteDomaineActivite = (id: number) => axiosInstance.delete(`/domaines/delete/${id}`, {});