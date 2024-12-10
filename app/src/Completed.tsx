import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './Completed.css'; 

type Task = {
  _id: string;
  title: string;
  dateEnd: string;
  description: string;
  status: "pending" | "active" | "completed";
};

export const Completed = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/activity/get");
        setTasks(response.data.tasks.filter((task: Task) => task.status === "completed"));
      } catch (error) {
        console.error("Error al obtener tareas completadas:", error);
      }
    };

    fetchCompletedTasks();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:4000/activity/delete${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      Swal.fire("Tarea eliminada", "La tarea ha sido eliminada correctamente.", "success");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };

  return (
    <div className="task-container">
      <h1>Completed Tasks</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <strong>{task.title}</strong> - <small>{task.dateEnd}</small>
            <p>{task.description}</p>
            <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Completed;
