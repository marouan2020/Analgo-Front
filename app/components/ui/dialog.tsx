'use client';

import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type DialogContextType = {
    open: boolean;
    setOpen: (v: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function Dialog({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
}

/* DialogTrigger: wrap the button/link that opens the dialog */
export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
    const ctx = useContext(DialogContext);
    if (!ctx) throw new Error('DialogTrigger must be used inside Dialog');

    const child = React.cloneElement(children, {
        onClick: (e: any) => {
            children.props.onClick?.(e);
            ctx.setOpen(true);
        },
    });

    return child;
}

/* DialogContent: the modal itself */
export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
    const ctx = useContext(DialogContext);
    if (!ctx) throw new Error('DialogContent must be used inside Dialog');

    const elRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ctx.open) {
            // lock scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [ctx.open]);

    if (!ctx.open) return null;

    const modal = (
        <div
            ref={elRef}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            aria-modal="true"
            role="dialog"
        >
            <div
                className="fixed inset-0 bg-black/40 transition-opacity"
                onClick={() => ctx.setOpen(false)}
            />
            <div
                className={`relative z-10 w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 ${className ?? ''}`}
                role="document"
            >
                {children}
            </div>
        </div>
    );

    return createPortal(modal, document.body);
}

/* Helpers for structure */
export function DialogHeader({ children }: { children: ReactNode }) {
    return <div className="mb-4">{children}</div>;
}
export function DialogTitle({ children }: { children: ReactNode }) {
    return <h3 className="text-lg font-semibold">{children}</h3>;
}
export function DialogDescription({ children }: { children: ReactNode }) {
    return <div className="text-sm text-gray-600 mt-2">{children}</div>;
}
