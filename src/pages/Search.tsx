import React, { useState, FormEvent } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

interface Result {
    id: string;
    name: string;
    specialty: string;
}

export default function Search() {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState<Result[]>([]);

    async function handleSearch(e: FormEvent) {
        e.preventDefault();
        // TODO: fetch(`${API_BASE}/search?specialty=${term}`)
        // setResults(await res.json());
        console.log('Buscando:', term);
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
                <Input
                    placeholder="¿Qué oficio buscás?"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                />
                <Button type="submit">Buscar</Button>
            </form>

            {results.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map(r => (
                        <Card key={r.id}>
                            <h4 className="font-semibold">{r.name}</h4>
                            <p className="text-sm text-secondary-700">{r.specialty}</p>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-secondary-700">No hay resultados aún.</p>
            )}
        </div>
    );
}
