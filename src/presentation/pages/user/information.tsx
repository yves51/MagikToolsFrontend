import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../../domain/entities/User";
import { UserService } from "../../../infrastructure/services/user/UserService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Document } from "../../../domain/entities/Document";

const InformatonUser = () => {
  const userService = new UserService();
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const navigate = useNavigate();

  // Champs du formulaire
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [email, setEmail] = useState("");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [telephone, setTelephone] = useState("");
  const [fonctionId, setFonctionId] = useState<number | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [adresse, setAdresse] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);


  const location = useLocation();
  const { user } = location.state as { user: User };

    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  
    const handleRowClick = (id: number) => {
      setSelectedRowId(id);
    };

   const loadDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        let response = await userService.getDocumentsByUser(user.id);
        if (response.success) {
          setDocuments(response.results);
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

  

  const initialiserFormulaire = (user: User) => {
    setNom(user.nom);
    setPrenoms(user.prenoms);
    setAdresse(user.adresse);
    setEmail(user.email);
    setTelephone(user.telephone);
    setSexe(user.sexe);
    setFonctionId(user.fonctionId);
    setRoleId(user.roleId);
  };
  // new Date(dateNaissance)
  useEffect(() => {
    initialiserFormulaire(user);
  }, [id]);

  return (
    <>
      <section className="pt-5 pb-9">
        <div className="container-small">
          <div className="row g-3 mb-6">
            <div className="col-12 col-lg-8">
              <div className="card h-100">
                <div className="card-body">
                  <div className="border-bottom border-dashed pb-4">
                    <div className="row align-items-center g-3 g-sm-5 text-center text-sm-start">
                      <div className="col-12 col-sm-auto">
                        <input className="d-none" id="avatarFile" />
                        <label
                          className="cursor-pointer avatar avatar-5xl"
                          htmlFor="avatarFile"
                        >
                          <img
                            className="rounded-circle"
                            src={`${process.env.REACT_APP_URL}/${user.photo}`}
                            alt=""
                          />
                        </label>
                      </div>
                      <div className="col-12 col-sm-auto flex-1">
                        <h3>{user.nom}</h3>
                        <p className="text-body-secondary">{user.prenoms}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-between-center pt-4">
                    <div>
                      <h6 className="mb-2 text-body-secondary">Departement</h6>
                      <h4 className="fs-7 text-body-highlight mb-0">
                        {user.fonction?.departement?.name}
                      </h4>
                    </div>
                    <div className="text-end">
                      <h6 className="mb-2 text-body-secondary">Fonction</h6>
                      <h4 className="fs-7 text-body-highlight mb-0">
                        {user.fonction?.name}
                      </h4>
                    </div>
                    <div className="text-end">
                      <h6 className="mb-2 text-body-secondary">Rôle</h6>
                      <h4 className="fs-7 text-body-highlight mb-0">
                        {user.role?.name}{" "}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="border-bottom border-dashed">
                    <h4 className="mb-3">
                      Informations
                      <button className="btn btn-link p-0" type="button">
                        {" "}
                        <span className="fas fa-edit fs-9 ms-3 text-body-quaternary"></span>
                      </button>
                    </h4>
                  </div>
                  <div className="pt-4 mb-7 mb-lg-4 mb-xl-7">
                    <div className="row justify-content-between">
                      <div className="col-auto">
                        <h5 className="text-body-highlight">Adresse</h5>
                      </div>
                      <div className="col-auto">
                        <p className="text-body-secondary">{user.adresse}</p>
                      </div>
                    </div>
                   
                    <div className="row justify-content-between">
                      

                      <div className="col-auto">
                        <h5 className="text-body-highlight">Status</h5>
                      </div>
                      <div className="col-auto">
                        <p className="text-body-secondary">
                         {user.status === "terminé" && (
                          <span className="badge bg-warning text-dark">
                           Terminé
                          </span>
                        )}
                        {user.status === "actif" && (
                          <span className="badge bg-success">Actif</span>
                        )}
                        {user.status === "suspendu" && (
                          <span className="badge bg-danger">Suspendu</span>
                        )}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                  <div className="border-top border-dashed pt-4">
                    <div className="row flex-between-center mb-2">
                      <div className="col-auto">
                        <h5 className="text-body-highlight mb-0">Email</h5>
                      </div>
                      <div className="col-auto">
                        <a>{user.email} </a>
                      </div>
                    </div>
                    <div className="row flex-between-center">
                      <div className="col-auto">
                        <h5 className="text-body-highlight mb-0">Contact</h5>
                      </div>
                      <div className="col-auto">
                        <a>{user.telephone}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </section>
    </>
  );
};

export default InformatonUser;
