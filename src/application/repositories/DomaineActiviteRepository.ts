import { DomaineActivite } from "../../domain/entities/DomaineActivite";

export interface DomaineActiviteRepository {
  create(role: DomaineActivite): Promise<void>;
  getAll(): Promise<DomaineActivite[]>;
  getById(id: number): Promise<DomaineActivite>;
  update(id: number, domaine: DomaineActivite): Promise<void>;
  delete(id: number): Promise<void>;
}
