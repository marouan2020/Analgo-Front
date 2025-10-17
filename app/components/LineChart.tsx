import React, {useState} from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {Pencil} from "lucide-react";

interface DataPoint {
  [key: string]: string | number;
}

interface LineChartProps {
  title?: string;
  description?: string;
  data: DataPoint[];
  xKey: string;
  lines: {
    key: string;
    color: string;
    name: string;
  }[];
  editable?: boolean;
  onChange?: (data: { title: string; description: string }) => void;
}

export default function LineChart({
  title: initialTitle = 'Bar Chart Widget',
  description: initialDescription = '',
  editable = false,
  data,
  xKey,
  lines,
  onChange,
}: LineChartProps) {
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
        <ResponsiveContainer width="100%" height="80%">
          <RechartsLineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: '#757575' }}
              tickFormatter={(value) => {
                // Format date strings (assuming YYYY-MM-DD format)
                if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
                return value;
              }}
            />
            <YAxis tick={{ fill: '#757575' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
              }}
              labelFormatter={(value) => {
                // Format date strings (assuming YYYY-MM-DD format)
                if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                }
                return value;
              }}
            />
            <Legend />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
   </div>
  );
};
