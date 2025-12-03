/* ===== Registro ===== */
function registrarUsuario() {
  // Obtener valores ingresados por el usuario
  const nombre = document.getElementById("nombre")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  // Obtener elementos de mensaje de éxito o error
  const registroExito = document.getElementById("registroExito");
  const registroError = document.getElementById("registroError");

  // Ocultar mensajes anteriores
  if (registroExito) registroExito.style.display = "none";
  if (registroError) registroError.style.display = "none";

  // Validar que los campos no estén vacíos
  if (!nombre || !email || !password) {
    if (registroError) registroError.style.display = "block";
    return; // Salir si falta algún dato
  }

  // Guardar datos en localStorage (solo para demo)
  localStorage.setItem("usuarioNombre", nombre);
  localStorage.setItem("usuarioEmail", email);
  localStorage.setItem("usuarioPassword", password);

  // Mostrar mensaje de registro exitoso
  if (registroExito) registroExito.style.display = "block";

  // Redirigir al login después de 1.2 segundos
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
}

/* ===== Login ===== */
function iniciarSesion() {
  // Obtener valores ingresados en login
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  // Obtener datos guardados
  const emailGuardado = localStorage.getItem("usuarioEmail");
  const passwordGuardado = localStorage.getItem("usuarioPassword");

  // Validar credenciales
  if (email === emailGuardado && password === passwordGuardado) {
    window.location.href = "profile.html"; // Redirigir si son correctas
  } else {
    const loginError = document.getElementById("loginError");
    if (loginError) loginError.style.display = "block"; // Mostrar error si no coinciden
  }
}

/* ===== Perfil: mostrar nombre ===== */
window.addEventListener("DOMContentLoaded", () => {
  // Mostrar nombre del usuario en el perfil
  const nombre = localStorage.getItem("usuarioNombre");
  const nombreEl = document.getElementById("nombreUsuario");
  if (nombreEl && nombre) nombreEl.textContent = nombre;

  // Ocultar mensaje de error al escribir nuevamente en login
  const emailInput = document.getElementById("emailLogin");
  const passInput = document.getElementById("passwordLogin");
  const loginError = document.getElementById("loginError");
  const hideError = () => { if (loginError) loginError.style.display = "none"; };
  if (emailInput) emailInput.addEventListener("input", hideError);
  if (passInput) passInput.addEventListener("input", hideError);
});

/* ===== Cerrar sesión ===== */
function cerrarSesion() {
  // Limpiar localStorage al cerrar sesión
  localStorage.clear();
  window.location.href = "login.html"; // Redirigir al login
}
