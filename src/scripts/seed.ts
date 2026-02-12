
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firebaseConfig } from '@/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const obras = [
  {
    "titulo": "Edifício Corporativo em Aço",
    "imagem": "https://www.berton-estruturas.com.br/wp-content/uploads/2023/07/Berton-Imagem-Grid-Principal-01-01-1.jpg"
  },
  {
    "titulo": "Centro de Distribuição Modular",
    "imagem": "https://www.berton-estruturas.com.br/wp-content/uploads/2023/07/Berton-Imagem-Grid-Principal-01-02-1.jpg"
  },
  {
    "titulo": "Complexo Industrial Leve",
    "imagem": "https://www.berton-estruturas.com.br/wp-content/uploads/2023/07/Berton-Imagem-Grid-Principal-01-03-1.jpg"
  },
  {
    "titulo": "Estrutura para Varejo",
    "imagem": "https://www.berton-estruturas.com.br/wp-content/uploads/2023/07/Berton-Imagem-Grid-Principal-01-04-1.jpg"
  },
  {
    "titulo": "Galpão com Vão Livre",
    "imagem": "https://www.berton-estruturas.com.br/wp-content/uploads/2023/07/Berton-Imagem-Grid-Principal-01-05-1.jpg"
  },
  {
    "titulo": "Terminal Logístico Moderno",
    "imagem": "https://www.berton-estruturas.com.br/wp-content/uploads/2023/07/Berton-Imagem-Grid-Principal-01-06-1.jpg"
  }
];

async function seedDatabase() {
  const obrasCollection = collection(db, 'obras');

  // Clear existing documents
  const existingObras = await getDocs(obrasCollection);
  for (const obra of existingObras.docs) {
    await deleteDoc(doc(db, 'obras', obra.id));
  }

  // Add new documents
  for (const obra of obras) {
    await addDoc(obrasCollection, obra);
  }

  console.log('Database seeded successfully!');
}

seedDatabase();
