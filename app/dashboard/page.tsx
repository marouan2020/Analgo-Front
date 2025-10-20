'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import DashboardHeader from './components/DashboardHeader';
import DashboardGrid from './components/DashboardGrid';
import WidgetDialog from './components/WidgetDialog';

export default function DashboardPage() {
    useAuth();

    const [widgets, setWidgets] = useState<string[]>([]);
    const [availableWidgets, setAvailableWidgets] = useState<any[]>([]);
    const [layout, setLayout] = useState<any[]>([]);
    const [markers, setMarkers] = useState<{ ip: string; lat: number; lon: number }[]>([]);
    const [title, setTitle] = useState("My Dashboard");
    const [description, setDescription] = useState("Add a description here...");
    const [isDraggable, setIsDraggable] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [tempWidgets, setTempWidgets] = useState<string[]>([]);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('analgo_token');
        if (!token) return;

        const fetchData = async () => {
            try {
                const [dashboardRes, widgetsRes, markersRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_GET_DASHBOARD}?analgoToken=${token}`),
                    axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_WIDGETS}?analgoToken=${token}`),
                    fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_GET_IPSVISITORS}?analgoToken=${token}`).then(r => r.json())
                ]);
                const d = dashboardRes.data;
                setTitle(d.title || 'My Dashboard');
                setDescription(d.description || 'Add a description here...');
                setWidgets(Array.isArray(d.widgets) ? d.widgets : []);
                setLayout(Array.isArray(d.layout) ? d.layout : []);
                setAvailableWidgets(widgetsRes.data || []);
                setMarkers(markersRes);
            } catch (err) {
                console.error(err);
                setError('An error occured after load dashboard!');
                setTimeout(function() {
                    setError(null);
                },3000);
            }
        };
        fetchData();
    }, []);

    const saveDashboard = async () => {
        const token = localStorage.getItem('analgo_token');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_SAVE_DASHBOARD}?analgoToken=${token}`, {
                title, description, layout, widgets,
            });
            setSuccess('Dashboard saved success.');
        } catch (err) {
            console.error('Error saving dashboard.', err);
            setError('Error saving dashboard.');
        }
        setTimeout(function() {
            setSuccess(null);
            setError(null);
        },3000);
    };

    return (
        <div className="p-6 space-y-6">
            {success && (
                <div className="mb-4 p-3 fixed-msg rounded-start-2 bg-green-100 text-green-800 border border-green-300">
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-4 p-3 fixed-msg rounded-start-2 bg-red-100 text-red-800 border border-red-300">
                    {error}
                </div>
            )}
            <DashboardHeader
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                openDialog={() => { setTempWidgets(widgets); setIsOpen(true); }}
            />
            <DashboardGrid
                widgets={widgets}
                layout={layout}
                setLayout={setLayout}
                availableWidgets={availableWidgets}
                isDraggable={isDraggable}
                markers={markers}
            />
            <WidgetDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                availableWidgets={availableWidgets}
                tempWidgets={tempWidgets}
                toggleWidget={(id) =>
                    setTempWidgets((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id])
                }
                onApply={() => { setWidgets(tempWidgets); setIsDraggable(true); setIsOpen(false); }}
                onSave={() => { setWidgets(tempWidgets); setIsDraggable(false); saveDashboard(); setIsOpen(false); }}
            />
        </div>
    );
}
