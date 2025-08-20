"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import View from "./components/View";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // load tasks 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  // save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
    setShowAddModal(false); 
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const updateTask = (index, newText) => {
    const updated = [...tasks];
    updated[index] = newText;
    setTasks(updated);
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
