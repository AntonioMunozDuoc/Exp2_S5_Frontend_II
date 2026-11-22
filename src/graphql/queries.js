import { gql } from "@apollo/client";

// Una sola consulta trae vuelos y hoteles del destino, con los campos que la interfaz necesita.
export const OPCIONES_DESTINO = gql`
  query OpcionesDestino($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      origen
      fechaSalida
      fechaRegreso
      precio
      asientos
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      estrellas
      precioNoche
      habitaciones
    }
  }
`;
