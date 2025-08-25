import { Categorie } from "../../domain/entities/Categorie";


export interface CategorieRepository {
  create(role: Categorie): Promise<void>;
  getAll(): Promise<Categorie[]>;
  getById(id: number): Promise<Categorie>;
  update(id: number, categorie: Categorie): Promise<void>;
  delete(id: number): Promise<void>;
}
