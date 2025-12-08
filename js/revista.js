/* ======================================================
   Lógica central de la revista (suscripción y protección)
   - Usa localStorage key: "suscripto" -> "true"
   - Diseñado para ser cargado desde /paginas/revista/*.html
   - Muestra SweetAlert (CDN cargado en las páginas)
====================================================== */

/* ----------------------------
   Validar y procesar formulario (suscripcion.html)
   Si existe el formulario, se conecta automáticamente.
-----------------------------*/
(function () {
  const form = document.getElementById('form-suscripcion');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email-suscripcion');
    const email = (emailInput && emailInput.value || '').trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return Swal.fire({
        title: 'Email inválido',
        text: 'Ingresá un correo válido, por ejemplo: tu@email.com',
        icon: 'error'
      });
    }

    // Guardar suscripción
    localStorage.setItem('suscripto', 'true');

    Swal.fire({
      title: '¡Suscripción exitosa!',
      text: 'Gracias por suscribirte. Volvemos al índice.',
      icon: 'success',
      confirmButtonText: 'Ir al índice'
    }).then(() => {
      // redirige dentro de la misma carpeta revista
      window.location.href = 'indice.html';
    });
  });
})();


/* -----------------------------
   verificarSuscripcion()
   - Llamar desde articulo premium (articulo.html) al cargar la página.
   - Si NO está suscripto, muestra SweetAlert y redirige a accesoDenegado o suscripción.
------------------------------*/
function verificarSuscripcion() {
  try {
    const sus = localStorage.getItem('suscripto');

    if (sus !== 'true') {
      // mostramos alerta y ofrecemos ir a suscribirse o volver
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Este contenido es exclusivo para usuarios suscritos. ¿Querés suscribirte?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, suscribirme',
        cancelButtonText: 'Volver al índice'
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = 'suscripcion.html';
        } else {
          window.location.href = 'indice.html';
        }
      });
      return;
    }
    // si está suscripto, no hacemos nada (deja ver el artículo)
  } catch (err) {
    console.error('Error en verificarSuscripcion:', err);
    // fallback: mandar a accesoDenegado
    window.location.href = 'accesoDenegado.html';
  }
}


/* -----------------------------
   cerrar sesion()
   - Cerrar la suscripción y vuelve al índice
------------------------------*/
function cerrarSesion() {
  localStorage.removeItem('suscripto');

  Swal.fire({
    title: 'Cerrar sesión',
    text: 'Tu sesión fue cerrada.',
    icon: 'info',
    confirmButtonText: 'Volver al índice'
  }).then(() => {
    window.location.href = 'indice.html';
  });
}
