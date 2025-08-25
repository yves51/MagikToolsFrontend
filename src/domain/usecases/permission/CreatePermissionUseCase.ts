import { Fonction } from "../../entities/Fonction";

export interface CreatePermissionUseCase {
  execute(data: Fonction): Promise<void>;
}
