import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Destinos from "./pages/Destinos.jsx";
import DestinoDetalle from "./pages/DestinoDetalle.jsx";
import NotFound from "./pages/NotFound.jsx";

// Todas las rutas se declaran aquí; Layout aporta el menú y renderiza la página hija en <Outlet />.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/destinos/:id" element={<DestinoDetalle />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
