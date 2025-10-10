"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";


interface Condition {
    field: string;
    operator: string;
    value: string;
}

interface Segment {
    id: number;
    name: string;
    description: string;
    status: string;
    conditions: Condition[];
}

interface Field {
    value: string;
    label: string;
}

export default function SegmentsPage() {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [segments, setSegments] = useState<Segment[]>([]);
    const [analgoToken, setAnalgoToken] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'enable',
        analgoToken: analgoToken,
        conditions: [{ field: '', operator: '', value: '' }] as Condition[],
    });
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState<Field[]>([]);
    const [showConditions, setShowConditions] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('analgo_token') ?? '';
        setAnalgoToken(token);
        async function fetchFields() {
            const fields = await getFields();
            setFields(fields);
        }
        fetchFields();
        const fetchSegments = async () => {
            try {
                setLoading(true);
                const analgoToken = localStorage.getItem('analgo_token') ?? '';
                if (analgoToken) {
                    const params = new URLSearchParams();
                    params.append('analgoToken', analgoToken);
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_SEGMENTS}?${params.toString()}`);
                    setSegments(res.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSegments();
    }, []);

    async function getFields() {
        try {
            const analgoToken = localStorage.getItem('analgo_token') ?? '';
            if (analgoToken) {
                const params = new URLSearchParams();
                params.append('analgoToken', analgoToken);
                const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_SEGMENTS_GET_FIELDS}?${params.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error(`Erreur API: ${res.status}`);
                }
                const data = await res.json();

                return Array.isArray(data) ? data : [];
            }
        } catch (err) {
            console.error("Error loading fields:", err);
            return [];
        }
    }

    const addCondition = () => {
        setFormData({
            ...formData,
            conditions: [
                ...formData.conditions,
                { field: '', operator: '', value: '' },
            ],
        });
    };

    const removeCondition = (index: number) => {
        const updated = formData.conditions.filter((_, i) => i !== index);
        setFormData({ ...formData, conditions: updated });
    };

    const updateCondition = (index: number, key: string, value: string) => {
        const updated = [...formData.conditions];
        updated[index][key] = value;
        setFormData({ ...formData, conditions: updated });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this segment?")) return;
        try {
            setLoading(true);
            const analgoToken = localStorage.getItem('analgo_token') ?? false;
            if (analgoToken) {
                const params = new URLSearchParams();
                params.append('analgoToken', analgoToken);
                await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_SEGMENTS_DELETE}/${id}?${params.toString()}`);
                setSegments(segments.filter((s) => s.id !== id));
                setLoading(false);
            } else {
                setError("Failed to retrieve your token.");
                setTimeout(function(){setLoading(false);window.location.href = '/login';}, 1000);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to delete segment.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const tokenStorage = localStorage.getItem('analgo_token') ?? '';
        setAnalgoToken(tokenStorage);
        try {
            if (editingId) {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_SEGMENTS_EDIT}/${editingId}`, {
                    analgoToken: tokenStorage,
                    name: formData.name,
                    description: formData.description,
                    status: formData.status,
                    conditions: formData.conditions,
                });

                setSegments(
                    segments.map((seg) => (seg.id === editingId ? res.data : seg))
                );
                setSuccess("Segment updated successfully");
            } else {
                const res = await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_SEGMENTS_ADD!, {
                    analgoToken: tokenStorage,
                    name: formData.name,
                    description: formData.description,
                    status: formData.status,
                    conditions: formData.conditions,
                });

                setSegments([...segments, res.data]);
                setSuccess("Segment created successfully");
            }
            setError('');
            setFormData({
                name: '',
                description: '',
                status: 'enable',
                analgoToken: tokenStorage,
                conditions: [{ field: '', operator: '', value: '' }],
            });
            setShowModal(false);
            setEditingId(null);
        } catch (err) {
            console.error(err);
            setError(editingId ? "Failed to update segment." : "Failed to create segment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Segments</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
                >
                    + Create segment
                </button>
            </div>
            {error && <div className="text-danger mb-2">{error}</div>}
            {success && <div className="text-sm text-green-600 mt-1 mb-2">{success}</div>}
            {/* Table */}
            <div className="overflow-hidden border-collapse">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-300 border-b">
                    <tr>
                        <th className="px-4 py-3 font-semibold"></th>
                        <th className="px-4 py-3 font-semibold">Segment name</th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Rules</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                    </thead>
                    <tbody className='bg-gray-50'>
                    {segments.length > 0 ? (
                        segments.map((segment, i) => (
                            <tr key={i} className=" hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-700">
                                    <Star className="w-4 h-4 text-gray-400" />
                                </td>
                                <td className="px-4 py-3 text-blue-600 font-medium">
                                    {segment.name}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {segment.description || "No description"}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {segment.status}
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                    {segment.conditions?.length > 0 ? (
                                        segment.conditions
                                            .map((c) => `${c.field} ${c.operator} ${c.value}`)
                                            .join(", ")
                                    ) : (
                                        <span className="text-gray-400">No rules found</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 gap-2">
                                    <button
                                        onClick={() => handleDelete(segment.id)}
                                        className="float-right text-red-600 hover:underline text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-400">
                                No data available!
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-3 relative animate-fadeIn">
                        <div className='row'>
                            <h2 className="text-xl font-semibold mb-4">
                                {editingId ? "Edit segment" : "Create a new segment"}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-md-5 col-sm-12'>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder='Name'
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, name: e.target.value })
                                                    }
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                                <input
                                                    type="hidden"
                                                    value={analgoToken}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, analgoToken: e.target.value })
                                                    }
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>
                                            <div className="mb-3">
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, description: e.target.value })
                                                }
                                                placeholder='Description'
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium mb-2">Status</label>
                                                <div className="flex gap-2 mb-2 items-center">
                                                    <select
                                                        value={formData.status}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, status: e.target.value })
                                                        }
                                                        className="border rounded-lg px-2 py-1"
                                                    >
                                                        <option value="enable">Enable</option>
                                                        <option value="disable">Disable</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-7 col-sm-12'>
                                            <div className="mb-4 text-right">
                                                {!showConditions ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConditions(true)}
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        + Add condition
                                                    </button>
                                                ) : (
                                                    <>
                                                        {formData.conditions.map((c, i) => (
                                                            <div key={i} className="flex gap-2 mb-2 items-center">
                                                                <select
                                                                    value={c.field}
                                                                    onChange={(e) => updateCondition(i, "field", e.target.value)}
                                                                    className="border rounded-lg px-2 py-1"
                                                                >
                                                                    <option value="">Select field</option>
                                                                    {fields.map((f) => (
                                                                        <option key={f.value} value={f.value}>
                                                                            {f.label}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                                <select
                                                                    value={c.operator}
                                                                    onChange={(e) => updateCondition(i, "operator", e.target.value)}
                                                                    className="border rounded-lg px-2 py-1"
                                                                >
                                                                    <option value="">Select operator</option>
                                                                    <option value="contains">contains</option>
                                                                    <option value="not_contains">does not contain</option>
                                                                    <option value="equals">equals</option>
                                                                    <option value="not_equals">not equals</option>
                                                                    <option value="empty">is empty</option>
                                                                    <option value="not_empty">is not empty</option>
                                                                </select>

                                                                <input
                                                                    type="text"
                                                                    placeholder="Value"
                                                                    value={c.value}
                                                                    onChange={(e) => updateCondition(i, "value", e.target.value)}
                                                                    className="border rounded-lg px-2 py-1 flex-1"
                                                                />

                                                                {formData.conditions.length > 0 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeCondition(i)}
                                                                        className="text-red-500 hover:text-red-700 font-bold text-lg px-2"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}

                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={addCondition}
                                                                className="text-sm text-blue-600 hover:underline"
                                                            >
                                                                + Add another condition
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowConditions(false);
                                                                    setFormData({
                                                                        ...formData,
                                                                        conditions: [{ field: "", operator: "", value: "" }],
                                                                    });
                                                                }}
                                                                className="text-sm text-gray-500 hover:underline"
                                                            >
                                                                ✕ Remove all
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                    >
                                        {loading ? "Saving..." : editingId ? "Update segment" : "Save segment"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}