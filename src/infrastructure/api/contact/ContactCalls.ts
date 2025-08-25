

import { Contact } from "../../../domain/entities/Contact";
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchContacts = () => axiosInstance.get<{ data: Contact[] }>("/api/contacts/index" );

// Récupérer 
export const fetchContactById = (id: number) => axiosInstance.get<Contact>(`/api/contacts/show/${id}` );

// Créer 
export const createContact = (data: Contact) => axiosInstance.post("/api/contacts/store", data);

export const getContactsByEntreprise = (id: number) => axiosInstance.get<Contact>(`/api/contacts/contact-by-entreprise/${id}` );
// Mettre à jour 
export const updateContact = (id: number, data: Contact) => axiosInstance.put(`/api/contacts/update/${id}`, data);

// Supprimer 
export const deleteContact = (id: number) => axiosInstance.delete(`/api/contacts/delete/${id}`, {});