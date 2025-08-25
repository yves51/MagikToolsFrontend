import React, { useState, useEffect } from "react";
import { Role } from "../../../../domain/entities/Role";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermissionService } from "../../../../infrastructure/services/permission/PermissionService";
import { Permission } from "../../../../domain/entities/Permission";
import { goToListePermissions } from "../../../../shared/utils/navigation";

const UpdatePermission = () => {
  const permissionService = new PermissionService();
  const [libelle, setLibelle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { permission } = location.state as { permission: Permission };

  // Fonction pour initialiser les champs à partir d'une permission
  const initialiserFormulaire = (permission: Permission) => {
    setLibelle(permission.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modifierPermission: Permission = {
        id: permission.id,
        name: libelle,
        createdAt: permission.createdAt,
        updatedAt: new Date(),
      };

      await permissionService.update(permission.id, modifierPermission);
      toast.success("Permission modifiée avec succès !");
      setTimeout(() => {
        goToListePermissions(navigate);
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la modification ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission) {
     initialiserFormulaire(permission)
    }
  }, [permission]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de Rôle</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="libelle" className="form-label">
                  Libellé
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={libelle}
                  onChange={(e) => setLibelle(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                  type="button"
                    onClick={() => goToListePermissions(navigate)}
                    className="btn btn-phoenix-primary px-5"
                  >
                    Retour
                  </button>
                  <button
                    className="btn btn-primary px-5"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
      
    </>
  );
};

export default UpdatePermission;
