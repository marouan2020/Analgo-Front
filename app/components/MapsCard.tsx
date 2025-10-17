'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Pencil } from 'lucide-react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdn.analgo.tech/marker-icon-2x.png',
    iconUrl: 'https://cdn.analgo.tech/marker-icon.png',
    shadowUrl: 'https://cdn.analgo.tech/marker-shadow.png',
});

// 🧠 Chargement dynamique pour éviter l’erreur “window is not defined”
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

interface MarkerData {
    lat: number;
    lon: number;
    ip: string;
}

interface MapsCardProps {
    title?: string;
    description?: string;
    markers: MarkerData[];
    editable?: boolean; // 🔹 Active le mode édition
    onChange?: (data: { title: string; description: string }) => void;
}

/**
 * 🗺️ MapsCard
 * Affiche une carte Leaflet avec titre et description éditables.
 */
export default function MapsCard({title: initialTitle = 'Map Widget', description: initialDescription = '', markers, editable = false, onChange,}: MapsCardProps) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [isEditing, setIsEditing] = useState(false);

    // ✅ Centre moyen automatique
    const center = useMemo(() => {
        if (!markers || markers.length === 0) return [0, 0] as [number, number];
        const avgLat = markers.reduce((sum, m) => sum + m.lat, 0) / markers.length;
        const avgLon = markers.reduce((sum, m) => sum + m.lon, 0) / markers.length;
        return [avgLat, avgLon] as [number, number];
    }, [markers]);

    // ✅ Aucun marqueur
    if (!markers || markers.length === 0) {
        return (
            <div className="text-gray-400 text-center py-6 border rounded-xl">
                No markers to display.
            </div>
        );
    }

    // ✅ Sauvegarde des modifications
    const handleSave = () => {
        setIsEditing(false);
        if (onChange) {
            onChange({ title, description });
        }
    };

    return (
        <div className="w-full h-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            {/* 🔹 Titre et description */}
            <div
                className={`pl-4 pt-2 border-b z-99999 border-gray-100 bg-gray-50 ${
                    isEditing ? 'absolute h-45  w-full' : 'relative'
                }`}
            >
                {editable && (
                    <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                        onClick={() => setIsEditing(!isEditing)}
                        title={isEditing ? 'Save' : 'Edit'}
                    >
                        <Pencil size={18} />
                    </button>
                )}

                {isEditing ? (
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-md px-2 py-1 text-gray-800 font-medium"
                            placeholder="Enter a title..."
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-md px-2 py-1 text-gray-700 text-sm"
                            placeholder="Enter a description..."
                        />
                        <button
                            onClick={handleSave}
                            className="mt-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <>
                        <p className='mb-0 w-full text-1xl pb-1 font-bold'>{title}</p>
                        <p className='mb-0 w-full text-gray-500 pb-2 font-normal'>{description}</p>
                    </>
                )}
            </div>

            {/* 🔹 Carte Leaflet */}
            <div className="w-full h-100">
                <MapContainer
                    center={center}
                    zoom={2}
                    className="w-full h-full rounded-b-xl"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker, index) => (
                        <Marker key={index} position={[marker.lat, marker.lon]}>
                            <Popup>
                                <div className="text-sm text-gray-800">
                                    <strong>IP:</strong> {marker.ip}
                                    <br />
                                    <strong>Latitude:</strong> {marker.lat.toFixed(2)}
                                    <br />
                                    <strong>Longitude:</strong> {marker.lon.toFixed(2)}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
