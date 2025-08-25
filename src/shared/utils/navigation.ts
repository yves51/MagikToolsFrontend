import { NavigateFunction } from "react-router-dom";
import { User } from "../../domain/entities/User";
import { Role } from "../../domain/entities/Role";
import { Permission } from "../../domain/entities/Permission";
import { Fonction } from "../../domain/entities/Fonction";
import { Departement } from "../../domain/entities/Departement";
import { Document } from "../../domain/entities/Document";
import { Region } from "../../domain/entities/Region";
import { Ville } from "../../domain/entities/Ville";
import { DomaineActivite } from "../../domain/entities/DomaineActivite";
import { TypeEntreprise } from "../../domain/entities/TypeEntreprise";
import { Entreprise } from "../../domain/entities/Entreprise";
import { Marque } from "../../domain/entities/Marque";
import { Contact } from "../../domain/entities/Contact";
import { Categorie } from "../../domain/entities/Categorie";
import { SousCategorie } from "../../domain/entities/SousCategorie";
import { Modele } from "../../domain/entities/Modele";
import { Materiel } from "../../domain/entities/Materiel";
import { EtatMateriel } from "../../domain/entities/EtatMateriel";

export const goToModifierUser = (navigate: NavigateFunction, user: User) => {
  navigate("/dashboard/modifier-users", { state: { user } });
};

export const goToForgotPassword = (navigate: NavigateFunction) => { navigate("/forgot-password");};

export const goToLogin = (navigate: NavigateFunction) => { navigate("/");};


// Les routes vers la gestions roles
export const goToAjouterRoles = (navigate: NavigateFunction) => { navigate("/dashboard/ajouter-role");};
export const goToListeRoles = (navigate: NavigateFunction) => { navigate("/dashboard/liste-roles");};
export const goToModifierRole = (navigate: NavigateFunction, role: Role) => {  navigate("/dashboard/modifier-roles", { state: { role } });};
export const goToAssignerPermission = (navigate: NavigateFunction, role: Role) => {navigate("/dashboard/assigner-permission", { state: { role } });};
// Les routes vers la gestions permissions
export const goToListePermissions = (navigate: NavigateFunction) => {navigate("/dashboard/liste-permissions");};
export const goToAjouterPermissions = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-permissions");};
export const goToModifierPermissions = (navigate: NavigateFunction, permission: Permission) => { navigate("/dashboard/modifier-permission", { state: { permission } });};
// Les routes vers la gestions fonctions
export const goToListeFonctions = (navigate: NavigateFunction) => {navigate("/dashboard/liste-fonctions");};
export const goToAjouterFonctions = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-fonctions");};
export const goToModifierFonctions = (navigate: NavigateFunction, fonction: Fonction) => { navigate("/dashboard/modifier-fonctions", { state: { fonction } });};
// Les routes vers la gestions fonctions
export const goToListeUsers = (navigate: NavigateFunction) => {navigate("/dashboard/liste-users");};
export const goToAjouterUsers = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-users");};
export const goToModifierUsers = (navigate: NavigateFunction, user: User) => { navigate("/dashboard/modifier-users", { state: { user } });};
export const goToAfficherUsers = (navigate: NavigateFunction, user: User) => { navigate("/dashboard/afficher-users", { state: { user } });};
export const goToShowUsers = (navigate: NavigateFunction, user: User) => { navigate("/dashboard/show-users", { state: { user } });};

// Les routes vers la gestions documents
export const goToAjouerDocument = (navigate: NavigateFunction, user: User) => { navigate("/dashboard/ajouter-documents", { state: { user } });};
export const goToModifierDocument = ( navigate: NavigateFunction,document: Document) => {navigate("/dashboard/modifier-documents", { state: { document },});};

// Les routes vers la gestions fonctions
export const goToListeDepartements = (navigate: NavigateFunction) => {navigate("/dashboard/liste-departements");};
export const goToAjouterDepartements = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-departements");};
export const goToModifierDepartements = (navigate: NavigateFunction, departement: Departement) => { navigate("/dashboard/modifier-departements", { state: { departement } });};


// Les routes vers la gestions regions
export const goToListeRegions = (navigate: NavigateFunction) => {navigate("/dashboard/liste-regions");};
export const goToAjouterRegions = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-regions");};
export const goToModifierRegions = (navigate: NavigateFunction, region: Region) => { navigate("/dashboard/modifier-regions", { state: { region } });};

// Les routes vers la gestions regions
export const goToListeVilles = (navigate: NavigateFunction) => {navigate("/dashboard/liste-villes");};
export const goToAjouterVilles = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-villes");};
export const goToModifierVilles = (navigate: NavigateFunction, ville: Ville) => { navigate("/dashboard/modifier-villes", { state: { ville } });};

// Les routes vers la gestions regions
export const goToListeDomaineActivites = (navigate: NavigateFunction) => {navigate("/dashboard/liste-domaine-activites");};
export const goToAjouterDomaineActivites = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-domaine-activites");};
export const goToModifierDomaineActivites = (navigate: NavigateFunction, domaineActivite: DomaineActivite) => { navigate("/dashboard/modifier-domaine-activites", { state: { domaineActivite } });};

