import React, { useState } from "react";

interface Task {
  id: string;
  name: string;
}

interface RepositoryTaskManagerProps {
  repository: { id: string; path: string };
}

const RepositoryTaskManager: React.FC<RepositoryTaskManagerProps> = ({
  repository,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    const newTask: Task = {
      id: new Date().toISOString(),
      name: taskName,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h3>Tasks for {repository.path}</h3>
      <input
        type="text"
        placeholder="Enter task name"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            addTask(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryTaskManager;
