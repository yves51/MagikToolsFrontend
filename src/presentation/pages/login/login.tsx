import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../../infrastructure/services/auth/AuthService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const authService = new AuthService();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [checked, setChecked] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await authService.login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Email ou mot de passe incorrect.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="container-fluid bg-body-tertiary dark__bg-gray-1200">
        <div className="row flex-center position-relative min-vh-100 g-0 py-5">
          <div className="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
            <div className="card border border-translucent auth-card">
              <div className="card-body pe-md-0">
                <div className="row align-items-center gx-0 gy-7">
                  {/* Right side login form */}
                  <div className="col mx-auto">
                    <div className="auth-form-box">
                      <div className="text-center mb-7">
                        <a
                          className="d-flex flex-center text-decoration-none mb-4"
                          href="/"
                        >
                          <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/admin/assets/img/logo/logo_mediatec.jpeg"
                              }
                              alt="logo"
                              width="200"
                            />
                          </div>
                        </a>
                        <h3 className="text-body-highlight">Connexion</h3>
                        <p className="text-body-tertiary">
                          Accéder à votre compte
                        </p>
                      </div>

                      <div className="position-relative">
                        <hr className="bg-body-secondary mt-5 mb-4" />
                        <div className="divider-content-center bg-body-emphasis"></div>
                      </div>

                      {error && (
                        <div
                          className="alert alert-danger text-center"
                          role="alert"
                        >
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleLogin}>
                        <div className="mb-3 text-start">
                          <label className="form-label" htmlFor="email">
                            Adresse courriel
                          </label>
                          <div className="form-icon-container">
                            <input
                              className="form-control form-icon-input"
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="name@example.com"
                            />
                            <span className="fas fa-user text-body fs-9 form-icon"></span>
                          </div>
                        </div>

                        <div className="mb-3 text-start">
                          <label className="form-label" htmlFor="password">
                            Mot de passe
                          </label>
                          <div className="form-icon-container">
                            <input
                              className="form-control form-icon-input pe-6"
                              id="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              placeholder="Password"
                            />
                            <span className="fas fa-key text-body fs-9 form-icon"></span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="row flex-between-center mb-7">
                            <div className="col-auto">
                              <div className="form-check mb-0">
                                <input
                                  className="form-check-input"
                                  id="basic-checkbox"
                                  type="checkbox"
                                  onChange={(e) => setChecked(e.target.checked)}
                                  checked={checked}
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="basic-checkbox"
                                >
                                  Souvenir
                                </label>
                              </div>
                            </div>
                            <div className="col-auto">
                              <Link
                                className="fs-9 fw-semibold"
                                to="/forgot-password"
                              >
                                Mot de passe oublié ?
                              </Link>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Connexion
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
