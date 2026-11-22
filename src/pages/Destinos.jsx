import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import Estado from "../components/Estado.jsx";
import DestinoCard from "../components/DestinoCard.jsx";

function Destinos() {
  // REST: listado de destinos.
  const { data: destinos, loading, error } = useFetch("/api/destinos");
  const [busqueda, setBusqueda] = useState("");
  const [continente, setContinente] = useState("todos");

  // Lista derivada: el arreglo original nunca se modifica.
  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return (destinos ?? []).filter(
      (d) =>
        (continente === "todos" || d.continente === continente) &&
        (termino === "" || d.nombre.toLowerCase().includes(termino) || d.pais.toLowerCase().includes(termino))
    );
  }, [destinos, busqueda, continente]);

  const continentes = [...new Set((destinos ?? []).map((d) => d.continente))];

  return (
    <section>
      <h1>Destinos</h1>
      <Estado loading={loading} error={error}>
        <div className="filtros">
          <label>
            Buscar
            <input type="search" placeholder="Ciudad o país" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </label>
          <label>
            Continente
            <select value={continente} onChange={(e) => setContinente(e.target.value)}>
              <option value="todos">Todos</option>
              {continentes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        {filtrados.length === 0 ? (
          <p className="tarjeta">No hay destinos que coincidan con tu búsqueda.</p>
        ) : (
          <div className="grilla">
            {filtrados.map((destino) => (
              <DestinoCard key={destino.id} destino={destino} />
            ))}
          </div>
        )}
      </Estado>
    </section>
  );
}

export default Destinos;
