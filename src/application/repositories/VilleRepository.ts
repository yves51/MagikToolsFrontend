import { Ville } from "../../domain/entities/Ville";

export interface VilleRepository {
  create(role: Ville): Promise<void>;
  getAll(): Promise<Ville[]>;
  getById(id: number): Promise<Ville>;
  update(id: number, Ville: Ville): Promise<void>;
  delete(id: number): Promise<void>;
}
