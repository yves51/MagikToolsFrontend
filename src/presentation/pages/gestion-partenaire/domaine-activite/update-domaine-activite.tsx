import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DomaineActiviteService } from "../../../../infrastructure/services/domaine/DomaineActiviteService";
import { DomaineActivite } from "../../../../domain/entities/DomaineActivite";
import { goToListeDomaineActivites } from "../../../../shared/utils/navigation";

const UpdateDomaineActivite = () => {
  const domaineActiviteService = new DomaineActiviteService();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { domaineActivite } = location.state as { domaineActivite: DomaineActivite };

  const initialiserFormulaire = (domaineActivite: DomaineActivite) => {
    setLibelle(domaineActivite.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modifierDomaineActivite: DomaineActivite = {
        id: domaineActivite.id,
        name: libelle,
        createdAt: domaineActivite.createdAt,
        updatedAt: new Date(),
      };

      await domaineActiviteService.update(domaineActivite.id, modifierDomaineActivite); // ✅ Passer l'ID et les données
      toast.success("Domaine Activité modifié avec succès !");
      setTimeout(() => {
        goToListeDomaineActivites(navigate);
      }, 1500);
    } catch (err: any) {
      console.error("Erreur de création :", err);
      const message =
        err?.response?.data?.message ||
        "Une erreur s'est produite lors de la création du rôle.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (domaineActivite) {
      initialiserFormulaire(domaineActivite);
    }
  }, [domaineActivite]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de secteur activité</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="libelle" className="form-label">
                  Nom du secteur activité
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
                    onClick={() => goToListeDomaineActivites(navigate)}
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

export default UpdateDomaineActivite;
