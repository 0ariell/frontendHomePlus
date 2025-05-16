import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Register: React.FC = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [role, setRole] = useState('client'); // Valor por defecto o selector dinámico según tu app
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    await register({ firstName, lastName, email, password: pw, role });
    nav('/');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl">Registrar</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={firstName}
          onChange={e => setfirstName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Nombre completo"
          value={lastName}
          onChange={e => setlastName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="client">Cliente</option>
          <option value="worker">Trabajador</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default Register;