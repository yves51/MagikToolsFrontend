import { Permission } from "./Permission";
import { User } from "./User";

export interface Role {
  id: number;
  name: string;
  createdAt : Date;
  updatedAt : Date;
  permissions?: Permission[];
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
