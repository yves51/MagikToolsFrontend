import { Marque } from "./Marque";

export interface Modele {
  id: number;
  name: string;
  marqueId?: number;
  marque?: Marque;
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
