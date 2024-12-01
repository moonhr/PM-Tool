import { contextBridge, ipcRenderer } from "electron";

interface Repository {
  id: string;
  path: string;
}

contextBridge.exposeInMainWorld("Electron", {
  saveRepositories: async (repositories: Repository[]): Promise<void> => {
    try {
      await ipcRenderer.invoke("repository:save", repositories);
    } catch (error) {
      console.error("Failed to save repositories:", error);
    }
  },
  loadRepositories: async (): Promise<Repository[]> => {
    try {
      return await ipcRenderer.invoke("repository:load");
    } catch (error) {
      console.error("Failed to load repositories:", error);
      return [];
    }
  },
  openDirectoryDialog: async (): Promise<string | null> => {
    try {
      return await ipcRenderer.invoke("dialog:open-directory");
    } catch (error) {
      console.error("Failed to open directory dialog:", error);
      return null;
    }
  },
  createBranch: async (branchName: string): Promise<void> => {
    try {
      await ipcRenderer.invoke("git:create-branch", branchName);
    } catch (error) {
      console.error("Failed to create branch:", error);
    }
  },
});
