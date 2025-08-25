
import { User } from "../../entities/User";

export interface UpdateUserUseCase {
  execute(id: number, data: User): Promise<void>;
}
