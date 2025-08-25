import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { RedirectProvider } from "./ui/contexts/RedirectProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <AuthProvider>
//     <RedirectProvider>
//       <App />
//     </RedirectProvider>
//   </AuthProvider>
// );
root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <AuthProvider>
        <RedirectProvider>
          <App />
        </RedirectProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
