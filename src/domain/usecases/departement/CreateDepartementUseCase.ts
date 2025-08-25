import { Fonction } from "../../entities/Fonction";

export interface CreateDepartementUseCase {
  execute(data: Fonction): Promise<void>;
}
