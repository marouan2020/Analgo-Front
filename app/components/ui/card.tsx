import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('rounded-lg border border-gray-200 bg-white shadow-sm', className)}
            {...props}
        />
    );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-4 border-b border-gray-100', className)} {...props} />
    );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn('font-semibold text-lg', className)} {...props} />
    );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-4', className)} {...props} />
    );
}
