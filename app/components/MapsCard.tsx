'use client';

import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
import BarChartHeader from "@/app/components/BarChartHeader";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdn.analgo.tech/marker-icon-2x.png',
    iconUrl: 'https://cdn.analgo.tech/marker-icon.png',
    shadowUrl: 'https://cdn.analgo.tech/marker-shadow.png',
});

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

export default function MapsCard({title = 'Map Widget', description = 'Add description', markers, editable = false, onChange,}: MapsCardProps) {

    const center = useMemo(() => {
        if (!markers || markers.length === 0) return [0, 0] as [number, number];
        const avgLat = markers.reduce((sum, m) => sum + m.latitude, 0) / markers.length;
        const avgLon = markers.reduce((sum, m) => sum + m.longitude, 0) / markers.length;
        return [avgLat, avgLon] as [number, number];
    }, [markers]);

    return (
        <div className="w-full h-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            {/* Header du graphique */}
            <BarChartHeader
                type={'maps'}
                title={title}
                description={description}
                editable={editable}
                onChange={onChange}
            />
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
                        <Marker key={index} position={[marker.latitude, marker.longitude]}>
                            <Popup>
                                <div className="text-sm text-gray-800">
                                    <strong>Country:</strong> {marker.countryName}
                                    <br />
                                    <strong>City:</strong> {marker.cityName}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
