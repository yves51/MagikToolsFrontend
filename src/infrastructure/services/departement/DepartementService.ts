
import { DepartementRepository } from "../../../application/repositories/DepartementRepository";
import { Departement } from "../../../domain/entities/Departement";
import * as api from "../../api/departement/DepartementCalls"

export class DepartementService implements DepartementRepository {
  // Créer 
  async create(departement: Departement): Promise<void> {
    await api.createDepartement(departement);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchDepartements();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchDepartementById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, departement: Departement): Promise<void> {
    await api.updateDepartement(id, departement);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteDepartement(id);
  }


}
