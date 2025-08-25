import { Document } from "../../domain/entities/Document";

export interface DoucmentRepository {
  create(document: Document): Promise<void>;
  getAll(): Promise<Document[]>;
  getById(id: number): Promise<Document>;
  update(id: number, document: Document): Promise<void>;
  delete(id: number): Promise<void>;
}
