
import { User } from "../../entities/User";

export interface CreateUserUseCase {
  execute(data: User): Promise<void>;
}
