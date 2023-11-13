import React, { useState } from "react";
import "./styles/Task.css";

function Task({ task, onDelete, onUpdate }) {
  const [status, setStatus] = useState(task.statut);
  return (
    <li className="task-item">
      <div>
        <span>
          <strong>{task.titre}</strong>
        </span>
        <span>{task.description}</span>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          checked={status === "complet"}
          onChange={(e) => {
            setStatus(e.target.checked ? "complet" : "incomplet");
            onUpdate({
              ...task,
              statut: e.target.checked ? "complet" : "incomplet",
            });
          }}
        />
        <button onClick={onDelete}>Supprimer</button>
      </div>
    </li>
  );
}

export default Task;
