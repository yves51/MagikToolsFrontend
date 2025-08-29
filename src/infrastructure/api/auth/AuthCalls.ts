import { LoginResponse, ResetPassword, UpdateDataUser, User, UserPhoto } from "../../../domain/entities/User";
import axios from "axios";
import axiosInstance from "../../http/axiosInstance";

// fonction pour la connexion
export const login = (email: string, password: string) =>
  axios.post<LoginResponse>( process.env.REACT_APP_URL + "/users/login", { email, password }
  );

// detail utilisateur connecté 
export const detailUserConnect = () => axiosInstance.get<{ data: User[] }>("/utilisateurs/information" );


export function handleUnauthorized() {
  window.location.href = "/"; // ou utilise un event global si tu veux éviter reload
}

export const changePassword = async (data: ResetPassword): Promise<string> => {
  const response = await axiosInstance.put('/auth/change-password', data, {});
  return response.data.message;
};

export const updateProfile = async (data: UpdateDataUser): Promise<string> => {
  const response = await axiosInstance.put('/auth/update', data, {});
  return response.data.message;
};

export const updatePhotoProfile = async (data: UserPhoto): Promise<string> => {
  const formData = new FormData();
  formData.append("photo", data.photo);
  const response = await axiosInstance.post('/auth/uploadPhoto', formData, {});
  return response.data.message;
};