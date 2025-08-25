import { DoucmentRepository } from "../../../application/repositories/DocumentRepository";
import { Document } from "../../../domain/entities/Document";

import * as api from "../../api/document/DocumentCalls";

export class DocumentService implements DoucmentRepository {
  // Créer
  // services/DocumentService.ts
  async create(document: Document): Promise<void> {
    if (!document.userId) {
      throw new Error("L'utilisateur lié au document est requis (users_id).");
    }

    const formData = new FormData();
    formData.append("fichier", document.fichier); // Assure-toi que fichier est bien un File
    formData.append("userId", String(document.userId));
    formData.append("name", document.name);
    await api.createDocument(formData); // ✅ on passe bien le FormData ici
  }

  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchDocuments();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchDocumentById(id);
    return response.data;
  }

  // Mettre à jour
  async update(id: number, document: Document): Promise<void> {
    const formData = new FormData();
    formData.append("name", document.name);
    formData.append("userId", String(document.userId));

    if (document.fichier instanceof File) {
      formData.append("fichier", document.fichier);
    }

    await api.updateDocument(id, formData);
  }

  // Supprimer
  async delete(id: number): Promise<any> {
    return await api.deleteDocument(id);
  }
}
