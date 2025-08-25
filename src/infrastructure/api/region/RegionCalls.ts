import { Region } from '../../../domain/entities/Region';
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchRegions = () => axiosInstance.get<{ data: Region[] }>("/api/regions/index" );

// Récupérer 
export const fetchRegionById = (id: number) => axiosInstance.get<Region>(`/api/regions/show/${id}` );

// Créer 
export const createRegion = (data: Region) => axiosInstance.post("/api/regions/store", data);

// Mettre à jour 
export const updateRegion = (id: number, data: Region) => axiosInstance.put(`/api/regions/update/${id}`, data);

// Supprimer 
export const deleteRegion = (id: number) => axiosInstance.delete(`/api/regions/delete/${id}`, {});