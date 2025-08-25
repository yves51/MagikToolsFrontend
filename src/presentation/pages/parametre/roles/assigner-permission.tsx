import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermissionService } from "../../../../infrastructure/services/permission/PermissionService";
import { Permission } from "../../../../domain/entities/Permission";
import { Role } from "../../../../domain/entities/Role";
import { goToListeRoles } from "../../../../shared/utils/navigation";

const AssignerPermission = () => {
  const permissionService = new PermissionService();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state as { role: Role };

  const loadPermissionsWithDefaults = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await permissionService.getAll();
      if (response.success) {
        setPermissions(response.results);
      } else {
        toast.error(response.errorMessage);
      }

      // Cocher les permissions déjà attribuées
      if (role && role.permissions && Array.isArray(role.permissions)) {
        const existingPermissionsIds = role.permissions.map((p) => p.id);
        setSelectedPermissions(existingPermissionsIds);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des permissions");
    } finally {
      setLoading(false);
      setPending(false);
    }
  };

  useEffect(() => {
    loadPermissionsWithDefaults();
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await permissionService.assignPermissions(role.id, selectedPermissions);
      toast.success("Permissions attribuées avec succès");
      setTimeout(() => {
        goToListeRoles(navigate);
      }, 1500);
    } catch (err) {
      toast.error("Erreur lors de l’attribution des permissions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">
          Assignation de permissions au rôle : {role.name}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="row g-3 mb-6" onSubmit={handleSubmit}>
          <div className="d-flex gap-3 flex-wrap">
            {permissions.map((permission) => (
              <div className="form-check form-check-inline" key={permission.id}>
                <input
                  className="form-check-input"
                  id={`permission-${permission.id}`}
                  type="checkbox"
                  value={permission.id}
                  checked={selectedPermissions.includes(permission.id)}
                  onChange={(e) => {
                    const id = permission.id;
                    if (e.target.checked) {
                      setSelectedPermissions([...selectedPermissions, id]);
                    } else {
                      setSelectedPermissions(
                        selectedPermissions.filter((pid) => pid !== id)
                      );
                    }
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`permission-${permission.id}`}
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>

          <div className="col-12">
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                type="button"
                onClick={() => goToListeRoles(navigate)}
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
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </>
  );
};

export default AssignerPermission;
