import React, {useState} from 'react';

interface StatCardProps {
  title?: string;
  description?: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
  editable?: boolean;
  onChange?: (data: { title: string; description: string }) => void;
}
import {Pencil} from "lucide-react";

export default function StatCard({
 title: initialTitle = 'Stat card Widget',
 description: initialDescription = '',
  value, 
  change, 
  icon, 
  className = '',
  editable = false,
  onChange,
}: StatCardProps){
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [isEditing, setIsEditing] = useState(false);
    const handleSave = () => {
        setIsEditing(false);
        if (onChange) {
            onChange({ title, description });
        }
    };
    // @ts-ignore
  return (
      <div className="w-full h-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            {/* 🔹 Titre et description */}
            <div
              className={`pl-4 pt-2 border-b z-99999 border-gray-100 bg-gray-50 ${
                  isEditing ? 'absolute h-45  w-full' : 'relative'
              }`}
            >
              {editable && (
                  <button
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                      onClick={() => setIsEditing(!isEditing)}
                      title={isEditing ? 'Save' : 'Edit'}
                  >
                      <Pencil size={18} />
                  </button>
              )}

              {isEditing ? (
                  <div className="space-y-2">
                      <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full border rounded-md px-2 py-1 text-gray-800 font-medium"
                          placeholder="Enter a title..."
                      />
                      <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full border rounded-md px-2 py-1 text-gray-700 text-sm"
                          placeholder="Enter a description..."
                      />
                      <button
                          onClick={handleSave}
                          className="mt-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                          Save
                      </button>
                  </div>
              ) : (
                  <>
                      <p className='mb-0 w-full text-1xl pb-1 font-bold'>{title}</p>
                      <p className='mb-0 w-full text-gray-500 pb-2 font-normal'>{description}</p>
                  </>
              )}
            </div>
            <div className={`bg-white dark:bg-background-dark rounded-lg shadow-md p-6 ${className}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-primary dark:text-white text-2xl font-semibold">{value}</p>
                  {change && (
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {change.isPositive ? '+' : ''}{change.value}%
                      </span>
                      <span className="text-text-secondary dark:text-gray-400 text-xs ml-1">vs. previous period</span>
                    </div>
                  )}
                </div>
                {icon && (
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    {icon}
                  </div>
                )}
              </div>
            </div>
   </div>
  );
};
