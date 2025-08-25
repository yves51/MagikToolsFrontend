import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { goToListeCategories } from "../../../../shared/utils/navigation";
import { Categorie } from "../../../../domain/entities/Categorie";
import { CategorieService } from "../../../../infrastructure/services/categorie/CategorieService";

const UpdateCategorie = () => {
  const categorieService = new CategorieService();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { categorie } = location.state as { categorie: Categorie };

  const initialiserFormulaire = (categorie: Categorie) => {
    setLibelle(categorie.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modifierCategorie: Categorie = {
        id: categorie.id,
        name: libelle,
        createdAt: categorie.createdAt,
        updatedAt: new Date(),
      };

      await categorieService.update(categorie.id, modifierCategorie); // ✅ Passer l'ID et les données
      toast.success("Catégorie modifié avec succès !");
      setTimeout(() => {
        goToListeCategories(navigate);
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
    if (categorie) {
      initialiserFormulaire(categorie);
    }
  }, [categorie]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de Catégorie</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="libelle" className="form-label">
                  Nom de la Catégorie
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
                    onClick={() => goToListeCategories(navigate)}
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

export default UpdateCategorie;
