'use client';

import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';

interface BarChartHeaderProps {
    title: string;
    description: string;
    type: string;
    editable?: boolean;
    onChange?: (data: { title: string; description: string; type: string }) => void;
}

export default function BarChartHeader({
                                           title: initialTitle,
                                           description: initialDescription,
                                           type,
                                           editable = false,
                                           onChange,
                                       }: BarChartHeaderProps) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    // 🔁 Synchronise le state si les props changent
    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription]);

    useEffect(() => {
        let mounted = true;

        const fetchWidget = async () => {
            try {
                const token = localStorage.getItem('analgo_token');
                if (!token) return;
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_ENDPOINT_GET_WIDGETINFOS}?analgoToken=${token}&type=${type}`
                );
                if (mounted && data) {
                    setTitle(data.title || 'My Dashboard');
                    setDescription(data.description || '');
                }
            } catch (err) {
                console.error('Erreur lors du chargement du widget:', err);
            }
        };

        fetchWidget();
        return () => {
            mounted = false;
        };
    }, []);

    // 🔹 Sauvegarder le widget
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('analgo_token');
        if (!token) {
            console.warn('Aucun token trouvé.');
            return;
        }

        setLoading(true);
        setFeedback(null);

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_ENDPOINT_EDIT_WIDGET}?analgoToken=${token}`,
                { title, description, type }
            );

            setFeedback('✅ Sauvegardé avec succès !');
            onChange?.({ title, description, type });
        } catch (err) {
            console.error('Erreur lors de la sauvegarde du widget:', err);
            setFeedback('❌ Erreur lors de la sauvegarde.');
        } finally {
            setLoading(false);
            setIsEditing(false);
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    return (
        <div
            className={`pl-4 pt-2 border-b border-gray-100 bg-gray-50 ${
                isEditing ? `${type} absolute  w-full z-50` : 'relative'
            }`}
        >
            {/* Bouton d’édition */}
            {editable && (
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                    onClick={() => setIsEditing(!isEditing)}
                    title={isEditing ? 'Save' : 'Edit'}
                    disabled={loading}
                >
                    <Pencil size={18} />
                </button>
            )}

            {/* Formulaire d’édition */}
            {isEditing ? (
                <form onSubmit={handleSave} className="space-y-2 pr-10">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 text-gray-800 font-medium"
                        placeholder="Enter a title..."
                        disabled={loading}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 text-gray-700 text-sm"
                        placeholder="Enter a description..."
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className={`mt-1 px-3 py-1 text-sm rounded-md ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>

                    {feedback && <p className="text-xs text-gray-500 mt-1">{feedback}</p>}
                </form>
            ) : (
                <>
                    <p className="mb-0 text-lg pb-1 font-bold">
                        {loading ? 'Loading...' : title}
                    </p>
                    <p className="mb-0 text-gray-500 pb-2 text-sm font-normal">
                        {loading ? '...' : description}
                    </p>
                    {feedback && <p className="text-xs text-gray-500 mt-1">{feedback}</p>}
                </>
            )}
        </div>
    );
}
