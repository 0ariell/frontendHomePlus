import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [email,setEmail]=useState(''); const [pw,setPw]=useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e:any) => {
    e.preventDefault();
    await login(email,pw);
    nav('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Login</h2>
        <input type="email" placeholder="Email"
          value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded" required />
        <input type="password" placeholder="Password"
          value={pw} onChange={e=>setPw(e.target.value)}
          className="w-full mb-4 p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
