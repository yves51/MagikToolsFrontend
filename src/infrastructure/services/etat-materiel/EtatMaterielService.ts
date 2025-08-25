import { EtatMaterielRepository } from "../../../application/repositories/EtatMaterielRepository";
import { EtatMateriel } from "../../../domain/entities/EtatMateriel";
import * as api from "../../api/etat-materiel/EtatMaterielCalls";

export class EtatMaterielService implements EtatMaterielRepository {
  // Créer
  async create(etatMateriel: EtatMateriel): Promise<void> {
    await api.createEtatMateriel(etatMateriel);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchEtatMateriels();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchEtatMaterielById(id);
    return response.data;
  }

  // Mettre à jour
  async update(id: number, etatMateriel: EtatMateriel): Promise<void> {
    await api.updateEtatMateriel(id, etatMateriel);
  }

  // Supprimer
  async delete(id: number): Promise<any> {
    return await api.deleteEtatMateriel(id);
  }
}
