// * 메인 프로세스 진입점.
import { app, BrowserWindow, ipcMain } from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Webpack 플러그인이 제공하는 렌더러 프로세스 경로 로드
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
}

app.on("ready", () => {
  createWindow();

  // macOS에서 애플리케이션이 활성화되었을 때 창 생성
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// macOS가 아닌 환경에서는 모든 창이 닫히면 애플리케이션 종료
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC 통신 이벤트 핸들러 등록
ipcMain.on("channel", (event, message) => {
  console.log(`메시지 수신: ${message}`);
  // 필요한 로직 추가: 메시지 처리, 응답 등
  event.reply("channel-reply", `Received: ${message}`);
});
