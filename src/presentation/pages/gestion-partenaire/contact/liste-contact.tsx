import React, { useEffect, useState } from "react";
import { Link, useNavigate , useLocation} from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Entreprise } from "../../../../domain/entities/Entreprise";
import { goToAjouterContacts, goToModifierContacts, goToModifierEntreprises } from "../../../../shared/utils/navigation";
import { formatDateTime } from "../../../../shared/utils/date";
import { ContactService } from "../../../../infrastructure/services/contact/ContactService";
import { Contact } from "../../../../domain/entities/Contact";

const ListeContact = () => {
  const contactService = new ContactService();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { entreprise } = location.state as { entreprise: Entreprise };
    
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const handleRowClick = (id: number) => {
      setSelectedRowId(id);
    };

  const filteredContacts = contacts.filter((contact) =>
    contact.nom.toLowerCase().includes(searchTerm.toLowerCase())||
    contact.telephone.toLowerCase().includes(searchTerm.toLowerCase())||
    contact.prenoms?.toLowerCase().includes(searchTerm.toLowerCase())||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getContactById = async (id: number) => {
    try {
      let response = await contactService.getById(id);
      if (response.success) {
        goToModifierContacts(navigate, response.results)
      } else {
        console.error("Erreur :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle :", error);
    }
  };

  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await contactService.getContactsByEntreprise(entreprise.id);
      if (response.success) {
        setContacts(response.results);
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

    const deleteContact = async (id: number) => {
      try {
        setPending(true);
        const response = await contactService.delete(id);
        if (response.data.success) {
          toast.success(response.data.message || "Suppression réussie.");
          setContacts((prev) => prev.filter((p) => p.id !== id));
        } else {
          toast.error(response.data.message || "Erreur lors de la suppression.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Une erreur s'est produite.");
      } finally {
        setPending(false);
      }
    };

  // Entreprise de confirmation avant suppression
  const confirmAndDeleteContact = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (isConfirmed) {
      await deleteContact(id);
    }
  };

    useEffect(() => {
    loadContacts();
  }, []);

  // ⏳ Affichage pendant le chargement
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement des contacts...</p>
      </div>
    );
  }

  // ❌ Affichage en cas d'erreur
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-bold text-body-emphasis mb-5">La liste Contacts</h2>
        <div
          id="members"
          data-list='{"valueNames":["name","email","mobile_number","city","last_active","joined"],"page":10,"pagination":true}'
        >
          <div className="row align-items-center justify-content-between g-3 mb-4">
            <div className="col col-auto">
              <div className="search-box">
                <form className="position-relative">
                  <input
                    className="form-control search-input search"
                    type="search"
                    placeholder="Rechercher une entreprise"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <span className="fas fa-search search-box-icon"></span>
                </form>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex align-items-center">
                <button className="btn btn-link text-body me-4 px-0">
                  <span className="fa-solid fa-file-export fs-9 me-2"></span>
                  Exporter
                </button>
                <button onClick={() => goToAjouterContacts(navigate, entreprise)} className="btn btn-primary">
                  <span className="fas fa-plus me-2"></span>
                  Ajouter un contact
                </button>
              </div>
            </div>
          </div>
          {/* ajouter-role */}
          <div
            id="tableExample"
            data-list='{"valueNames":["name","email","age"],"page":5,"pagination":true}'
          >
            <div className="table-responsive">
              <table className="table table-sm fs-9 mb-0">
                <thead>
                  <tr>
                    <th className="sort border-top border-translucent ps-3">
                      #
                    </th>
                    <th className="sort border-top border-translucent">
                      Nom
                    </th>
                    <th className="sort border-top border-translucent">
                      Prénoms
                    </th>
                     <th className="sort border-top border-translucent">
                      Email
                    </th>
                    <th className="sort border-top border-translucent">
                      Telephone
                    </th>
                   
                    <th className="sort border-top border-translucent">
                      Auteur
                    </th>
                    <th className="sort border-top border-translucent">
                      Date création
                    </th>
                    <th className="sort border-top border-translucent">
                      Auteur
                    </th>
                    <th className="sort border-top border-translucent">
                      Date modification
                    </th>
                    <th className="sort text-end border-top border-translucent">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="list">
                  {filteredContacts.map((contact, index) => (
                    <tr 
                      key={contact.id}
                      onClick={() => handleRowClick(contact.id)}
                      className={
                        selectedRowId === contact.id ? "selected-row" : ""
                      }
                      
                      >
                      <td className="align-middle ps-3">{index + 1}</td>
                      <td className="align-middle">{contact.nom.toUpperCase()}</td>
                      <td className="align-middle">{contact.prenoms.toUpperCase()}</td>
                      <td className="align-middle">{contact.email}</td>
                      <td className="align-middle">{contact.telephone}</td>
                      <td className="align-middle">{contact.auteurCreate?.prenoms}</td>
                      <td className="align-middle">
                          {formatDateTime(contact.createdAt)}
                      </td>
                      <td className="align-middle">{contact.auteurUpdate?.prenoms}</td>

                      <td className="align-middle">
                        {formatDateTime(contact.updatedAt)}
                      </td>
                      <td className="align-middle text-end">
                        <div className="btn-reveal-trigger position-static">
                          <button
                            className="btn btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            ⋮
                          </button>
                          <div className="dropdown-menu dropdown-menu-end py-2">
                            <button
                              className="dropdown-item"
                              onClick={() => getContactById(contact.id)}
                            >
                              Modifier
                            </button>
                            <div className="dropdown-divider"></div>
                             <button
                              type="button"
                              className="dropdown-item text-danger"
                              onClick={() =>
                                confirmAndDeleteContact(contact.id)
                              }
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </>
  );
};

export default ListeContact;
