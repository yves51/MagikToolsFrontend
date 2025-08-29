
import { Materiel } from '../../../domain/entities/Materiel';
import { Modele } from '../../../domain/entities/Modele';
import { SousCategorie } from '../../../domain/entities/SousCategorie';
import axiosInstance from "../../http/axiosInstance";

// Récupérer tous les rôles
export const fetchMateriels = () => axiosInstance.get<{ data: Materiel[] }>("/materiels/index" );

// Récupérer un rôle par ID
export const fetchMaterielById = (id: number) => axiosInstance.get<Materiel>(`/materiels/show/${id}` );

// Créer un rôle
export const createMateriel = (data: Materiel) => axiosInstance.post("/materiels/store", data);

// Mettre à jour un rôle
export const updateMateriel = (id: number, data: Materiel) => axiosInstance.put(`/materiels/update/${id}`, data);

// Supprimer un rôle
export const deleteMateriel = (id: number) => axiosInstance.delete(`/materiels/delete/${id}`, {});

// Récupérer un rôle par ID
export const getSousCategoriesByCategorie = (id: number) => axiosInstance.get<SousCategorie>(`/materiels/sous-categories/categorie/${id}` );

export const getModelesByMarque = (id: number) => axiosInstance.get<Modele>(`/materiels/modeles/marque/${id}` );

export const getMaterielsByEntreprise = (id: number) => axiosInstance.get<Materiel>(`/entreprises/materiels-by-entreprises/${id}` );
