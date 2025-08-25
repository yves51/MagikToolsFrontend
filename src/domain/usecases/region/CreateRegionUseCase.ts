import { Region } from "../../entities/Region";

export interface CreateRegionUseCase {
  execute(data: Region): Promise<void>;
}
