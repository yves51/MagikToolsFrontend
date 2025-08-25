
import { Materiel } from '../../../domain/entities/Materiel';
import { Modele } from '../../../domain/entities/Modele';
import { SousCategorie } from '../../../domain/entities/SousCategorie';
import axiosInstance from "../../http/axiosInstance";

// Récupérer tous les rôles
export const fetchMateriels = () => axiosInstance.get<{ data: Materiel[] }>("/api/materiels/index" );

// Récupérer un rôle par ID
export const fetchMaterielById = (id: number) => axiosInstance.get<Materiel>(`/api/materiels/show/${id}` );

// Créer un rôle
export const createMateriel = (data: Materiel) => axiosInstance.post("/api/materiels/store", data);

// Mettre à jour un rôle
export const updateMateriel = (id: number, data: Materiel) => axiosInstance.put(`/api/materiels/update/${id}`, data);

// Supprimer un rôle
export const deleteMateriel = (id: number) => axiosInstance.delete(`/api/materiels/delete/${id}`, {});

// Récupérer un rôle par ID
export const getSousCategoriesByCategorie = (id: number) => axiosInstance.get<SousCategorie>(`/api/materiels/sous-categories/categorie/${id}` );

export const getModelesByMarque = (id: number) => axiosInstance.get<Modele>(`/api/materiels/modeles/marque/${id}` );

export const getMaterielsByEntreprise = (id: number) => axiosInstance.get<Materiel>(`/api/entreprises/materiels-by-entreprises/${id}` );
