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

const data = []

const invitados = data.map((invitado) => ({
    asistencia: false,
    asistentes: 0,
    integrantes: parseInt(invitado.Adultos) + parseInt(invitado.Peques),
    nombre: invitado.Nombre_Invitacion,
}));

// 🚀 Función para insertar en Firestore
export async function insertarInvitados() {
  console.log(invitados);

  for (const invitado of invitados) {
    try {
      await addDoc(collection(db, col), invitado);
      console.log(`✅ Insertado: ${invitado.nombre}`);
    } catch (error) {
      console.error(`❌ Error en ${invitado.nombre}:`, error);
    }
  }
  alert("🎉 ¡Todos los invitados fueron insertados!");
}


// Funcioin para obtener los id de los documentos
export async function getAllIds() {
  const querySnapshot = await getDocs(collection(db, col));
  const ids = [];
  querySnapshot.forEach((doc) => {
    ids.push({url:`https://axel-y-ruth-invitacion-a-la-boda.github.io/?id=${doc.id}`, nombre: doc.data().nombre, asistencia: doc.data().asistencia, integrantes: doc.data().integrantes}); // Cambia 'nombre' por el campo que quieras mostrar
  });
  return ids;
}

