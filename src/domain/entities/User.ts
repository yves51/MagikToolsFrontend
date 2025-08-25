import { Fonction } from "./Fonction";
import { Role } from "./Role";

export interface User {
  id: number;
  nom: string;
  prenoms: string;
  email: string;
  sexe: 'homme' | 'femme'; // pour plus de clarté et de sécurité
  telephone: string;
  dateNaissance: Date; // ou Date, mais string est plus sûr en JSON
  roleId: number;
  fonctionId: number;
  password?: string; // facultatif si jamais tu ne le renvoies pas côté backend
  createdAt : Date;
  updatedAt : Date;
  fonction?: Fonction;
  role?: Role;
  photo?: string;
  confirmPassword?: string;
  adresse: string;
  status :string
  auteurCreate?: {
    nom: string;
    email: string;
    prenoms:string;
  };
  auteurUpdate?: {
    nom: string;
    email: string;
    prenoms:string;

  };

   auteurDelete?: {
    nom: string;
    email: string;
    prenoms:string;

  };
}


export interface UserPhoto {
   photo: File;
}


export interface LoginResponse {
  user: User;
  token: string;
}


export interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

export interface ResetPassword {
 current_password: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateDataUser {
  nom : string;
  prenoms: string;
  email: string;
  telephone: string;
  dateNaissance: Date; 
  adresse: string;
}


