import axios from "axios";
import {
  ResetPasswordPayload,
  User,
  UserPhoto,
} from "../../../domain/entities/User";
import axiosInstance from "../../http/axiosInstance";
// import axiosInstance from "../../../shared/utils/axiosInstance";

// Récupérer tous les rôles
export const fetchUsers = () =>
  axiosInstance.get<{ data: User[] }>("/api/utilisateurs/index");

// Récupérer un rôle par ID
export const fetchUserById = (id: number) =>
  axiosInstance.get<User>(`/api/utilisateurs/show/${id}`);

// Créer un rôle
export const createUser = (data: User) =>
  axiosInstance.post("/api/utilisateurs/store", data);

export const updateUser = (id: number, data: User) =>
  axiosInstance.put(`/api/utilisateurs/update/${id}`, data);
// Supprimer un rôle
export const deleteUser = (id: number) =>
  axiosInstance.delete(`/api/utilisateurs/delete/${id}`, {});

// export const forgotPassword = (data: { email: string }) => axiosInstance.post("/api/users/forgot-password", data);
export const forgotPassword = (data: { email: string }) =>
  axios.post(`${process.env.REACT_APP_URL}/api/users/forgot-password`, data);

// export const resetPassword = (data: ResetPasswordPayload) =>
//   axios.post(`${process.env.REACT_APP_URL}/api/users/reset-password/${data.token}`, data);

export const resetPassword = (data: ResetPasswordPayload) =>
  axios.post(
    `${process.env.REACT_APP_URL}/api/users/reset-password/${data.token}`,
    {
      password: data.password,
      confirmPassword: data.confirmPassword,
    }
  );

export const getDocumentsByUser = (id: number) =>
  axiosInstance.get<User>(`/api/utilisateurs/document-by-user/${id}`);

export const getSalairesByUser = (id: number) =>
  axiosInstance.get<User>(`/api/utilisateurs/salaire-by-user/${id}`);
export const getCongesByUser = (id: number) =>
  axiosInstance.get<User>(`/api/utilisateurs/conge-by-user/${id}`);

export const getContratsByUser = (id: number) =>
  axiosInstance.get<User>(`/api/utilisateurs/contrat-by-user/${id}`);
// Mettre à jour un rôle
export const updateUserPhoto = (id: number, data: UserPhoto) => {
  const formData = new FormData();
  formData.append("photo", data.photo);
  return axiosInstance.post(`/api/utilisateurs/upload-photo/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
