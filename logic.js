window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const titulo = document.getElementById("tituloInvitado");
    if (titulo) {
      if (id) {
        titulo.textContent = `Invitación #${id}`;
      }else{
        titulo.textContent = "¡Bienvenido!";
      }
    }
    const numeroPases = document.getElementById("numeroPases");
    if (numeroPases) {
      numeroPases.textContent = "2 Personas";
    }

    document.getElementById("aceptarInvitacionBtn").addEventListener("click", () => {
        document.getElementById("tituloInvitado").textContent = "Xd!";
      });
  });
  
  
  