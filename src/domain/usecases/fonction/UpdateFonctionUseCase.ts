import { Fonction } from "../../entities/Fonction";

export interface UpdateFonctionUseCase {
  execute(id: number, data: Fonction): Promise<void>;
}
