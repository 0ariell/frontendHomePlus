import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import WorkerCard from '@/components/WorkerCard';

type Worker = {
  id: number;
  firstName: string;
  lastName: string;
  specialty: string;
  distanceKm: number;
};

const Home: React.FC = () => {
  const [results, setResults] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (lat: number, lon: number, specialty: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?latitude=${lat}&longitude=${lon}&specialty=${encodeURIComponent(specialty)}`
      );
      if (res.ok) {
        const data = await res.json();
        setResults(
          data.map((w: any) => ({
            id: w.id,
            firstName: w.firstName,
            lastName: w.lastName,
            specialty: w.specialty,
            distanceKm: w.distanceKm,
          }))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? <p>Cargando resultados...</p>
          : results.map(worker => (
              <WorkerCard key={worker.id} worker={worker} />
            ))
        }
      </main>
    </div>
  );
};

export default Home;
