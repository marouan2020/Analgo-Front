'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import {cn} from "@/lib/utils";
import {Button} from "@/app/components/ui/button";

interface Guide {
    id: string;
    title: string;
    description?: string;
    url?: string;
    type?:string;
    createdAt?: string;
}

export default function GuidesListPage() {
    const [guides, setGuides] = useState<Guide[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchGuides();
    }, []);

    const fetchGuides = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('analgo_token');
            const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_GET_GUIDES}?analgoToken=${token}`);
            setGuides(res.data || []);
        } catch (error) {
            console.error('Erreur lors du chargement des guides', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sur delete this guide ?')) return;
        setDeletingId(id);
        try {
            const token = localStorage.getItem('analgo_token');
            await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT_GET_GUIDES}?analgoToken=${token}&id=${id}`);
            setGuides((prev) => prev.filter((g) => g.id !== id));
        } catch (error) {
            console.error('Erreur suppression guide', error);
        } finally {
            setDeletingId(null);
        }
    };

    // @ts-ignore
    const handleLaunchDesigner = (title, url, type) => {
        const newWindow = window.open(url, '_blank');
        setTimeout(() => {
            console.log('📤 Sending message to client site...');
            const token = localStorage.getItem('analgo_token');
            newWindow?.postMessage(
                {
                    action: 'LAUNCH_GUIDE_DESIGNER',
                    targetUrl: url,
                    title: title,
                    source: 'analgo-designer-agent',
                    type: type,
                    token: token,
                    status: 0,
                },
                url
            );
        }, 1000);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Guides</h1>
                <Link
                    href="/guides/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <PlusCircle size={18} /> New guide
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading guides...</p>
            ) : guides.length === 0 ? (
                <p className="text-gray-500 italic">You don’t have any guides yet.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.map((guide) => (
                        <div
                            key={guide.id}
                            className="border rounded-lg shadow-sm bg-white p-4 relative"
                        >
                            <p className="text-md font-semibold mb-2">{guide.title}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {guide.description}
                            </p>

                            <div className="flex justify-end mt-4 gap-3">
                                <button
                                    onClick={() => handleLaunchDesigner(guide.title, guide.url, guide.type)}
                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <Pencil size={16} /> Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(guide.id)}
                                    disabled={deletingId === guide.id}
                                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                >
                                    <Trash2 size={16} />
                                    {deletingId === guide.id ? 'Delete...' : 'Delete'}
                                </button>
                            </div>
                            <span className="absolute bottom-2 left-4 text-xs text-gray-400">
                            {guide.createdAt ? new Date(guide.createdAt).toLocaleDateString() : ''}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
