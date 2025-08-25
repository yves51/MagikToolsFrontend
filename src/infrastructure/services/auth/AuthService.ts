import { AuthRepository } from "../../../application/repositories/AuthRepository";
import { UpdateDataUser, User, UserPhoto } from "../../../domain/entities/User";
import * as api from "../../api/auth/AuthCalls";

export class AuthService implements AuthRepository {
  
  async login(email: string, password: string): Promise<User> {
  const response = await api.login(email, password);
  const { user, token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
  } else {
    console.warn("Token manquant dans la réponse !");
  }

  return user;
}


 async logout(): Promise<void> {
    localStorage.removeItem("token");
  }

 async getCurrentUser(): Promise<any> {
    const response = await api.detailUserConnect();
    return response.data;
  }


  async changePassword(data: { current_password: string; password: string; confirmPassword: string }): Promise<string> {
    const response = await api.changePassword(data);
    return response;
  }

  async updateProfile(data: UpdateDataUser): Promise<string> {
    const response = await api.updateProfile(data);
    return response;
  }

    async updatePhotoProfile(data: UserPhoto): Promise<string> {
    const response = await api.updatePhotoProfile(data);
    return response;
  }
}
