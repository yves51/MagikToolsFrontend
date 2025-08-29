import { TypeEntreprise } from "../../../domain/entities/TypeEntreprise";
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchTypeEntreprises = () => axiosInstance.get<{ data: TypeEntreprise[] }>("/type-entreprises/index" );

// Récupérer 
export const fetchTypeEntrepriseById = (id: number) => axiosInstance.get<TypeEntreprise>(`/type-entreprises/show/${id}` );

// Créer 
export const createTypeEntreprise = (data: TypeEntreprise) => axiosInstance.post("/type-entreprises/store", data);

// Mettre à jour 
export const updateTypeEntreprise = (id: number, data: TypeEntreprise) => axiosInstance.put(`/type-entreprises/update/${id}`, data);

// Supprimer 
export const deleteTypeEntreprise = (id: number) => axiosInstance.delete(`/type-entreprises/delete/${id}`, {});