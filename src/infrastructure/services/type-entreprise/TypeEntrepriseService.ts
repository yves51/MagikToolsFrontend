import { TypeEntrepriseRepository } from "../../../application/repositories/TypeEntrepriseRepository";
import { TypeEntreprise } from "../../../domain/entities/TypeEntreprise";
import * as api from "../../api/type-entreprise/TypeEntrepriseCalls";

export class TypeEntrepriseService implements TypeEntrepriseRepository {
  // Créer
  async create(typeEntreprise: TypeEntreprise): Promise<void> {
    await api.createTypeEntreprise(typeEntreprise);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchTypeEntreprises();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchTypeEntrepriseById(id);
    return response.data;
  }

  // Mettre à jour
  async update(id: number, typeEntreprise: TypeEntreprise): Promise<void> {
    await api.updateTypeEntreprise(id, typeEntreprise);
  }

  // Supprimer
  async delete(id: number): Promise<any> {
    return await api.deleteTypeEntreprise(id);
  }
}
