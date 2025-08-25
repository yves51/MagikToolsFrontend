// import { Document } from "../../entities/Doucment";

import { Document } from "../../entities/Document";

export interface CreateDocumentUseCase {
  execute(data: Document): Promise<void>;
}
