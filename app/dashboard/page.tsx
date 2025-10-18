'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog } from '@headlessui/react';
import { Settings, X } from 'lucide-react';
import GridLayout from 'react-grid-layout';
import axios from "axios";
import Image from "next/image";
import dynamic from 'next/dynamic';
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import StatCard from "../components/StatCard";

const MapsCard = dynamic(() => import('../components/MapsCard'), { ssr: false });

export default function DashboardPage() {
    useAuth();

    // --- States ---
    const [isOpen, setIsOpen] = useState(false);
    const [widgets, setWidgets] = useState<string[]>([]);
    const [availableWidgets, setAvailableWidgets] = useState<any[]>([]);
    const [title, setTitle] = useState("My Dashboard");
    const [description, setDescription] = useState("Add a description here...");
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [tempWidgets, setTempWidgets] = useState<string[]>([]);
    const [isDraggable, setIsDraggable] = useState(false);
    const [markers, setMarkers] = useState<{ ip: string; lat: number; lon: number }[]>([]);
    const [layout, setLayout] = useState<any[]>([]);
    const [gridWidth, setGridWidth] = useState(1200);

    useEffect(() => {
        const getMarkers = async () => {
            try {
                const savedToken = localStorage.getItem('analgo_token');
                const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_GET_IPSVISITORS}?analgoToken=${savedToken}`);
                const data = await res.json();
                setMarkers(data);
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };

        const fetchDashboardSettings = async () => {
            try {
                const savedToken = localStorage.getItem('analgo_token');
                const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_GET_DASHBOARD}?analgoToken=${savedToken}`);
                const data = res.data || {};
                setTitle(data.title || "My Dashboard");
                setDescription(data.description || "Add a description here...");
                setWidgets(Array.isArray(data.widgets) ? data.widgets : []);
                setLayout(Array.isArray(data.layout) ? data.layout : []);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchAvailableWidgets = async () => {
            try {
                const savedToken = localStorage.getItem('analgo_token');
                const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_WIDGETS}?analgoToken=${savedToken}`);
                setAvailableWidgets(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                getMarkers();
            }
        };

        fetchDashboardSettings();
        fetchAvailableWidgets();
    }, []);

    const handleLayoutChange = (newLayout: any[]) => setLayout(newLayout);

    const toggleWidget = (id: string) => {
        setTempWidgets((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
    };

    const handlePreview = () => {
        setWidgets(tempWidgets);
        setIsDraggable(true);
        setIsOpen(false);
    };

    const handleSave = async () => {
        setWidgets(tempWidgets);
        setIsDraggable(false);
        setIsOpen(false);
        try {
            const savedToken = localStorage.getItem('analgo_token');
            await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_SAVE_DASHBOARD}?analgoToken=${savedToken}`, {
                title,
                description,
                layout,
                widgets,
            });
        } catch (error) {
            console.error("Error saving dashboard", error);
        }
    };

    // --- Widget Renderer ---
    function Widget({ id }: { id: string }) {
        const widget = availableWidgets.find((w) => w.id === id);
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
        } catch (err) {
            console.error("Invalid widget settings", err);
            return null;
        }
    }

    // --- Render principal ---
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    {editingTitle ? (
                        <input
                            type="text"
                            className="text-3xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-fit"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => setEditingTitle(false)}
                            autoFocus
                        />
                    ) : (
                        <h1
                            className="text-3xl font-bold cursor-pointer hover:text-blue-600"
                            onClick={() => setEditingTitle(true)}
                            title="Click to edit title"
                        >
                            {title}
                        </h1>
                    )}

                    {editingDescription ? (
                        <textarea
                            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-600 w-full max-w-2xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={() => setEditingDescription(false)}
                            rows={2}
                            autoFocus
                        />
                    ) : (
                        <p
                            className="text-gray-600 cursor-pointer hover:text-blue-500 max-w-2xl"
                            onClick={() => setEditingDescription(true)}
                            title="Click to edit description"
                        >
                            {description}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => {
                        setTempWidgets(widgets);
                        setIsOpen(true);
                    }}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Settings className="mr-2 h-5 w-5" /> Manage widgets
                </button>
            </div>

            {/* Dashboard grid */}
            <div className="container-dashboard col-sm-12">
                {widgets.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">No widgets added yet.</p>
                ) : (
                    <GridLayout
                        className="layout"
                        cols={6}
                        rowHeight={100}
                        width={gridWidth}
                        isDraggable={isDraggable}
                        isResizable={isDraggable}
                        margin={[15, 15]}
                        onLayoutChange={handleLayoutChange}
                    >
                        {widgets.map((id) => (
                            <div
                                key={id}
                                data-grid={layout.find((l) => l.i === id) || { i: id, x: 0, y: 0, w: 3, h: 2 }}
                                className="cursor-move"
                            >
                                <Widget id={id} />
                            </div>
                        ))}
                    </GridLayout>
                )}
            </div>

            {/* Modal Widgets */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="bg-white rounded-2xl p-6 w-[80%] shadow-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <Dialog.Title className="text-xl font-semibold text-gray-800">
                                Choose widgets
                            </Dialog.Title>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {availableWidgets.length > 0 ? (
                                availableWidgets.map((widget) => (
                                    <label
                                        key={widget.id}
                                        className="border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition flex flex-col items-center"
                                    >
                                        <p className="font-medium text-gray-700 mb-2">{widget.name}</p>
                                        <div className="relative w-24 h-24 mb-2">
                                            <Image
                                                src={widget.image_url || '/placeholder.png'}
                                                alt={widget.name}
                                                fill
                                                className="object-contain rounded-lg"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2 text-center">{widget.description}</p>
                                        <input
                                            type="checkbox"
                                            checked={tempWidgets.includes(widget.id)}
                                            onChange={() => toggleWidget(widget.id)}
                                            className="accent-blue-600"
                                        />
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4 col-span-full">
                                    No available widgets.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end mt-6 space-x-3">
                            <button
                                onClick={handlePreview}
                                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
                            >
                                Apply
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
