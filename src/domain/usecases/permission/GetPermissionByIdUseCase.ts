import { Fonction } from "../../entities/Fonction";

export interface GetPermissionByIdUseCase {
  execute(id: number): Promise<Fonction>;
}
