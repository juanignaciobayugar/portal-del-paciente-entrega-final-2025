// Fecha actual del calendario
let currentDate = new Date();

// Obtener eventos guardados en localStorage o iniciar objeto vacío
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

// Elementos del DOM
const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");

// Botones para cambiar de mes
document.getElementById("prevMonth").onclick = () => changeMonth(-1);
document.getElementById("nextMonth").onclick = () => changeMonth(1);

// Cambiar de mes
function changeMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  loadCalendar();
}

// Cargar calendario
function loadCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = currentDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let start = firstDay;
  daysContainer.innerHTML = "";

  let today = new Date();

  // Espacios vacíos antes del mes
  for (let i = 0; i < start; i++) {
    daysContainer.innerHTML += `<div></div>`;
  }

  // Crear los días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month + 1}-${day}`;

    let isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    let html = `<div class="day ${isToday ? "today" : ""}" onclick="addEvent('${dateKey}')">
                  <strong>${day}</strong>`;

    // Mostrar eventos
    if (events[dateKey]) {
      events[dateKey].forEach((evt, i) => {
        html += `
          <div class="event">
            <div>${evt.text}</div>
            <div>${evt.hour} hs</div>

            <!-- Botón Editar -->
            <button class="edit-btn" onclick="event.stopPropagation(); editEvent('${dateKey}', ${i})">
              Editar
            </button>

            <!-- Botón Eliminar -->
            <button class="delete-btn" onclick="event.stopPropagation(); deleteEvent('${dateKey}', ${i})">
              Eliminar
            </button>
          </div>
        `;
      });
    }

    html += "</div>";
    daysContainer.innerHTML += html;
  }
}

/* =====================================================
   🔥 Crear evento con SweetAlert2
   (Reemplaza prompt())
===================================================== */
async function addEvent(dateKey) {
  const { value: text } = await Swal.fire({
    title: "Nueva actividad",
    input: "text",
    inputLabel: "¿Qué debes hacer?",
    showCancelButton: true,
    confirmButtonText: "Siguiente",
  });

  if (!text) return;

  const { value: hour } = await Swal.fire({
    title: "Horario",
    input: "time",
    inputLabel: "¿A qué hora?",
    showCancelButton: true,
    confirmButtonText: "Guardar",
  });

  if (!hour) return;

  if (!events[dateKey]) events[dateKey] = [];
  events[dateKey].push({ text, hour });

  saveEvents();

  Swal.fire("Guardado", "El evento fue añadido", "success");
}

/* =====================================================
   🔥 Editar evento con SweetAlert2
===================================================== */
async function editEvent(dateKey, index) {
  const evt = events[dateKey][index];

  const { value: newText } = await Swal.fire({
    title: "Editar actividad",
    input: "text",
    inputLabel: "Modificar texto",
    inputValue: evt.text,
    showCancelButton: true
  });

  if (!newText) return;

  const { value: newHour } = await Swal.fire({
    title: "Editar horario",
    input: "time",
    inputValue: evt.hour,
    showCancelButton: true
  });

  if (!newHour) return;

  events[dateKey][index] = { text: newText, hour: newHour };
  saveEvents();

  Swal.fire("Editado", "El evento fue actualizado", "success");
}

/* =====================================================
   🔥 Eliminar evento con confirmación SweetAlert2
===================================================== */
function deleteEvent(dateKey, index) {
  Swal.fire({
    title: "¿Seguro quieres eliminar este evento?",
    text: "Esto no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  }).then(res => {
    if (res.isConfirmed) {
      events[dateKey].splice(index, 1);

      if (events[dateKey].length === 0) delete events[dateKey];

      saveEvents();

      Swal.fire("Eliminado", "El evento ha sido eliminado", "success");
    }
  });
}

// Guardar y recargar
function saveEvents() {
  localStorage.setItem("calendarEvents", JSON.stringify(events));
  loadCalendar();
}

loadCalendar();
