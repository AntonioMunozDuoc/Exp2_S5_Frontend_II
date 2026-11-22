import { delay, graphql, http, HttpResponse } from "msw";
import { destinos, opciones } from "./data.js";

export const handlers = [
  // REST: listado de destinos (país y actividades populares).
  http.get("/api/destinos", async () => {
    await delay(500);
    return HttpResponse.json(destinos.map(({ hoteles, base, ...destino }) => destino));
  }),

  // REST: un destino por id; responde 404 si no existe.
  http.get("/api/destinos/:id", async ({ params }) => {
    await delay(300);
    const destino = destinos.find((d) => d.id === params.id);
    if (!destino) return HttpResponse.json({ mensaje: "Destino no encontrado" }, { status: 404 });
    const { hoteles, base, ...resto } = destino;
    return HttpResponse.json(resto);
  }),

  // GraphQL: vuelos y hoteles de un destino en una sola consulta.
  graphql.query("OpcionesDestino", async ({ variables }) => {
    await delay(700);
    const datos = opciones(variables.destinoId);
    if (!datos) return HttpResponse.json({ errors: [{ message: "Destino no encontrado" }] });
    return HttpResponse.json({ data: datos });
  }),
];
