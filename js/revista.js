/* -------------------------------------------------
   Sistema de suscripción de revista (simulado)
   Guarda si el usuario está suscripto usando localStorage
   Mejora: ahora valida correo antes de suscribir
---------------------------------------------------*/

// Validación del formulario de suscripción
const formSuscripcion = document.getElementById("form-suscripcion");

if (formSuscripcion) {
  formSuscripcion.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar la página

    // Input del email
    const emailInput = document.getElementById("email-suscripcion");
    const email = emailInput.value.trim();

    // Validación simple del email
    if (email === "" || !email.includes("@") || !email.includes(".")) {
      alert("Por favor, ingresá un correo válido.");
      emailInput.focus();
      return;
    }

    // Si todo esta bien guardamos la suscripción
    localStorage.setItem("suscripto", "true");
    alert("¡Gracias por suscribirte!");

    // Opcional: limpiar y volver al inicio
    formSuscripcion.reset();
    window.location.href = "index.html";
  });
}

// Verificación de suscricion en páginas primium
function verificarSuscripcion() {
  const suscripto = localStorage.getItem("suscripto");

  if (suscripto !== "true") {
    window.location.href = "accesoDenegado.html";
  }
}

// Cerrar sesión / Anular suscripción
function cerrarSesion() {
  localStorage.removeItem("suscripto");
  alert("Se cerró tu sesión correctamente.");
  window.location.href = "index.html";
}
