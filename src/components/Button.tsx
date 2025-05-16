import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export function Button({
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {
    const base = 'px-4 py-2 rounded-lg font-medium transition';
    const styles =
        variant === 'primary'
            ? 'bg-primary-500 hover:bg-primary-600 text-accent-white'
            : 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900';

    return (
        <button className={`${base} ${styles} ${className}`} {...props} />
    );
}
