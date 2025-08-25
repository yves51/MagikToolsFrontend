import { Fonction } from "../../domain/entities/Fonction";

export interface FonctionRepository {
  create(role: Fonction): Promise<void>;
  getAll(): Promise<Fonction[]>;
  getById(id: number): Promise<Fonction>;
  update(id: number, fonction: Fonction): Promise<void>;
  delete(id: number): Promise<void>;
}
