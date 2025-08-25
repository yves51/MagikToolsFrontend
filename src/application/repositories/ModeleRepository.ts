import { Modele } from "../../domain/entities/Modele";


export interface ModeleRepository {
  create(role: Modele): Promise<void>;
  getAll(): Promise<Modele[]>;
  getById(id: number): Promise<Modele>;
  update(id: number, modele: Modele): Promise<void>;
  delete(id: number): Promise<void>;
}
