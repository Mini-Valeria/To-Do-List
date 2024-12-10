import React, { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  _id: string;
  title: string;
  dateEnd: string;
  description: string;
  status: "pending" | "active" | "completed";
};

export const Pending = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/activity/get");
        setTasks(response.data.tasks.filter((task: Task) => task.status === "pending"));
      } catch (error) {
        console.error("Error al obtener tareas pendientes:", error);
      }
    };

    fetchPendingTasks();
  }, []);

  return (
    <div className="task-container">
      <h1>-ˏˋ⋆ Tᴀʀᴇᴀꜱ ᴘᴇɴᴅɪᴇɴᴛᴇꜱ ⋆ˊˎ-</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - <small>{task.dateEnd}</small>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pending;
