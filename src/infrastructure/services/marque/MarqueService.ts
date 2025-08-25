
import { MarqueRepository } from "../../../application/repositories/MarqueRepository";
import { Marque } from "../../../domain/entities/Marque";
import * as api from "../../api/marque/MarqueCalls"

export class MarqueService implements MarqueRepository {
  // Créer 
  async create(marque: Marque): Promise<void> {
    await api.createMarque(marque);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchMarques();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchMarqueById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, marque: Marque): Promise<void> {
    await api.updateMarque(id, marque);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteMarque(id);
  }


}
