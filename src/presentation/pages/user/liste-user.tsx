import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserService } from "../../../infrastructure/services/user/UserService";
import { User } from "../../../domain/entities/User";
import {
  goToAfficherUsers,
  goToAjouerDocument,
  goToAjouterUsers,
  goToModifierUser,
  goToShowUsers,
} from "../../../shared/utils/navigation";

const ListeUser = () => {
  const userService = new UserService();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setSelectedRowId(id);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fonction?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fonction?.departement?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getUserById = async (id: number) => {
    try {
      let response = await userService.getById(id);
      if (response.success) {
        goToModifierUser(navigate, response.results);
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };
  

  const afficherUser = async (id: number) => {
    try {
      let response = await userService.getById(id);
      if (response.success) {
        goToAfficherUsers(navigate, response.results);
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  const showUserByInformation = async (id: number) => {
    try {
      let response = await userService.getById(id);
      if (response.success) {
        goToShowUsers(navigate, response.results);
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  const ajouterDocumentUser = async (id: number) => {
    try {
      let response = await userService.getById(id);
      if (response.success) {
        goToAjouerDocument(navigate, response.results);
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

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

  const deleteUser = async (id: number) => {
    try {
      setPending(true);
      const response = await userService.delete(id);
      if (response.data.success) {
        toast.success(response.data.message || "Suppression réussie.");
        setUsers((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(response.data.message || "Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur s'est produite.");
    } finally {
      setPending(false);
    }
  };

  // Fonction de confirmation avant suppression
  const confirmAndDeleteUser = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (isConfirmed) {
      await deleteUser(id);
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
        <p className="mt-3">Chargement des employés...</p>
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
      <div className="bg-white p-4 rounded shadow-sm">
        <nav className="mb-3" aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/dashboard/liste-user">Utilisateurs</Link>
            </li>
            <li className="breadcrumb-item active">Utilisateurs</li>
          </ol>
        </nav>
        <h2 className="text-bold text-body-emphasis mb-5">
          La liste des Utilisateurs
        </h2>
        <div
          id="members"
          data-list='{"valueNames":["name","email","mobile_number","city","last_active","joined"],"page":10,"pagination":true}'
        >
          <div className="row align-items-center justify-content-between g-3 mb-4">
            <div className="col col-auto">
              <div className="search-box">
                <form className="position-relative">
                  <input
                    className="form-control search-input search"
                    type="search"
                    placeholder="Rechercher un utilisateur"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <span className="fas fa-search search-box-icon"></span>
                </form>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex align-items-center">
                <button className="btn btn-link text-body me-4 px-0">
                  <span className="fa-solid fa-file-export fs-9 me-2"></span>
                  Exporter
                </button>
                <button
                  onClick={() => goToAjouterUsers(navigate)}
                  className="btn btn-primary"
                >
                  <span className="fas fa-plus me-2"></span>
                  Ajouter un utilisateur
                </button>
              </div>
            </div>
          </div>
          {/* ajouter-role */}
          <div
            id="tableExample"
            data-list='{"valueNames":["name","email","age"],"page":5,"pagination":true}'
          >
            <div className="table-responsive">
              <table className="table table-sm fs-9 mb-0">
                <thead>
                  <tr>
                    <th className="sort border-top border-translucent ps-3">
                      #
                    </th>
                    <th className="sort border-top border-translucent">
                      Photo
                    </th>
                    <th className="sort border-top border-translucent">
                      Nom et Prénoms
                    </th>
                    <th className="sort border-top border-translucent">
                      Email
                    </th>
                    <th className="sort border-top border-translucent">
                      Contact
                    </th>
                    <th className="sort border-top border-translucent">
                      Fonction
                    </th>
                    <th className="sort border-top border-translucent">
                      Departement
                    </th>
                    <th className="sort border-top border-translucent">
                      Status
                    </th>
                    <th className="sort text-end border-top border-translucent">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="list">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      onClick={() => handleRowClick(user.id)}
                      className={
                        selectedRowId === user.id ? "selected-row" : ""
                      }
                    >
                      <td className="align-middle ps-3">{index + 1}</td>
                      <td className="align-middle white-space-nowrap py-0">
                        <img
                          src={`${process.env.REACT_APP_URL}/${user.photo}`}
                          alt={`${user.nom} ${user.prenoms}`}
                          width="53"
                          height="53"
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      </td>
                      <td className="align-middle">{`${user.nom || ""} ${
                        user.prenoms || ""
                      }`}</td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">{user.telephone}</td>
                      <td className="align-middle">{user.fonction?.name}</td>
                      <td className="align-middle">
                        {user.fonction?.departement?.name}
                      </td>
                      {/* <td className="align-middle">{formatNombre(user.salaireActuel?.montant) }</td> */}
                      <td className="align-middle">
                        {user.status === "terminé" && (
                          <span className="badge bg-warning text-dark">
                            Terminé
                          </span>
                        )}
                        {user.status === "actif" && (
                          <span className="badge bg-success">Actif</span>
                        )}
                        {user.status === "suspendu" && (
                          <span className="badge bg-danger">Suspendu</span>
                        )}
                      </td>
                      <td className="align-middle text-end">
                        <div className="btn-reveal-trigger position-static">
                          <button
                            className="btn btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            ⋮
                          </button>
                          <div className="dropdown-menu dropdown-menu-end py-2">
                            <button
                              className="dropdown-item"
                              onClick={() => showUserByInformation(user.id)}
                            >
                              Information
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => afficherUser(user.id)}
                            >
                              Voir
                            </button>

                            <button
                              className="dropdown-item"
                              onClick={() => ajouterDocumentUser(user.id)}
                            >
                              Document
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => getUserById(user.id)}
                            >
                              Modifier
                            </button>
                            <div className="dropdown-divider"></div>
                            <button
                              type="button"
                              className="dropdown-item text-danger"
                              onClick={() => confirmAndDeleteUser(user.id)}
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </>
  );
};

export default ListeUser;
