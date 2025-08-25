import { Categorie } from "../../../domain/entities/Categorie";
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchCategories = () => axiosInstance.get<{ data: Categorie[] }>("/api/categories/index" );

// Récupérer 
export const fetchCategorieById = (id: number) => axiosInstance.get<Categorie>(`/api/categories/show/${id}` );

// Créer 
export const createCategorie = (data: Categorie) => axiosInstance.post("/api/categories/store", data);

// Mettre à jour 
export const updateCategorie = (id: number, data: Categorie) => axiosInstance.put(`/api/categories/update/${id}`, data);

// Supprimer 
export const deleteCategorie = (id: number) => axiosInstance.delete(`/api/categories/delete/${id}`, {});