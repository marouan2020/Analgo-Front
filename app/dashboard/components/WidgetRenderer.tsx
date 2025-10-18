'use client';
import dynamic from 'next/dynamic';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import StatCard from '../../components/StatCard';

const MapsCard = dynamic(() => import('../../components/MapsCard'), { ssr: false });

export default function WidgetRenderer({ id, availableWidgets, markers, isDraggable }) {
    const widget = availableWidgets.find(w => w.id === id);
    if (!widget) return null;

    try {
        const settings = typeof widget.settings === 'string' ? JSON.parse(widget.settings) : widget.settings;
        switch (settings.type) {
            case 'LineChart':
                return <LineChart title={widget.name} data={settings.data} xKey={settings.xKey} lines={settings.lines} editable={!isDraggable} />;
            case 'BarChart':
                return <BarChart title={widget.name} data={settings.data} xKey={settings.xKey} bars={settings.bars} editable={!isDraggable} />;
            case 'StatChart':
                return <StatCard title={widget.name} value={settings.value} change={settings.change} editable={!isDraggable} />;
            case 'MapsCard':
                return <MapsCard markers={markers} editable={!isDraggable} />;
            default:
                return <p>Unknown widget type: {settings.type}</p>;
        }
    } catch {
        return <p>Invalid widget settings</p>;
    }
}
