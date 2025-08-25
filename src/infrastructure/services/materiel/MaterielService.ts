import { MaterielRepository } from "../../../application/repositories/MaterielRepository";
import { Materiel } from "../../../domain/entities/Materiel";
import * as api from "../../api/materiel/MaterielCalls";

export class MaterielService implements MaterielRepository {
  // Créer
  async create(materiel: Materiel): Promise<void> {
    await api.createMateriel(materiel);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchMateriels();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchMaterielById(id);
    return response.data;
  }

  // Mettre à jour
  async update(id: number, materiel: Materiel): Promise<void> {
    await api.updateMateriel(id, materiel);
  }

  async getSousCategoriesByCategorie(id: number): Promise<any> {
      const response = await api.getSousCategoriesByCategorie(id);
      return response.data;
    }

    async getModelesByMarque(id: number): Promise<any> {
      const response = await api.getModelesByMarque(id);
      return response.data;
    }

     async getMaterielsByEntreprise(id: number): Promise<any> {
        const response = await api.getMaterielsByEntreprise(id);
        return response.data;
      }

  // Supprimer
  async delete(id: number): Promise<any> {
    return await api.deleteMateriel(id);
  }
}
