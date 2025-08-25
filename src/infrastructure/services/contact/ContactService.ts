
import { ContactRepository } from "../../../application/repositories/ContactRepository";
import { Contact } from "../../../domain/entities/Contact";
import * as api from "../../api/contact/ContactCalls"

export class ContactService implements ContactRepository {
  // Créer 
  async create(contact: Contact): Promise<void> {
    await api.createContact(contact);
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchContacts();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchContactById(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, contact: Contact): Promise<void> {
    await api.updateContact(id, contact);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteContact(id);
  }

    async getContactsByEntreprise(id: number): Promise<any> {
      const response = await api.getContactsByEntreprise(id);
      return response.data;
    }


}
