import { EtatMateriel } from "../../../domain/entities/EtatMateriel";
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchEtatMateriels = () => axiosInstance.get<{ data: EtatMateriel[] }>("/api/etat-materiels/index" );

// Récupérer 
export const fetchEtatMaterielById = (id: number) => axiosInstance.get<EtatMateriel>(`/api/etat-materiels/show/${id}` );

// Créer 
export const createEtatMateriel = (data: EtatMateriel) => axiosInstance.post("/api/etat-materiels/store", data);

// Mettre à jour 
export const updateEtatMateriel = (id: number, data: EtatMateriel) => axiosInstance.put(`/api/etat-materiels/update/${id}`, data);

// Supprimer 
export const deleteEtatMateriel = (id: number) => axiosInstance.delete(`/api/etat-materiels/delete/${id}`, {});