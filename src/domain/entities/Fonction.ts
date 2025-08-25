import { Departement } from "./Departement";

export interface Fonction {
  id: number;
  name: string;
  departementId?: number;
  departement?: Departement;
  createdAt : Date;
  updatedAt : Date;
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
  // éventuellement d'autres propriétés
}
