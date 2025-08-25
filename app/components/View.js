"use client";
import { useState } from "react";
import { Trash, Edit2 } from "lucide-react";
import Input from "./Input";

export default function View({ tasks, onDelete, onUpdate }) {
  const [editTaskId, setEditTaskId] = useState(null);

  return (
    <div className="p-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
          >
            <span className="text-black">{task.title}</span>

            <div className="flex gap-2 ml-2">
              <button
                onClick={() => setEditTaskId(task._id)}
                className="text-blue-600"
                aria-label="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600"
                aria-label="Delete"
              >
                <Trash size={18} />
              </button>
            </div>

            
            {editTaskId === task._id && (
              <Input
                isOpen={true}
                onClose={() => setEditTaskId(null)}
                onSave={(newValue) => {
                  onUpdate(task._id, newValue); 
                  setEditTaskId(null);
                }}
                defaultValue={task.title} 
                mode="edit"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
