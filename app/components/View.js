"use client";
import { useState } from "react";
import { Trash, Edit2 } from "lucide-react";
import Input from "./Input";

export default function View({ tasks, onDelete, onUpdate }) {
  const [editIndex, setEditIndex] = useState(null);

  return (
    <div className="p-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
          >
            <span className="text-black">{task}</span>

            <div className="flex gap-2 ml-2">
              <button
                onClick={() => setEditIndex(index)}
                className="text-blue-600"
                aria-label="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-600"
                aria-label="Delete"
              >
                <Trash size={18} />
              </button>
            </div>

           {/* popup thing */}
            {editIndex === index && (
              <Input
                isOpen={true}
                onClose={() => setEditIndex(null)}
                onSave={(newValue) => {
                  onUpdate(index, newValue);
                  setEditIndex(null);
                }}
                defaultValue={task}   
                mode="edit"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
