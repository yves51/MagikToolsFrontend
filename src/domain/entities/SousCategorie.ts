import { Categorie } from "./Categorie";

export interface SousCategorie {
  id: number;
  name: string;
  categorieId?: number;
  categorie?: Categorie;
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
