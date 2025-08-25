export interface DeleteDocumentUseCase {
  execute(id: number): Promise<void>;
}
