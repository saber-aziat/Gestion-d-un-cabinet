import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/description/menu/menu";

import Accueil from "./components/description/acceuil/acceuil";
import Doctor from "./components/description/doctorat/doctor";
import Categorie from "./components/description/categorie/categorie";
import Propos from "./components/description/apropos/propos";
// import Apropos quand tu le crées

function App() {
  return (
    <BrowserRouter>
      {/* MENU TOUJOURS AFFICHÉ */}
      <Menu />

      {/* CONTENU SOUS LE MENU */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie" element={<Categorie />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/apropos" element={<Propos />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
