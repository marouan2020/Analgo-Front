'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '@/lib/utils';

export default function CreateGuidePage() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleLaunchDesigner = () => {
        if (!title.trim()) {
            alert('Title is required.');
            return;
        }

        if (!url.trim()) {
            alert('URL is required.');
            return;
        }

        if (!url.startsWith('http')) {
            alert('Please enter a valid URL (e.g. https://yourapp.com).');
            return;
        }

        const newWindow = window.open(url, '_blank');
        setTimeout(() => {
            console.log('📤 Sending message to client site...');
            newWindow?.postMessage(
                {
                    action: 'LAUNCH_GUIDE_DESIGNER',
                    targetUrl: url,
                    title: title,
                    source: 'analgo-designer-agent',
                    type: 'popup',
                },
                url
            );
        }, 1000);
    };

    return (
        <div className="col-12 mx-auto p-6 space-y-6">
            {/* BACK LINK */}
            <div className="mb-4">
                <Link
                    href="/guides"
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                >
                    ← Back to Guides
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        New Guide
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* TITLE */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="font-medium">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="title"
                            required
                            aria-required="true"
                            placeholder="e.g. User Onboarding Flow"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* URL */}
                    <div className="space-y-2">
                        <label htmlFor="url" className="font-medium">
                            Application URL <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="url"
                            type="url"
                            required
                            aria-required="true"
                            placeholder="https://yourapp.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    {/* BUTTON */}
                    <div className="pt-4 text-right">
                        <Button
                            onClick={handleLaunchDesigner}
                            className={cn(
                                'bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg'
                            )}
                        >
                            🚀 Launch Designer
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
