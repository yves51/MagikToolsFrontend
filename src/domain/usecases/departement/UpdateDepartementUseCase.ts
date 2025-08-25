import { Departement } from "../../entities/Departement";

export interface UpdateDepartementUseCase {
  execute(id: number, data: Departement): Promise<void>;
}
