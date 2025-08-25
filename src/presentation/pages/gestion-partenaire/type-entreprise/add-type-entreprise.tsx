import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TypeEntrepriseService } from "../../../../infrastructure/services/type-entreprise/TypeEntrepriseService";
import { TypeEntreprise } from "../../../../domain/entities/TypeEntreprise";
import { goToListeTypeEntreprises } from "../../../../shared/utils/navigation";

const AjouterTypeEntreprise = () => {
  const typeEntrepriseService = new TypeEntrepriseService();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setError(null);

    try {
      const nouveauTypeEntreprises: TypeEntreprise = {
        id: 0,
        name: libelle,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await typeEntrepriseService.create(nouveauTypeEntreprises);
      toast.success("Type d'entreprise créé avec succès !");
      setTimeout(() => {
        goToListeTypeEntreprises(navigate);
      }, 1500); // attends 1.5s
    } catch (err: any) {
      console.error("Erreur de création :", err);
      const message =
        err?.response?.data?.message ||
        "Une erreur s'est produite lors de la création.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Création de type d'entreprise</h2>
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="libelle" className="form-label">
                  Nom du type d'entreprise
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
                    onClick={() => goToListeTypeEntreprises(navigate)}
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

export default AjouterTypeEntreprise;
