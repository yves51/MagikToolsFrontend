export interface DomaineActivite {
  id: number;
  name: string;
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
