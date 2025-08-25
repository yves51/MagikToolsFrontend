import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import {  goToListeEtatMateriels } from "../../../../shared/utils/navigation";
import { Categorie } from "../../../../domain/entities/Categorie";
import { EtatMateriel } from "../../../../domain/entities/EtatMateriel";
import { EtatMaterielService } from "../../../../infrastructure/services/etat-materiel/EtatMaterielService";

const UpdateEtatMateriel = () => {
  const etatMaterielService = new EtatMaterielService();
  const [libelle, setLibelle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { etatMateriel } = location.state as { etatMateriel: EtatMateriel };

  const initialiserFormulaire = (etatMateriel: EtatMateriel) => {
    setLibelle(etatMateriel.name);
    setDescription(etatMateriel.description);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modifierData: EtatMateriel = {
        id: etatMateriel.id,
        name: libelle,
        description: description,
        createdAt: etatMateriel.createdAt,
        updatedAt: new Date(),
      };

      await etatMaterielService.update(etatMateriel.id, modifierData); // ✅ Passer l'ID et les données
      toast.success("Etat Materiel modifié avec succès !");
      setTimeout(() => {
        goToListeEtatMateriels(navigate);
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
    if (etatMateriel) {
      initialiserFormulaire(etatMateriel);
    }
  }, [etatMateriel]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de etat materiel</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="libelle" className="form-label">
                  Nom d'etat materiel
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
              <div className="col-md-12">
                <label htmlFor="motif">Description</label>
                <textarea
                  className="form-control"
                  id="motif"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="col-12">
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => goToListeEtatMateriels(navigate)}
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

export default UpdateEtatMateriel;
