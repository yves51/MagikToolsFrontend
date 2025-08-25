import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SousCategorieService } from "../../../../infrastructure/services/sous-categorie/SousCategorieService";
import { CategorieService } from "../../../../infrastructure/services/categorie/CategorieService";
import { Categorie } from "../../../../domain/entities/Categorie";
import { SousCategorie } from "../../../../domain/entities/SousCategorie";
import { goToListeSousCategories } from "../../../../shared/utils/navigation";

const UpdateSousCategorie = () => {
  const sousCategorieService = new SousCategorieService();
  const categorieService = new CategorieService();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [categorieId, setCategoriesId] = useState<number | undefined>(
    undefined
  );
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { sousCategorie } = location.state as { sousCategorie: SousCategorie };

  const initialiserFormulaire = (sousCategorie: SousCategorie) => {
    setLibelle(sousCategorie.name);
    setCategoriesId(sousCategorie.categorieId);
  };

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
    try {
      const modifierData: SousCategorie = {
        id: sousCategorie.id,
        name: libelle,
        createdAt: sousCategorie.createdAt,
        updatedAt: new Date(),
        categorieId: categorieId, // 🆕
      };

      await sousCategorieService.update(sousCategorie.id, modifierData); // ✅ Passer l'ID et les données
      toast.success("Poste modifié avec succès !");
      setTimeout(() => {
        goToListeSousCategories(navigate);
      }, 1500);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur s'est produite lors de la modification.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sousCategorie) {
      loadCategories();
      initialiserFormulaire(sousCategorie);
    }
  }, [sousCategorie]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de sous catégorie</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="departement" className="form-label">
                  Catégorie
                </label>
                <select
                  id="departement"
                  className="form-select"
                  value={categorieId}
                  onChange={(e) => setCategoriesId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez une catégorie --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
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

export default UpdateSousCategorie;
