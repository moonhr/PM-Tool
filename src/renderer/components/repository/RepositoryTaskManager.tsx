import React, { useState } from "react";

interface Task {
  id: string;
  tag: string;
  name: string;
}

interface RepositoryTaskManagerProps {
  repository: { id: string; path: string };
}

const RepositoryTaskManager: React.FC<RepositoryTaskManagerProps> = ({
  repository,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  // 태그를 영문과 숫자가 혼합된 랜덤 4글자로 생성하는 함수
  const generateRandomTag = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let tag = "";
    for (let i = 0; i < 4; i++) {
      tag += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return tag;
  };

  const addTask = (taskName: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: new Date().toISOString(),
        tag: generateRandomTag(),
        name: taskName,
      },
    ]);
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing && e.currentTarget.value.trim()) {
      addTask(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  return (
    <div>
      <h3>Tasks for {repository.path}</h3>
      <input
        type="text"
        placeholder="Enter task name"
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={handleKeyDown}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (Tag: {task.tag})
            <button onClick={() => removeTask(task.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryTaskManager;
