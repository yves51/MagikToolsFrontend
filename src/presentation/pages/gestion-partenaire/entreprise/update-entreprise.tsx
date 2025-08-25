import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EntrepriseService } from "../../../../infrastructure/services/entreprise/EntrepriseService";
import { VilleService } from "../../../../infrastructure/services/ville/VilleService";
import { DomaineActiviteService } from "../../../../infrastructure/services/domaine/DomaineActiviteService";
import { TypeEntrepriseService } from "../../../../infrastructure/services/type-entreprise/TypeEntrepriseService";
import { Ville } from "../../../../domain/entities/Ville";
import { TypeEntreprise } from "../../../../domain/entities/TypeEntreprise";
import { DomaineActivite } from "../../../../domain/entities/DomaineActivite";
import { Entreprise } from "../../../../domain/entities/Entreprise";
import { goToListeEntreprises } from "../../../../shared/utils/navigation";

const UpdateEntreprise = () => {
  const entrepriseService = new EntrepriseService();
  const villeService = new VilleService();
  const domaineActiviteService = new DomaineActiviteService();
  const typeEntrepriseService = new TypeEntrepriseService();

  const [libelle, setLibelle] = useState("");
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [villes, setVilles] = useState<Ville[]>([]);
  const [villeId, setVilleId] = useState<number | undefined>(undefined);
  const [typeEntreprises, setTypeEntreprises] = useState<TypeEntreprise[]>([]);
  const [typeEntrepriseId, setTypeEntrepriseId] = useState<number | undefined>(undefined);
  const [domaineActivites, setDomaineActivites] = useState<DomaineActivite[]>([]);
  const [domaineActiviteId, setDomaineActiviteId] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const location = useLocation();
  const { entreprise } = location.state as { entreprise: Entreprise };

  const initialiserFormulaire = (entreprise: Entreprise) => {
    setLibelle(entreprise.name);
    setAdresse(entreprise.adresse);
    setDomaineActiviteId(entreprise.domaineActiviteId);
    setVilleId(entreprise.villeId);
    setTypeEntrepriseId(entreprise.typeEntrepriseId);

  };

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
    try {
      const modifierData: Entreprise = {
        id: entreprise.id,
        name: libelle,
        adresse: adresse,
        villeId: villeId,
        typeEntrepriseId: typeEntrepriseId,
        domaineActiviteId: domaineActiviteId,
        createdAt: entreprise.createdAt,
        updatedAt: new Date(),
      };

      await entrepriseService.update(entreprise.id, modifierData); // ✅ Passer l'ID et les données
      toast.success("Entreprise modifiée avec succès !");
      setTimeout(() => {
        goToListeEntreprises(navigate);
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
    if (entreprise) {
      loadData();
      initialiserFormulaire(entreprise);
    }
  }, [entreprise]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Modification de Poste</h2>
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
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
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


              <div className="col-md-6">
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

export default UpdateEntreprise;