// Les routes vers la gestions regions
export const goToListeTypeEntreprises = (navigate: NavigateFunction) => {navigate("/dashboard/liste-type-entreprises");};
export const goToAjouterTypeEntreprises = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-type-entreprises");};
export const goToModifierTypeEntreprises = (navigate: NavigateFunction, typeEntreprise: TypeEntreprise) => { navigate("/dashboard/modifier-type-entreprises", { state: { typeEntreprise } });};

// Les routes vers la gestions regions
export const goToListeEntreprises = (navigate: NavigateFunction) => {navigate("/dashboard/liste-entreprises");};
export const goToAjouterEntreprises = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-entreprises");};
export const goToModifierEntreprises = (navigate: NavigateFunction, entreprise: Entreprise) => { navigate("/dashboard/modifier-entreprises", { state: { entreprise } });};
export const goToShowEntreprises = (navigate: NavigateFunction, entreprise: Entreprise) => { navigate("/dashboard/show-entreprises", { state: { entreprise } });};
// Les routes vers la gestions regions
export const goToListeCategories = (navigate: NavigateFunction) => {navigate("/dashboard/liste-categories");};
export const goToAjouterCategories = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-categories");};
export const goToModifierCategories = (navigate: NavigateFunction, categorie: Categorie) => { navigate("/dashboard/modifier-categories", { state: { categorie } });};

// Les routes vers la gestions regions
export const goToListeMarques = (navigate: NavigateFunction) => {navigate("/dashboard/liste-marques");};
export const goToAjouterMarques = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-marques");};
export const goToModifierMarques = (navigate: NavigateFunction, marque: Marque) => { navigate("/dashboard/modifier-marques", { state: { marque } });};

// export const goToListeContacts = (navigate: NavigateFunction) => {navigate("/dashboard/liste-contacts");};
export const goToListeContacts = (navigate: NavigateFunction, entreprise: Entreprise) => { navigate("/dashboard/liste-contacts", { state: { entreprise } });};
export const goToAjouterContacts = (navigate: NavigateFunction, entreprise: Entreprise) => { navigate("/dashboard/ajouter-contacts", { state: { entreprise } });};
export const goToModifierContacts = (navigate: NavigateFunction, contact: Contact) => { navigate("/dashboard/modifier-contacts", { state: { contact } });};

// Les routes vers la gestions regions
export const goToListeSousCategories = (navigate: NavigateFunction) => {navigate("/dashboard/liste-sous-categories");};
export const goToAjouterSousCategories = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-sous-categories");};
export const goToModifierSousCategories = (navigate: NavigateFunction, sousCategorie: SousCategorie) => { navigate("/dashboard/modifier-sous-categories", { state: { sousCategorie } });};

export const goToListeModeles = (navigate: NavigateFunction) => {navigate("/dashboard/liste-modeles");};
export const goToAjouterModeles = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-modeles");};
export const goToModifierModeles = (navigate: NavigateFunction, modele: Modele) => { navigate("/dashboard/modifier-modeles", { state: { modele } });};

export const goToListeMateriels = (navigate: NavigateFunction) => {navigate("/dashboard/liste-materiels");};
export const goToAjouterMateriels = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-materiels");};
export const goToModifierMateriels = (navigate: NavigateFunction, materiel: Materiel) => { navigate("/dashboard/modifier-materiels", { state: { materiel } });};
export const goToShowMateriels = (navigate: NavigateFunction, materiel: Materiel) => { navigate("/dashboard/show-materiels", { state: { materiel } });};

export const goToListeEtatMateriels = (navigate: NavigateFunction) => {navigate("/dashboard/liste-etat-materiels");};
export const goToAjouterEtatMateriels = (navigate: NavigateFunction) => {navigate("/dashboard/ajouter-etat-materiels");};
export const goToModifierEtatMateriels = (navigate: NavigateFunction, etatMateriel: EtatMateriel) => { navigate("/dashboard/modifier-etat-materiels", { state: { etatMateriel } });};


// export const goToListeMaterielsByEntreprises = (navigate: NavigateFunction) => {navigate("/dashboard/liste-materiels-by-entreprises");};
export const goToAjouterMaterielsByEntreprises = (navigate: NavigateFunction, entreprise: Entreprise) => { navigate("/dashboard/ajouter-materiels-by-entreprises", { state: { entreprise } });};
export const goToModifierMaterielsByEntreprises = (navigate: NavigateFunction, materiel: Materiel) => { navigate("/dashboard/modifier-materiels-by-entreprises", { state: { materiel } });};
export const goToShowMaterielsByEntreprises = (navigate: NavigateFunction, materiel: Materiel) => { navigate("/dashboard/show-materiels-by-entreprises", { state: { materiel } });};
export const goToListeMaterielsByEntreprises = (navigate: NavigateFunction, entreprise: Entreprise) => { navigate("/dashboard/liste-materiels-by-entreprises", { state: { entreprise } });};

