import React, { useState } from "react";
import { toast } from "react-toastify";
import { ResetPassword } from "../../../domain/entities/User";
import { AuthService } from "../../../infrastructure/services/auth/AuthService";

interface Props {
  onCancel: () => void;
}

const ChangePasswordForm: React.FC<Props> = ({ onCancel }) => {
  const authService = new AuthService();
  const [formData, setFormData] = useState<ResetPassword>({
    current_password: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const msg = await authService.changePassword(formData);
      console.log(msg);

      toast.success("Mot de passe modifié avec succès !");
      setTimeout(() => {
        onCancel();
      }, 1000);

      setMessage(msg);
      setFormData({
        current_password: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Erreur lors de la modification du mot de passe."
      );
    }
  };

  return (
    <div className="row justify-content-center mb-12">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="mb-3">Modifier le mot de passe</h5>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label htmlFor="currentPassword" className="form-label">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="current_password"
                    placeholder="Mot de passe actuel"
                    value={formData.current_password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="newPassword" className="form-label">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="password"
                    placeholder="Nouveau mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="password_confirmation"
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
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
      </div>
    </div>
  );
};

export default ChangePasswordForm;
