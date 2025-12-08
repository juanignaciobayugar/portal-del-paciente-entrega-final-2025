
  // Fecha actual en formato legible
 let fechaDeHoy = new Date().toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric"
  });
  const diaHoy = document.getElementById("diahoy");
diaHoy.textContent = fechaDeHoy;



