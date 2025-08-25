import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  goToListeContacts,
  goToListeEntreprises,
  goToShowEntreprises,
} from "../../../../shared/utils/navigation";
import { ContactService } from "../../../../infrastructure/services/contact/ContactService";
import { Contact } from "../../../../domain/entities/Contact";
import { Entreprise } from "../../../../domain/entities/Entreprise";

const UpdateContact = () => {
  const contactService = new ContactService();
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [fonction, setFonction] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { contact } = location.state as { contact: Contact };
  const { entreprise } = location.state as { entreprise: Entreprise };
  const navigate = useNavigate();

  const initialiserFormulaire = (contact: Contact) => {
    setNom(contact.nom);
    setEmail(contact.email);
    setFonction(contact.fonction);
    setTelephone(contact.telephone);
    setPrenoms(contact.prenoms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setError(null);

    try {
      const nouveauData: Contact = {
        id: 0,
        nom,
        prenoms,
        fonction,
        email,
        telephone,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await contactService.update(contact.id, nouveauData);
      toast.success("Contact créé avec succès !");
      setTimeout(() => {
          navigate(-1);
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
  useEffect(() => {
    if (contact) {
      initialiserFormulaire(contact);
    }
  }, [contact]);

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4">Création de contact</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-xl-12">
            <form className="row g-3 mb-6" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="libelle" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="libelle" className="form-label">
                  Prénoms
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={prenoms}
                  onChange={(e) => setPrenoms(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="libelle" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="libelle" className="form-label">
                  Telephone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="libelle" className="form-label">
                  Poste
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={fonction}
                  onChange={(e) => setFonction(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
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

export default UpdateContact;
