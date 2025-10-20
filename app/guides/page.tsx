'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { PlusCircle, Trash2, Pencil, Eye } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";

interface Guide {
    id: string;
    title: string;
    description?: string;
    url?: string;
    type?: string;
    createdAt?: string;
    status?: boolean;
}

export default function GuidesListPage() {
    const [guides, setGuides] = useState<Guide[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [status, setStatus] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
            setError('Erreur loqd guides.');
            console.error('Erreur lors du chargement des guides', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this guide?')) return;
        setDeletingId(id);
        setSuccess(null);
        setError(null);
        try {
            const token = localStorage.getItem('analgo_token');
            await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT_DELETE_GUIDES}?analgoToken=${token}&id=${id}`);
            setGuides((prev) => prev.filter((g) => g.id !== id));
            setSuccess('Guide deleted successfully.');
            sessionStorage.removeItem('dataGuide');
        } catch (error) {
            setError('Erreur suppression guide');
            console.error('Erreur suppression guide', error);
        } finally {
            setDeletingId(null);
        }
        setTimeout(function() {
            setError(null);
        },3000);
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
                    status: status,
                },
                url
            );
        }, 1000);
    };

    const handleToggleStatus = async (id: string, newStatus: boolean) => {
        setSuccess(null);
        setError(null);
        try {
            const token = localStorage.getItem('analgo_token');
            await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_TOGGLE_GUIDE}`, {
                id,
                status: newStatus,
                token: token,
            });
            setGuides((prev) =>
                prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
            );
            setStatus(newStatus);
            setSuccess('Guide status updated successfully.');
        } catch (error) {
            setError('Erreur change status guide.');
            console.error('Erreur changement de statut du guide.', error);
        }
        setTimeout(function() {
            setSuccess(null);
            setError(null);
        },3000);
    };

    return (
        <div className="p-8">
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
            <div className="flex justify-between items-center mb-6">
                <p className="text-2xl h2 font-bold">Guides</p>
                <Link
                    href="/guides/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <PlusCircle size={18} /> Create guide
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading guides...</p>
            ) : guides.length === 0 ? (
                <p className="text-gray-500 italic">You don’t have any guides yet.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.map((guide) => (
                        <div key={guide.id} className="border rounded-lg shadow-sm bg-white p-4 relative">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-md font-semibold">{guide.title}</p>
                                <Switch
                                    checked={guide.status}
                                    onCheckedChange={(checked) => handleToggleStatus(guide.id, checked)}
                                />
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {guide.description}
                            </p>

                            <div className="flex justify-end mt-4 gap-3">
                                <button
                                    onClick={() => handleLaunchDesigner(guide.title, guide.url, guide.type)}
                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <Pencil size={16} /> Edit
                                </button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button
                                            onClick={() => setSelectedGuide(guide)}
                                            className="text-green-600 hover:text-green-800 flex items-center gap-1"
                                        >
                                            <Eye size={16} /> Details
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="rounded-2xl max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>{selectedGuide?.title}</DialogTitle>
                                            <DialogDescription>
                                                <p className="text-gray-700 mt-2">{selectedGuide?.description}</p>
                                                <p className="text-sm mt-4 text-gray-500">
                                                    URL: {selectedGuide?.url}
                                                </p>
                                                <p className="text-sm text-gray-400 mt-2">
                                                    Created at: {selectedGuide?.createdAt}
                                                </p>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <button
                                    onClick={() => handleDelete(guide.id)}
                                    disabled={deletingId === guide.id}
                                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                >
                                    <Trash2 size={16} />
                                    {deletingId === guide.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>

                            <p className="absolute bottom-2 left-4 text-xs text-gray-400">
                                {guide.createdAt ?? ''}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
