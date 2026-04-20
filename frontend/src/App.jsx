import { useEffect, useState, useCallback } from "react";
import { getTasks, createTask, deleteTask, toggleTask } from "./api";

function App() {
  const [tasks, setTasks]     = useState([]);
  const [title, setTitle]     = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Error al cargar tareas.");
      }
    };
    fetchTasks();
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error al cargar tareas.");
    }
  }, []);

  const handleCreate = async () => {
    if (title.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createTask({ title: title.trim() });
      setTitle("");
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.title?.[0] || "Error al crear tarea.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  const handleToggle = async (task) => {
    await toggleTask(task.id, { completed: !task.completed });
    await loadTasks();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCreate();
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Lista de Tareas</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nueva tarea..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleCreate} disabled={loading}>
          {loading ? "..." : "Agregar"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span
              onClick={() => handleToggle(task)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#aaa" : "#000",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => handleDelete(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;