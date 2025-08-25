import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/layout/Dashboard";
import AjouterRole from "../pages/parametre/roles/add-role";
import PrivateRoute from "./PrivateRoute";
import UpdateRole from "../pages/parametre/roles/update-role";
import AjouterPermission from "../pages/parametre/permissions/add-permission";
import ListeRole from "../pages/parametre/roles/liste-roles";
import UpdatePermission from "../pages/parametre/permissions/update-permission";
import ListePermission from "../pages/parametre/permissions/liste-permissions";
import AssignerPermission from "../pages/parametre/roles/assigner-permission";
import ListeFoncton from "../pages/fonction/liste-fonctions";
import AjouterFonction from "../pages/fonction/add-fonction";
import UpdateFonction from "../pages/fonction/update-fonction";
import ListeUser from "../pages/user/liste-user";
import UpdateUser from "../pages/user/update-user";
import AjouterUser from "../pages/user/add-user";
import ListeDepartement from "../pages/departement/liste-departements";
import UpdateDepartement from "../pages/departement/update-departement";
import AjouterDepartement from "../pages/departement/add-departement";
import AfficherUser from "../pages/user/show-user";
import AjouterDocument from "../pages/user/document/add-document";
import UpdateDocument from "../pages/user/document/update-document";
import ListeDocument from "../pages/user/document/liste-documents";
import ForgotPassword from "../pages/login/forgot-password";
import ResetPassword from "../pages/login/reset-password";
import Login from "../pages/login/login";
import Profile from "../pages/profile";
import ListeRegion from "../pages/parametre/region/liste-regions";
import UpdateRegion from "../pages/parametre/region/update-region";
import AjouterRegion from "../pages/parametre/region/add-region";
import ListeVille from "../pages/parametre/ville/liste-villes";
import UpdateVille from "../pages/parametre/ville/update-ville";
import AjouterVille from "../pages/parametre/ville/add-ville";

