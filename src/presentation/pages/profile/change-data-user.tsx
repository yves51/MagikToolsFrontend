import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UpdateDataUser } from "../../../domain/entities/User";
import { AuthService } from "../../../infrastructure/services/auth/AuthService";
import { useNavigate } from "react-router-dom";

interface Props {
  currentUser: UpdateDataUser;
  onUpdated: (user: UpdateDataUser) => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<Props> = ({ currentUser, onCancel }) => {
  const authService = new AuthService();

  const [formData, setFormData] = useState<UpdateDataUser>(currentUser);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await authService.updateProfile(formData);
      toast.success("Profil mis à jour avec succès !");
      setTimeout(() => {
        navigate("/dashboard/profile");
        window.location.reload(); // Recharge la page après la navigation
      }, 1000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Erreur lors de la mise à jour du profil."
      );
    }
  };

  return (
    <div className="row justify-content-center mb-12">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="mb-3">Modifier les informations</h5>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Prénoms</label>
                  <input
                    type="text"
                    className="form-control"
                    name="prenoms"
                    value={formData.prenoms}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Date de naissance</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    className="form-control"
                    value={
                      formData.dateNaissance
                        ? new Date(formData.dateNaissance)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onCancel}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default EditProfileForm;
