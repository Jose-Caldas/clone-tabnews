import useSWR from "swr";
import styles from "../status/styles.module.css";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const statusCheck = isLoading ? "🔴" : "🟢";
  const updatedAt = isLoading
    ? "Carregando..."
    : new Date(data.updated_at).toLocaleString("pt-BR");
  const version = data && data.dependencies.database.version;
  const connections = data && data.dependencies.database.max_connections;
  const openedConnections =
    data && data.dependencies.database.opened_connections;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{statusCheck} Status / Database - PostgresSQL</h1>
        <h2>Versão: {version}</h2>
      </div>
      <div className={styles.content}>
        <h2>Última atualização: {updatedAt}</h2>
        <h2>Conexões máximas: {connections}</h2>
        <h2>Conexões abertas: {openedConnections}</h2>
      </div>
    </div>
  );
}
