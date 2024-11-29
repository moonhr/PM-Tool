import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "repositories.json");

// 파일 경로가 존재하지 않을 경우 초기화를 위한 빈 JSON 파일 생성
const initializeFileIfNotExists = () => {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([], null, 2), "utf-8");
  }
};

export const saveRepositories = (repositories: any[]) => {
  initializeFileIfNotExists();
  fs.writeFileSync(dataPath, JSON.stringify(repositories, null, 2));
};

export const loadRepositories = (): any[] => {
  initializeFileIfNotExists();
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};
