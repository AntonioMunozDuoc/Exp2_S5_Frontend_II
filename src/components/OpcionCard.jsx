// Tarjeta genérica para un vuelo o un hotel: título, detalles, precio, disponibilidad y botón de selección.
function OpcionCard({ titulo, detalles, precio, disponibilidad, hayDisponibilidad, seleccionado, onSeleccionar }) {
  return (
    <li className={`tarjeta opcion ${seleccionado ? "seleccionada" : ""}`}>
      <div>
        <h3>{titulo}</h3>
        {detalles.map((linea) => (
          <p key={linea} className="muted">{linea}</p>
        ))}
        <p className={hayDisponibilidad ? "ok" : "agotado"}>{disponibilidad}</p>
      </div>
      <div className="opcion-accion">
        <strong>{precio}</strong>
        <button type="button" className="btn" disabled={!hayDisponibilidad} onClick={onSeleccionar} aria-pressed={seleccionado}>
          {seleccionado ? "Seleccionado ✓" : "Seleccionar"}
        </button>
      </div>
    </li>
  );
}

export default OpcionCard;
