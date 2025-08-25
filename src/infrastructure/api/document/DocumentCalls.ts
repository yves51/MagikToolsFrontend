
import { Document } from '../../../domain/entities/Document';
import axiosInstance from "../../http/axiosInstance";



// Récupérer tous les rôles
export const fetchDocuments = () => axiosInstance.get<{ data: Document[] }>("/api/documents/index" );

// Récupérer un rôle par ID
export const fetchDocumentById = (id: number) => axiosInstance.get<Document>(`/api/documents/show/${id}` );

// Créer un rôle
export const createDocument = (formData: FormData) => {
  return axiosInstance.post(`/api/documents/store`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



// Mettre à jour un rôle
export const updateDocument = (id: number, data: FormData) => {
  return axiosInstance.put(`/api/documents/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// export const fetchDocumentsByUserId = (userId: number) => {
//   return axiosInstance.get(`/api/user/documents/${userId}`);
// };

// Supprimer un rôle
export const deleteDocument = (id: number) => axiosInstance.delete(`/api/documents/delete/${id}`, {});