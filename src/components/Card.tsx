import React from 'react';

export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-accent-white border border-secondary-100 rounded-lg shadow-sm p-4">
            {children}
        </div>
    );
}
