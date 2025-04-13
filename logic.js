import { getFamiliaById, confirmarAsistencia, getAllIds } from './firebase.js';

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id)

  let familia = null;

  try {
    familia  = await getFamiliaById(id);
  } catch (error) {
    familia = null;
  }
  const body = document.querySelector("body"); 
  body.style.display = familia || id === "admin" ? "block" : "none";

  const song = document.getElementById("song");
  
    
  if (familia && song) {
    song.play();
    song.muted = false; // Desmutea el audio
  }

  const familyName = familia?.nombre || null;
  const familyAsistand = familia?.asistencia || null;

  const titulo = document.getElementById("tituloInvitado");
  if (titulo) {
    titulo.textContent = id && familyName ? `${familyName}` : "¡Bienvenido!";
  }

  const count = familia?.integrantes;
  const numeroPases = document.getElementById("numeroPases");
  if (numeroPases && count) {
    numeroPases.textContent = `${count} Persona(s)`;
  }

  const aceptarBtn = document.getElementById("aceptarInvitacionBtn");
  if (aceptarBtn && (familia || id === "admin")) {
    aceptarBtn.addEventListener("click", () => {
      id === "admin"? admin() : confirmarAsistencia(id);
    });
  }

  familia? confirmacion(familyAsistand) : null;
});

function confirmacion(confirmacion) {
  const mensajeDeConfirmacion = document.getElementById("mensajeDeConfirmacion");
  const textoConfirmacion = document.getElementById("textoConfirmacion");
  const botonConfirmarDiv = document.getElementById("botonConfirmarDiv")

    if (botonConfirmarDiv) {
    botonConfirmarDiv.style.display = confirmacion? "none" : "block";
  }

  if (mensajeDeConfirmacion) {
    mensajeDeConfirmacion.style.display = confirmacion? "none" : "block";
  }

  if (textoConfirmacion) {
    textoConfirmacion.textContent = confirmacion? 'Gracias por confirmar tu asistencia.': "Confirmación de Asistencia";
  }
}

async function admin(){
  const data = await getAllIds();
  console.log(data);
  // ordenar data.asistencia por true y false
  data.sort((a, b) => b.asistencia - a.asistencia);
  generateCSVFromJSON(data, "invitados.csv");
}

function generateCSVFromJSON(jsonData, fileName = 'data.csv') {
  if (!jsonData || !jsonData.length) {
    console.error('JSON data is empty or invalid.');
    return;
  }

  const headers = Object.keys(jsonData[0]);
  const csvRows = [];

  // Agregar encabezados
  csvRows.push(headers.join(','));

  // Agregar filas
  for (const row of jsonData) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Crear enlace de descarga
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


$(function() {
  $( "#aceptarInvitacionBtn" ).click(function() {
    $( "#aceptarInvitacionBtn" ).addClass( "onclic", 250, validate);
  });

  function validate() {
    setTimeout(function() {
      $( "#aceptarInvitacionBtn" ).removeClass( "onclic" );
      $( "#aceptarInvitacionBtn" ).addClass( "validate", 450, callback );
    }, 2250 );
  }
    function callback() {
      setTimeout(function() {
        $( "#aceptarInvitacionBtn" ).removeClass( "validate" );
        confirmacion(true);

      }, 1250 );
    }
  });