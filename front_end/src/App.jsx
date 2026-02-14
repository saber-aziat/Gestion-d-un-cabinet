import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./components/aceuil/aceuil";
import Login from "./components/login/Login";
import SignUp from "./components/sign_up/sign_up";
import DoctorMenu from "./doctor/menu_doctor/menu";
import PatientMenu from "./patient/menu_patient/menu";
import Description from "./patient/description/description";
import TrouverMedecin from "./patient/trouver_medecin/trouver_medecin";
import DoctorHistorique from "./doctor/historique/historique";
import PatientHistorique from "./patient/historique/historique";
import Patient from "./doctor/patient/patient";
import DoctorMessage from "./doctor/message/message";
import PatientMessage from "./patient/message/message";
import PatientRDV from "./patient/rdv/rdv";
import DoctorRDV from "./doctor/rdv/rdv";
import Email from "./doctor/email/email";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil par défaut */}
        <Route path="/" element={<Accueil />} />

        {/* Pages sans menu */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/doctor/*" element={
          <>
            <DoctorMenu />
            <Routes>
              <Route index element={<Description />} />
              <Route path="historique" element={<DoctorHistorique />} />
              <Route path="patients" element={<Patient />} />
              <Route path="messages" element={<DoctorMessage />} />
              <Route path="gerer-rdv" element={<DoctorRDV />} />
              <Route path="envoyer-mail" element={<Email />} />


              {/* Other doctor routes will go here */}
            </Routes>
          </>
        } />
        <Route path="/patient/*" element={
          <>
            <PatientMenu />
            <Routes>
              <Route index element={<Description />} />
              <Route path="accueil" element={<Description />} />
              <Route path="trouver-medecin" element={<TrouverMedecin />} />
              <Route path="messages" element={<PatientMessage />} />
              <Route path="historique" element={<PatientHistorique />} />
              <Route path="gerer_rdv" element={<PatientRDV />} />
              {/* Other patient routes will go here */}
            </Routes>
          </>
        } />

        {/* Fallback pour toutes les autres routes -> Accueil */}
        <Route path="*" element={<Accueil />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
