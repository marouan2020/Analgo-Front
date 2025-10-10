'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Dialog } from '@headlessui/react';
import { Settings, X } from 'lucide-react';
import GridLayout from 'react-grid-layout';

const availableWidgets = [
    { id: 'chart', name: 'Sales Chart' },
    { id: 'map', name: 'User Map' },
    { id: 'stats', name: 'Quick Stats' },
    { id: 'news', name: 'Latest News' },
];

export default function DashboardPage() {
    useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [widgets, setWidgets] = useState<string[]>([]);
    const [tempWidgets, setTempWidgets] = useState<string[]>([]);
    const [isDraggable, setIsDraggable] = useState(false);

    const toggleWidget = (id: string) => {
        setTempWidgets((prev) =>
            prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
        );
    };

    const handlePreview = () => {
        setWidgets(tempWidgets);
        setIsDraggable(true); // active le drag
    };

    const handleSave = () => {
        setWidgets(tempWidgets);
        setIsDraggable(false); // désactive le drag
        setIsOpen(false);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={() => {
                        setTempWidgets(widgets);
                        setIsOpen(true);
                    }}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Settings className="mr-2 h-5 w-5" /> Widget settings
                </button>
            </div>

            {/* Zone Dashboard avec layout dynamique */}
            <div className="bg-gray-50 p-4 rounded-xl min-h-[400px]">
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
                    >
                        {widgets.map((id, index) => (
                            <div
                                key={id}
                                data-grid={{
                                    x: (index * 2) % 6,
                                    y: Math.floor(index / 3),
                                    w: 2,
                                    h: 1.8,
                                }}
                                className="bg-white rounded-xl shadow-md p-4 cursor-move"
                            >
                                <Widget id={id} />
                            </div>
                        ))}
                    </GridLayout>
                )}
            </div>

            {/* Popup (modale améliorée) */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 transform transition-all duration-300 ease-out scale-100 animate-fadeInUp">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <Dialog.Title className="text-xl font-semibold text-gray-800">
                                Choose widgets
                            </Dialog.Title>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            {availableWidgets.map((widget) => (
                                <label
                                    key={widget.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition"
                                >
                                    <span className="font-medium text-gray-700">{widget.name}</span>
                                    <input
                                        type="checkbox"
                                        checked={tempWidgets.includes(widget.id)}
                                        onChange={() => toggleWidget(widget.id)}
                                        className="accent-blue-600 h-4 w-4"
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handlePreview}
                                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
                            >
                                Preview
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
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

/** Widgets */
function Widget({ id }: { id: string }) {
    switch (id) {
        case 'chart':
            return (
                <>
                    <h3 className="font-semibold mb-2">Sales Chart</h3>
                    <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded-md">
                        [Chart]
                    </div>
                </>
            );
        case 'map':
            return (
                <>
                    <h3 className="font-semibold mb-2">User Map</h3>
                    <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded-md">
                        [Map]
                    </div>
                </>
            );
        case 'stats':
            return (
                <>
                    <h3 className="font-semibold mb-2">Quick Stats</h3>
                    <ul className="text-sm text-gray-600">
                        <li>Users: 1,245</li>
                        <li>Conversions: 230</li>
                        <li>Bounce: 32%</li>
                    </ul>
                </>
            );
        case 'news':
            return (
                <>
                    <h3 className="font-semibold mb-2">Latest News</h3>
                    <ul className="text-sm text-gray-600 list-disc pl-4">
                        <li>Version 2.1 released</li>
                        <li>Maintenance scheduled</li>
                    </ul>
                </>
            );
        default:
            return null;
    }
}
