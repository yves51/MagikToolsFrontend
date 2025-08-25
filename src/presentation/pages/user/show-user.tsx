import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { goToListeUsers } from "../../../shared/utils/navigation";
import { User } from "../../../domain/entities/User";
import { formatDateTimeForInput } from "../../../shared/utils/date";

const AfficherUser = () => {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const navigate = useNavigate();

  // Champs du formulaire
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [email, setEmail] = useState("");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [telephone, setTelephone] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [fonctionId, setFonctionId] = useState<number | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [adresse, setAdresse] = useState("");
  const location = useLocation();
  const { user } = location.state as { user: User };

  const initialiserFormulaire = (user: User) => {
    setNom(user.nom);
    setPrenoms(user.prenoms);
    setAdresse(user.adresse);
    setEmail(user.email);
    setTelephone(user.telephone);
    setSexe(user.sexe);
    setDateNaissance(new Date(user.dateNaissance).toISOString().split("T")[0]);
    setFonctionId(user.fonctionId);
    setRoleId(user.roleId);
  };
  // new Date(dateNaissance)
  useEffect(() => {
    initialiserFormulaire(user);
  }, [id]);

  return (
    <>
      <div className="border-bottom border-translucent  mb-7 mx-n3 px-2 mx-lg-n6 px-lg-6">
        <div className="row ">
          <div className="col-xl-9">
            <div className="d-sm-flex justify-content-between">
              <h2 className="mb-4 text-center text-uppercase">
                {" "}
                {`${user.nom || ""} ${user.prenoms || ""}`}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-end position-relative mb-7">
        <div className="hoverbox" style={{ width: "150px", height: "150px" }}>
          <div
            className="hoverbox-content rounded-circle d-flex flex-center z-1"
            style={
              {
                "--phoenix-bg-opacity": ".56",
              } as React.CSSProperties
            }
          >
            <span className="fa-solid fa-camera fs-1 text-body-quaternary"></span>
          </div>
          <div className="position-relative bg-body-quaternary rounded-circle cursor-pointer d-flex flex-center mb-xxl-7">
            <div className="avatar avatar-5xl">
              <img
                className="rounded-circle"
                src={`${process.env.REACT_APP_URL}/${user.photo}`}
                alt="Photo utilisateur"
                // {`${process.env.REACT_APP_URL}/${user.photo}`}
              />
            </div>
            <label
              className="w-100 h-100 position-absolute z-1"
              htmlFor="upload-avatar"
            ></label>
          </div>
        </div>
      </div>

      <div className="row bg-white">
        <div className="col-xl-12">
          <form className="row g-3 mb-12">
            <div className="col-6">
              <label className="form-label">Nom</label>
              <input
                className="form-control"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Prénoms</label>
              <input
                className="form-control"
                value={prenoms}
                onChange={(e) => setPrenoms(e.target.value)}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Téléphone</label>
              <input
                className="form-control"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Date de naissance</label>
              <input
                className="form-control"
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Sexe</label>
              <input
                className="form-control"
                type="text"
                value={sexe}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Adresse</label>
              <input
                className="form-control"
                type="text"
                value={adresse}
                required
                readOnly
              />
            </div>
            <div className="col-6">
              <label className="form-label">Fonction</label>
              <input
                className="form-control"
                type="text"
                value={user.fonction?.name}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Rôle</label>
              <input
                className="form-control"
                type="text"
                value={user.role?.name}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Date création</label>
              <input
                className="form-control"
                type="datetime-local"
                value={formatDateTimeForInput(user.createdAt)}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Auteur</label>
              <input
                className="form-control"
                type="text"
                value={`${user.auteurCreate?.nom || ""} ${
                  user.auteurCreate?.prenoms || ""
                }`}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Date modification</label>
              <input
                className="form-control"
                type="datetime-local"
                value={formatDateTimeForInput(user.updatedAt)}
                required
                readOnly
              />
            </div>

            <div className="col-6">
              <label className="form-label">Auteur</label>
              <input
                className="form-control"
                type="text"
                value={`${user.auteurUpdate?.nom || ""} ${
                  user.auteurUpdate?.prenoms || ""
                }`}
                required
                readOnly
              />
            </div>

            <div className="col-12 d-flex justify-content-end mt-6">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => goToListeUsers(navigate)}
              >
                Retour
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AfficherUser;
