import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VilleService } from "../../../../infrastructure/services/ville/VilleService";
import { DepartementService } from "../../../../infrastructure/services/departement/DepartementService";
import { Region } from "../../../../domain/entities/Region";
import { Ville } from "../../../../domain/entities/Ville";
import { goToListeVilles } from "../../../../shared/utils/navigation";
import { RegionService } from "../../../../infrastructure/services/region/RegionService";

const AjouterVille = () => {
  const villeService = new VilleService();
  const regionService = new RegionService();

  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

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
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setError(null);

    try {
      const nouveauVille: Ville = {
        id: 0,
        name: libelle,
        regionId: regionId!,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await villeService.create(nouveauVille);
      toast.success("Ville créé avec succès !");
      // 🔁 Attend que le toast s'affiche avant de rediriger
      setTimeout(() => {
        goToListeVilles(navigate);
      }, 1500); // attends 1.5s
    } catch (err) {
      setError("Une erreur s'est produite lors de la création du rôle.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartements();
  }, []);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Création de Ville</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="departementSelect">Région</label>
                <select
                  className="form-select"
                  id="departementSelect"
                  value={regionId ?? ""}
                  onChange={(e) => setRegionId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez une région --</option>
                  {regions.map((reg) => (
                    <option key={reg.id} value={reg.id}>
                      {(reg.name).toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="libelle" className="form-label">
                  Nom de ville
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

export default AjouterVille;
