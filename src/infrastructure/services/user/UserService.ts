
import { UserRepository } from "../../../application/repositories/UserRepository";
import { ResetPasswordPayload, User, UserPhoto } from "../../../domain/entities/User";
import * as api from "../../api/user/UserCalls"

export class UserService implements UserRepository {
  // Créer 
  async create(user: User): Promise<void> {
    await api.createUser(user);
  }

async forgot(data: { email: string }): Promise<void> {
  await api.forgotPassword(data);
}


  async reset(user: ResetPasswordPayload): Promise<void> {
    await api.resetPassword(user);
  }


  // Récupérer
  async getAll(): Promise<any> {
    const response = await api.fetchUsers();
    return response.data;
  }

  // Récupérer par ID
  async getById(id: number): Promise<any> {
    const response = await api.fetchUserById(id);
    return response.data;
  }

   async getDocumentsByUser(id: number): Promise<any> {
    const response = await api.getDocumentsByUser(id);
    return response.data;
  }

  async getSalairesByUser(id: number): Promise<any> {
    const response = await api.getSalairesByUser(id);
    return response.data;
  }

   async getCongesByUser(id: number): Promise<any> {
    const response = await api.getCongesByUser(id);
    return response.data;
  }

   async getContratsByUser(id: number): Promise<any> {
    const response = await api.getContratsByUser(id);
    return response.data;
  }

  // Mettre à jour 
  async update(id: number, user: User): Promise<void> {
    await api.updateUser(id, user);
  }

   async updatePhoto(id: number, user: UserPhoto): Promise<void> {
    await api.updateUserPhoto(id, user);
  }

  // Supprimer 
  async delete(id: number): Promise<any> {
   return await api.deleteUser(id);
  }


}
