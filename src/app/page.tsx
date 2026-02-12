
import { getObras } from '@/services/databaseService';
import Header from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Suspense } from 'react';
import { SkeletonCard } from '@/app/components/SkeletonCard';
import { AnimatedObras } from '@/app/components/AnimatedObras';

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

async function ObrasList() {
  const obras = await getObras();

  return <AnimatedObras obras={obras} />;
}

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <HeroSection />

      <section id="portfolio">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Nosso Portfólio</h2>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        }>
          <ObrasList />
        </Suspense>
      </section>
      <Footer />
    </div>
  );
}
