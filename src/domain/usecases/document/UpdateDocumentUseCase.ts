import { Document } from "../../entities/Document";

export interface UpdateFonctionUseCase {
  execute(id: number, data: Document): Promise<void>;
}
