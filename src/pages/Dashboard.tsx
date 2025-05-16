import React from 'react';
import { Card } undefined;

export default function Dashboard() {
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
                <h3 className="text-lg font-semibold mb-2">Bienvenido</h3>
                <p>Este es tu dashboard de HomePlus.</p>
            </Card>
            <Card>
                <h3 className="text-lg font-semibold mb-2">Mis solicitudes</h3>
                <p>Revisa las solicitudes de servicios que has creado.</p>
            </Card>
            <Card>
                <h3 className="text-lg font-semibold mb-2">Trabajadores favoritos</h3>
                <p>Gestiona tu lista de profesionales de confianza.</p>
            </Card>
        </div>
    );
}
