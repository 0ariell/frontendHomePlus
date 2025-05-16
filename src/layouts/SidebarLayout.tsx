import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function SidebarLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Overlay para cerrar el sidebar en móvil */}
            <div
                className={`fixed inset-0 bg-black/50 z-20 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`bg-secondary-500 text-accent-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform z-30 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0`}
            >
                <div className="flex items-center px-4">
                    <img src="/src/assets/logo.svg" alt="HomePlus" className="h-8" />
                </div>
                <nav>
                    <Link
                        to="/dashboard"
                        className="block py-2.5 px-4 rounded hover:bg-secondary-100"
                        onClick={() => setOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/search"
                        className="block py-2.5 px-4 rounded hover:bg-secondary-100"
                        onClick={() => setOpen(false)}
                    >
                        Buscar
                    </Link>
                    <Link
                        to="/tester"
                        className="block py-2.5 px-4 rounded hover:bg-secondary-100"
                        onClick={() => setOpen(false)}
                    >
                        API Tester
                    </Link>
                    <Link to="/services" className="block py-2.5 px-4 rounded hover:bg-secondary-100" onClick={() => setOpen(false)} >Servicios</Link>
                </nav>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col">
                {/* Header con botón burger en móvil */}
                <header className="flex items-center bg-accent-white p-4 shadow md:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-secondary-900 focus:outline-none"
                    >
                        <div className="space-y-1">
                            <span className="block w-6 h-0.5 bg-secondary-900" />
                            <span className="block w-6 h-0.5 bg-secondary-900" />
                            <span className="block w-6 h-0.5 bg-secondary-900" />
                        </div>
                    </button>
                    <h1 className="ml-4 text-lg font-semibold">HomePlus</h1>
                </header>

                <main className="flex-1 overflow-auto p-4 bg-accent-white">
                    <Outlet />
                </main>
            </div>
        </div >
    );
}
