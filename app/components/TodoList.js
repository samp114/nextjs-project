import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const API_URL = "http://localhost:3000/tasks"; 


  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, status: "pending",createdBy: "user1"  }),
      });
      const createdTask = await res.json();
      setTasks([...tasks, createdTask]); 
      setNewTask("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  


  const updateTask = async (id, newText) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newText }),
      });
      const updatedTask = await res.json();
  
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  


  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>My Todo List</h1>

  
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          placeholder="Enter new task"
          onChange={(e) => setNewTask(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px" }}>Add</button>
      </div>

      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                textDecoration: task.status === "completed" ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => toggleTaskStatus(task._id, task.status)}
            >
              {task.title} ({task.status})
            </span>
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: "10px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
