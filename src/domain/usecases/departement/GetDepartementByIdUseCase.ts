import { Departement } from "../../entities/Departement";

export interface GetDepartementByIdUseCase {
  execute(id: number): Promise<Departement>;
}
