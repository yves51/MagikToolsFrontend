
import { User } from "../../entities/User";

export interface GetAllUsersUseCase {
  execute(): Promise<User[]>;
}
