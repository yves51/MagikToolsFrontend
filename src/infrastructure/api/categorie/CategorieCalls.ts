import { Categorie } from "../../../domain/entities/Categorie";
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchCategories = () => axiosInstance.get<{ data: Categorie[] }>("/categories/index" );

// Récupérer 
export const fetchCategorieById = (id: number) => axiosInstance.get<Categorie>(`/categories/show/${id}` );

// Créer 
export const createCategorie = (data: Categorie) => axiosInstance.post("/categories/store", data);

// Mettre à jour 
export const updateCategorie = (id: number, data: Categorie) => axiosInstance.put(`/categories/update/${id}`, data);

// Supprimer 
export const deleteCategorie = (id: number) => axiosInstance.delete(`/categories/delete/${id}`, {});