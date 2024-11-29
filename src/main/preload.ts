// * 통신지점
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("Electron", {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, listener),
  },
});
