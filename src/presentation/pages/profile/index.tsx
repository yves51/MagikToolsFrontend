import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../contexts/AuthProvider";
import { UpdateDataUser, User, UserPhoto } from "../../../domain/entities/User";
import { UserService } from "../../../infrastructure/services/user/UserService";
import ChangePasswordForm from "./change-password";
import EditProfileForm from "./change-data-user";
import EditPhotoForm from "./change-photo";

const Profile = () => {
  const { currentUser } = useAuth();

  const userService = new UserService();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);
  const { currentUser: userFromContext } = useAuth(); // <- celui du contexte
  const [currentUsers, setCurrentUser] = useState<UpdateDataUser | null>(
    userFromContext
  );
  const [currentUserPhoto, setCurrentUserPhoto] = useState<UserPhoto | null>(
    null
  );

  // <- version modifiable localement

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await userService.getAll();
      if (response.success) {
        setUsers(response.results);
      } else {
        toast.error(response.errorMessage);
      }
      setPending(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ⏳ Affichage pendant le chargement
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement des données...</p>
      </div>
    );
  }

  // ❌ Affichage en cas d'erreur
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <section className="pt-5 pb-9">
        <div className="container-small">
          <div className="row align-items-center justify-content-between g-3 mb-4">
            <div className="col-auto">
              <h2 className="mb-0">Profile</h2>
            </div>
            <div className="col-auto">
              <div className="row g-2 g-sm-3">
                <div className="col-auto">
                  <button
                    className="btn btn-phoenix-warning"
                    onClick={() => setShowPhotoForm((v) => !v)}
                  >
                    <span className="fas fa-edit me-2"></span>
                    Mise à jour du photo
                  </button>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-phoenix-primary"
                    onClick={() => setShowDataForm((v) => !v)}
                  >
                    <span className="fas fa-edit me-2"></span>
                    Mise à jour du profile
                  </button>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-phoenix-secondary"
                    onClick={() => setShowPasswordForm((v) => !v)}
                  >
                    <span className="fas fa-key me-2"></span>
                    Modifier le mot de passe
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showPhotoForm && currentUser && (
            <EditPhotoForm
              currentUser={currentUser}
              onUpdated={(updatedUser) => setCurrentUserPhoto(updatedUser)}
              onCancel={() => setShowPhotoForm(false)}
            />
          )}

          {showPasswordForm && (
            <ChangePasswordForm onCancel={() => setShowPasswordForm(false)} />
          )}
          {showDataForm && currentUser && (
            <EditProfileForm
              currentUser={currentUser}
              onUpdated={(updatedUser) => setCurrentUser(updatedUser)}
              onCancel={() => setShowDataForm(false)}
            />
          )}

          {currentUser && (
            <div className="row g-3 mb-6">
              <div className="col-12 col-lg-8">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="border-bottom border-dashed pb-4">
                      <div className="row align-items-center g-3 g-sm-5 text-center text-sm-start">
                        <div className="col-12 col-sm-auto">
                          <input className="d-none" id="avatarFile" />
                          <label
                            className="cursor-pointer avatar avatar-5xl"
                            htmlFor="avatarFile"
                          >
                            <img
                              className="rounded-circle"
                              src={`${process.env.REACT_APP_URL}/${currentUser.photo}`}
                              alt={`${currentUser.nom ?? ""} ${
                                currentUser.prenoms ?? ""
                              }`}
                            />
                          </label>
                        </div>
                        <div className="col-12 col-sm-auto flex-1">
                          <h3>{currentUser.nom}</h3>
                          <p className="text-body-secondary text-uppercase">
                            {currentUser.prenoms}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-between-center pt-4">
                      <div>
                        <h6 className="mb-2 text-body-secondary">
                          Departement
                        </h6>
                        <h4 className="fs-7 text-body-highlight mb-0">
                          {currentUser.fonction?.departement?.name}
                        </h4>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-2 text-body-secondary">Fonction</h6>
                        <h4 className="fs-7 text-body-highlight mb-0">
                          {currentUser.fonction?.name}
                        </h4>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-2 text-body-secondary">Rôle</h6>
                        <h4 className="fs-7 text-body-highlight mb-0">
                          {currentUser.role?.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="border-bottom border-dashed">
                      <h4 className="mb-3">
                        Informations
                        <button className="btn btn-link p-0" type="button">
                          <span className="fas fa-edit fs-9 ms-3 text-body-quaternary"></span>
                        </button>
                      </h4>
                    </div>
                    <div className="pt-4 mb-7 mb-lg-4 mb-xl-7">
                      <div className="row justify-content-between">
                        <div className="col-auto">
                          <h5 className="text-body-highlight">Adresse</h5>
                        </div>
                        <div className="col-auto">
                          <p className="text-body-secondary">
                            {currentUser.adresse}
                          </p>
                        </div>
                      </div>
                      <div className="row justify-content-between">
                        <div className="col-auto">
                          <h5 className="text-body-highlight">Date service</h5>
                        </div>
                        <div className="col-auto">
                          <p className="text-body-secondary">
                            <p className="text-body-secondary">
                              {/* {new Date(
                                currentUser.datePriseService
                              ).toLocaleDateString("fr-FR")} */}
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-top border-dashed pt-4">
                      <div className="row flex-between-center mb-2">
                        <div className="col-auto">
                          <h5 className="text-body-highlight mb-0">Email</h5>
                        </div>
                        <div className="col-auto">
                          <a>{currentUser.email}</a>
                        </div>
                      </div>
                      <div className="row flex-between-center">
                        <div className="col-auto">
                          <h5 className="text-body-highlight mb-0">Contact</h5>
                        </div>
                        <div className="col-auto">
                          <a>{currentUser.telephone}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ...le reste du contenu (onglets, tables, etc.) */}
        </div>
        {/* end of .container */}
      </section>
    </>
  );
};

export default Profile;
