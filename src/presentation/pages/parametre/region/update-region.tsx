import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegionService } from "../../../../infrastructure/services/region/RegionService";
import { Region } from "../../../../domain/entities/Region";
import { goToListeRegions } from "../../../../shared/utils/navigation";

const UpdateRegion = () => {
  const regionService = new RegionService();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { region } = location.state as { region: Region };

   const initialiserFormulaire = (region: Region) => {
      setLibelle(region.name);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modifierRegion: Region = {
        id: region.id,
        name: libelle,
        createdAt: region.createdAt,
        updatedAt: new Date(),
      };

      await regionService.update(region.id, modifierRegion);
      toast.success("Région modifiée avec succès !");
      setTimeout(() => {
        goToListeRegions(navigate)
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la modification.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (region) {
    initialiserFormulaire(region)
  }
}, [region]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de Région</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="libelle" className="form-label">
                  Nom du région
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
                  onClick={() => goToListeRegions(navigate)}
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

export default UpdateRegion;
