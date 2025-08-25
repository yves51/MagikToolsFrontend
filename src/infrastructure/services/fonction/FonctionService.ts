
import { FonctionRepository } from "../../../application/repositories/FonctionRepository";
import { Fonction } from "../../../domain/entities/Fonction";
import * as api from "../../api/fonction/FonctionCalls"

export class FonctionService implements FonctionRepository {
  // Créer 
  async create(fonction: Fonction): Promise<void> {
    await api.createFonction(fonction);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchFonctions();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchFonctionById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, fonction: Fonction): Promise<void> {
    await api.updateFonction(id, fonction);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteFonction(id);
  }


}
