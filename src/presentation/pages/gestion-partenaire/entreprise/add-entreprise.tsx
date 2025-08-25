import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EntrepriseService } from "../../../../infrastructure/services/entreprise/EntrepriseService";
import { Entreprise } from "../../../../domain/entities/Entreprise";
import { Ville } from "../../../../domain/entities/Ville";
import { TypeEntreprise } from "../../../../domain/entities/TypeEntreprise";
import { DomaineActivite } from "../../../../domain/entities/DomaineActivite";
import { DomaineActiviteService } from "../../../../infrastructure/services/domaine/DomaineActiviteService";
import { TypeEntrepriseService } from "../../../../infrastructure/services/type-entreprise/TypeEntrepriseService";
import { VilleService } from "../../../../infrastructure/services/ville/VilleService";
import { goToListeEntreprises } from "../../../../shared/utils/navigation";

const AjouterEntreprise = () => {
  const entrepriseService = new EntrepriseService();
  const villeService = new VilleService();
  const domaineActiviteService = new DomaineActiviteService();
  const typeEntrepriseService = new TypeEntrepriseService();

  const [libelle, setLibelle] = useState("");
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [villes, setVilles] = useState<Ville[]>([]);
  const [villeId, setVilleId] = useState<number | null>(null);
  const [typeEntreprises, setTypeEntreprises] = useState<TypeEntreprise[]>([]);
  const [typeEntrepriseId, setTypeEntrepriseId] = useState<number | null>(null);
  const [domaineActivites, setDomaineActivites] = useState<DomaineActivite[]>(
    []
  );
  const [domaineActiviteId, setDomaineActiviteId] = useState<number | null>(
    null
  );

  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const villesResponse = await villeService.getAll();
      const typeEntreprisesResponse = await typeEntrepriseService.getAll();
      const domaineActivitesResponse = await domaineActiviteService.getAll();

      if (villesResponse.success) setVilles(villesResponse.results);
      else toast.error(villesResponse.errorMessage);

      if (typeEntreprisesResponse.success)
        setTypeEntreprises(typeEntreprisesResponse.results);
      else toast.error(typeEntreprisesResponse.errorMessage);

      if (domaineActivitesResponse.success)
        setDomaineActivites(domaineActivitesResponse.results);
      else toast.error(domaineActivitesResponse.errorMessage);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des données.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!libelle || !villeId || !typeEntrepriseId || !domaineActiviteId || !adresse) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }
    try {
      const nouveauData: Entreprise = {
        id: 0,
        name: libelle,
        adresse:adresse,
        villeId: villeId,
        typeEntrepriseId: typeEntrepriseId,
        domaineActiviteId: domaineActiviteId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await entrepriseService.create(nouveauData);
      toast.success("Entreprise crée avec succès !");
      setTimeout(() => {
        goToListeEntreprises(navigate);
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la création de la fonction.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Création de nouveau partenaire</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="departementSelect">Type Entreprise</label>
                <select
                  className="form-select"
                  id="departementSelect"
                  value={typeEntrepriseId ?? ""}
                  onChange={(e) => setTypeEntrepriseId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez  --</option>
                  {typeEntreprises.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="libelle" className="form-label">
                  Nom de l'entreprise
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

              <div className="col-md-6">
                <label htmlFor="departementSelect">Secteur Activité</label>
                <select
                  className="form-select"
                  id="departementSelect"
                  value={domaineActiviteId ?? ""}
                  onChange={(e) => setDomaineActiviteId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez  --</option>
                  {domaineActivites.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="departementSelect">Ville</label>
                <select
                  className="form-select"
                  id="departementSelect"
                  value={villeId ?? ""}
                  onChange={(e) => setVilleId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez  --</option>
                  {villes.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="libelle" className="form-label">
                  Adresse
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => goToListeEntreprises(navigate)}
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

export default AjouterEntreprise;
