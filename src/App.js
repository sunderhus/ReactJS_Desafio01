import React, { useState, useEffect } from "react";
import api from "./services/api";
import RepositoryItem from "./components/RepositoryItem";
import Button from "./components/Button";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", {
        url: "https://github.com/Rocketseat/umbriel",
        title: `React JS ${Date.now()}`,
        techs: ["Node", "Express", "TypeScript"],
      });
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <RepositoryItem key={repository.id} title={repository.title}>
            <Button
              label="Remover"
              handleFunction={() => handleRemoveRepository(repository.id)}
            />
          </RepositoryItem>
        ))}
      </ul>

      <Button handleFunction={handleAddRepository} label="Adicionar"/>
    </div>
  );
}

export default App;
