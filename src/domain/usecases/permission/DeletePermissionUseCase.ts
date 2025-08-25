export interface DeletePermissionUseCase {
  execute(id: number): Promise<void>;
}
