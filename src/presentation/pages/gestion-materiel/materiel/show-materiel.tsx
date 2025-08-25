import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Materiel } from "../../../../domain/entities/Materiel";
import { goToListeMateriels } from "../../../../shared/utils/navigation";


const ShowMateriel = () => {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [garantie, setGarantie] = useState("");
  const [dateInstallation, setDateInstallation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { materiel } = location.state as { materiel: Materiel };
  const { id } = useParams();

  const initialiserFormulaire = (materiel: Materiel) => {
    setNumeroSerie(materiel.numero_serie);
    setGarantie(materiel.garantie);
    setDateInstallation(materiel.dateInstallation.toString().split("T")[0]);
  };

  useEffect(() => {
    initialiserFormulaire(materiel);
  }, [id]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Detail de Materiel</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6">
              {/* Entreprise */}
              <div className="col-6">
                <label className="form-label">Entreprise</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.entreprise?.name.toUpperCase()}
                  required
                  readOnly
                />
              </div>
              <div className="col-6">
                <label className="form-label">Catégorie</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.categorie?.name.toUpperCase()}
                  required
                  readOnly
                />
              </div>

               <div className="col-6">
                <label className="form-label">Sous Catégorie</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.sousCategorie?.name.toUpperCase()}
                  required
                  readOnly
                />
              </div>
               <div className="col-6">
                <label className="form-label">Marque</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.marque?.name.toUpperCase()}
                  required
                  readOnly
                />
              </div>
               <div className="col-6">
                <label className="form-label">Modèle</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.modele?.name.toUpperCase()}
                  required
                  readOnly
                />
              </div>

              {/* Numéro série */}
              <div className="col-6">
                <label className="form-label">Numéro Série</label>
                <input
                  type="text"
                  className="form-control"
                  value={numeroSerie}
                  onChange={(e) => setNumeroSerie(e.target.value)}
                  required
                  readOnly
                />
              </div>

              {/* Date Installation */}
              <div className="col-6">
                <label className="form-label">Date Installation</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateInstallation}
                  onChange={(e) => setDateInstallation(e.target.value)}
                  required
                  readOnly
                />
              </div>

              {/* Garantie */}
              <div className="col-6">
                <label className="form-label">Garantie (Mois/Année)</label>
                <input
                  type="text"
                  className="form-control"
                  value={garantie}
                  onChange={(e) => setGarantie(e.target.value)}
                  required
                  readOnly
                />
              </div>
              <div className="col-6">
                <label className="form-label">Date de création</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.createdAt.toString().split("T")[0]}
                  onChange={(e) => setGarantie(e.target.value)}
                  required
                  readOnly
                />
              </div>

              <div className="col-6">
                <label className="form-label">Auteur de création</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.auteurCreate?.prenoms}
                  required
                  readOnly
                />
              </div>

              <div className="col-6">
                <label className="form-label">Date de modification</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.updatedAt.toString().split("T")[0]}
                  onChange={(e) => setGarantie(e.target.value)}
                  required
                  readOnly
                />
              </div>

              <div className="col-6">
                <label className="form-label">Auteur de modification</label>
                <input
                  type="text"
                  className="form-control"
                  value={materiel.auteurUpdate?.prenoms}
                  required
                  readOnly
                />
              </div>

              <div className="col-12">
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => goToListeMateriels(navigate)}
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

export default ShowMateriel;
