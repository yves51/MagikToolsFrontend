import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegionService } from "../../../../infrastructure/services/region/RegionService";
import { goToListeRegions } from "../../../../shared/utils/navigation";
import { Region } from "../../../../domain/entities/Region";

const AjouterRegion = () => {
  const regionService = new RegionService();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setError(null);

    try {
      const nouveauRegions: Region = {
        id: 0,
        name: libelle,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await regionService.create(nouveauRegions);
      toast.success("Région créé avec succès !");
      setTimeout(() => {
       goToListeRegions(navigate)
      }, 1500); // attends 1.5s
    } catch (err) {
      setError("Une erreur s'est produite lors de la création .");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Création de Région</h2>
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

export default AjouterRegion;
