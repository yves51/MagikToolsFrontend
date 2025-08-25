import { SousCategorieRepository } from "../../../application/repositories/SousCategorieRepository";
import { SousCategorie } from "../../../domain/entities/SousCategorie";
import * as api from "../../api/sous-categorie/SousCategorieCalls"

export class SousCategorieService implements SousCategorieRepository {
  // Créer 
  async create(sousCategorie: SousCategorie): Promise<void> {
    await api.createSousCategorie(sousCategorie);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchSousCategories();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchSousCategorieById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, sousCategorie: SousCategorie): Promise<void> {
    await api.updateSousCategorie(id, sousCategorie);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteSousCategorie(id);
  }


}
