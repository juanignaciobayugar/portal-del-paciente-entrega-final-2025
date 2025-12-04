// Fecha actual del calendario
let currentDate = new Date();

// Obtener eventos guardados en localStorage o iniciar objeto vacío
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

// Elementos del DOM para mostrar mes/año y los días
const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
// Definís tu constante
export const API_URL = daysContainer;

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

  // Ajuste: semana comenzando en domingo
  let start = firstDay;
  daysContainer.innerHTML = "";

  let today = new Date();

  // Bloques vacíos antes del inicio del mes
  for (let i = 0; i < start; i++) {
    daysContainer.innerHTML += `<div></div>`;
  }

  // Crear días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month + 1}-${day}`;
    let isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    let html = `<div class="day ${isToday ? "today" : ""}" onclick="addEvent('${dateKey}')">
                  <strong>${day}</strong>`;

    // Mostrar eventos guardados
    if (events[dateKey]) {
      events[dateKey].forEach((evt, i) => {
        html += `
          <div class="event">
            <div>${evt.text}</div>
            <div>${evt.hour} hs</div>

            <button class="edit-btn" onclick="event.stopPropagation(); editEvent('${dateKey}', ${i})">
  Editar
</button>

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

// Crear evento
function addEvent(dateKey) {
  const text = prompt("¿Qué debes hacer?");
  if (!text) return;

  const hour = prompt("¿A qué hora?");
  if (!hour) return;

  if (!events[dateKey]) events[dateKey] = [];
  events[dateKey].push({ text, hour });

  saveEvents();
}

// Editar evento 
function editEvent(dateKey, index) {
  const evt = events[dateKey][index];

  // Pedimos los valores actuales como base para que el usuario los modifique
  const newText = prompt("Modificar texto:", evt.text);
  if (!newText) return;

  const newHour = prompt("Modificar horario:", evt.hour);
  if (!newHour) return;

  // Actualizamos el evento
  events[dateKey][index].text = newText;
  events[dateKey][index].hour = newHour;

  saveEvents();
}

// Eliminar evento
function deleteEvent(dateKey, index) {
  events[dateKey].splice(index, 1);

  if (events[dateKey].length === 0) delete events[dateKey];

  saveEvents();
}

// Guardar en localStorage + recargar
function saveEvents() {
  localStorage.setItem("calendarEvents", JSON.stringify(events));
  loadCalendar();
}

loadCalendar();
