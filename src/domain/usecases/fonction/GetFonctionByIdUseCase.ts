import { Fonction } from "../../entities/Fonction";

export interface GetFonctionByIdUseCase {
  execute(id: number): Promise<Fonction>;
}
