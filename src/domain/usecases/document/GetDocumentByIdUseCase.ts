import { Document } from "../../entities/Document";



export interface GetDocumentByIdUseCase {
  execute(id: number): Promise<Document>;
}
