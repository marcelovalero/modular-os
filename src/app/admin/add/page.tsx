
'use client';

import withAuth from '../../../components/withAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addObra } from '../../../services/databaseService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'; // Importando o toast

const obraSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  imagem: z.string().url('URL da imagem inválida'),
});

type ObraForm = z.infer<typeof obraSchema>;

const AddObraPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ObraForm>({
    resolver: zodResolver(obraSchema),
  });

  const onSubmit = async (data: ObraForm) => {
    const promise = addObra(data);

    await toast.promise(promise, {
      loading: 'Salvando nova obra...',
      success: 'Obra adicionada com sucesso!',
      error: (err) => `Erro ao adicionar obra: ${err.message}`,
    });

    // Apenas redireciona se a operação for bem-sucedida
    promise.then(() => {
      router.push('/admin');
      router.refresh(); // Força a atualização dos dados na página de admin
    }).catch(() => {
      // O erro já é tratado pelo toast.promise
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Adicionar Nova Obra</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
              Título
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="titulo"
              type="text"
              {...register('titulo')}
            />
            {errors.titulo && <p className="text-red-500 text-xs italic mt-2">{errors.titulo.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagem">
              URL da Imagem
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imagem"
              type="text"
              {...register('imagem')}
            />
            {errors.imagem && <p className="text-red-500 text-xs italic mt-2">{errors.imagem.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Obra'}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddObraPage);
