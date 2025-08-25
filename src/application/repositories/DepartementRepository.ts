import { Departement } from "../../domain/entities/Departement";

export interface DepartementRepository {
  create(role: Departement): Promise<void>;
  getAll(): Promise<Departement[]>;
  getById(id: number): Promise<Departement>;
  update(id: number, departement: Departement): Promise<void>;
  delete(id: number): Promise<void>;
}
