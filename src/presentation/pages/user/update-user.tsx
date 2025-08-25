import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FonctionService } from "../../../infrastructure/services/fonction/FonctionService";
import { RoleService } from "../../../infrastructure/services/role/RoleService";
import { UserService } from "../../../infrastructure/services/user/UserService";

import { goToListeUsers } from "../../../shared/utils/navigation";
import { Fonction } from "../../../domain/entities/Fonction";
import { Role } from "../../../domain/entities/Role";
import { User } from "../../../domain/entities/User";

const ModifierUser = () => {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const navigate = useNavigate();
  const fonctionService = new FonctionService();
  const roleService = new RoleService();
  const userService = new UserService();

  const [fonctions, setFonctions] = useState<Fonction[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  // Champs du formulaire
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [telephone, setTelephone] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [fonctionId, setFonctionId] = useState<number | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  const location = useLocation();
  const [photo, setPhoto] = useState<File | null>(null);
  const { user } = location.state as { user: User };

  const loadFonctions = async () => {
    try {
      const response = await fonctionService.getAll();
      if (response.success) setFonctions(response.results);
      else toast.error(response.errorMessage);
    } catch {
      toast.error("Erreur lors du chargement des fonctions.");
    }
  };

  const loadRoles = async () => {
    try {
      const response = await roleService.getAll();
      if (response.success) setRoles(response.results);
      else toast.error(response.errorMessage);
    } catch {
      toast.error("Erreur lors du chargement des rôles.");
    }
  };

  const loadUser = async () => {
    try {
      const response = await userService.getById(Number(id));
      if (response.success) {
        const user = response.results;
        setNom(user.nom);
        setPrenoms(user.prenoms);
        setEmail(user.email);
        setStatus(user.status);
        setTelephone(user.telephone);
        setAdresse(user.adresse);
        setSexe(user.sexe);
        setDateNaissance(user.dateNaissance.toISOString().split("T")[0]);
        setFonctionId(user.fonctionId);
        setRoleId(user.roleId);
      } else {
        toast.error("Utilisateur introuvable.");
      }
    } catch {
      toast.error("Erreur lors du chargement de l'utilisateur.");
    }
  };

  const handleSubmitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      toast.error("Veuillez sélectionner une photo.");
      return;
    }

    try {
      setLoading(true);
      // Ici tu envoies un objet conforme à UserPhoto
      await userService.updatePhoto(user.id, { photo });
      toast.success("Photo envoyée avec succès !");
      setTimeout(() => {
        goToListeUsers(navigate);
      }, 2000);
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        toast.error(error.response.data.message || "Erreur de validation.");
      } else {
        toast.error("Erreur lors de la modification");
      }
    } finally {
      setLoading(false);
    }
  };

  const initialiserFormulaire = (user: User) => {
    setNom(user.nom);
    setPrenoms(user.prenoms);
    setEmail(user.email);
    setStatus(user.status);
    setTelephone(user.telephone);
  
    setAdresse(user.adresse);
    setSexe(user.sexe);
    setDateNaissance(new Date(user.dateNaissance).toISOString().split("T")[0]);
    setFonctionId(user.fonctionId);
    setRoleId(user.roleId);
  };

  useEffect(() => {
    loadFonctions();
    loadRoles();
    initialiserFormulaire(user);
    if (id) loadUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      id: user.id,
      nom,
      prenoms,
      email,
      telephone,
      sexe,
      adresse,
      status,
      dateNaissance: new Date(dateNaissance),
      fonctionId: fonctionId!,
      roleId: roleId!,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };

    try {
      setLoading(true);
      await userService.update(user.id, updatedUser);
      toast.success("Utilisateur modifié avec succès !");
      setTimeout(() => goToListeUsers(navigate), 2000);
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 409 || status === 422) {
          toast.error(message || "Erreur de validation.");
        } else {
          toast.error("Erreur lors de la création de l'utilisateur.");
        }
      } else {
        toast.error("Erreur de connexion au serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-bottom border-translucent mb-7 mx-n3 px-2 mx-lg-n6 px-lg-6">
        <div className="row">
          <div className="col-xl-9">
            <div className="d-sm-flex justify-content-between">
              <h2 className="mb-4">Modifier un employé</h2>
            </div>
          </div>
        </div>
      </div>
      {/* modification des données   */}
      <div className="row bg-white">
        <div className="col-xl-12">
          <form className="row g-3 mb-12" onSubmit={handleSubmit}>
            <div className="col-6">
              <label className="form-label">Nom</label>
              <input
                className="form-control"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>

            <div className="col-6">
              <label className="form-label">Prénoms</label>
              <input
                className="form-control"
                value={prenoms}
                onChange={(e) => setPrenoms(e.target.value)}
                required
              />
            </div>

            <div className="col-6">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-6">
              <label className="form-label">Téléphone</label>
              <input
                className="form-control"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label">Adresse</label>
              <input
                className="form-control"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label">Date de naissance</label>
              <input
                className="form-control"
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                required
              />
            </div>
            
            <div className="col-6">
              <label className="form-label">Sexe</label>
              <select
                className="form-select"
                value={sexe}
                onChange={(e) => setSexe(e.target.value as "homme" | "femme")}
                required
              >
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
             <div className="col-md-6">
              <label htmlFor="status">Statut</label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="actif">Actif</option>
                <option value="suspendu">Suspendu</option>
                <option value="terminé">Terminé</option>
              </select>
            </div>
          

            <div className="col-6">
              <label className="form-label">Poste</label>
              <select
                className="form-select"
                value={fonctionId ?? ""}
                onChange={(e) => setFonctionId(Number(e.target.value))}
                required
              >
                <option value="">-- Sélectionnez un Poste --</option>
                {fonctions.map((fonct) => (
                  <option key={fonct.id} value={fonct.id}>
                    {fonct.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6">
              <label className="form-label">Rôle</label>
              <select
                className="form-select"
                value={roleId ?? ""}
                onChange={(e) => setRoleId(Number(e.target.value))}
                required
              >
                <option value="">-- Sélectionnez un rôle --</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 d-flex justify-content-end mt-6">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => goToListeUsers(navigate)}
              >
                Retour
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Modification en cours..."
                  : "Modifier l'utilisateur"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ajout de photo */}
      <div className="mb-7 mx-n3 px-2 mx-lg-n6 px-lg-6"></div>
      <div className="row bg-white">
        <div className="col-xl-12">
          <form
            className="row g-3 mb-12"
            onSubmit={handleSubmitPhoto}
            encType="multipart/form-data"
          >
            <div className="col-12">
              <label className="form-label">Photo</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPhoto(file);
                }}
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-end mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Modification en cours..." : "Enrégistrement"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default ModifierUser;
