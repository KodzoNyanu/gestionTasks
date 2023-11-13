import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import axios from "axios";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    titre: "",
    description: "",
    statut: "incomplet",
  });

  const getTaskList = async () => {
    const response = await axios.get("http://localhost:3001/tasks"); // permet de faire une requête get de l'api pr récupérer la liste des tâches
    setTasks(response.data); // permet de faire de modifier la liste des tâches
  };

  const addTask = async () => {
    if (newTask.titre && newTask.description) {
      const res = await axios
        .post("http://localhost:3001/tasks", newTask)
        .catch((err) => {
          alert(err.response.data.message);
        }); // permet de faire une requête post de l'api pr ajouter une nvelle tâche

      const newTaskObject = res.data;

      setTasks([newTaskObject, ...tasks]);
      setNewTask({
        id: uuidv4(),
        titre: "",
        description: "",
        statut: "incomplet",
      });
    }
  };

  const updateTask = async (index, updateData) => {
    await axios
      .put(`http://localhost:3001/tasks/${tasks[index].id}`, updateData)
      .catch((err) => {
        return alert(err.response.data.message);
      });

    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], updateData };

    setTasks(newTasks);
  };

  const deleteTask = async (index) => {
    await axios
      .delete(`http://localhost:3001/tasks/${tasks[index].id}`)
      .catch((err) => {
        alert(err.response.data.message);
      });

    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <main className="container">
      <h1>Liste de tâches</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Tire de la tâche"
          value={newTask.titre}
          onChange={(e) => setNewTask({ ...newTask, titre: e.target.value })}
        />
        <textarea
          type="text"
          rows="4"
          placeholder="Description de la tâche"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        ></textarea>
        <button onClick={addTask}>Ajouter</button>
      </div>
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </main>
  );
}

export default App;
