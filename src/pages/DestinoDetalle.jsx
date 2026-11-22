import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import useFetch from "../hooks/useFetch.js";
import { OPCIONES_DESTINO } from "../graphql/queries.js";
import { formatoFecha, formatoPrecio, nochesEntre } from "../utils.js";
import Estado from "../components/Estado.jsx";
import OpcionCard from "../components/OpcionCard.jsx";

function DestinoDetalle() {
  const { id } = useParams();
  // REST: datos del destino. GraphQL: vuelos y hoteles de ese destino.
  const { data: destino, loading, error } = useFetch(`/api/destinos/${id}`);
  const { data: opciones, loading: cargandoOpciones, error: errorOpciones } = useQuery(OPCIONES_DESTINO, {
    variables: { destinoId: id },
  });
  const [vuelo, setVuelo] = useState(null);
  const [hotel, setHotel] = useState(null);

  // Al cambiar de destino se reinicia la selección.
  useEffect(() => {
    setVuelo(null);
    setHotel(null);
  }, [id]);

  const noches = vuelo ? nochesEntre(vuelo.fechaSalida, vuelo.fechaRegreso) : 0;
  const total = vuelo && hotel ? vuelo.precio + hotel.precioNoche * noches : null;

  return (
    <Estado loading={loading} error={error}>
      {destino && (
        <section>
          <Link to="/destinos" className="volver">← Volver a destinos</Link>
          <h1>{destino.emoji} {destino.nombre}, {destino.pais}</h1>
          <p>{destino.descripcion}</p>
          <ul className="chips">
            {destino.actividades.map((actividad) => (
              <li key={actividad}>{actividad}</li>
            ))}
          </ul>

          <Estado loading={cargandoOpciones} error={errorOpciones?.message}>
            {opciones && (
              <div className="dos-columnas">
                <div>
                  <h2>Vuelos</h2>
                  <ul className="lista">
                    {opciones.vuelos.map((v) => (
                      <OpcionCard
                        key={v.id}
                        titulo={v.aerolinea}
                        detalles={[v.origen, `Salida ${formatoFecha(v.fechaSalida)} · Regreso ${formatoFecha(v.fechaRegreso)}`]}
                        precio={formatoPrecio(v.precio)}
                        hayDisponibilidad={v.asientos > 0}
                        disponibilidad={v.asientos > 0 ? `${v.asientos} asientos disponibles` : "Sin asientos"}
                        seleccionado={vuelo?.id === v.id}
                        onSeleccionar={() => setVuelo(v)}
                      />
                    ))}
                  </ul>
                </div>
                <div>
                  <h2>Hoteles</h2>
                  <ul className="lista">
                    {opciones.hoteles.map((h) => (
                      <OpcionCard
                        key={h.id}
                        titulo={h.nombre}
                        detalles={["★".repeat(h.estrellas)]}
                        precio={`${formatoPrecio(h.precioNoche)} / noche`}
                        hayDisponibilidad={h.habitaciones > 0}
                        disponibilidad={h.habitaciones > 0 ? `${h.habitaciones} habitaciones disponibles` : "Sin habitaciones"}
                        seleccionado={hotel?.id === h.id}
                        onSeleccionar={() => setHotel(h)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Estado>

          <aside className="tarjeta resumen" aria-live="polite">
            <h2>Tu viaje</h2>
            {total === null ? (
              <p className="muted">Selecciona un vuelo y un hotel para ver el total.</p>
            ) : (
              <>
                <p>{vuelo.aerolinea}: {formatoPrecio(vuelo.precio)}</p>
                <p>{hotel.nombre}: {noches} noches × {formatoPrecio(hotel.precioNoche)}</p>
                <p className="total">Total estimado: {formatoPrecio(total)}</p>
              </>
            )}
          </aside>
        </section>
      )}
    </Estado>
  );
}

export default DestinoDetalle;
