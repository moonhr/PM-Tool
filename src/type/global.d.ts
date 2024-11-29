// src/types/global.d.ts
declare global {
  interface Window {
    Electron: {
      ipcRenderer: {
        send: (channel: string, data: any) => void;
        on: (
          channel: string,
          listener: (event: any, ...args: any[]) => void
        ) => void;
      };
    };
  }
}

export {};
