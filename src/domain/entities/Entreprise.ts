import { DomaineActivite } from "./DomaineActivite";
import { TypeEntreprise } from "./TypeEntreprise";
import { Ville } from "./Ville";

export interface Entreprise {
  id: number;
  name: string;
  adresse : string;
  matricule? : string;

  villeId?: number;
  ville?: Ville;

  typeEntrepriseId?: number;
  typeEntreprise?: TypeEntreprise;

  domaineActiviteId?: number;
  domaineActivite?: DomaineActivite;
  
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
