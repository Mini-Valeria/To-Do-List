import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Swal from "sweetalert2";
import axios from "axios";

type Task = {
  _id: string;
  title: string;
  dateEnd: string;
  description: string;
  status: "Pending" | "Active" | "Completed";
};

export function Home() {
  const [title, setTitle] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const idUser = "6757905a4a54d5f049c99a7a"; // Ejemplo de ID

  // Función para mostrar solo la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    // Obtener tareas al cargar el componente
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/activity/get");
        const fetchedTasks = response.data.tasks || [];

        // Mover tareas vencidas automáticamente a "Pending"
        const currentDate = new Date().toISOString().split("T")[0];
        const updatedTasks = fetchedTasks.map((task: Task) => {
          if (task.status === "Active" && task.dateEnd < currentDate) {
            task.status = "Pending";
          }
          return task;
        });

        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTasks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !dateEnd || !description) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    try {
      Swal.fire("Guardando Tarea...");
      Swal.showLoading();

      const { data } = await axios.post("http://localhost:4000/activity/create", {
        title,
        dateEnd,
        description,
        status: "Active", 
        idUser,
      });

      setTasks((prevTasks) => (data.task ? [...prevTasks, data.task] : prevTasks));
      Swal.fire(data.msg, "", "success");

      setTitle("");
      setDateEnd("");
      setDescription("");
    } catch (error: any) {
      console.error("Error al guardar la tarea:", error.message);
      Swal.fire("Error", "No se pudo guardar la tarea", "error");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:4000/activity/delete/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      Swal.fire("Tarea eliminada", "La tarea ha sido eliminada correctamente.", "success");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: "Pending" | "Active" | "Completed") => {
    try {
      const response = await axios.put(`http://localhost:4000/activity/update/${taskId}`, { status: newStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );

      Swal.fire("Estado actualizado", response.data.message, "success");
    } catch (error: any) {
      console.error("Error al actualizar la tarea:", error);
      Swal.fire("Error", "No se pudo actualizar el estado de la tarea", "error");
    }
  };

  const handleNavigate = (status: "Completed" | "Pending") => {
    navigate(`/${status}`);
  };

  return (
    <div className="home-app">
      <h1 className="title">-ˏˋ⋆ Tᴏ Dᴏ Aᴘᴘ ⋆ˊˎ-</h1>

      {/* Formulario para crear tareas */}
      <form className="todo-form" onSubmit={handleTasks}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
        <button type="submit">📝 Agregar tarea</button>
      </form>
      <div className="navigation-buttons">
        <button onClick={() => handleNavigate("Completed")}>✅ Tareas completadas</button>
        <button onClick={() => handleNavigate("Pending")}>⌛ Tareas pendientes</button>
      </div>

      {/* Lista de tareas activas */}
      <ul className="todo-list">
        <h2 className="title">Tareas en curso</h2>
        {tasks
          .filter((task) => task.status === "Active")
          .map((task) => (
            <li key={task._id} className="todo-item">
              <strong>{task.title}</strong> - <small>{formatDate(task.dateEnd)}</small> {/* Solo la fecha */}
              <p>{task.description}</p>
              <button onClick={() => handleUpdateTaskStatus(task._id, "Completed")}>Complete</button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;
