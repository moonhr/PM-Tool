import React from "react";

interface AddRepositoryButtonProps {
  onAdd: (path: string) => void;
}

const AddRepositoryButton: React.FC<AddRepositoryButtonProps> = ({ onAdd }) => {
  const handleAddRepository = async () => {
    const selectedPath = await window.Electron.openDirectoryDialog();
    if (selectedPath) {
      onAdd(selectedPath);
    }
  };

  return <button onClick={handleAddRepository}>Add Repository</button>;
};

export default AddRepositoryButton;
