
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import withAuth from '../../../../../components/withAuth';
import { getObraById, updateObra, ObraData } from '../../../../../services/databaseService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

// Esquema de validação com Zod
const obraSchema = z.object({
  titulo: z.string().min(1, { message: 'O título é obrigatório.' }),
  imagem: z.string().url({ message: 'Por favor, insira uma URL de imagem válida.' }),
});

type ObraForm = z.infer<typeof obraSchema>;

const EditObraPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ObraForm>({
    resolver: zodResolver(obraSchema),
  });

  useEffect(() => {
    if (id) {
      const fetchObra = async () => {
        try {
          const obra = await getObraById(id);
          reset(obra); // Popula o formulário com os dados da obra
        } catch (err) {
          toast.error('Não foi possível carregar os dados da obra.');
          router.push('/admin');
        }
      };
      fetchObra();
    }
  }, [id, reset, router]);

  const onSubmit = async (data: ObraForm) => {
    const promise = updateObra(id, data);

    await toast.promise(promise, {
      loading: 'Atualizando obra...',
      success: 'Obra atualizada com sucesso!',
      error: (err) => `Falha ao atualizar a obra: ${err.message}`,
    });

    promise.then(() => {
      router.push('/admin');
      router.refresh();
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Obra</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-semibold mb-2">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="imagem" className="block text-gray-700 font-semibold mb-2">URL da Imagem</label>
            <input
              type="text"
              id="imagem"
              {...register("imagem")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.imagem && <p className="text-red-500 text-sm mt-1">{errors.imagem.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
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
