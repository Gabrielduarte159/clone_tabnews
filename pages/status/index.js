import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText} </div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return (
      <div>
        <h2>Banco de dados</h2>
        <strong>Versão: </strong> Carregando...
        <br />
        <strong>Máximo de conexões: </strong> Carregando...
        <br />
        <strong>Conexões abertas: </strong> Carregando...
        <br />
      </div>
    );
  }

  const database = data.dependencies.database;
  return (
    <div>
      <h2>Banco de dados</h2>
      <strong>Versão:</strong> {database.version}
      <br />
      <strong>Conexões abertas:</strong> {database.opened_connections}
      <br />
      <strong>Máximo de conexões:</strong> {database.max_connections}
      <br />
    </div>
  );
}
