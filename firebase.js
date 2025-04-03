import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// Tu configuración (la copias desde Firebase Console)

const firebaseConfig = {
    
};

collection = ""; // Nombre de la colección
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
// Obtener una familia por ID
export async function getFamiliaById(id) {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  // Confirmar asistencia
export async function confirmarAsistencia(id) {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, {
        asistencia: true
    });
  }
