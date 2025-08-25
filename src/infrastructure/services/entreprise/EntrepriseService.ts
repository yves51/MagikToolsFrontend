
import { EntrepriseRepository } from "../../../application/repositories/EntrepriseRepository";
import { Entreprise } from "../../../domain/entities/Entreprise";
import * as api from "../../api/entreprise/EntrepriseCalls"

export class EntrepriseService implements EntrepriseRepository {
  // Créer 
  async create(entreprise: Entreprise): Promise<void> {
    await api.createEntreprise(entreprise);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchEntreprises();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchEntrepriseById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, entreprise: Entreprise): Promise<void> {
    await api.updateEntreprise(id, entreprise);
  }
 

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteEntreprise(id);
  }


}
