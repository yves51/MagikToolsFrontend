export interface DeleteDepartementUseCase {
  execute(id: number): Promise<void>;
}
