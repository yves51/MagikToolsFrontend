import { useEffect } from "react";
import feather from "feather-icons";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  useEffect(() => {
    feather.replace(); // remplace les balises data-feather
  }, []);
  return (
    <>
      <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
        <div className="navbar-vertical-content">
          <ul className="navbar-nav flex-column" id="navbarVerticalNav">
            <div className="nav-item-wrapper">
              <a
                className="nav-link dropdown-indicator label-1"
                href="#nv-authentication"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="nv-authentication"
              >
                <div className="d-flex align-items-center">
                  <div className="dropdown-indicator-icon-wrapper">
                    <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                  </div>
                  <span className="nav-link-icon">
                    <span data-feather="home"></span>
                  </span>
                  <span className="nav-link-text text-uppercase">
                    Maintenance
                  </span>
                </div>
              </a>
              <div className="parent-wrapper label-1">
                <ul
                  className="nav collapse parent"
                  data-bs-parent="#navbarVerticalCollapse"
                  id="nv-authentication"
                >
                  <li className="collapsed-nav-item-title d-none">
                    Authentication
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link dropdown-indicator"
                      href="#nv-simple"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="nv-simple"
                    >
                      <div className="d-flex align-items-center">
                        <div className="dropdown-indicator-icon-wrapper">
                          <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span className="nav-link-text">
                          Gestion Techniciens
                        </span>
                      </div>
                    </a>

                    <div className="parent-wrapper">
                      <ul
                        className="nav collapse parent"
                        data-bs-parent="#authentication"
                        id="nv-simple"
                      >
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-users"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-users"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Employés</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link dropdown-indicator"
                      href="#nv-formation"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="nv-formation"
                    >
                      <div className="d-flex align-items-center">
                        <div className="dropdown-indicator-icon-wrapper">
                          <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span className="nav-link-text">Gestion Tickets</span>
                      </div>
                    </a>

                    <div className="parent-wrapper">
                      <ul
                        className="nav collapse parent"
                        data-bs-parent="#authentication"
                        id="nv-formation"
                      >
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-formations"
                            className={`nav-link ${
                              location.pathname ===
                              "/dashboard/liste-formations"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Formations</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link dropdown-indicator"
                      href="#nv-contrat"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="nv-contrat"
                    >
                      <div className="d-flex align-items-center">
                        <div className="dropdown-indicator-icon-wrapper">
                          <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span className="nav-link-text">
                          Gestion Partenaires
                        </span>
                      </div>
                    </a>

                    <div className="parent-wrapper">
                      <ul
                        className="nav collapse parent"
                        data-bs-parent="#authentication"
                        id="nv-contrat"
                      >
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-type-entreprises"
                            className={`nav-link ${
                              location.pathname ===
                              "/dashboard/liste-type-entreprises"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">
                                Type Entreprise
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-domaine-activites"
                            className={`nav-link ${
                              location.pathname ===
                              "/dashboard/liste-domaine-activites"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">
                                Secteur Activité
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-entreprises"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-entreprises"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Partenaires</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link dropdown-indicator"
                      href="#nv-split"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="nv-split"
                    >
                      <div className="d-flex align-items-center">
                        <div className="dropdown-indicator-icon-wrapper">
                          <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span className="nav-link-text">Gestion Equipements</span>
                      </div>
                    </a>

                    <div className="parent-wrapper">
                      <ul
                        className="nav collapse parent"
                        data-bs-parent="#authentication"
                        id="nv-split"
                      >
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-categories"
                            className={`nav-link ${
                              location.pathname ===
                              "/dashboard/liste-categories"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">
                                Catégorie
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-sous-categories"
                            className={`nav-link ${
                              location.pathname ===
                              "/dashboard/liste-sous-categories"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">
                               Sous Catégorie
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-marques"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-marques"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Marque</span>
                            </div>
                          </Link>
                        </li>
                         <li className="nav-item">
                          <Link
                            to="/dashboard/liste-modeles"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-modeles"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Modèles</span>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-etat-materiels"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-etat-materiels"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Etat Materiels</span>
                            </div>
                          </Link>
                        </li>
                         <li className="nav-item">
                          <Link
                            to="/dashboard/liste-materiels"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-materiels"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Materiels</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="nav-item-wrapper">
              <a
                className="nav-link dropdown-indicator label-1"
                href="#nv-configuration"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="nv-configuration"
              >
                <div className="d-flex align-items-center">
                  <div className="dropdown-indicator-icon-wrapper">
                    <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                  </div>
                  <span className="nav-link-icon">
                    <span data-feather="settings"></span>
                  </span>
                  <span className="nav-link-text text-uppercase">
                    Configuration
                  </span>
                </div>
              </a>
              <div className="parent-wrapper label-1">
                <ul
                  className="nav collapse parent"
                  data-bs-parent="#navbarVerticalCollapse"
                  id="nv-configuration"
                >
                  <li className="collapsed-nav-item-title d-none">
                    configuration
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link dropdown-indicator"
                      href="#nv-simple"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="nv-simple"
                    >
                      <div className="d-flex align-items-center">
                        <div className="dropdown-indicator-icon-wrapper">
                          <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span className="nav-link-text">Gestion Droits</span>
                      </div>
                    </a>

                    <div className="parent-wrapper">
                      <ul
                        className="nav collapse parent"
                        data-bs-parent="#configuration"
                        id="nv-simple"
                      >
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-permissions"
                            className={`nav-link ${
                              location.pathname ===
                              "/dashboard/liste-permissions"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Permissions</span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-roles"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-roles"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Rôles</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link dropdown-indicator"
                      href="#nv-formation"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="nv-formation"
                    >
                      <div className="d-flex align-items-center">
                        <div className="dropdown-indicator-icon-wrapper">
                          <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span className="nav-link-text">Gestion Services</span>
                      </div>
                    </a>

                    <div className="parent-wrapper">
                      <ul
                        className="nav collapse parent"
                        data-bs-parent="#configuration"
                        id="nv-formation"
                      >
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-departements"
                            className={`nav-link ${
                              location.pathname ===
                              "/dashboard/liste-departements"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">
                                Departements
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-fonctions"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-fonctions"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Postes</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link dropdown-indicator"
                      href="#nv-contrat"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="nv-contrat"
                    >
                      <div className="d-flex align-items-center">
                        <div className="dropdown-indicator-icon-wrapper">
                          <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span className="nav-link-text">
                          Gestion Localisation
                        </span>
                      </div>
                    </a>

                    <div className="parent-wrapper">
                      <ul
                        className="nav collapse parent"
                        data-bs-parent="#configuration"
                        id="nv-contrat"
                      >
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-regions"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-regions"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Régions</span>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/dashboard/liste-villes"
                            className={`nav-link ${
                              location.pathname === "/dashboard/liste-villes"
                                ? "active"
                                : ""
                            }`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="nav-link-text">Villes</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div className="navbar-vertical-footer">
        <button className="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center">
          <span className="uil uil-left-arrow-to-left fs-8"></span>
          <span className="uil uil-arrow-from-right fs-8"></span>
          <span className="navbar-vertical-footer-text ms-2">MEDIATEC</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
