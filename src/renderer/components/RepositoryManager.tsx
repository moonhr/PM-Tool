import React, { useEffect, useState } from "react";

interface Repository {
  id: string;
  path: string;
}

const RepositoryManager: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      const loadedRepositories = await window.Electron.loadRepositories();
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

  const addRepository = async () => {
    const selectedPath = await window.Electron.openDirectoryDialog();
    if (selectedPath) {
      const newRepository: Repository = {
        id: new Date().toISOString(), // 고유 ID 생성
        path: selectedPath,
      };

      const updatedRepositories = [...repositories, newRepository];
      setRepositories(updatedRepositories);
      await window.Electron.saveRepositories(updatedRepositories);
    }
  };

  return (
    <div>
      <h2>Repositories</h2>
      <button onClick={addRepository}>Add Repository</button>
      {Array.isArray(repositories) &&
        repositories.map((repo) => (
          <div key={repo.id}>
            <p>Path: {repo.path}</p>
          </div>
        ))}
    </div>
  );
};

export default RepositoryManager;
