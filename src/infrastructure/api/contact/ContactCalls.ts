

import { Contact } from "../../../domain/entities/Contact";
import axiosInstance from "../../http/axiosInstance";

// Récupérer 
export const fetchContacts = () => axiosInstance.get<{ data: Contact[] }>("/contacts/index" );

// Récupérer 
export const fetchContactById = (id: number) => axiosInstance.get<Contact>(`/contacts/show/${id}` );

// Créer 
export const createContact = (data: Contact) => axiosInstance.post("/contacts/store", data);

export const getContactsByEntreprise = (id: number) => axiosInstance.get<Contact>(`/contacts/contact-by-entreprise/${id}` );
// Mettre à jour 
export const updateContact = (id: number, data: Contact) => axiosInstance.put(`/contacts/update/${id}`, data);

// Supprimer 
export const deleteContact = (id: number) => axiosInstance.delete(`/contacts/delete/${id}`, {});