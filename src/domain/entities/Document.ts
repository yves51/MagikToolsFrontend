import { User } from "./User";

export interface Document {
  id: number;
  name: string;
  fichier: File;
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  auteurCreate?: {
    nom: string;
    email: string;
    prenoms: string;
  };
  auteurUpdate?: {
    nom: string;
    email: string;
    prenoms: string;
  };

  auteurDelete?: {
    nom: string;
    email: string;
    prenoms: string;
  };
}
