export interface DeleteFonctionUseCase {
  execute(id: number): Promise<void>;
}
