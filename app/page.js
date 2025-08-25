"use client";
const API_URL = "http://localhost:5000/api/tasks";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import View from "./components/View";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() === "") return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, status: "in-progress" }),
      });
      const task = await res.json();
      setTasks([...tasks, task]); 
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
      const updated = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

 


  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAdd={addTask} />

      
      <div className="flex items-center p-4 gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 border p-2 rounded text-black placeholder-gray-400"
        />
        <button
          onClick={addTask}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          +
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Add (Popup)
        </button>
      </div>

      
      <View tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />

      
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Add Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Task Name..."
              className="w-full border p-2 rounded mb-4 text-black placeholder-gray-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 rounded bg-gray-300 text-black "
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-3 py-1 rounded bg-black text-white "
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
