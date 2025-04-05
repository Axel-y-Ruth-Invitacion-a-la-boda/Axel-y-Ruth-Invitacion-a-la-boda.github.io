import { getFamiliaById, confirmarAsistencia, } from './firebase.js';

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const familia = await getFamiliaById(id);

  const body = document.querySelector("body"); 
  // body.style.display = !familia? "none" : "block";

  const song = document.getElementById("song");
  
    
  if (familia && song) {
    song.play();
    song.muted = false; // Desmutea el audio
  }


  const familyName = familia.nombre
  const familyAsistand = familia.asistencia

  const titulo = document.getElementById("tituloInvitado");
  if (titulo) {
    titulo.textContent = id && familyName ? `Fam.${familyName}` : "¡Bienvenido!";
  }

  const count = familia.integrantes;
  const numeroPases = document.getElementById("numeroPases");
  if (numeroPases && count) {
    numeroPases.textContent = `${count} Persona(s)`;
  }

  const aceptarBtn = document.getElementById("aceptarInvitacionBtn");
  if (aceptarBtn) {
    aceptarBtn.addEventListener("click", () => {
      confirmarAsistencia(id);
    });
  }

  confirmacion(familyAsistand);

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