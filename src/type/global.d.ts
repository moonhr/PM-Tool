declare global {
  interface Repository {
    id: string;
    path: string;
  }
  interface Window {
    // Electron API 객체 정의
    electronApi: {
      // 저장소 저장 메서드
      saveRepositories: (repositories: Repository[]) => Promise<void>;
      // 저장소 불러오기 메서드
      loadRepositories: () => Promise<Repository[]>;
      // 디렉토리 다이얼로그 열기 메서드
      openDirectoryDialog: () => Promise<string | null>;
      // Git 브랜치 생성 메서드
      createBranch: (branchName: string) => Promise<void>;
    };
  }
}

export {};
