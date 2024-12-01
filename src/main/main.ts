// * 메인 프로세스 진입점.
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { exec } from "child_process";
import { saveRepositories, loadRepositories } from "./repositoryStore";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow | null = null;

// 창 생성 함수
function createWindow() {
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow!.show();
    mainWindow!.webContents.openDevTools();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).catch((error) => {
    console.error("Failed to load renderer process:", error);
  });
}

// 애플리케이션 이벤트 처리
app.on("ready", createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC 핸들러 등록
ipcMain.handle("repository:save", async (_, repositories) => {
  try {
    saveRepositories(repositories);
  } catch (error) {
    console.error("Failed to save repositories:", error);
    throw error;
  }
});

ipcMain.handle("repository:load", async () => {
  try {
    return loadRepositories();
  } catch (error) {
    console.error("Failed to load repositories:", error);
    throw error;
  }
});

ipcMain.handle("dialog:open-directory", async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ["openDirectory"],
    });
    return result.canceled ? null : result.filePaths[0];
  } catch (error) {
    console.error("Failed to open directory dialog:", error);
    throw error;
  }
});

// IPC 핸들러에서 Git 브랜치 생성하기
ipcMain.handle("git:create-branch", async (_, branchName: string) => {
  try {
    exec(`git checkout -b ${branchName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating branch: ${stderr}`);
        throw new Error(stderr);
      }
      console.log(`Branch created: ${stdout}`);
    });
  } catch (error) {
    console.error("Failed to create Git branch:", error);
    throw error;
  }
});
