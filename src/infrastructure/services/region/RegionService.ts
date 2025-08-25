import { RegionRepository } from "../../../application/repositories/RegionRepository";
import { Region } from "../../../domain/entities/Region";
import * as api from "../../api/region/RegionCalls";

export class RegionService implements RegionRepository {
  // Créer
  async create(region: Region): Promise<void> {
    await api.createRegion(region);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchRegions();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchRegionById(id);
    return response.data;
  }

  // Mettre à jour
  async update(id: number, region: Region): Promise<void> {
    await api.updateRegion(id, region);
  }

  // Supprimer
  async delete(id: number): Promise<any> {
    return await api.deleteRegion(id);
  }
}
