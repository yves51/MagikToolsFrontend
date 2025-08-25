import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MaterielService } from "../../../../infrastructure/services/materiel/MaterielService";
import { CategorieService } from "../../../../infrastructure/services/categorie/CategorieService";
import { MarqueService } from "../../../../infrastructure/services/marque/MarqueService";

import { Categorie } from "../../../../domain/entities/Categorie";
import { SousCategorie } from "../../../../domain/entities/SousCategorie";
import { Marque } from "../../../../domain/entities/Marque";
import { Modele } from "../../../../domain/entities/Modele";
import { Materiel } from "../../../../domain/entities/Materiel";

import {
  goToListeMateriels,
  goToListeMaterielsByEntreprises,
  goToShowEntreprises,
} from "../../../../shared/utils/navigation";
import { EtatMaterielService } from "../../../../infrastructure/services/etat-materiel/EtatMaterielService";
import { EtatMateriel } from "../../../../domain/entities/EtatMateriel";
import { Entreprise } from "../../../../domain/entities/Entreprise";

const AjouterMaterielByEntreprise = () => {
  const materielService = new MaterielService();
  const categorieService = new CategorieService();
  const marqueService = new MarqueService();

  const etatMaterielService = new EtatMaterielService();

  const navigate = useNavigate();

  const [numeroSerie, setNumeroSerie] = useState("");
  const [garantie, setGarantie] = useState("");
  const [dateInstallation, setDateInstallation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { entreprise } = location.state as { entreprise: Entreprise };

  // ---- Select States ----
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [selectedCategorie, setSelectedCategorie] = useState<number | "">("");

  const [sousCategories, setSousCategories] = useState<SousCategorie[]>([]);
  const [selectedSousCategorie, setSelectedSousCategorie] = useState<
    number | ""
  >("");

  const [marques, setMarques] = useState<Marque[]>([]);
  const [selectedMarque, setSelectedMarque] = useState<number | "">("");

  const [modeles, setModeles] = useState<Modele[]>([]);
  const [selectedModele, setSelectedModele] = useState<number | "">("");

  const [etatMateriels, setEtatMateriels] = useState<EtatMateriel[]>([]);
  const [etatMaterielId, setEtatMaterielId] = useState<number | null>(null);

  // ---- Load initial data ----
  const loadData = async () => {
    try {
      const categoriesResponse = await categorieService.getAll();
      const marqueResponse = await marqueService.getAll();

      const etatMaterielResponse = await etatMaterielService.getAll();

      if (categoriesResponse.success) setCategories(categoriesResponse.results);
      else toast.error(categoriesResponse.errorMessage);

      if (etatMaterielResponse.success)
        setEtatMateriels(etatMaterielResponse.results);
      else toast.error(etatMaterielResponse.errorMessage);

      if (marqueResponse.success) setMarques(marqueResponse.results);
      else toast.error(marqueResponse.errorMessage);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des données.");
    }
  };

  const loadSousCategories = async (categorieId: number) => {
    setSousCategories([]);
    setSelectedSousCategorie("");
    if (!categorieId) return;

    setLoading(true);
    try {
      const response = await materielService.getSousCategoriesByCategorie(
        categorieId
      );
      if (response.success) {
        setSousCategories(response.results);
      } else {
        toast.error(response.errorMessage);
      }
    } catch (err) {
      console.error("Erreur chargement sous-catégories :", err);
      toast.error("Impossible de charger les sous-catégories");
    } finally {
      setLoading(false);
    }
  };

  const loadModeles = async (marqueId: number) => {
    setModeles([]);
    setSelectedModele("");
    if (!marqueId) return;

    setLoading(true);
    try {
      const response = await materielService.getModelesByMarque(marqueId);
      if (response.success) {
        setModeles(response.results);
      } else {
        toast.error(response.errorMessage);
      }
    } catch (err) {
      console.error("Erreur chargement modèles :", err);
      toast.error("Impossible de charger les modèles");
    } finally {
      setLoading(false);
    }
  };

  // ---- Submit ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !selectedMarque ||
      !selectedModele ||
      !selectedCategorie ||
      !selectedSousCategorie ||
      !etatMaterielId ||
      !numeroSerie ||
      !dateInstallation ||
      !etatMaterielId ||
      !garantie
    ) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const nouveauData: Materiel = {
        id: 0,
        numero_serie: numeroSerie,
        garantie,
        dateInstallation,
        marqueId: Number(selectedMarque),
        modeleId: Number(selectedModele),
        categorieId: Number(selectedCategorie),
        sousCategorieId: Number(selectedSousCategorie),
        entrepriseId: entreprise.id,
        etatMaterielId: etatMaterielId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await materielService.create(nouveauData);
      toast.success("Matériel créé avec succès !");
      setTimeout(() => {
        goToShowEntreprises(navigate, entreprise);
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la création du matériel.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Effects ----
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategorie) loadSousCategories(Number(selectedCategorie));
  }, [selectedCategorie]);

  useEffect(() => {
    if (selectedMarque) loadModeles(Number(selectedMarque));
  }, [selectedMarque]);

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="mb-4">Création de nouveau matériel</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-xl-12">
          <form className="row g-3 mb-6" onSubmit={handleSubmit}>
            {/* Catégorie */}
            <div className="col-md-6">
              <label>Catégorie</label>
              <select
                className="form-select"
                value={selectedCategorie}
                onChange={(e) =>
                  setSelectedCategorie(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                required
              >
                <option value="">-- Sélectionnez --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Sous Catégorie */}
            <div className="col-md-6">
              <label>Sous Catégorie</label>
              <select
                className="form-select"
                value={selectedSousCategorie}
                onChange={(e) =>
                  setSelectedSousCategorie(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                disabled={!selectedCategorie}
                required
              >
                <option value="">-- Sélectionnez --</option>
                {sousCategories.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Marque */}
            <div className="col-md-6">
              <label>Marque</label>
              <select
                className="form-select"
                value={selectedMarque}
                onChange={(e) =>
                  setSelectedMarque(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                required
              >
                <option value="">-- Sélectionnez --</option>
                {marques.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Modèle */}
            <div className="col-md-6">
              <label>Modèle</label>
              <select
                className="form-select"
                value={selectedModele}
                onChange={(e) =>
                  setSelectedModele(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                disabled={!selectedMarque}
                required
              >
                <option value="">-- Sélectionnez --</option>
                {modeles.map((mo) => (
                  <option key={mo.id} value={mo.id}>
                    {mo.name.toUpperCase()}
                  </option>
                ))}
              </select>
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
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="departementSelect">Etat Materiel</label>
              <select
                className="form-select"
                id="departementSelect"
                value={etatMaterielId ?? ""}
                onChange={(e) => setEtatMaterielId(Number(e.target.value))}
                required
              >
                <option value="">-- Sélectionnez --</option>
                {etatMateriels.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => goToShowEntreprises(navigate, entreprise)}
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
  );
};

export default AjouterMaterielByEntreprise;
