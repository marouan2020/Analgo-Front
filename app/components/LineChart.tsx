import React from 'react';
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

interface DataPoint {
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  xKey: string;
  lines: {
    key: string;
    color: string;
    name: string;
  }[];
  title?: string;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  lines,
  title,
  className = ''
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
  );
};

export default LineChart;
