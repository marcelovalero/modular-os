
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addObra } from '../../../services/databaseService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const obraSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  imagem: z.string().url('URL da imagem inválida').min(1, 'URL da imagem é obrigatória'),
});

type ObraForm = z.infer<typeof obraSchema>;

const AddObraPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<ObraForm>({
    resolver: zodResolver(obraSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ObraForm) => {
    const promise = addObra(data);

    await toast.promise(promise, {
      loading: 'Salvando nova obra...',
      success: 'Obra adicionada com sucesso!',
      error: (err) => `Erro ao adicionar obra: ${err.message}`,
    });

    promise.then(() => {
      router.push('/admin');
      router.refresh();
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Adicionar Nova Obra</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-semibold text-gray-300 mb-2">Título</label>
            <input
              id="titulo"
              type="text"
              {...register('titulo')}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            {errors.titulo && <p className="text-red-500 text-sm mt-2">{errors.titulo.message}</p>}
          </div>
          <div>
            <label htmlFor="imagem" className="block text-sm font-semibold text-gray-300 mb-2">URL da Imagem</label>
            <input
              id="imagem"
              type="text"
              {...register('imagem')}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            {errors.imagem && <p className="text-red-500 text-sm mt-2">{errors.imagem.message}</p>}
          </div>
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Obra'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddObraPage;
