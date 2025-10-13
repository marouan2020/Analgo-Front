import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
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

interface BarChartProps {
  data: DataPoint[];
  xKey: string;
  bars: {
    key: string;
    color: string;
    name: string;
  }[];
  title?: string;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  bars,
  title,
  className = ''
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
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
            // Truncate long strings
            if (typeof value === 'string' && value.length > 15) {
              return value.substring(0, 12) + '...';
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
        {bars.map((bar) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            name={bar.name}
            fill={bar.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
