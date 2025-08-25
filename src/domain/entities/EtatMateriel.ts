export interface EtatMateriel {
  id: number;
  name: string;
  description: string;
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
