import React, { useEffect, useState } from "react";
import { Role } from "../../../domain/entities/Role";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FonctionService } from "../../../infrastructure/services/fonction/FonctionService";
import { Fonction } from "../../../domain/entities/Fonction";
import { RoleService } from "../../../infrastructure/services/role/RoleService";
import { goToListeUsers } from "../../../shared/utils/navigation";
import { UserService } from "../../../infrastructure/services/user/UserService";
import { User } from "../../../domain/entities/User";

const AjouterUser = () => {
  const fonctionService = new FonctionService();
  const roleService = new RoleService();
  const userService = new UserService();
  const navigate = useNavigate();
  const [fonctions, setFonctions] = useState<Fonction[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  // Champs du formulaire
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [adresse, setAdresse] = useState("");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [telephone, setTelephone] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [fonctionId, setFonctionId] = useState<number | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);

  const loadFonctions = async () => {
    try {
      const response = await fonctionService.getAll();
      if (response.success) {
        setFonctions(response.results);
      } else {
        toast.error(response.errorMessage);
      }
    } catch (err) {
      toast.error("Erreur lors du chargement des fonctions.");
    }
  };

  const loadRoles = async () => {
    try {
      const response = await roleService.getAll();
      if (response.success) {
        setRoles(response.results);
      } else {
        toast.error(response.errorMessage);
      }
    } catch (err) {
      toast.error("Erreur lors du chargement des rôles.");
    }
  };

  useEffect(() => {
    loadFonctions();
    loadRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(motDePasse, confirmMotDePasse);
    if (motDePasse !== confirmMotDePasse) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const nouveauUser: User = {
      id: 0,
      nom,
      prenoms,
      email,
      telephone,
      status,
      sexe,
      dateNaissance: new Date(dateNaissance), // ✅ ici
      password: motDePasse,
      confirmPassword: confirmMotDePasse,
      fonctionId: fonctionId!,
      roleId: roleId!,
      createdAt: new Date(),
      updatedAt: new Date(),
      adresse: adresse,
    };

    try {
      setLoading(true);
      await userService.create(nouveauUser); // appel API
      toast.success("Utilisateur créé avec succès !");
      setTimeout(() => {
        goToListeUsers(navigate);
      }, 2000);
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
              <h2 className="mb-4">Créer un employé</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row bg-white">
        <div className="col-xl-12">
          <form
            className="row g-3 mb-12"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
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
              <label className="form-label">Mot de passe</label>
              <input
                className="form-control"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
            </div>

            <div className="col-6">
              <label className="form-label">Confirmation du mot de passe</label>
              <input
                className="form-control"
                type="password"
                value={confirmMotDePasse}
                onChange={(e) => setConfirmMotDePasse(e.target.value)}
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
                onClick={() => navigate(-1)}
                className="btn btn-secondary me-2"
              >
                Retour
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Création en cours..." : "Créer l'utilisateur"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default AjouterUser;
