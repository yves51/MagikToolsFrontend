import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FonctionService } from "../../../infrastructure/services/fonction/FonctionService";
import { Fonction } from "../../../domain/entities/Fonction";
import { goToListeFonctions } from "../../../shared/utils/navigation";
import { DepartementService } from "../../../infrastructure/services/departement/DepartementService";
import { Departement } from "../../../domain/entities/Departement";

const AjouterFonction = () => {
  const fonctionService = new FonctionService();
  const departementService = new DepartementService();

  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [departementId, setDepartementId] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const loadDepartements = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await departementService.getAll();
      if (response.success) {
        setDepartements(response.results);
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

    if (!libelle || !departementId) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }
    try {
      const nouveauFonction: Fonction = {
        id: 0,
        name: libelle,
        departementId: departementId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await fonctionService.create(nouveauFonction);
      toast.success("Poste crée avec succès !");
      setTimeout(() => {
        goToListeFonctions(navigate);
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la création de la fonction.");
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
        <h2 className="mb-4">Création de Poste</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="departementSelect">Département</label>
                <select
                  className="form-select"
                  id="departementSelect"
                  value={departementId ?? ""}
                  onChange={(e) => setDepartementId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez un département --</option>
                  {departements.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="libelle" className="form-label">
                  Nom de poste
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
                    onClick={() => goToListeFonctions(navigate)}
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

export default AjouterFonction;
