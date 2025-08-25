// Importation des hooks et outils nécessaires
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setRedirectAdapter } from "../../infrastructure/adapters/RedirectAdapter";

// Définition du type du contexte de redirection
type RedirectContextType = {
  redirectToLogin: () => void; // Fonction pour rediriger vers la page de login
};

// Création du contexte avec le type défini
const RedirectContext = createContext<RedirectContextType | undefined>(undefined);

// Provider qui englobe les enfants et fournit la fonction de redirection
export const RedirectProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate(); // Hook pour naviguer entre les routes

  // Fonction de redirection vers la page de login
  const redirectToLogin = () => {
    navigate("/"); // Redirige vers la racine ou "/login" selon la route souhaitée
  };

  // Enregistre la fonction de redirection dans un adapter global pour l'utiliser ailleurs
  useEffect(() => {
    setRedirectAdapter({ redirectToLogin });
  }, []);

  // Fournit la fonction de redirection via le contexte
  return (
    <RedirectContext.Provider value={{ redirectToLogin }}>
      {children}
    </RedirectContext.Provider>
  );
};

// Hook personnalisé pour accéder à la fonction de redirection
export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error("useRedirect must be used within a RedirectProvider");
  }
  return context;
};