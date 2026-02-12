
'use client';

import { useEffect, useState } from 'react';
import { getObras } from '../services/databaseService';
import { SkeletonCard } from '../components/SkeletonCard';

interface Obra {
  id: string;
  titulo: string;
  imagem: string;
}

export default function Home() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const obrasList = await getObras();
        setObras(obrasList as Obra[]);
      } catch (error) {
        console.error("Erro ao buscar obras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-100">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">Portfólio de Obras</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            obras.map((obra) => (
              <div key={obra.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <img src={obra.imagem} alt={obra.titulo} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-700">{obra.titulo}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
