import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SousCategorieService } from "../../../../infrastructure/services/sous-categorie/SousCategorieService";
import { CategorieService } from "../../../../infrastructure/services/categorie/CategorieService";
import { Categorie } from "../../../../domain/entities/Categorie";
import { SousCategorie } from "../../../../domain/entities/SousCategorie";
import { goToListeSousCategories } from "../../../../shared/utils/navigation";

const AjouterSousCategorie = () => {
  const sousCategorieService = new SousCategorieService();
  const categorieService = new CategorieService();

  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [categorieId, setCategorieId] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await categorieService.getAll();
      if (response.success) {
        setCategories(response.results);
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

    if (!libelle || !categorieId) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }
    try {
      const nouveauData: SousCategorie = {
        id: 0,
        name: libelle,
        categorieId: categorieId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await sousCategorieService.create(nouveauData);
      toast.success("Sous Catégorie crée avec succès !");
      setTimeout(() => {
        goToListeSousCategories(navigate);
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la création de la fonction.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Création de sous catégorie</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="departementSelect">Catégorie</label>
                <select
                  className="form-select"
                  id="departementSelect"
                  value={categorieId ?? ""}
                  onChange={(e) => setCategorieId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez une catégorie --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="libelle" className="form-label">
                  Nom de sous catégorie
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
                    onClick={() => goToListeSousCategories(navigate)}
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

export default AjouterSousCategorie;
