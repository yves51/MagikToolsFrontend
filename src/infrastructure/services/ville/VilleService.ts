
import { FonctionRepository } from "../../../application/repositories/FonctionRepository";
import { VilleRepository } from "../../../application/repositories/VilleRepository";
import { Fonction } from "../../../domain/entities/Fonction";
import { Ville } from "../../../domain/entities/Ville";
import * as api from "../../api/ville/VilleCalls"

export class VilleService implements VilleRepository {
  // Créer 
  async create(ville: Ville): Promise<void> {
    await api.createVille(ville);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchVilles();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchVilleById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, ville: Ville): Promise<void> {
    await api.updateVille(id, ville);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteVille(id);
  }


}
