import { SousCategorie } from "../../domain/entities/SousCategorie";

export interface SousCategorieRepository {
  create(role: SousCategorie): Promise<void>;
  getAll(): Promise<SousCategorie[]>;
  getById(id: number): Promise<SousCategorie>;
  update(id: number, sousCategorie: SousCategorie): Promise<void>;
  delete(id: number): Promise<void>;
}
