/* ========================================================
   FUNCION REGISTRO DE USUARIO
======================================================== */
function registrarUsuario() {

  // Obtener los valores ingresados
  const nombre = document.getElementById("nombre")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  // Elementos de mensaje
  const registroExito = document.getElementById("registroExito");
  const registroError = document.getElementById("registroError");

  // Ocultar mensajes previos
  if (registroExito) registroExito.style.display = "none";
  if (registroError) registroError.style.display = "none";

  // Validación simple
  if (!nombre || !email || !password) {
    if (registroError) registroError.style.display = "block";
    return;
  }

  // Guardar en localStorage (simulación de base de datos)
  localStorage.setItem("usuarioNombre", nombre);
  localStorage.setItem("usuarioEmail", email);
  localStorage.setItem("usuarioPassword", password);

  // Mostrar éxito
  if (registroExito) registroExito.style.display = "block";

  // Redirigir luego de 1.2s
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
}

/* ========================================================
   FUNCION LOGIN
======================================================== */
function iniciarSesion() {

  // Valores ingresados
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  // Datos guardados
  const emailGuardado = localStorage.getItem("usuarioEmail");
  const passwordGuardado = localStorage.getItem("usuarioPassword");

  // Comparar credenciales
  if (email === emailGuardado && password === passwordGuardado) {
    window.location.href = "profile.html"; 
  } else {
    const loginError = document.getElementById("loginError");
    if (loginError) loginError.style.display = "block";
  }
}

/* ========================================================
   MOSTRAR EL NOMBRE EN EL PERFIL
======================================================== */
window.addEventListener("DOMContentLoaded", () => {

  const nombre = localStorage.getItem("usuarioNombre");
  const nombreEl = document.getElementById("nombreUsuario");

  if (nombreEl && nombre) {
    nombreEl.textContent = nombre;
  }

  // Ocultar mensaje de error al escribir
  const emailInput = document.getElementById("emailLogin");
  const passInput = document.getElementById("passwordLogin");
  const loginError = document.getElementById("loginError");

  const hideError = () => {
    if (loginError) loginError.style.display = "none";
  };

  if (emailInput) emailInput.addEventListener("input", hideError);
  if (passInput) passInput.addEventListener("input", hideError);
});

/* ========================================================
   CERRAR SESION
======================================================== */
function cerrarSesion() {
  localStorage.clear();
  window.location.href = "login.html";
}
