import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TypeEntrepriseService } from "../../../../infrastructure/services/type-entreprise/TypeEntrepriseService";
import { TypeEntreprise } from "../../../../domain/entities/TypeEntreprise";
import { goToAjouterTypeEntreprises, goToModifierTypeEntreprises } from "../../../../shared/utils/navigation";

const ListeTypeEntreprise = () => {
  const typeEntrepriseService = new TypeEntrepriseService();
  const [typeEntreprises, setTypeEntreprises] = useState<TypeEntreprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  
    const handleRowClick = (id: number) => {
      setSelectedRowId(id);
    };

  const filteredTypeEntreprises = typeEntreprises.filter((typeEntreprise) =>
    typeEntreprise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeEntrepriseById = async (id: number) => {
    try {
      let response = await typeEntrepriseService.getById(id);
      if (response.success) {
        goToModifierTypeEntreprises(navigate, response.results)
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle :", error);
    }
  };

  const loadTypeEntreprises = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await typeEntrepriseService.getAll();
      if (response.success) {
        setTypeEntreprises(response.results);
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

    const deleteTypeEntreprise = async (id: number) => {
      try {
        setPending(true);
        const response = await typeEntrepriseService.delete(id);
        if (response.data.success) {
          toast.success(response.data.message || "Suppression réussie.");
          setTypeEntreprises((prev) => prev.filter((p) => p.id !== id));
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
  const confirmAndDeleteTypeEntreprise = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (isConfirmed) {
      await deleteTypeEntreprise(id);
    }
  };

    useEffect(() => {
    loadTypeEntreprises();
  }, []);

  // ⏳ Affichage pendant le chargement
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement des secteurs d'activités...</p>
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
              <Link to="/dashboard/liste-departements">Types Entréprises</Link>
            </li>
            <li className="breadcrumb-item active">Types Entréprises</li>
          </ol>
        </nav>
        <h2 className="text-bold text-body-emphasis mb-5">La liste des Types Entréprises</h2>
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
                    placeholder="Rechercher un secteur"
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
                <button onClick={() => goToAjouterTypeEntreprises(navigate)} className="btn btn-primary">
                  <span className="fas fa-plus me-2"></span>
                  Ajouter un Type Entréprise
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
                      Libellé
                    </th>
                    <th className="sort border-top border-translucent">
                      Date création
                    </th>
                    <th className="sort border-top border-translucent">
                      Auteur
                    </th>
                    <th className="sort border-top border-translucent">
                      Date modification
                    </th>
                    <th className="sort border-top border-translucent">
                      Auteur
                    </th>
                    <th className="sort text-end border-top border-translucent">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="list">
                  {filteredTypeEntreprises.map((typeEntreprise, index) => (
                    <tr 
                      key={typeEntreprise.id}
                      onClick={() => handleRowClick(typeEntreprise.id)}
                      className={
                        selectedRowId === typeEntreprise.id ? "selected-row" : ""
                      }
                      >
                      <td className="align-middle ps-3">{index + 1}</td>
                      <td className="align-middle">{typeEntreprise.name.toUpperCase()}</td>
                      <td className="align-middle">
                        {new Date(typeEntreprise.createdAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="align-middle">{typeEntreprise.auteurCreate?.prenoms}</td>
                      <td className="align-middle">
                        {new Date(typeEntreprise.updatedAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="align-middle">{typeEntreprise.auteurUpdate?.prenoms}</td>

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
                              onClick={() => getTypeEntrepriseById(typeEntreprise.id)}
                            >
                              Modifier
                            </button>
                            <div className="dropdown-divider"></div>
                             <button
                              type="button"
                              className="dropdown-item text-danger"
                              onClick={() =>
                                confirmAndDeleteTypeEntreprise(typeEntreprise.id)
                              }
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

export default ListeTypeEntreprise;
