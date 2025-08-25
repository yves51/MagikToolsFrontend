import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DocumentService } from "../../../../infrastructure/services/document/DocumentService";
import { Document } from "../../../../domain/entities/Document";
import { formatDateTime } from "../../../../shared/utils/date";
import { goToModifierDocument } from "../../../../shared/utils/navigation";
import { UserService } from "../../../../infrastructure/services/user/UserService";
import { User } from "../../../../domain/entities/User";

const ListeDocument = () => {
  const documentService = new DocumentService();
  const userService = new UserService();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setSelectedRowId(id);
  };
  const { user } = location.state as { user: User };

  const filteredFonctions = documents.filter((document) =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDocumentById = async (id: number) => {
    try {
      let response = await documentService.getById(id);
      if (response.success) {
        goToModifierDocument(navigate, response.results);
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle :", error);
    }
  };

  const loadDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await userService.getDocumentsByUser(user.id);
      if (response.success) {
        setDocuments(response.results);
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

  const deleteDocument = async (id: number) => {
    try {
      setPending(true);
      const response = await documentService.delete(id);
      if (response.data.success) {
        toast.success(response.data.message || "Suppression réussie.");
        setDocuments((prev) => prev.filter((p) => p.id !== id));
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
  const confirmAndDeleteDocument = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (isConfirmed) {
      await deleteDocument(id);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // ⏳ Affichage pendant le chargement
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">
          Chargement des document de {`${user.nom || ""} ${user.prenoms || ""}`}
          ...
        </p>
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
        <h2 className="text-bold text-body-emphasis mb-5">
          La liste des documents
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
                    placeholder="Rechercher une fonction"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <span className="fas fa-search search-box-icon"></span>
                </form>
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
                      Libillé
                    </th>
                    <th className="sort border-top border-translucent">
                      Auteur
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
                    <th className="sort text-end border-top border-translucent">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="list">
                  {filteredFonctions.map((doc, index) => (
                    <tr
                      key={doc.id}
                      onClick={() => handleRowClick(doc.id)}
                      className={selectedRowId === doc.id ? "selected-row" : ""}
                    >
                      <td className="align-middle ps-3">{index + 1}</td>
                      <td className="align-middle text-uppercase">
                        {doc.name}
                      </td>
                      <td className="align-middle">{doc.auteurCreate?.nom}</td>
                      <td className="align-middle">
                        {formatDateTime(doc.createdAt)}
                      </td>
                      <td className="align-middle">{doc.auteurUpdate?.nom}</td>

                      <td className="align-middle">
                        {formatDateTime(doc.updatedAt)}
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
                              onClick={() => getDocumentById(doc.id)}
                            >
                              Modifier
                            </button>
                            <a
                              className="dropdown-item"
                              href={`${process.env.REACT_APP_URL}/uploads/documents/${doc.fichier}`}
                              target="_blank"
                            >
                              Voir le fichier
                            </a>
                            <div className="dropdown-divider"></div>
                            <button
                              type="button"
                              className="dropdown-item text-danger"
                              onClick={() => confirmAndDeleteDocument(doc.id)}
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

export default ListeDocument;
