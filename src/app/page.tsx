
'use client';

import { useEffect, useState } from 'react';
import { getObras, Obra } from '../services/databaseService';
import SkeletonCard from '../components/SkeletonCard';

const HeroSection = () => (
  <section className="text-center py-20 md:py-32">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
        Construindo o Futuro com Excelência
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300">
        Um portfólio de projetos que definem o padrão em engenharia, design e construção modular.
      </p>
    </div>
  </section>
);

const ObraCard = ({ obra }: { obra: Obra }) => (
  <div className="glass-card overflow-hidden group">
    <div className="relative w-full h-64">
      <img 
        src={obra.imagem} 
        alt={obra.titulo} 
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white">{obra.titulo}</h3>
    </div>
  </div>
);

export default function HomePage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const obrasList = await getObras();
        setObras(obrasList);
      } catch (err) {
        setError('Não foi possível carregar as obras. Por favor, tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchObras();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />

      <section id="portfolio">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Nosso Portfólio</h2>
        
        {error && <p className="text-center text-red-400">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {obras.map(obra => <ObraCard key={obra.id} obra={obra} />)}
          </div>
        )}
      </section>
    </div>
  );
}
