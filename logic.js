import { getFamiliaById, confirmarAsistencia, } from './firebase.js';

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const familia = await getFamiliaById(id);

  const familyName = familia.nombre
  const titulo = document.getElementById("tituloInvitado");
  if (titulo) {
    titulo.textContent = id && familyName ? `Fam. ${familyName}` : "¡Bienvenido!";
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
      titulo.textContent = "¡Gracias por confirmar!";
    });
  }

});