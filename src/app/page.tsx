'use client'

import { useEffect, useState } from 'react';
import { getObras } from '../services/databaseService';
import type { Obra } from '../types/obra';

export default function ObrasPage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro

  useEffect(() => {
    async function loadObras() {
      try {
        // A página agora só precisa chamar o serviço.
        // Toda a complexidade de busca e validação está encapsulada.
        const obrasData = await getObras();
        setObras(obrasData);
      } catch (err) {
        // Se o serviço lançar um erro (ex: falha de conexão),
        // capturamos a mensagem para exibir na UI.
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Ocorreu um erro desconhecido ao buscar as obras.");
        }
        console.error(err); // Log do erro original para fins de depuração
      } finally {
        setLoading(false);
      }
    }

    loadObras();
  }, []); // O array de dependências vazio garante que o efeito rode apenas uma vez

  // Renderização condicional baseada nos estados
  if (loading) {
    return <div>Carregando galeria de obras...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>Erro ao carregar: {error}</div>;
  }

  return (
    <div>
      <h1>Obras</h1>
      {obras.length > 0 ? (
        <ul>
          {obras.map((obra) => (
            <li key={obra.id}>{obra.titulo}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma obra encontrada. A galeria pode estar vazia ou os dados não puderam ser validados.</p>
      )}
    </div>
  );
}
