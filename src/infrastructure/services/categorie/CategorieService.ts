import { CategorieRepository } from "../../../application/repositories/CategorieRepository";
import { Categorie } from "../../../domain/entities/Categorie";
import * as api from "../../api/categorie/CategorieCalls";

export class CategorieService implements CategorieRepository {
  // Créer
  async create(categorie: Categorie): Promise<void> {
    await api.createCategorie(categorie);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchCategories();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchCategorieById(id);
    return response.data;
  }

  // Mettre à jour
  async update(id: number, categorie: Categorie): Promise<void> {
    await api.updateCategorie(id, categorie);
  }

  // Supprimer
  async delete(id: number): Promise<any> {
    return await api.deleteCategorie(id);
  }
}
