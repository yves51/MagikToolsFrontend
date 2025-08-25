import { Fonction } from "../../entities/Fonction";

export interface GetAllFonctionsUseCase {
  execute(): Promise<Fonction[]>;
}
