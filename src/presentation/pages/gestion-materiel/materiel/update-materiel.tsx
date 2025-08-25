import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EntrepriseService } from "../../../../infrastructure/services/entreprise/EntrepriseService";
import { MaterielService } from "../../../../infrastructure/services/materiel/MaterielService";
import { CategorieService } from "../../../../infrastructure/services/categorie/CategorieService";
import { MarqueService } from "../../../../infrastructure/services/marque/MarqueService";

import { Categorie } from "../../../../domain/entities/Categorie";
import { SousCategorie } from "../../../../domain/entities/SousCategorie";
import { Marque } from "../../../../domain/entities/Marque";
import { Modele } from "../../../../domain/entities/Modele";
import { Materiel } from "../../../../domain/entities/Materiel";
import { Entreprise } from "../../../../domain/entities/Entreprise";

import { goToListeMateriels } from "../../../../shared/utils/navigation";
import { EtatMaterielService } from "../../../../infrastructure/services/etat-materiel/EtatMaterielService";
import { EtatMateriel } from "../../../../domain/entities/EtatMateriel";

const UpdateMateriel = () => {

  const materielService = new MaterielService();
  const categorieService = new CategorieService();
  const marqueService = new MarqueService();
  const entrepriseService = new EntrepriseService();
  const etatMaterielService = new EtatMaterielService();

  const [numeroSerie, setNumeroSerie] = useState("");
  const [garantie, setGarantie] = useState("");
  const [dateInstallation, setDateInstallation] = useState("");

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [selectedCategorie, setSelectedCategorie] = useState<
    number | undefined
  >(undefined);

  const [sousCategories, setSousCategories] = useState<SousCategorie[]>([]);
  const [selectedSousCategorie, setSelectedSousCategorie] = useState<
    number | undefined
  >(undefined);

  const [marques, setMarques] = useState<Marque[]>([]);
  const [selectedMarque, setSelectedMarque] = useState<number | undefined>(
    undefined
  );

  const [modeles, setModeles] = useState<Modele[]>([]);
  const [selectedModele, setSelectedModele] = useState<number | undefined>(
    undefined
  );

  const [entreprises, setEntreprises] = useState<Entreprise[]>([]);
  const [selectedEntreprise, setEntrepriseId] = useState<number | undefined>(
    undefined
  );

  const [etatMateriels, setEtatMateriels] = useState<EtatMateriel[]>([]);
  const [etatMaterielId, setEtatMaterielId] = useState<number | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { materiel } = location.state as { materiel: Materiel };

  const initialiserFormulaire = (materiel: Materiel) => {
    setNumeroSerie(materiel.numero_serie);
    setGarantie(materiel.garantie);
    setSelectedMarque(materiel.marqueId);
    setSelectedModele(materiel.modeleId);
    setSelectedCategorie(materiel.categorieId);
    setSelectedSousCategorie(materiel.sousCategorieId);
    setEntrepriseId(materiel.entrepriseId);
    setDateInstallation(materiel.dateInstallation.toString().split("T")[0]);
    setEtatMaterielId(materiel.etatMaterielId);
  };

  const loadData = async () => {
    try {
      const categoriesResponse = await categorieService.getAll();
      const marqueResponse = await marqueService.getAll();
      const entrepriseResponse = await entrepriseService.getAll();
      const etatMaterielResponse = await etatMaterielService.getAll();

      if (categoriesResponse.success) setCategories(categoriesResponse.results);
      else toast.error(categoriesResponse.errorMessage);

      if (etatMaterielResponse.success)
        setEtatMateriels(etatMaterielResponse.results);
      else toast.error(etatMaterielResponse.errorMessage);

      if (marqueResponse.success) setMarques(marqueResponse.results);
      else toast.error(marqueResponse.errorMessage);

      if (entrepriseResponse.success)
        setEntreprises(entrepriseResponse.results);
      else toast.error(entrepriseResponse.errorMessage);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des données.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const modifierData: Materiel = {
        id: materiel.id,
        numero_serie: numeroSerie,
        garantie: garantie,
        dateInstallation: dateInstallation,
        marqueId: selectedMarque,
        modeleId: selectedModele,
        etatMaterielId: etatMaterielId,
        categorieId: selectedCategorie,
        sousCategorieId: selectedSousCategorie,
        entrepriseId: selectedEntreprise,
        createdAt: materiel.createdAt,
        updatedAt: new Date(),
      };

      await materielService.update(materiel.id, modifierData); // ✅ Passer l'ID et les données
      toast.success("Materiel modifié avec succès !");
      setTimeout(() => {
        goToListeMateriels(navigate);
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

  const loadSousCategories = async (categorieId: number) => {
    if (!categorieId) return;
    try {
      const response = await materielService.getSousCategoriesByCategorie(
        categorieId
      );
      if (response.success) setSousCategories(response.results);
    } catch (err) {
      toast.error("Impossible de charger les sous-catégories");
    }
  };

  const loadModeles = async (marqueId: number) => {
    if (!marqueId) return;
    try {
      const response = await materielService.getModelesByMarque(marqueId);
      if (response.success) setModeles(response.results);
    } catch (err) {
      toast.error("Impossible de charger les modèles");
    }
  };

  useEffect(() => {
    if (materiel) {
      loadData();
      initialiserFormulaire(materiel);
    }
  }, [materiel]);

  useEffect(() => {
    if (selectedCategorie) loadSousCategories(Number(selectedCategorie));
  }, [selectedCategorie]);

  useEffect(() => {
    if (selectedMarque) loadModeles(Number(selectedMarque));
  }, [selectedMarque]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de Materiel</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              {/* Entreprise */}
              <div className="col-md-12">
                <label>Entreprise</label>
                <select
                  className="form-select"
                  value={selectedEntreprise}
                  onChange={(e) => setEntrepriseId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez --</option>
                  {entreprises.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              {/* Catégorie */}
              <div className="col-md-6">
                <label>Catégorie</label>
                <select
                  className="form-select"
                  value={selectedCategorie}
                  onChange={(e) => setSelectedCategorie(Number(e.target.value))}
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
                    setSelectedSousCategorie(Number(e.target.value))
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
                  onChange={(e) => setSelectedMarque(Number(e.target.value))}
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
                  onChange={(e) => setSelectedModele(Number(e.target.value))}
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

export default UpdateMateriel;
