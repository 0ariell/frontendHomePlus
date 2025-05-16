import React from 'react';
import { useAuth } from '@/context/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  if (!user) return <p>No estás logueado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Perfil</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
