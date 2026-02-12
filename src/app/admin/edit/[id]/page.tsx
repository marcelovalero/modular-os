
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import withAuth from '../../../../../components/withAuth';
import { getObraById, updateObra, ObraData } from '../../../../../services/databaseService';
import { z } from 'zod';

// Esquema de validação com Zod (o mesmo do formulário de adicionar)
const obraSchema = z.object({
  titulo: z.string().min(1, { message: 'O título é obrigatório.' }),
  imagem: z.string().url({ message: 'Por favor, insira uma URL de imagem válida.' }),
});

const EditObraPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<ObraData>({ titulo: '', imagem: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (id) {
      const fetchObra = async () => {
        try {
          const obra = await getObraById(id);
          setFormData({ titulo: obra.titulo, imagem: obra.imagem });
        } catch (err) {
          setError('Não foi possível carregar os dados da obra.');
        } finally {
          setLoading(false);
        }
      };
      fetchObra();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const validationResult = obraSchema.safeParse(formData);

    if (!validationResult.success) {
      setFormErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    try {
      await updateObra(id, validationResult.data);
      alert('Obra atualizada com sucesso!');
      router.push('/admin');
    } catch (err) {
      setError('Falha ao atualizar a obra. Tente novamente.');
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Obra</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-semibold mb-2">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.titulo && <p className="text-red-500 text-sm mt-1">{formErrors.titulo[0]}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="imagem" className="block text-gray-700 font-semibold mb-2">URL da Imagem</label>
            <input
              type="text"
              id="imagem"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.imagem && <p className="text-red-500 text-sm mt-1">{formErrors.imagem[0]}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Salvar Alterações
            </button>
            <button 
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(EditObraPage);
