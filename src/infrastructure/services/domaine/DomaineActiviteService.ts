import { DomaineActiviteRepository } from "../../../application/repositories/DomaineActiviteRepository";
import { DomaineActivite } from "../../../domain/entities/DomaineActivite";
import * as api from "../../api/domaine/DmaineActiviteCalls";

export class DomaineActiviteService implements DomaineActiviteRepository {
  // Créer
  async create(domaineActivite: DomaineActivite): Promise<void> {
    await api.createDomaineActivite(domaineActivite);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchDomaineActivites();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchDomaineActiviteById(id);
    return response.data;
  }

  // Mettre à jour
  async update(id: number, domaineActivite: DomaineActivite): Promise<void> {
    await api.updateDomaineActivite(id, domaineActivite);
  }

  // Supprimer
  async delete(id: number): Promise<any> {
    return await api.deleteDomaineActivite(id);
  }
}
