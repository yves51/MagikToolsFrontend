import { Contact } from "../../domain/entities/Contact";


export interface ContactRepository {
  create(role: Contact): Promise<void>;
  getAll(): Promise<Contact[]>;
  getById(id: number): Promise<Contact>;
  update(id: number, contact: Contact): Promise<void>;
  delete(id: number): Promise<void>;
}
