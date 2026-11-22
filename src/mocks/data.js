// Datos del backend mock. Los vuelos y hoteles se generan por destino para mantener el archivo breve.
export const destinos = [
  { id: "1", nombre: "Cusco", pais: "Perú", continente: "América", emoji: "🏔️", base: 190000,
    descripcion: "Antigua capital del Imperio inca, puerta de entrada a Machu Picchu.",
    actividades: ["Machu Picchu", "Valle Sagrado", "Montaña de 7 colores"], hoteles: ["Hotel Inca Real", "Casa Andina", "Hostal Plaza"] },
  { id: "2", nombre: "Río de Janeiro", pais: "Brasil", continente: "América", emoji: "🏖️", base: 250000,
    descripcion: "Playas, cerros y una vida nocturna inconfundible.",
    actividades: ["Cristo Redentor", "Pan de Azúcar", "Playa de Ipanema"], hoteles: ["Copacabana Palace", "Hotel Ipanema Sol", "Rio Hostel"] },
  { id: "3", nombre: "Roma", pais: "Italia", continente: "Europa", emoji: "🏛️", base: 780000,
    descripcion: "Historia a cada paso: del Coliseo a la Fontana de Trevi.",
    actividades: ["Coliseo romano", "Vaticano", "Fontana de Trevi"], hoteles: ["Hotel Forum", "Roma Centro", "Pensione Trastevere"] },
  { id: "4", nombre: "Tokio", pais: "Japón", continente: "Asia", emoji: "🗼", base: 1250000,
    descripcion: "Tradición y tecnología en una de las ciudades más grandes del mundo.",
    actividades: ["Templo Senso-ji", "Cruce de Shibuya", "Monte Fuji"], hoteles: ["Hotel Shinjuku", "Asakusa Inn", "Capsule Shibuya"] },
  { id: "5", nombre: "Ciudad de México", pais: "México", continente: "América", emoji: "🌮", base: 420000,
    descripcion: "Capital cultural, con museos, mercados y gastronomía de primer nivel.",
    actividades: ["Teotihuacán", "Coyoacán", "Xochimilco"], hoteles: ["Hotel Zócalo", "Roma Norte Suites", "Casa Condesa"] },
  { id: "6", nombre: "Sídney", pais: "Australia", continente: "Oceanía", emoji: "🦘", base: 1450000,
    descripcion: "Bahía, ópera y playas junto a una gran ciudad.",
    actividades: ["Ópera de Sídney", "Bondi Beach", "Blue Mountains"], hoteles: ["Harbour View", "Bondi Lodge", "The Rocks Hostel"] },
];

const AEROLINEAS = ["LATAM", "Sky Airline", "Iberia", "Air Canada"];
const SALIDAS = ["2027-01-15", "2027-02-10", "2027-03-05"];
const NOCHES = [7, 9, 6];

const sumarDias = (fecha, dias) => {
  const d = new Date(`${fecha}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
};

// Devuelve { vuelos, hoteles } del destino, o null si no existe. Incluye __typename para Apollo Client.
export function opciones(destinoId) {
  const d = destinos.find((x) => x.id === destinoId);
  if (!d) return null;
  const n = Number(d.id);
  const vuelos = SALIDAS.map((salida, i) => ({
    __typename: "Vuelo",
    id: `${d.id}-V${i + 1}`,
    aerolinea: AEROLINEAS[(n + i) % AEROLINEAS.length],
    origen: "Santiago (SCL)",
    fechaSalida: salida,
    fechaRegreso: sumarDias(salida, NOCHES[i]),
    precio: Math.round((d.base * (1 + i * 0.08)) / 1000) * 1000,
    asientos: [12, 4, n % 3 === 0 ? 0 : 7][i],
  }));
  const hoteles = d.hoteles.map((nombre, i) => ({
    __typename: "Hotel",
    id: `${d.id}-H${i + 1}`,
    nombre,
    estrellas: 5 - i,
    precioNoche: Math.round((d.base * [0.14, 0.09, 0.05][i]) / 1000) * 1000,
    habitaciones: [6, 2, n % 2 === 0 ? 0 : 9][i],
  }));
  return { vuelos, hoteles };
}
