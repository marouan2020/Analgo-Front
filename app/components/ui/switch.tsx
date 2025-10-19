'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string;
}

export function Switch({ checked = false, onCheckedChange, className }: SwitchProps) {
    const [state, setState] = React.useState(checked);

    const toggle = () => {
        const newValue = !state;
        setState(newValue);
        onCheckedChange?.(newValue);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={state}
            className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                state ? 'bg-blue-600' : 'bg-gray-300',
                className
            )}
        >
      <span
          className={cn(
              'inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow',
              state ? 'translate-x-5' : 'translate-x-1'
          )}
      />
        </button>
    );
}
