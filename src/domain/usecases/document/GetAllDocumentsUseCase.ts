import { Document } from "../../entities/Document";

export interface GetAllDocumentsUseCase {
  execute(): Promise<Document[]>;
}
