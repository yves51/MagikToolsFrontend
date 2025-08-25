import { Fonction } from "../../entities/Fonction";

export interface CreateFonctionUseCase {
  execute(data: Fonction): Promise<void>;
}
