import React, { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="w-full border border-secondary-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300"
            {...props}
        />
    );
}
