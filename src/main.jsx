import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import App from "./App.jsx";
import "./index.css";

// Cliente GraphQL: las consultas van a /graphql, que MSW intercepta.
const client = new ApolloClient({ link: new HttpLink({ uri: "/graphql" }), cache: new InMemoryCache() });

// El backend es un mock, así que MSW se activa siempre (también en gh-pages).
async function enableMocking() {
  const { worker } = await import("./mocks/browser.js");
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
}

// HashRouter evita el error 404 al recargar una ruta en GitHub Pages.
enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <HashRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </HashRouter>
    </StrictMode>
  );
});
