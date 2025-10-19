import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const base =
            'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none';
        const variants = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700',
            secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
            outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
        };

        return (
            <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
        );
    }
);
Button.displayName = 'Button';