import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="tarjeta estado">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
