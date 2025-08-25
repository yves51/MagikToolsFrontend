import { Fonction } from "../../entities/Fonction";

export interface UpdatePermissionUseCase {
  execute(id: number, data: Fonction): Promise<void>;
}
