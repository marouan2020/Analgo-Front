'use client';

import { Settings } from 'lucide-react';
import { useState } from 'react';

export default function DashboardHeader({ title, setTitle, description, setDescription, openDialog }) {
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);

    return (
        <div className="flex justify-between items-start">
            <div>
                {editingTitle ? (
                    <input
                        type="text"
                        className="text-3xl font-bold border-b border-gray-300 focus:border-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setEditingTitle(false)}
                        autoFocus
                    />
                ) : (
                    <h1 className="text-3xl font-bold cursor-pointer hover:text-blue-600"
                        onClick={() => setEditingTitle(true)}>
                        {title}
                    </h1>
                )}

                {editingDescription ? (
                    <textarea
                        className="border-b border-gray-300 focus:border-blue-500 text-gray-600 w-full max-w-2xl"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() => setEditingDescription(false)}
                        rows={2}
                        autoFocus
                    />
                ) : (
                    <p className="text-gray-600 cursor-pointer hover:text-blue-500 max-w-2xl"
                       onClick={() => setEditingDescription(true)}>
                        {description}
                    </p>
                )}
            </div>

            <button
                onClick={openDialog}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                <Settings className="mr-2 h-5 w-5" /> Manage widgets
            </button>
        </div>
    );
}
