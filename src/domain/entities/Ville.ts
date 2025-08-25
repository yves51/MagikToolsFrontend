import { Region } from "./Region";

export interface Ville {
  id: number;
  name: string;
  regionId?: number;
  region?: Region;
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
}
