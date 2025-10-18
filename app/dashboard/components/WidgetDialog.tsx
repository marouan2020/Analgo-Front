'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function WidgetDialog({ isOpen, onClose, availableWidgets, tempWidgets, toggleWidget, onApply, onSave }) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="bg-white rounded-2xl p-6 w-[80%] shadow-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-3">
                        <Dialog.Title className="text-xl font-semibold text-gray-800">Choose widgets</Dialog.Title>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {availableWidgets.length > 0 ? (
                            availableWidgets.map((widget) => (
                                <label key={widget.id}
                                       className="border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-blue-50 transition flex flex-col items-center">
                                    <p className="font-medium text-gray-700 mb-2">{widget.name}</p>
                                    <div className="relative w-24 h-24 mb-2">
                                        <Image src={widget.image_url || '/placeholder.png'} alt={widget.name} fill className="object-contain rounded-lg" />
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2 text-center">{widget.description}</p>
                                    <input type="checkbox" checked={tempWidgets.includes(widget.id)} onChange={() => toggleWidget(widget.id)} className="accent-blue-600" />
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4 col-span-full">No available widgets.</p>
                        )}
                    </div>

                    <div className="flex justify-end mt-6 space-x-3">
                        <button onClick={onApply} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">Apply</button>
                        <button onClick={onSave} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Save</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
