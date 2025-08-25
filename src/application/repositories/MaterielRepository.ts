import { Materiel } from "../../domain/entities/Materiel";

export interface MaterielRepository {
  create(materiel: Materiel): Promise<void>;
  getAll(): Promise<Materiel[]>;
  getById(id: number): Promise<Materiel>;
  update(id: number, materiel: Materiel): Promise<void>;
  delete(id: number): Promise<void>;
}
