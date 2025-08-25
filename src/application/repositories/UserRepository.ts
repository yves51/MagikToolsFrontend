
import { User } from "../../domain/entities/User";

export interface UserRepository {
  create(role: User): Promise<void>;
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  update(id: number, user: User): Promise<void>;
  delete(id: number): Promise<void>;
}
