
import { Entreprise } from "../../../domain/entities/Entreprise";
import { Materiel } from "../../../domain/entities/Materiel";
import axiosInstance from "../../http/axiosInstance";

// Récupérer tous les rôles
export const fetchEntreprises = () => axiosInstance.get<{ data: Entreprise[] }>("/api/entreprises/index" );

// Récupérer un rôle par ID
export const fetchEntrepriseById = (id: number) => axiosInstance.get<Entreprise>(`/api/entreprises/show/${id}` );

// Créer un rôle
export const createEntreprise = (data: Entreprise) => axiosInstance.post("/api/entreprises/store", data);

// Mettre à jour un rôle
export const updateEntreprise = (id: number, data: Entreprise) => axiosInstance.put(`/api/entreprises/update/${id}`, data);

// Supprimer un rôle
export const deleteEntreprise = (id: number) => axiosInstance.delete(`/api/entreprises/delete/${id}`, {});