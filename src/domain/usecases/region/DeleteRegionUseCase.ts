export interface DeleteRegionUseCase {
  execute(id: number): Promise<void>;
}
