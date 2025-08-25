import { Marque } from "../../domain/entities/Marque";


export interface MarqueRepository {
  create(role: Marque): Promise<void>;
  getAll(): Promise<Marque[]>;
  getById(id: number): Promise<Marque>;
  update(id: number, marque: Marque): Promise<void>;
  delete(id: number): Promise<void>;
}
