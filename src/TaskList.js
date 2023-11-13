import React from "react";
import Task from "./Task";
import "./styles/TaskList.css";

function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onUpdate={(data) => {
            onUpdate(index, data);
          }}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ul>
  );
}

export default TaskList;
