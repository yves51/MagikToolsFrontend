import { Region } from "../../entities/Region";

export interface UpdateRegionUseCase {
  execute(id: number, data: Region): Promise<void>;
}
