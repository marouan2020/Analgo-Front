'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog } from '@headlessui/react';
import { Settings, X } from 'lucide-react';
import GridLayout from 'react-grid-layout';
import axios from "axios";
import Image from "next/image";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import StatCard from "../components/StatCard";
import dynamic from 'next/dynamic';

const MapsCard = dynamic(() => import('../components/MapsCard'), {ssr: false,});

export default function DashboardPage() {
    useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [widgets, setWidgets] = useState<string[]>([]);
    const [availableWidgets, setAvailableWidgets] = useState<{
        id: string;
        name: string;
        image_url: string;
        description: string;
        settings: string
    }[]>([]);
    const [title, setTitle] = useState("My Dashboard");
    const [description, setDescription] = useState("Add a description here...");
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [tempWidgets, setTempWidgets] = useState<string[]>([]);
    const [isDraggable, setIsDraggable] = useState(false);
    const [token, setToken] = useState(false);
    const [markers, setMarkers] = useState<{ ip: string; lat: number; lon: number }[]>([]);
    const [ips, setIps] = useState<string[]>([]);
    const [layout, setLayout] = useState<{
        i: string;
        x: number;
        y: number;
        w: number;
        h: number;
        minW?: number;
        maxW?: number;
        minH?: number;
        maxH?: number;
    }[]>([]);

    const handleLayoutChange = (newLayout: any[]) => {
        setLayout(newLayout);
    };

    const toggleWidget = (id: string) => {
        setTempWidgets((prev) =>
            prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
        );
    };

    const handlePreview = () => {
        setWidgets(tempWidgets);
        setIsDraggable(true);
        setIsOpen(false);
    };

    const handleSave = () => {
        setWidgets(tempWidgets);
        setIsDraggable(false);
        setIsOpen(false);
    };
    useEffect(() => {
        setIps(['102.31.128.200', '37.64.82.50']);
    }, []);
    useEffect(() => {
        const savedToken = localStorage.getItem('analgo_token');
        if (savedToken) {
            // @ts-ignore
            setToken(savedToken);
        }
        if (!token) return;
        const getMarkers = async () => {
            try {
                const results = await Promise.all(
                    ips.map(async ip => {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_IPWHO}${ip}`);
                        const data = await res.json();
                        return data.success ? {ip, lat: data.latitude, lon: data.longitude} : null;
                    })
                );
                setMarkers(results.filter(Boolean) as any);
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };
        const fetchAvailableWidgets = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_WIDGETS}?analgoToken=${token}`);
                setAvailableWidgets(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                if (ips.length > 0) {
                    getMarkers();
                }
            }
        };
        fetchAvailableWidgets();
        const fetchDashboardSettings = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_GET_DASHBOARD}?analgoToken=${token}`);
            const data = res.data;
            setTitle(data.title);
            setDescription(data.description);
            const widgetsData = Array.isArray(data.widgets) ? data.widgets : [];
            setLayout(data.layout);
            setWidgets(widgetsData);
        };
        fetchDashboardSettings();
    }, [token]);

    const saveDashboardSettings = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_SAVE_DASHBOARD}?analgoToken=${token}`, {
                token,
                title,
                description,
                layout,
                widgets,
            });
        } catch (error) {
            console.error("Error saving dashboard", error);
        }
    };

    /** Widgets */
    function Widget({id}: { id: string }) {
        const widget = availableWidgets.find(w => w.id === id);
        if (!widget) return null;
        try {
            const settings = widget.settings;
            switch (settings.type) {
                case 'LineChart':
                    return (
                        <LineChart
                            title={widget.name}
                            data={settings.data}
                            xKey={settings.xKey}
                            lines={settings.lines}
                            editable={!isDraggable}
                        />
                    );
                case 'BarChart':
                    return (
                        <BarChart
                            title={widget.name}
                            data={settings.data}
                            xKey={settings.xKey}
                            bars={settings.bars}
                            editable={!isDraggable}
                        />
                    );
                case 'StatChart':
                    return (
                        <StatCard
                            title={settings.name}
                            value={settings.totalViews}
                            change={{
                                value: settings.value,
                                isPositive: settings.isPositive,
                            }}
                            className='h-100'
                            editable={!isDraggable}
                        />
                    );
                case 'MapsCard':
                    return <MapsCard markers={markers} editable={!isDraggable}/>;
                default:
                    return <p>Unknown widget type: {settings.type}</p>;
            }
        } catch (err) {
            console.error("Invalid widget settings", err);
            return null;
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="col-12">
                <div className='row'>
                    <div className='col-10'>
                        {editingTitle ? (
                            <input
                                type="text"
                                className="text-3xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-fit"
                                value={title}
                                placeholder={'My Dashboard'}
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
                                placeholder={'Add a description here...'}
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
                    <div className='col-2 float-right text-right'>
                        <button
                            onClick={() => {
                                setTempWidgets(widgets);
                                setIsOpen(true);
                            }}
                            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            <Settings className="mr-2 h-5 w-5"/> Widget settings
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-dashboard">
                {widgets.length === 0 && (
                    <p className="text-gray-500 text-center mt-10">
                        No widgets added yet.
                    </p>
                )}

                {widgets.length > 0 && (
                    <GridLayout
                        className="layout"
                        cols={6}
                        rowHeight={100}
                        width={1200}
                        isDraggable={isDraggable}
                        isResizable={isDraggable}
                        margin={[15, 15]}
                        onLayoutChange={(newLayout) => handleLayoutChange(newLayout)}
                    >
                        {widgets.map((id, index) => (
                            <div
                                key={id}
                                data-grid={layout.find((l) => l.i === id) || {i: id, x: 0, y: 0, w: 3, h: 2}}
                                className="cursor-move"
                            >

                                <Widget id={id}/>
                            </div>
                        ))}
                    </GridLayout>
                )}
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true"/>
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel
                        className="bg-white rounded-2xl p-6 w-[80%] shadow-2xl border border-gray-100 transform transition-all duration-300 ease-out scale-100 animate-fadeInUp">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <Dialog.Title className="text-xl font-semibold text-gray-800">
                                Choose widgets
                            </Dialog.Title>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="h-5 w-5"/>
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            {availableWidgets.length > 0 ? (
                                availableWidgets.map((widget) => (
                                    <label
                                        key={widget.id}
                                        className="h-100 mr-3 p-3 col-md-2 col-sm-12 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition"
                                    >
                                        <p className="font-medium text-center text-gray-700">{widget.name || ''}</p>
                                        <div className="w-100 items-center image-widget">
                                            <center><Image
                                                src={widget.image_url || ''}
                                                alt={widget.name || ''}
                                                fill
                                                className="object-cover"
                                                sizes="90px"
                                            /></center>
                                        </div>
                                        <p className="font-small text-left text-gray-400 description-widget">{widget.description || ''}</p>
                                        <input
                                            type="checkbox"
                                            checked={tempWidgets.includes(widget.id)}
                                            onChange={() => toggleWidget(widget.id)}
                                            className="accent-blue-600 h-4 w-4"
                                        />
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No available widgets.</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            {availableWidgets.length > 0 ? (
                                <>
                                    <button
                                        onClick={handlePreview}
                                        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 mr-3 font-medium transition"
                                    >
                                        Apply
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleSave();
                                            saveDashboardSettings();
                                        }}
                                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                                    >
                                        Save
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>);
}