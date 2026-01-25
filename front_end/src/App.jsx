import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/description/menu/menu";

import Accueil from "./components/description/acceuil/acceuil";
import Doctor from "./components/description/doctorat/doctor";
import Categorie from "./components/description/categorie/categorie";
import Propos from "./components/description/apropos/propos";
import SignUp from "./components/sign_up/sign_up";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie" element={<Categorie />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/apropos" element={<Propos />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
