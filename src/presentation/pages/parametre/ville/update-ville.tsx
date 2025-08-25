import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VilleService } from "../../../../infrastructure/services/ville/VilleService";
import { RegionService } from "../../../../infrastructure/services/region/RegionService";
import { Region } from "../../../../domain/entities/Region";
import { goToListeVilles } from "../../../../shared/utils/navigation";
import { Ville } from "../../../../domain/entities/Ville";

const UpdateVille = () => {
  const villeService = new VilleService();
  const regionService = new RegionService();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [regionId, setRegionId] = useState<number | undefined>(
    undefined
  );
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { ville } = location.state as { ville: Ville };

  const initialiserFormulaire = (ville: Ville) => {
    setLibelle(ville.name);
    setRegionId(ville.regionId);
  };

  const loadDepartements = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await regionService.getAll();
      if (response.success) {
        setRegions(response.results);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modifierVille: Ville = {
        id: ville.id,
        name: libelle,
        createdAt: ville.createdAt,
        updatedAt: new Date(),
        regionId: regionId, // 🆕
      };

      await villeService.update(ville.id, modifierVille); // ✅ Passer l'ID et les données
      toast.success("Ville modifié avec succès !");
      setTimeout(() => {
       goToListeVilles(navigate);
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la modification.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ville) {
      loadDepartements();
      initialiserFormulaire(ville);
    }
  }, [ville]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de Fonction</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="departement" className="form-label">
                  Département
                </label>
                <select
                  id="departement"
                  className="form-select"
                  value={regionId}
                  onChange={(e) => setRegionId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez un département --</option>
                  {regions.map((reg) => (
                    <option key={reg.id} value={reg.id}>
                      {(reg.name).toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="libelle" className="form-label">
                  Nom de fonction
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
                    onClick={() => goToListeVilles(navigate)}
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

export default UpdateVille;
