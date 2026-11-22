// Muestra spinner o error mientras los datos no estén listos; si lo están, renderiza el contenido.
function Estado({ loading, error, children }) {
  if (loading) {
    return (
      <div className="estado" role="status">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }
  if (error) {
    return <div className="alerta" role="alert">{error}</div>;
  }
  return children;
}

export default Estado;
