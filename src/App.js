import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Novo repo",
      url: "www.novosite.com.br",
      techs: ["node", "react", "react native"],
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repositorieIndex = repositories.findIndex(
      (repositorie) => repositorie.id === id
    );

    repositories.splice(repositorieIndex, 1);

    await api.delete(`repositories/${id}`);
    setRepository([...repositories]);
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(`${repositorie.id}`)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
