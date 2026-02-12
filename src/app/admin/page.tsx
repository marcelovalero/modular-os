
'use client';

import withAuth from '../../../../components/withAuth';
import { useEffect, useState } from 'react';
import { getObras, deleteObra } from '../../../../services/databaseService';
import { useRouter } from 'next/navigation';

// Reutilizando a interface definida no databaseService
import type { Obra } from '../../../../services/databaseService';

const AdminPage = () => {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchObras = async () => {
    try {
      setLoading(true);
      const obrasList = await getObras();
      setObras(obrasList);
    } catch (err) {
      setError('Falha ao carregar obras. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra?')) {
      try {
        await deleteObra(id);
        setObras(obras.filter(obra => obra.id !== id));
      } catch (err) {
        setError('Falha ao excluir a obra.');
        console.error(err);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Painel de Controle</h1>
          <button 
            onClick={() => router.push('/admin/add')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-full sm:w-auto"
          >
            Adicionar Nova Obra
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-4">Carregando obras...</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Imagem</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Título</th>
                  <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Ações</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {obras.map((obra) => (
                  <tr key={obra.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-4">
                      <img src={obra.imagem} alt={obra.titulo} className="h-16 w-24 object-cover rounded" />
                    </td>
                    <td className="py-3 px-4 font-medium">{obra.titulo}</td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={() => handleEdit(obra.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out mr-2"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(obra.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminPage);
