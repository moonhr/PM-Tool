import React from "react";

interface Repository {
  id: string;
  path: string;
}

interface RepositoryListProps {
  repositories: Repository[];
  onSelect: (repository: Repository) => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  onSelect,
}) => {
  return (
    <div>
      {repositories.map((repo) => (
        <div
          key={repo.id}
          onClick={() => onSelect(repo)}
          style={{
            cursor: "pointer",
            padding: "5px",
            border: "1px solid gray",
          }}
        >
          <p>Path: {repo.path}</p>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
