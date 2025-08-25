import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../../../infrastructure/services/user/UserService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const userService = new UserService();

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

const handleForgotPassword = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    await userService.forgot({ email });
    toast.success("Lien de réinitialisation envoyé sur votre email !");
     setTimeout(() => {
            navigate("/");
          }, 1500);
  } catch (err: any) {
    setError("Erreur lors de l'envoi du lien.");
    console.error(err);
  }
};

  return (
    <>
        <div className="container">
          <div className="row flex-center min-vh-100 py-5">
            <div className="col-sm-10 col-md-8 col-lg-5 col-xxl-4">
              <Link className="d-flex flex-center text-decoration-none mb-4" to="/">
                <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                  <img
                      src={
                        process.env.PUBLIC_URL +
                        "/admin/assets/img/icons/logo.png"
                      }
                      alt="logo"
                      width="58"
                    />
                </div>
              </Link>
              <div className="px-xxl-5">
                <div className="text-center mb-6">
                  <h4 className="text-body-highlight">Vous avez oublié votre mot de passe ?</h4>
                  <p className="text-body-tertiary mb-5">Entrez votre adresse e-mail ci-dessous et nous vous enverrons <br className="d-sm-none" />lien de réinitialisation</p>
                  <form className="d-flex align-items-center mb-5" onSubmit={handleForgotPassword}>
                    <input 
                        className="form-control flex-1"
                        id="email"
                        type="email"
                        placeholder="Votre adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    <button type="submit" className="btn btn-primary ms-2">Enovyer<span className="fas fa-chevron-right ms-2"></span></button>
                  </form> 
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
     
    </>
  );
};

export default ForgotPassword;
