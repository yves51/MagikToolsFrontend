import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Entreprise } from "../../../../domain/entities/Entreprise";
import { EntrepriseService } from "../../../../infrastructure/services/entreprise/EntrepriseService";
import ListeContact  from '../contact/liste-contact'
import ListeMaterielByEntreprise from "../materiel/liste-materiel";
const ShowEntreprise = () => {
  const entrepriseService = new EntrepriseService();
  const { id } = useParams();

  // Champs du formulaire
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const location = useLocation();
  const { entreprise } = location.state as { entreprise: Entreprise };

  const initialiserFormulaire = (entreprise: Entreprise) => {
    setName(entreprise.name);
    setAdresse(entreprise.adresse);
  };
  useEffect(() => {
    initialiserFormulaire(entreprise);
  }, [id]);

  return (
    <>
      <section className="pt-5 pb-9">
        <div className="container-small">
          <div className="row g-3 mb-6">
            <div className="col-12 col-lg-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="border-bottom border-dashed">
                    <h4 className="mb-3 text-center text-uppercase">
                      Informations
                      <button className="btn btn-link p-0" type="button">
                        {" "}
                        <span className="fas fa-edit fs-9 ms-3 text-body-quaternary"></span>
                      </button>
                    </h4>
                  </div>
                  <div className="border-top border-dashed pt-4">
                    <div className="row flex-between-center mb-2">
                      <div className="col-auto">
                        <h5 className="text-body-highlight mb-0">Code</h5>
                      </div>
                      <div className="col-auto">
                        <a>{entreprise.matricule?.toUpperCase()} </a>
                      </div>
                    </div>

                    <div className="row flex-between-center">
                      <div className="col-auto">
                        <h5 className="text-body-highlight mb-0">Nom</h5>
                      </div>
                      <div className="col-auto">
                        <a>{entreprise.name.toUpperCase()}</a>
                      </div>
                    </div>

                    <div className="row flex-between-center">
                      <div className="col-auto">
                        <h5 className="text-body-highlight mb-0">Adresse</h5>
                      </div>
                      <div className="col-auto">
                        <a>{entreprise.adresse.toUpperCase()}</a>
                      </div>
                    </div>

                    <div className="row flex-between-center">
                      <div className="col-auto">
                        <h5 className="text-body-highlight mb-0">Ville</h5>
                      </div>
                      <div className="col-auto">
                        <a>{entreprise.ville?.name}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <ListeMaterielByEntreprise />
            <br />
            <ListeContact/>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </section>
    </>
  );
};

export default ShowEntreprise;
