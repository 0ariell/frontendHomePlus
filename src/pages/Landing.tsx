import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-accent-white px-4 text-center">
            <img src="/src/assets/logo.svg" alt="HomePlus" className="h-16 mb-4" />
            <h1 className="text-4xl font-bold text-primary-700 mb-2">
                Conecta con los mejores oficios
            </h1>
            <p className="mb-6 text-secondary-700">
                Albañiles, pintores, electricistas y más, en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                    <Button>Ingresar</Button>
                </Link>
                <Link to="/register">
                    <Button variant="secondary">Registrarse</Button>
                </Link>
            </div>
        </div>
    );
}
