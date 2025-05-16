import React, {
    useState,
    useEffect,
    FormEvent
} from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import {
    createServiceRequest,
    listServiceRequests,
    ServiceRequestDTO,
    updateServiceRequest,
    deleteServiceRequest
} from '@/services/serviceService';

export default function ServiceRequests() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [items, setItems] = useState<ServiceRequestDTO[]>([]);
    const [error, setError] = useState('');

    const fetchAll = async () => {
        try {
            const res = await listServiceRequests();
            setItems(res.data);
        } catch (e: any) {
            setError('Error al cargar solicitudes');
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await createServiceRequest({
                title,
                description,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                specialty
            });
            setTitle('');
            setDescription('');
            setLatitude('');
            setLongitude('');
            setSpecialty('');
            fetchAll();
        } catch (e: any) {
            setError('Error al crear solicitud');
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Mis solicitudes de servicio</h2>

            <form onSubmit={handleCreate} className="space-y-2 mb-6">
                <Input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
                <Input placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />
                <Input placeholder="Latitud" value={latitude} onChange={e => setLatitude(e.target.value)} />
                <Input placeholder="Longitud" value={longitude} onChange={e => setLongitude(e.target.value)} />
                <Input placeholder="Especialidad" value={specialty} onChange={e => setSpecialty(e.target.value)} />
                {error && <p className="text-red-600">{error}</p>}
                <Button type="submit">Crear solicitud</Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                    <Card key={item.id}>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm mb-2">{item.description}</p>
                        <p className="text-xs text-secondary-700">
                            [{item.latitude.toFixed(4)},{' '}{item.longitude.toFixed(4)}] — {item.specialty}
                        </p>
                        <p className="text-xs">Status: {item.status}</p>
                        <Button
                            size="sm"
                            onClick={() => {
                                const newTitle = prompt('Nuevo título', item.title);
                                if (newTitle) {
                                    updateServiceRequest(item.id, { title: newTitle })
                                        .then(fetchAll)
                                        .catch(() => alert('Error al actualizar'));
                                }
                            }}
                        >
                            Editar
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                                if (confirm('¿Eliminar esta solicitud?')) {
                                    deleteServiceRequest(item.id)
                                        .then(fetchAll)
                                        .catch(() => alert('Error al eliminar'));
                                }
                            }}
                        >
                            Eliminar
                        </Button>
                    </Card>

                ))}
                {items.length === 0 && <p>No tenés solicitudes creadas.</p>}
            </div>
        </div>
    );
}
