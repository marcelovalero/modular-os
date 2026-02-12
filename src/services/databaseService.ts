export async function getObras() {
     const { collection, getDocs } = await import('firebase/firestore');
     const { db } = await import('../lib/firebase');
     const querySnapshot = await getDocs(collection(db, "obras"));
     return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   }
export async function manualSeed(obras: any[]) {
     const { collection, addDoc } = await import('firebase/firestore');
     const { db } = await import('../lib/firebase');
     const obrasCollection = collection(db, 'obras');
     for (const obra of obras) { await addDoc(obrasCollection, obra); }
   }