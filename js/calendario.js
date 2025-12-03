// Fecha actual del calendario
let currentDate = new Date();

// Obtener eventos guardados en localStorage o iniciar objeto vacío
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

// Elementos del DOM para mostrar mes/año y los días
const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");

// Botones para cambiar de mes
document.getElementById("prevMonth").onclick = () => changeMonth(-1);
document.getElementById("nextMonth").onclick = () => changeMonth(1);

// Función para cambiar el mes del calendario
function changeMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  loadCalendar(); // Recargar calendario con nuevo mes
}

// Función principal para cargar y mostrar el calendario
function loadCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Mostrar el mes y año en la cabecera
  monthYear.textContent = currentDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
  });

  // Obtener el día de la semana del primer día del mes
  const firstDay = new Date(year, month, 1).getDay();
  // Número de días en el mes actual
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Ajuste para empezar la semana en domingo
let start = firstDay; 
daysContainer.innerHTML = "";


  let today = new Date(); // Fecha de hoy para resaltar

  // Espacios vacíos antes del primer día del mes
  for (let i = 0; i < start; i++) {
    daysContainer.innerHTML += `<div></div>`;
  }

  // Crear cada día del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month + 1}-${day}`; // Clave única para cada fecha
    let isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    // Crear elemento del día
    let html = `<div class="day ${isToday ? "today" : ""}" onclick="addEvent('${dateKey}')">
                  <strong>${day}</strong>`;

    // Agregar eventos existentes a cada día
    if (events[dateKey]) {
      events[dateKey].forEach((evt, i) => {
        html += `
          <div class="event">
            <div>${evt.text}</div>
            <div>${evt.hour} hs</div>
            <button onclick="event.stopPropagation(); deleteEvent('${dateKey}', ${i})">Eliminar</button>
          </div>
        `;
      });
    }

    html += "</div>";
    daysContainer.innerHTML += html; // Añadir día al contenedor
  }
}

// Función para agregar un evento a un día
function addEvent(dateKey) {
  const text = prompt("¿Qué debes hacer?");
  if (!text) return; // Cancelar si no se ingresa texto

  const hour = prompt("¿A qué hora?");
  if (!hour) return; // Cancelar si no se ingresa hora

  if (!events[dateKey]) events[dateKey] = [];
  events[dateKey].push({ text, hour }); // Guardar evento en la fecha correspondiente

  saveEvents(); // Guardar cambios y recargar calendario
}

// Función para eliminar un evento
function deleteEvent(dateKey, index) {
  events[dateKey].splice(index, 1); // Eliminar evento del array
  if (events[dateKey].length === 0) delete events[dateKey]; // Borrar fecha si no quedan eventos
  saveEvents(); // Guardar cambios y recargar calendario
}

// Guardar eventos en localStorage y recargar calendario
function saveEvents() {
  localStorage.setItem("calendarEvents", JSON.stringify(events));
  loadCalendar();
}

// Cargar calendario al iniciar la página
loadCalendar();
