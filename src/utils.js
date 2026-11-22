export const formatoPrecio = (valor) => "$" + valor.toLocaleString("es-CL");

export const formatoFecha = (fecha) =>
  new Date(`${fecha}T00:00:00`).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" });

export const nochesEntre = (desde, hasta) => Math.round((new Date(hasta) - new Date(desde)) / 86400000);
