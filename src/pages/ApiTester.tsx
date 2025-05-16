import React, { useState, FormEvent } from 'react';
import { Input } undefined;
import { Button } undefined;

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export default function ApiTester() {
    // Registro
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [userType, setUserType] = useState<'CLIENT' | 'WORKER'>('CLIENT');

    // Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [token, setToken] = useState<string>('');

    // Servicio
    const [srvTitle, setSrvTitle] = useState('');
    const [srvDescription, setSrvDescription] = useState('');
    const [srvLatitude, setSrvLatitude] = useState('');
    const [srvLongitude, setSrvLongitude] = useState('');
    const [srvSpecialty, setSrvSpecialty] = useState('');

    // Output genérico
    const [output, setOutput] = useState<any>(null);

    function showOutput(data: any) {
        setOutput(data);
    }

    // 1. Registro
    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        const dto = { firstName, lastName, email: regEmail, password: regPassword, userType };
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        });
        showOutput(await res.json());
    }

    // 2. Login
    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        const dto = { email: loginEmail, password: loginPassword };
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        });
        const data = await res.json();
        showOutput(data);
        if (res.ok && data.access_token) {
            setToken(data.access_token);
        }
    }

    // 3a. Ver perfil
    async function fetchProfile() {
        if (!token) return;
        const res = await fetch(`${API_BASE}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        showOutput(await res.json());
    }

    // 3b. Crear servicio
    async function handleCreateService(e: FormEvent) {
        e.preventDefault();
        if (!token) return;
        const dto = {
            title: srvTitle,
            description: srvDescription,
            latitude: parseFloat(srvLatitude),
            longitude: parseFloat(srvLongitude),
            specialty: srvSpecialty,
        };
        const res = await fetch(`${API_BASE}/service-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dto),
        });
        showOutput(await res.json());
    }

    // 3c. Listar servicios
    async function fetchServices() {
        if (!token) return;
        const res = await fetch(`${API_BASE}/service-requests`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        showOutput(await res.json());
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">🏠 HomePlus API Tester</h1>

            {/* 1. Registro */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Registro</h2>
                <form onSubmit={handleRegister} className="space-y-2">
                    <Input
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <Input
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                    />
                    <select
                        value={userType}
                        onChange={e => setUserType(e.target.value as any)}
                        className="block w-full border px-3 py-2 rounded"
                    >
                        <option value="CLIENT">CLIENT</option>
                        <option value="WORKER">WORKER</option>
                    </select>
                    <Button type="submit">Registrar</Button>
                </form>
            </section>

            {/* 2. Login */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Login</h2>
                <form onSubmit={handleLogin} className="space-y-2">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                    />
                    <Button type="submit">Entrar</Button>
                </form>
            </section>

            {/* 3. Acciones autenticadas */}
            {token && (
                <div className="space-y-6 mb-6">
                    <h2 className="text-xl font-semibold">3. Acciones autenticadas</h2>
                    <Button onClick={fetchProfile} variant="secondary">
                        Ver perfil
                    </Button>

                    <div>
                        <h3 className="font-medium mb-2">Crear servicio</h3>
                        <form onSubmit={handleCreateService} className="space-y-2">
                            <Input
                                placeholder="Título"
                                value={srvTitle}
                                onChange={e => setSrvTitle(e.target.value)}
                            />
                            <Input
                                placeholder="Descripción"
                                value={srvDescription}
                                onChange={e => setSrvDescription(e.target.value)}
                            />
                            <Input
                                placeholder="Latitud"
                                value={srvLatitude}
                                onChange={e => setSrvLatitude(e.target.value)}
                            />
                            <Input
                                placeholder="Longitud"
                                value={srvLongitude}
                                onChange={e => setSrvLongitude(e.target.value)}
                            />
                            <Input
                                placeholder="Especialidad"
                                value={srvSpecialty}
                                onChange={e => setSrvSpecialty(e.target.value)}
                            />
                            <Button type="submit">Crear servicio</Button>
                        </form>
                    </div>

                    <Button onClick={fetchServices} variant="secondary">
                        Listar mis servicios
                    </Button>
                </div>
            )}

            {/* Output */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Salida</h2>
                <pre className="bg-gray-100 p-4 rounded max-h-60 overflow-auto">
                    {JSON.stringify(output, null, 2)}
                </pre>
            </section>
        </div>
    );
}
