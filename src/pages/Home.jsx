import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h1>Planifica tu próximo viaje</h1>
      <p>Elige un destino y compara vuelos y hoteles disponibles, con precios, fechas y disponibilidad.</p>
      <Link to="/destinos" className="btn btn-claro">Explorar destinos</Link>
    </section>
  );
}

export default Home;
