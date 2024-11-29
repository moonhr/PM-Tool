// * 렌더러 프로세스 진입점

import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  // IPC 통신 예시
  const sendMessage = () => {
    window.Electron.ipcRenderer.send("channel", "Hello from Renderer!");
  };

  return (
    <div>
      <h1>Hello, Electron!</h1>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

const container = document.getElementById("root"); // 'root' ID를 가진 DOM 요소를 선택합니다.
const root = createRoot(container!); // 선택한 DOM 요소를 기반으로 React 루트를 생성합니다.
root.render(<App />); // 생성한 루트에 App 컴포넌트를 렌더링합니다.
