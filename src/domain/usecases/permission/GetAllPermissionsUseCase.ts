import { Fonction } from "../../entities/Fonction";

export interface GetAllPermissionsUseCase {
  execute(): Promise<Fonction[]>;
}
