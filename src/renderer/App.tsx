import React from "react";
import RepositoryManager from "./components/repository/RepositoryManager";

export const App = () => {
  return (
    <>
      <div>
        <h1>Hello, Electron!</h1>
      </div>
      <RepositoryManager />
    </>
  );
};
