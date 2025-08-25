import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { goToListeModeles } from "../../../../shared/utils/navigation";
import { ModeleService } from "../../../../infrastructure/services/modele/ModeleService";
import { MarqueService } from "../../../../infrastructure/services/marque/MarqueService";
import { Marque } from "../../../../domain/entities/Marque";
import { Modele } from "../../../../domain/entities/Modele";

const AjouterModele = () => {
  const modeleService = new ModeleService();
  const marqueService = new MarqueService();

  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marques, setMarques] = useState<Marque[]>([]);
  const [marqueId, setMarqueId] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const loadMarques = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await marqueService.getAll();
      if (response.success) {
        setMarques(response.results);
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

    if (!libelle || !marqueId) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }
    try {
      const nouveauData: Modele = {
        id: 0,
        name: libelle,
        marqueId: marqueId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await modeleService.create(nouveauData);
      toast.success("Modele crée avec succès !");
      setTimeout(() => {
        goToListeModeles(navigate);
      }, 1500);
    } catch (err) {
      setError("Une erreur s'est produite lors de la création de la fonction.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMarques();
  }, []);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Création de modèle</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="departementSelect">Marque</label>
                <select
                  className="form-select"
                  id="departementSelect"
                  value={marqueId ?? ""}
                  onChange={(e) => setMarqueId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Sélectionnez une catégorie --</option>
                  {marques.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="libelle" className="form-label">
                  Nom de Modèle
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
                    onClick={() => goToListeModeles(navigate)}
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

export default AjouterModele;
