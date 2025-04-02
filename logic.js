window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("name");
    const count = params.get("pases");
    const titulo = document.getElementById("tituloInvitado");
    if (titulo) {
      if (id) {
        titulo.textContent = `${id}`;
      }else{
        titulo.textContent = "¡Bienvenido!";
      }
    }
    const numeroPases = document.getElementById("numeroPases");
    if (numeroPases) {
      if (count) {
        numeroPases.textContent = `${count} Persona(s)`;
      }
    }

    document.getElementById("aceptarInvitacionBtn").addEventListener("click", () => {
        document.getElementById("tituloInvitado").textContent = "Xd";
      });
  });
  
  
  