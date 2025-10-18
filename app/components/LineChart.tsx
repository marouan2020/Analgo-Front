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
import BarChartHeader from "@/app/components/BarChartHeader";

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
  title = 'Bar Chart Widget',
  description = 'Add description',
  editable = false,
  data,
  xKey,
  lines,
  onChange,
}: LineChartProps) {
    // @ts-ignore
  return (
      <div className="w-full h-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <BarChartHeader
              type={'line'}
              title={title}
              description={description}
              editable={editable}
              onChange={onChange}
          />
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
