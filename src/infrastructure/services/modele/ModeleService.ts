import { ModeleRepository } from "../../../application/repositories/ModeleRepository";
import { Modele } from "../../../domain/entities/Modele";
import * as api from "../../api/modele/ModeleCalls"

export class ModeleService implements ModeleRepository {
  // Créer 
  async create(modele: Modele): Promise<void> {
    await api.createModele(modele);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchModeles();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchModeleById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, modele: Modele): Promise<void> {
    await api.updateModele(id, modele);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteModele(id);
  }


}
