
'use client';

import { useEffect, useState } from 'react';
import { getObras } from '../services/databaseService';

interface Obra {
  id: string;
  titulo: string;
  imagem: string;
}

export default function Home() {
  const [obras, setObras] = useState<Obra[]>([]);

  useEffect(() => {
    const fetchObras = async () => {
      const obrasList = await getObras();
      setObras(obrasList as Obra[]);
    };

    fetchObras();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Portfólio de Obras</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {obras.map((obra) => (
            <div key={obra.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <img src={obra.imagem} alt={obra.titulo} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-700">{obra.titulo}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
