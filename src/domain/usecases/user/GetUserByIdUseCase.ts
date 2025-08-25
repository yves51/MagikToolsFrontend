
import { User } from "../../entities/User";

export interface GetUserByIdUseCase {
  execute(id: number): Promise<User>;
}
