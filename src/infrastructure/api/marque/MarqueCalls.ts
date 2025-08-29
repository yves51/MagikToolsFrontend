
import { Marque } from "../../../domain/entities/Marque";
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchMarques = () => axiosInstance.get<{ data: Marque[] }>("/marques/index" );

// Récupérer 
export const fetchMarqueById = (id: number) => axiosInstance.get<Marque>(`/marques/show/${id}` );

// Créer 
export const createMarque = (data: Marque) => axiosInstance.post("/marques/store", data);

// Mettre à jour 
export const updateMarque = (id: number, data: Marque) => axiosInstance.put(`/marques/update/${id}`, data);

// Supprimer 
export const deleteMarque = (id: number) => axiosInstance.delete(`/marques/delete/${id}`, {});