import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs , updateDoc, addDoc, collection} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// Tu configuración (la copias desde Firebase Console)

const firebaseConfig = {
  apiKey: "AIzaSyDQaIFUznKDHCcwPl3nA_IWzjr-9b8FiIM",
  authDomain: "invitaciones-back-axel-y-ruth.firebaseapp.com",
  projectId: "invitaciones-back-axel-y-ruth",
  storageBucket: "invitaciones-back-axel-y-ruth.appspot.com",
  messagingSenderId: "322678533083",
  appId: "1:322678533083:web:0b56beb148bf410b3655fe" 
};

const col = "familias"; // Nombre de la colección
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
// Obtener una familia por ID
export async function getFamiliaById(id) {
    const docRef = doc(db, col, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  // Confirmar asistencia
export async function confirmarAsistencia(id) {
    const docRef = doc(db, col, id);
    await updateDoc(docRef, {
        asistencia: true
    });
  }
