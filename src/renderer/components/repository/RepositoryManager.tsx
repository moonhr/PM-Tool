import React, { useEffect, useState } from "react";
import RepositoryList from "./RepositoryList";
import AddRepositoryButton from "./AddRepositoryButton";
import RepositoryTaskManager from "./RepositoryTaskManager";

interface Repository {
  id: string;
  path: string;
}

const RepositoryManager: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      const loadedRepositories = await window.electronApi.loadRepositories();
      if (Array.isArray(loadedRepositories)) {
        setRepositories(loadedRepositories);
      } else {
        console.error(
          "Loaded repositories are not an array:",
          loadedRepositories
        );
        setRepositories([]);
      }
    };

    fetchRepositories();
  }, []);

  const addRepository = (selectedPath: string) => {
    const newRepository: Repository = {
      id: new Date().toISOString(),
      path: selectedPath,
    };

    const updatedRepositories = [...repositories, newRepository];
    setRepositories(updatedRepositories);
    window.electronApi.saveRepositories(updatedRepositories);
  };

  const handleSelectRepository = (repository: Repository) => {
    setSelectedRepository(repository);
  };

  return (
    <div>
      <h2>Repositories</h2>
      <AddRepositoryButton onAdd={addRepository} />
      <RepositoryList
        repositories={repositories}
        onSelect={handleSelectRepository}
      />
      {selectedRepository && (
        <RepositoryTaskManager repository={selectedRepository} />
      )}
    </div>
  );
};

export default RepositoryManager;
