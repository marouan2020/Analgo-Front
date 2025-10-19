import { useState, useEffect, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import debounce from 'lodash.debounce';

export default function GuideEditor({ guide, onChange }: any) {
    const [localGuide, setLocalGuide] = useState(guide);

    const debouncedSave = useCallback(
        debounce((updated) => onChange(updated), 800),
        [onChange]
    );

    const updateField = (field: string, value: any) => {
        const updated = { ...localGuide, [field]: value };
        setLocalGuide(updated);
        debouncedSave(updated);
    };

    const updateStep = (index: number, updates: any) => {
        const steps = [...localGuide.steps];
        steps[index] = { ...steps[index], ...updates };
        updateField('steps', steps);
    };

    return (
        <div>
            <input
                className="text-xl font-semibold border-b mb-2 w-full"
                value={localGuide.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Titre du guide"
            />

            <textarea
                className="w-full border rounded p-2 mb-4"
                value={localGuide.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Description du guide"
            />

            <div className="relative bg-gray-50 border p-4 h-[500px]">
                {localGuide.steps.map((step: any, i: number) => (
                    <Rnd
                        key={i}
                        bounds="parent"
                        size={{ width: step.width, height: step.height }}
                        position={{ x: step.x, y: step.y }}
                        onDragStop={(e, d) => updateStep(i, { x: d.x, y: d.y })}
                        onResizeStop={(e, dir, ref, delta, pos) =>
                            updateStep(i, {
                                width: parseInt(ref.style.width),
                                height: parseInt(ref.style.height),
                                ...pos,
                            })
                        }
                        className="bg-white shadow p-3 rounded border absolute"
                    >
                        <input
                            className="w-full text-sm border-b"
                            value={step.text}
                            onChange={(e) => updateStep(i, { text: e.target.value })}
                        />
                    </Rnd>
                ))}
            </div>
        </div>
    );
}
