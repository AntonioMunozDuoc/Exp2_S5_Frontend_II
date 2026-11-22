import { Link } from "react-router-dom";

// Tarjeta de un destino del listado; lleva a la página de detalle.
function DestinoCard({ destino }) {
  return (
    <article className="tarjeta destino">
      <p className="emoji" aria-hidden="true">{destino.emoji}</p>
      <h2>{destino.nombre}</h2>
      <p className="muted">{destino.pais} · {destino.continente}</p>
      <ul className="chips">
        {destino.actividades.map((actividad) => (
          <li key={actividad}>{actividad}</li>
        ))}
      </ul>
      <Link to={`/destinos/${destino.id}`} className="btn">Ver vuelos y hoteles</Link>
    </article>
  );
}

export default DestinoCard;
