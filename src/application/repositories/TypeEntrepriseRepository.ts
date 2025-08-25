import { TypeEntreprise } from "../../domain/entities/TypeEntreprise";

export interface TypeEntrepriseRepository {
  create(role: TypeEntreprise): Promise<void>;
  getAll(): Promise<TypeEntreprise[]>;
  getById(id: number): Promise<TypeEntreprise>;
  update(id: number, typeEntreprise: TypeEntreprise): Promise<void>;
  delete(id: number): Promise<void>;
}
