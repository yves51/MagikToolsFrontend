import { Region } from "../../entities/Region";

export interface GetRegionByIdUseCase {
  execute(id: number): Promise<Region>;
}
