import { getFamiliaById, confirmarAsistencia, getAllIds } from './firebase.js';

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id)

  let familia = null;

  try {
    familia  = await getFamiliaById(id) || null;
  } catch (error) {
    familia = null;
  }
  const body = document.querySelector("body"); 
  body.style.display = id === "admin" || familia ? "block" : "none";

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
  // if (aceptarBtn && familia) {
    aceptarBtn.addEventListener("click", () => {
      id === "admin"? admin() : confirmarAsistencia(id);
    });
  // }

  // familia? confirmacion(familyAsistand) : null;
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
  console.log(await getAllIds());
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