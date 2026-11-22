# Agencia de viajes (Frontend II)

**Alumno:** Antonio Muñoz
**Asignatura:** Desarrollo Frontend II (PFY2202) - Duoc UC
**Evaluación:** Actividad sumativa, Experiencia 2, Semana 5 - "Integrando nuestro frontend con backend"

Aplicación de una agencia de viajes hecha con **React 18, Vite y React Router v6**. El usuario explora destinos, elige uno y ve los vuelos y hoteles disponibles, con precios, fechas y disponibilidad. Calcula el total estimado del viaje.

## Enlaces

- **Repositorio:** https://github.com/AntonioMunozDuoc/Exp2_S5_Frontend_II
- **Sitio publicado:** https://antoniomunozduoc.github.io/Exp2_S5_Frontend_II/

## Cómo se integra el backend mock

El backend es un **Mock Service Worker (MSW)** que corre en el navegador (`src/mocks/`). Se activa siempre, también en gh-pages, porque no existe un backend real.

| Tecnología | Endpoint | Uso |
| --- | --- | --- |
| REST | `GET /api/destinos` | Lista los destinos con país, continente y actividades populares (`pages/Destinos.jsx`). |
| REST | `GET /api/destinos/:id` | Datos de un destino; responde 404 si no existe (`pages/DestinoDetalle.jsx`). |
| GraphQL | `query OpcionesDestino($destinoId: ID!)` | Vuelos y hoteles del destino en una sola consulta, con Apollo Client (`graphql/queries.js`). |

## Cumplimiento de la pauta

| Criterio | Dónde se implementa |
| --- | --- |
| Interfaz funcional y responsiva | CSS propio con grilla `auto-fill`, menú que se acomoda y vista de detalle que pasa a una columna bajo 700 px (`index.css`). |
| API REST mock | `mocks/handlers.js` (`http.get`) y hook `hooks/useFetch.js`, con estados de carga y error. |
| API GraphQL mock | `mocks/handlers.js` (`graphql.query`) y `useQuery` en `DestinoDetalle.jsx`. |
| React Router | `App.jsx`: ruta padre con `Layout`/`Outlet`, ruta dinámica `/destinos/:id`, `NavLink` y ruta `*` (404). |
| Código modular | Páginas, componentes reutilizables (`Estado`, `DestinoCard`, `OpcionCard`), hook propio, datos y consultas separados. |
| Manejo de estado | `useState` y `useEffect` (búsqueda, filtro, selección de vuelo y hotel, reinicio al cambiar de destino) y `useMemo` para la lista filtrada. |
| GitHub y gh-pages | Ver "Publicar". |

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/destinos` | Listado de destinos con búsqueda y filtro por continente |
| `/destinos/:id` | Detalle del destino, vuelos, hoteles y resumen del viaje |
| `*` | 404 |

## Ejecutar y publicar

```bash
npm install
npm run dev        # desarrollo
npm run build      # compilación
npm run deploy     # publica dist/ en la rama gh-pages
```

`vite.config.js` define `base: "/viajes-antonio-munoz-PFY2202/"`; debe coincidir con el nombre del repositorio. Se usa `HashRouter` para que recargar una ruta no dé error 404 en GitHub Pages.

## Pruebas en navegadores

Se probó el flujo completo (inicio → destinos → búsqueda y filtro → detalle → selección de vuelo y hotel → total, recarga en el detalle, destino inexistente y ruta 404) y no hubo errores en consola. Completar las filas pendientes al probar el sitio publicado:

| Navegador | Versión | Listado | Detalle (REST + GraphQL) | Responsive | Observaciones |
| --- | --- | --- | --- | --- | --- |
| Chromium (Chrome) | Playwright, 1280 px y 375 px | OK | OK | OK, sin scroll horizontal | Sin errores ni advertencias |
| Firefox | | | | | |
| Edge | | | | | |
| Safari / móvil | | | | | |
