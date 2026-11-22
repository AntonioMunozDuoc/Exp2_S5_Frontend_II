import { NavLink, Outlet } from "react-router-dom";

// Plantilla común: menú superior + contenido de la ruta (Outlet) + pie.
function Layout() {
  return (
    <>
      <header className="navbar">
        <nav className="contenedor navbar-interno" aria-label="Menú principal">
          <NavLink to="/" className="logo">✈️ Viajes</NavLink>
          <div className="enlaces">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/destinos">Destinos</NavLink>
          </div>
        </nav>
      </header>
      <main className="contenedor">
        <Outlet />
      </main>
      <footer className="pie">Agencia de viajes · Desarrollo Frontend II (PFY2202)</footer>
    </>
  );
}

export default Layout;
