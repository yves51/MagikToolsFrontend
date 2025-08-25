import { Entreprise } from "../../domain/entities/Entreprise";

export interface EntrepriseRepository  {
  create(role: Entreprise): Promise<void>;
  getAll(): Promise<Entreprise[]>;
  getById(id: number): Promise<Entreprise>;
  update(id: number, entreprise: Entreprise): Promise<void>;
  delete(id: number): Promise<void>;
}
