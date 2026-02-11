import { collection, getDocs } from 'firebase/firestore';
import { z } from 'zod';
import { db } from '../lib/firebase';
import type { Obra } from '../types/obra';

// 1. Definir o Schema de validação com Zod
// Isso garante que todo objeto 'Obra' tenha um 'id' e um 'titulo'.
const ObraSchema = z.object({
  id: z.string(),
  titulo: z.string().min(1, { message: "O título não pode estar vazio." }),
  // Adicione outros campos aqui conforme a interface Obra evoluir
});

// 2. Criar um tipo inferido a partir do Schema para garantir consistência
// Embora já tenhamos a interface Obra, isso é útil para validação.
// type ObraZod = z.infer<typeof ObraSchema>;

// 3. Criar a função de serviço que busca e valida os dados
export const getObras = async (): Promise<Obra[]> => {
  console.log("Buscando e validando obras no databaseService...");
  try {
    const querySnapshot = await getDocs(collection(db, 'obras'));
    const obrasValidadas: Obra[] = [];

    querySnapshot.forEach((doc) => {
      const dados = { id: doc.id, ...doc.data() };

      // 4. Tentar validar cada documento com o schema do Zod
      const resultado = ObraSchema.safeParse(dados);

      if (resultado.success) {
        // Se a validação for bem-sucedida, adicionamos à lista
        obrasValidadas.push(resultado.data);
      } else {
        // Se a validação falhar, registramos o erro no console, mas não travamos a aplicação
        console.warn(`Documento com ID ${doc.id} falhou na validação e foi ignorado.`, resultado.error.flatten());
      }
    });

    console.log("Obras validadas com sucesso:", obrasValidadas);
    return obrasValidadas;

  } catch (error) {
    // 5. Capturar erros de conexão com o Firebase ou outros erros inesperados
    console.error("Erro ao conectar com a galeria de obras:", error);
    // Lançar um novo erro para que a UI possa tratá-lo adequadamente
    throw new Error('Falha ao buscar as obras. Verifique a conexão com o banco de dados.');
  }
};
