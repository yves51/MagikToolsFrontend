import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { goToListeUsers } from "../../../../shared/utils/navigation";
import { DocumentService } from "../../../../infrastructure/services/document/DocumentService";
import { Document } from "../../../../domain/entities/Document";

const ModifierDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { document } = location.state as { document: Document };

  const documentService = new DocumentService();

  const [name, setName] = useState(document.name || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const documentToUpdate: Document = {
    ...document,
    name,
    userId: document.userId,
    fichier: file!, // assure-toi que `file` est non-null
    updatedAt: new Date(),
    createdAt: document.createdAt,
  };

  try {
    setLoading(true);
    await documentService.update(document.id, documentToUpdate);
    toast.success("Document modifié avec succès !");
    setTimeout(() => {
      goToListeUsers(navigate);
    }, 2000);
  } catch (error: any) {
    toast.error("Erreur lors de la modification.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="border-bottom border-translucent mb-7 mx-n3 px-2 mx-lg-n6 px-lg-6">
        <h2 className="mb-4">Modifier le document</h2>
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
              <label className="form-label">Nouveau document (optionnel)</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf,image/*"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) setFile(selectedFile);
                }}
              />
            </div>

            <div className="col-12 d-flex justify-content-end mt-6">
              <button
                className="btn btn-secondary me-2"
                type="button"
                onClick={() => goToListeUsers(navigate)}
              >
                Annuler
              </button>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Modification en cours..." : "Modifier"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default ModifierDocument;
