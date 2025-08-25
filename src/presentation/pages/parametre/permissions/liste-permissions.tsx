import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermissionService } from "../../../../infrastructure/services/permission/PermissionService";
import { Permission } from "../../../../domain/entities/Permission";
import { goToAjouterPermissions } from "../../../../shared/utils/navigation";
const ListePermission = () => {
  const permissionService = new PermissionService();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  
  const handleRowClick = (id: number) => {
    setSelectedRowId(id);
  };
  
  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const getPermissionById = async (id: number) => {
    try {
      let response = await permissionService.getById(id);
      if (response.success) {
        navigate("/dashboard/modifier-permission", {
          state: { permission: response.results },
        });
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };


  const loadPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await permissionService.getAll();
      if (response.success) {
        setPermissions(response.results);
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

  // Fonction de suppression
const deletePermission = async (id: number) => {
  try {
    setPending(true);
    const response = await permissionService.delete(id);

    if (response.data.success) {
      toast.success(response.data.message || "Suppression réussie.");
      setPermissions((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast.error(response.data.message || "Erreur lors de la suppression.");
    }
  } catch (err: any) {
    console.error(err);

    // 🔎 Extraire le message du backend si disponible
    const errorMessage =
      err.response?.data?.message || "Une erreur s'est produite.";
    toast.error(errorMessage);
  } finally {
    setPending(false);
  }
};


  // Fonction de confirmation
  const confirmAndDeletePermission = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (isConfirmed) {
      await deletePermission(id);
    }
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  // ⏳ Affichage pendant le chargement
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement des permissions...</p>
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
              <Link to="/dashboard/liste-permissions">Permissions</Link>
            </li>
            <li className="breadcrumb-item active">Permissions</li>
          </ol>
        </nav>
        <h2 className="text-bold text-body-emphasis mb-5">
          La liste des Permissions
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
                    placeholder="Rechercher une permission"
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
                  onClick={() => goToAjouterPermissions(navigate)}
                  className="btn btn-primary"
                >
                  <span className="fas fa-plus me-2"></span>
                  Ajouter une permission
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
                      Date Création
                    </th>
                    <th className="sort border-top border-translucent">
                      Auteur
                    </th>
                    <th className="sort border-top border-translucent">
                      Date Modification
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
                  {filteredPermissions.map((permission, index) => (
                    <tr 
                      key={permission.id}
                      onClick={() => handleRowClick(permission.id)}
                      className={
                        selectedRowId === permission.id ? "selected-row" : ""
                      }
                    >
                      <td className="align-middle ps-3">{index + 1}</td>
                      <td className="align-middle">{permission.name}</td>
                     
                      <td className="align-middle">
                        {new Date(permission.createdAt).toLocaleString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          }
                        )}
                      </td>
                       <td className="align-middle">{permission.auteurCreate?.prenoms}</td>
                      <td className="align-middle">
                        {new Date(permission.updatedAt).toLocaleString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          }
                        )}
                      </td>
                       <td className="align-middle">{permission.auteurUpdate?.prenoms}</td>
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
                            {/* <a className="dropdown-item" href="#!">
                              Voir
                            </a> */}
                            <button
                              className="dropdown-item"
                              onClick={() => getPermissionById(permission.id)}
                            >
                              Modifier
                            </button>
                            <div className="dropdown-divider"></div>
                            <button
                              type="button"
                              className="dropdown-item text-danger"
                              onClick={() =>
                                confirmAndDeletePermission(permission.id)
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

export default ListePermission;
