import { EtatMateriel } from "../../domain/entities/EtatMateriel";

export interface EtatMaterielRepository {
  create(role: EtatMateriel): Promise<void>;
  getAll(): Promise<EtatMateriel[]>;
  getById(id: number): Promise<EtatMateriel>;
  update(id: number, etatMateriel: EtatMateriel): Promise<void>;
  delete(id: number): Promise<void>;
}
