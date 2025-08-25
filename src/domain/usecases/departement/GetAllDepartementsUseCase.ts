import { Departement } from "../../entities/Departement";

export interface GetAllDepartementsUseCase {
  execute(): Promise<Departement[]>;
}