import InformatonUser from "../pages/user/information";
import ListeDomaineActivite from "../pages/gestion-partenaire/domaine-activite/liste-domaine-activite";
import UpdateDomaineActivite from "../pages/gestion-partenaire/domaine-activite/update-domaine-activite";
import AjouterDomaineActivite from "../pages/gestion-partenaire/domaine-activite/add-domaine-activite";
import ListeTypeEntreprise from "../pages/gestion-partenaire/type-entreprise/liste-type-entreprise";
import UpdateTypeEntreprise from "../pages/gestion-partenaire/type-entreprise/update-type-entreprise";
import AjouterTypeEntreprise from "../pages/gestion-partenaire/type-entreprise/add-type-entreprise";
import ListeEntreprise from "../pages/gestion-partenaire/entreprise/liste-entreprise";
import UpdateEntreprise from "../pages/gestion-partenaire/entreprise/update-entreprise";
import AjouterEntreprise from "../pages/gestion-partenaire/entreprise/add-entreprise";
import ListeMarque from "../pages/gestion-materiel/marque/liste-marque";
import UpdateMarque from "../pages/gestion-materiel/marque/update-marque";
import AjouterMarque from "../pages/gestion-materiel/marque/add-marque";
import ShowEntreprise from "../pages/gestion-partenaire/entreprise/show-entreprise";
import ListeContact from "../pages/gestion-partenaire/contact/liste-contact";
import AjouterContact from "../pages/gestion-partenaire/contact/add-contact";
import UpdateContact from "../pages/gestion-partenaire/contact/update-contact";
import ListeCategorie from "../pages/gestion-materiel/categorie/liste-categorie";
import UpdateCategorie from "../pages/gestion-materiel/categorie/update-categorie";
import AjouterCategorie from "../pages/gestion-materiel/categorie/add-categorie";
import ListeSousCategorie from "../pages/gestion-materiel/sous-categorie/liste-sous-categorie";
import UpdateSousCategorie from "../pages/gestion-materiel/sous-categorie/update-sous-categorie";
import AjouterSousCategorie from "../pages/gestion-materiel/sous-categorie/add-sous-categorie";
import ListeModele from "../pages/gestion-materiel/modele/liste-modele";
import UpdateModele from "../pages/gestion-materiel/modele/update-modele";
import AjouterModele from "../pages/gestion-materiel/modele/add-modele";
import ListeMateriel from "../pages/gestion-materiel/materiel/liste-materiel";
import UpdateMateriel from "../pages/gestion-materiel/materiel/update-materiel";
import AjouterMateriel from "../pages/gestion-materiel/materiel/add-materiel";
import ListeEtatMateriel from "../pages/gestion-materiel/etat-materiel/liste-etat-materiel";
import UpdateEtatMateriel from "../pages/gestion-materiel/etat-materiel/update-etat-materiel";
import AjouterEtatMateriel from "../pages/gestion-materiel/etat-materiel/add-etat-materiel";
import ShowMateriel from "../pages/gestion-materiel/materiel/show-materiel";
import ListeMaterielByEntreprise from "../pages/gestion-partenaire/materiel/liste-materiel";
import UpdateMaterielByEntreprise from "../pages/gestion-partenaire/materiel/update-materiel";
import AjouterMaterielByEntreprise from "../pages/gestion-partenaire/materiel/add-materiel";
import ShowMaterielByEntreprise from "../pages/gestion-partenaire/materiel/show-materiel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="/" element={<Login />} />
      {/* Toutes les routes protégées */}
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="liste-fonctions" element={<ListeFoncton />} />
          <Route path="ajouter-fonctions" element={<AjouterFonction />} />
          <Route path="modifier-fonctions" element={<UpdateFonction />} />

          {/* route pour les permissions */}
          <Route path="liste-permissions" element={<ListePermission />} />
          <Route path="ajouter-permissions" element={<AjouterPermission />} />
          <Route path="modifier-permission" element={<UpdatePermission />} />

          {/* route pour les roles */}
          <Route path="liste-roles" element={<ListeRole />} />
          <Route path="assigner-permission" element={<AssignerPermission />} />
          <Route path="modifier-roles" element={<UpdateRole />} />
          <Route path="ajouter-role" element={<AjouterRole />} />

          {/* route pour les users */}
          <Route path="liste-users" element={<ListeUser />} />
          <Route path="modifier-users" element={<UpdateUser />} />
          <Route path="afficher-users" element={<AfficherUser />} />
          <Route path="ajouter-users" element={<AjouterUser />} />
          <Route path="show-users" element={<InformatonUser />} />


          <Route path="ajouter-documents" element={<AjouterDocument />} />
          <Route path="lister-documents" element={<ListeDocument />} />
          <Route path="modifier-documents" element={<UpdateDocument />} />

          {/* route pour les departements */}
          <Route path="liste-departements" element={<ListeDepartement />} />
          <Route path="modifier-departements" element={<UpdateDepartement />} />
          <Route path="ajouter-departements" element={<AjouterDepartement />} />

          {/* route pour les regions */}
          <Route path="liste-regions" element={<ListeRegion />} />
          <Route path="modifier-regions" element={<UpdateRegion />} />
          <Route path="ajouter-regions" element={<AjouterRegion />} />
          
          {/* route pour les regions */}
          <Route path="liste-villes" element={<ListeVille />} />
          <Route path="modifier-villes" element={<UpdateVille />} />
          <Route path="ajouter-villes" element={<AjouterVille />} />

            {/* route pour les domaines activté */}
          <Route path="liste-domaine-activites" element={<ListeDomaineActivite />} />
          <Route path="modifier-domaine-activites" element={<UpdateDomaineActivite />} />
          <Route path="ajouter-domaine-activites" element={<AjouterDomaineActivite />} />

            {/* route pour les domaines activté */}
          <Route path="liste-type-entreprises" element={<ListeTypeEntreprise />} />
          <Route path="modifier-type-entreprises" element={<UpdateTypeEntreprise />} />
          <Route path="ajouter-type-entreprises" element={<AjouterTypeEntreprise />} />

          <Route path="liste-entreprises" element={<ListeEntreprise />} />
          <Route path="modifier-entreprises" element={<UpdateEntreprise />} />
          <Route path="ajouter-entreprises" element={<AjouterEntreprise />} />
          <Route path="show-entreprises" element={< ShowEntreprise/>} />

          <Route path="liste-categories" element={<ListeCategorie />} />
          <Route path="modifier-categories" element={<UpdateCategorie />} />
          <Route path="ajouter-categories" element={<AjouterCategorie />} />

          <Route path="liste-marques" element={<ListeMarque />} />
          <Route path="modifier-marques" element={<UpdateMarque />} />
          <Route path="ajouter-marques" element={<AjouterMarque />} />

          <Route path="liste-contacts" element={<ListeContact />} />
          <Route path="modifier-contacts" element={<UpdateContact />} />
          <Route path="ajouter-contacts" element={<AjouterContact />} />

          <Route path="liste-sous-categories" element={<ListeSousCategorie />} />
          <Route path="modifier-sous-categories" element={<UpdateSousCategorie />} />
          <Route path="ajouter-sous-categories" element={<AjouterSousCategorie />} />

          <Route path="liste-modeles" element={<ListeModele />} />
          <Route path="modifier-modeles" element={<UpdateModele />} />
          <Route path="ajouter-modeles" element={<AjouterModele />} />

          <Route path="liste-materiels" element={<ListeMateriel />} />
          <Route path="modifier-materiels" element={<UpdateMateriel />} />
          <Route path="ajouter-materiels" element={<AjouterMateriel />} />
          <Route path="show-materiels" element={<ShowMateriel />} />

          <Route path="liste-etat-materiels" element={<ListeEtatMateriel />} />
          <Route path="modifier-etat-materiels" element={<UpdateEtatMateriel />} />
          <Route path="ajouter-etat-materiels" element={<AjouterEtatMateriel />} />

          <Route path="liste-materiels-by-entreprises" element={<ListeMaterielByEntreprise />} />
          <Route path="modifier-materiels-by-entreprises" element={<UpdateMaterielByEntreprise />} />
          <Route path="ajouter-materiels-by-entreprises" element={<AjouterMaterielByEntreprise />} />
          <Route path="show-materiels-by-entreprises" element={<ShowMaterielByEntreprise />} />

          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Redirection si route inconnue */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
