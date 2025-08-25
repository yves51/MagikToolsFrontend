
import { Region } from "../../domain/entities/Region";

export interface RegionRepository {
  create(role: Region): Promise<void>;
  getAll(): Promise<Region[]>;
  getById(id: number): Promise<Region>;
  update(id: number, region: Region): Promise<void>;
  delete(id: number): Promise<void>;
}
