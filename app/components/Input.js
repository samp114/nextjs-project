"use client";
import { useState, useEffect } from "react";

export default function Input({ 
  isOpen, 
  onClose, 
  onSave, 
  defaultValue = "", 
  mode = "add" 
}) {
  const [value, setValue] = useState("");

  
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-black">
          {mode === "edit" ? "Edit Task" : "Add Task"}
        </h2>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={mode === "edit" ? "Update your task..." : "Enter new task..."}
          className="w-full border p-2 rounded text-black placeholder-gray-400 mb-4"
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300 text-black"
          >
            Delete
          </button>
          <button
            onClick={() => {
              if (value.trim() !== "") {
                onSave(value.trim());
                setValue("");
              }
            }}
            className="px-3 py-1 rounded bg-black text-white"
          >
            {mode === "edit" ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
