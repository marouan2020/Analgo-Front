'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface Visitor {
    visitDate: string;
    number_view: number;
}

interface VisitorsChartProps {
    data: Visitor[];
}

export function VisitorsChart({data}: VisitorsChartProps) {
    const chartData = {
        labels: data.map(d => new Date(d.visitDate)),
        datasets: [
            {
                label: '',
                data: data.map(d => d.number_view),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: '',
            },
        },
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'day',
                    tooltipFormat: 'dd/MM/yyyy',
                },
                title: {
                    display: false,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Visitors number',
                },
                beginAtZero: true,
            },
        },
    };

    // @ts-expect-error: Bug dans les types de la librairie Chart.js
    return <Line data={chartData} options={options} />;
}
