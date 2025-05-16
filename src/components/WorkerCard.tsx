import React from 'react';

type Worker = {
  id: number;
  firstName: string;
  lastName: string;
  specialty: string;
  distanceKm: number;
};

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => (
  <div className="bg-white shadow rounded p-4 flex flex-col space-y-2">
    <h2 className="text-xl font-semibold">{worker.firstName} {worker.lastName}</h2>
    <p className="text-gray-600">Especialidad: {worker.specialty}</p>
    <p className="text-gray-500 text-sm">A {worker.distanceKm.toFixed(1)} km</p>
    <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
      Solicitar Servicio
    </button>
  </div>
);

export default WorkerCard;
