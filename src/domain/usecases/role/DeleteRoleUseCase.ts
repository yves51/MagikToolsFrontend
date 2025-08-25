export interface DeleteRoleUseCase {
  execute(id: number): Promise<void>;
}
