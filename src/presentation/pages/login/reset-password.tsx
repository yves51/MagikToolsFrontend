// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { UserService } from "../../../infrastructure/services/user/UserService";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ResetPassword: React.FC = () => {
//   const navigate = useNavigate();
//   const userService = new UserService();
//   const [searchParams] = useSearchParams();

//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = searchParams.get("token");
//   const email = searchParams.get("email");

//   const handleReset = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== passwordConfirmation) {
//       toast.error("Les mots de passe ne correspondent pas.");
//       return;
//     }

//     setLoading(true);

//     try {
//       await userService.reset({
//         token: token || "", // fallback par sécurité
//         email: email || "",
//         password,
//         confirmPassword: passwordConfirmation,
//       });

//       toast.success("Mot de passe réinitialisé !");
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message ||
//           "Erreur lors de la réinitialisation du mot de passe."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

// useEffect(() => {
//   // Ne rien faire tant que searchParams n’est pas encore évalué
//   if (token === null || email === null) return;

//   // Ensuite seulement, valider les données
//   if (!token?.trim() || !email?.trim()) {
//     toast.error("Lien invalide ou expiré.");
//     navigate("/");
//   }
// }, [token, email, navigate]);

//   return (
//     <>
//       <div className="container">
//         <div className="row flex-center min-vh-100 py-5">
//           <div className="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
//             <Link
//               className="d-flex flex-center text-decoration-none mb-4"
//               to="/"
//             >
//               <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
//                 <img
//                   src={
//                     process.env.PUBLIC_URL + "/admin/assets/img/icons/logo.png"
//                   }
//                   alt="logo"
//                   width="58"
//                 />
//               </div>
//             </Link>
//             <div className="text-center mb-6">
//               <h4 className="text-body-highlight">
//                 Réinitialiser le mot de passe
//               </h4>
//               <p className="text-body-tertiary">
//                 Saisissez votre nouveau mot de passe
//               </p>
//               <form className="mt-5" onSubmit={handleReset}>
//                 <div className="position-relative mb-2">
//                   <input
//                     className="form-control form-icon-input pe-6"
//                     type="password"
//                     placeholder="Nouveau mot de passe"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="position-relative mb-4">
//                   <input
//                     className="form-control"
//                     type="password"
//                     placeholder="Confirmer nouveau mot de passe"
//                     value={passwordConfirmation}
//                     onChange={(e) => setPasswordConfirmation(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button
//                   className="btn btn-primary w-100"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   {loading ? "Traitement..." : "Valider"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//       </div>
//     </>
//   );
// };

// export default ResetPassword;
import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { UserService } from "../../../infrastructure/services/user/UserService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const userService = new UserService();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!token || !email) {
      toast.error("Lien invalide ou expiré.");
      return;
    }

    setLoading(true);

    try {
      await userService.reset({
        token,
        email,
        password,
        confirmPassword: passwordConfirmation,
      });

      toast.success("Mot de passe réinitialisé !");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la réinitialisation du mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token?.trim() || !email?.trim()) {
      toast.error("Lien invalide ou expiré.");
      navigate("/");
    }
  }, [token, email, navigate]);
  return (
    <>
      <div className="container">
        <div className="row flex-center min-vh-100 py-5">
          <div className="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
            <Link
              className="d-flex flex-center text-decoration-none mb-4"
              to="/"
            >
              <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                <img
                  src={
                    process.env.PUBLIC_URL + "/admin/assets/img/icons/logo.png"
                  }
                  alt="logo"
                  width="58"
                />
              </div>
            </Link>
            <div className="text-center mb-6">
              <h4 className="text-body-highlight">
                Réinitialiser le mot de passe
              </h4>
              <p className="text-body-tertiary">
                Saisissez votre nouveau mot de passe
              </p>
              <form className="mt-5" onSubmit={handleReset}>
                <div className="position-relative mb-2">
                  <input
                    className="form-control form-icon-input pe-6"
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="position-relative mb-4">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirmer nouveau mot de passe"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Traitement..." : "Valider"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </>
  );
};

export default ResetPassword;
