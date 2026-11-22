import { useEffect, useState } from "react";

// Pide una URL REST y devuelve { data, loading, error }; cancela la petición si el componente se desmonta.
export default function useFetch(url) {
  const [estado, setEstado] = useState({ data: null, loading: true, error: "" });

  useEffect(() => {
    const controller = new AbortController();
    setEstado({ data: null, loading: true, error: "" });

    fetch(url, { signal: controller.signal })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(respuesta.status === 404 ? "No encontramos lo que buscas." : `Error del servidor (${respuesta.status}).`);
        }
        return respuesta.json();
      })
      .then((data) => setEstado({ data, loading: false, error: "" }))
      .catch((error) => {
        if (error.name !== "AbortError") setEstado({ data: null, loading: false, error: error.message });
      });

    return () => controller.abort();
  }, [url]);

  return estado;
}
