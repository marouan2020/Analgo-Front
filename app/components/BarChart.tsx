'use client';

import React from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import BarChartHeader from "@/app/components/BarChartHeader";

interface DataPoint {
    [key: string]: string | number;
}

interface BarChartProps {
    title?: string;
    description?: string;
    data: DataPoint[];
    xKey: string;
    bars: {
        key: string;
        color: string;
        name: string;
    }[];
    editable?: boolean;
    onChange?: (data: { title: string; description: string }) => void;
}

export default function BarChart({
                                     title = 'Bar Chart Widget',
                                     description = 'Add description',
                                     data,
                                     xKey,
                                     bars,
                                     editable = false,
                                     onChange,
                                 }: BarChartProps) {
    return (
        <div className="w-full h-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            {/* Header du graphique */}
            <BarChartHeader
                type={'bar'}
                title={title}
                description={description}
                editable={editable}
                onChange={onChange}
            />

            {/* Graphique */}
            <ResponsiveContainer width="100%" height="80%">
                <RechartsBarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                        dataKey={xKey}
                        tick={{ fill: '#757575' }}
                        tickFormatter={(value) => {
                            if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            }
                            return typeof value === 'string' && value.length > 15
                                ? value.substring(0, 12) + '...'
                                : value;
                        }}
                    />
                    <YAxis tick={{ fill: '#757575' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        }}
                        labelFormatter={(value) => {
                            if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                });
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
        </div>
    );
}
