interface Repository {
  id: string;
  path: string;
}
declare global {
  interface Window {
    Electron: {
      /**
       * Save repositories to the storage.
       * @param repositories - An array of repositories to save.
       */
      saveRepositories: (repositories: Repository[]) => Promise<void>;

      /**
       * Load repositories from the storage.
       * @returns A promise that resolves to an array of repositories.
       */
      loadRepositories: () => Repository<any[]>;
      /**
       * 파일 탐색기를 열어 디렉토리를 선택하는 함수
       * @returns 선택한 디렉토리 경로 또는 null
       */
      openDirectoryDialog: () => Promise<string | null>;
    };
  }
}

export {};
