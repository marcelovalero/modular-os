
'use client'

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Obra } from '../types/obra';

export default function ObrasPage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchObras() {
      try {
        const querySnapshot = await getDocs(collection(db, 'obras'));
        const obrasData: Obra[] = [];
        querySnapshot.forEach((doc) => {
          // Cuidado aqui: estamos assumindo que `doc.data().titulo` sempre existe e é uma string.
          // A validação com Zod (próximo passo) vai resolver isso.
          obrasData.push({ id: doc.id, ...(doc.data() as Omit<Obra, 'id'>) });
        });
        setObras(obrasData);
      } catch (error) {
        console.error('Error fetching obras: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchObras();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  console.log("LISTA DE DOCUMENTOS:", obras);

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
        <p>O banco de dados está conectado, mas a coleção 'obras' retornou zero documentos.</p>
      )}
    </div>
  );
}
