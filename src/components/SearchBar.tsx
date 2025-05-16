import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (latitude: number, longitude: number, specialty: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      onSearch(coords.latitude, coords.longitude, specialty);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 p-4 bg-white shadow rounded">
      <input
        type="text"
        placeholder="Especialidad (ej. Carpintero)"
        value={specialty}
        onChange={e => setSpecialty(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
