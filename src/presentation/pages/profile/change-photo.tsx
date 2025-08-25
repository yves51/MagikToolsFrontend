import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../infrastructure/services/auth/AuthService";

interface Props {
  currentUser: { photo?: string | null };
  onUpdated: (user: any) => void;
  onCancel: () => void;
}

const EditPhotoForm: React.FC<Props> = ({ currentUser, onCancel }) => {
  const authService = new AuthService();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!photo) {
      setError("Veuillez sélectionner une photo.");
      return;
    }

    try {
      await authService.updatePhotoProfile({ photo });
      toast.success("Photo mise à jour avec succès !");
      setTimeout(() => {
        navigate("/dashboard/profile");
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Erreur lors de la mise à jour de la photo."
      );
    }
  };

  return (
    <div className="row justify-content-center mb-12">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="mb-3">Modifier la photo de profil</h5>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row mb-4">
                <div className="col-md-12">
                  <label className="form-label">Photo de profil</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {photo && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Aperçu"
                        className="img-thumbnail"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
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

export default EditPhotoForm;
