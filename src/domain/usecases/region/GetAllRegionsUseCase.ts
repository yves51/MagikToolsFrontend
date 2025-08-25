import { Region } from "../../entities/Region";

export interface GetAllRegionsUseCase {
  execute(): Promise<Region[]>;
}
