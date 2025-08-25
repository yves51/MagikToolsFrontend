import { Categorie } from "./Categorie";
import { Entreprise } from "./Entreprise";
import { EtatMateriel } from "./EtatMateriel";
import { Marque } from "./Marque";
import { Modele } from "./Modele";
import { SousCategorie } from "./SousCategorie";

export interface Materiel {
  id: number;
  numero_serie: string;
  garantie: string;
  dateInstallation: string;
  marqueId?: number;
  marque?: Marque;

  modeleId?: number;
  modele?: Modele;

  etatMaterielId?: number;
  etatMateriel?: EtatMateriel;

  categorieId?: number;
  categorie?: Categorie;

  sousCategorieId?: number;
  sousCategorie?: SousCategorie;

  entrepriseId?: number;
  entreprise?: Entreprise;

  createdAt: Date;
  updatedAt: Date;
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
  // éventuellement d'autres propriétés
}
