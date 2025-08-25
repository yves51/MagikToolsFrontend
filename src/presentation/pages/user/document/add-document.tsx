import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../../../domain/entities/User";
import { goToListeUsers } from "../../../../shared/utils/navigation";
import { DocumentService } from "../../../../infrastructure/services/document/DocumentService";
import { Document } from "../../../../domain/entities/Document";
import ListeDocument from "./liste-documents";

const AjouterDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state as { user: User };
  const documentService = new DocumentService();

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Veuillez sélectionner un fichier.");
      return;
    }

    const document: Document = {
      id: 0,
      name,
      fichier: file, // ✅ attention à l'orthographe
      userId: user.id, // ✅ associer l'utilisateur
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      setLoading(true);
      await documentService.create(document); // ✅ appel du bon service
      toast.success("Document ajouté avec succès !");
      setTimeout(() => {
        goToListeUsers(navigate);
      }, 2000);
    } catch (error: any) {
      toast.error("Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-bottom border-translucent mb-7 mx-n3 px-2 mx-lg-n6 px-lg-6">
        <h2 className="mb-4">Ajouter un nouveau document</h2>
      </div>

      <div className="row bg-white">
        <div className="col-xl-12">
          <form
            className="row g-3 mb-12"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="col-6">
              <label className="form-label">Libellé</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-6">
              <label className="form-label">Document(pdf)</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf,image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFile(file);
                }}
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-end mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary me-2"
              >
                Retour
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Enregistrement en cours..." : "Enrégistrer"}
              </button>
            </div>
          </form>
        </div>
        <ListeDocument />
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default AjouterDocument;
