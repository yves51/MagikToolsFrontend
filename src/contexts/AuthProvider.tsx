// Importation des hooks React et des types nécessaires
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AuthService } from "../infrastructure/services/auth/AuthService";
import { User } from "../domain/entities/User";

// Création d'une instance du service d'authentification
const authService = new AuthService();

// Définition du type du contexte d'authentification
type AuthContextType = {
  currentUser: User | null; // Utilisateur connecté ou null
  loading: boolean; // Indique si le chargement est en cours
};

// Création du contexte avec le type défini
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Définition des props attendues par le provider
interface AuthProviderProps {
  children: ReactNode; // Les composants enfants à englober
}

// Définition du provider d'authentification
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // État utilisateur
  const [loading, setLoading] = useState(true); // État de chargement

  // Fonction pour charger l'utilisateur courant
  const loadUser = async () => {
    try {
      const response = await authService.getCurrentUser(); // Appel API pour récupérer l'utilisateur
      console.log("information", response.user);

      setCurrentUser(response.user); // Mise à jour de l'utilisateur
    } catch (err) {
      console.error("Erreur chargement user", err); // Gestion d'erreur
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Chargement de l'utilisateur au montage du composant
  useEffect(() => {
    const isPublic = window.location.pathname.startsWith("/reset-password");
    if (!isPublic) {
      loadUser();
    } else {
      setLoading(false); // ← évite le chargement bloqué
    }
  }, []);

  // Fournit le contexte aux composants enfants
  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
