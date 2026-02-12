
'use client';

import { useEffect, useState } from 'react';
import { getObras, deleteObra, Obra } from '../../services/databaseService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchObras = async () => {
    try {
      setLoading(true);
      const obrasList = await getObras();
      setObras(obrasList);
    } catch (err) {
      toast.error('Falha ao carregar obras.');
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
      const promise = deleteObra(id);

      toast.promise(promise, {
        loading: 'Excluindo obra...',
        success: () => {
          fetchObras(); // Re-fetch obras after deletion
          return 'Obra excluída com sucesso!';
        },
        error: 'Falha ao excluir a obra.',
      });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">Painel de Controle</h1>
          <button 
            onClick={() => router.push('/admin/add')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            Adicionar Nova Obra
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          {loading ? (
            <p className="text-center py-10 text-white">Carregando obras...</p>
          ) : (
            <table className="min-w-full bg-gray-800">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="text-left py-3 px-5 uppercase font-semibold text-sm">Imagem</th>
                  <th className="text-left py-3 px-5 uppercase font-semibold text-sm">Título</th>
                  <th className="text-center py-3 px-5 uppercase font-semibold text-sm">Ações</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {obras.map((obra) => (
                  <tr key={obra.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <td className="py-4 px-5">
                      <img src={obra.imagem} alt={obra.titulo} className="h-16 w-24 object-cover rounded-md shadow-sm" />
                    </td>
                    <td className="py-4 px-5 font-medium">{obra.titulo}</td>
                    <td className="py-4 px-5 text-center">
                      <button 
                        onClick={() => handleEdit(obra.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mr-2"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(obra.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
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

export default AdminPage;
