import axios from "axios";
import { toast } from "react-toastify";
import { getRedirectAdapter } from "../adapters/RedirectAdapter";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
    withCredentials: true,
});

// Intercepteur pour ajouter automatiquement le token à chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // toast.error("Votre session a expiré. Veuillez vous reconnecter.");
//       const redirect = getRedirectAdapter();
//       if (redirect) {
//         redirect.redirectToLogin(); // ✅ React router navigation
//       } else {
//         window.location.href = "/"; // fallback (reload)
//         toast.error("Votre session a expiré. Veuillez vous reconnecter.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const currentPath = window.location.pathname;

    // 🚨 Si on est sur une page publique comme reset-password, ne redirige pas
    const isPublicRoute = currentPath.startsWith("/reset-password");

    if (error.response?.status === 401 && !isPublicRoute) {
      const redirect = getRedirectAdapter();
      if (redirect) {
        redirect.redirectToLogin();
      } else {
        window.location.href = "/";
        toast.error("Votre session a expiré. Veuillez vous reconnecter.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
