import { Entreprise } from "./Entreprise";

export interface Contact {
  id: number;
  nom: string;
  prenoms: string;
  fonction: string;
  email: string;
  telephone: string;
  entrepriseId?: number;
  entreprise?: Entreprise;
  createdAt: Date;
  updatedAt: Date;
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
