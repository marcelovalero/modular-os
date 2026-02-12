
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  CollectionReference,
  DocumentData,
  Timestamp, // Import Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Define um tipo para os dados da obra, tornando-o reutilizável e seguro.
export interface ObraData {
  titulo: string;
  imagem: string;
  [key: string]: any; // Permite outras propriedades, como Timestamps
}

// Define um tipo para o documento da obra, incluindo seu ID.
export interface Obra extends ObraData {
  id: string;
}

// Centraliza a referência da coleção para evitar repetição e erros.
const obrasCollection: CollectionReference<DocumentData> = collection(db, 'obras');

/**
 * Garante que todos os campos de um objeto de dados sejam serializáveis,
 * convertendo Timestamps do Firebase em strings ISO.
 * @param data O objeto de dados do Firestore.
 * @returns Um novo objeto com os dados serializados.
 */
const ensureSerializable = (data: DocumentData): DocumentData => {
  const serializableData: DocumentData = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (value instanceof Timestamp) {
        serializableData[key] = value.toDate().toISOString();
      } else {
        serializableData[key] = value;
      }
    }
  }
  return serializableData;
};

/**
 * Busca todas as obras da coleção, garantindo a serialização dos dados.
 * @returns Uma Promise que resolve para um array de obras serializadas.
 */
export async function getObras(): Promise<Obra[]> {
  const querySnapshot = await getDocs(obrasCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(ensureSerializable(doc.data()) as ObraData),
  }));
}

/**
 * Busca uma única obra pelo seu ID, garantindo a serialização dos dados.
 * @param id O ID do documento da obra.
 * @returns Uma Promise que resolve para o objeto da obra serializada.
 */
export async function getObraById(id: string): Promise<Obra> {
  const docRef = doc(obrasCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("A obra não foi encontrada.");
  }
  return { id: docSnap.id, ...(ensureSerializable(docSnap.data()) as ObraData) };
}

/**
 * Adiciona uma nova obra à coleção.
 * @param obraData Os dados da nova obra.
 */
export async function addObra(obraData: ObraData): Promise<void> {
  await addDoc(obrasCollection, obraData);
}

/**
 * Atualiza uma obra existente.
 * @param id O ID da obra a ser atualizada.
 * @param obraData Os novos dados para a obra.
 */
export async function updateObra(id: string, obraData: Partial<ObraData>): Promise<void> {
  const docRef = doc(obrasCollection, id);
  await updateDoc(docRef, obraData);
}

/**
 * Exclui uma obra da coleção.
 * @param id O ID da obra a ser excluída.
 */
export async function deleteObra(id: string): Promise<void> {
  const docRef = doc(obrasCollection, id);
  await deleteDoc(docRef);
}

/**
 * Popula o banco de dados com um conjunto inicial de obras (para desenvolvimento).
 * @param obras Um array de objetos de dados de obras.
 */
export async function manualSeed(obras: ObraData[]): Promise<void> {
  for (const obra of obras) {
    await addDoc(obrasCollection, obra);
  }
}
