

// Variable global para guardar el último número
let ultimoNumero = null;

/*me trae elementos del html ENGLOBA EL DOM PARA DEJAR QUE SE CARGUE PRIMERO*/
document.addEventListener("DOMContentLoaded", () => {
const btnsEnergia=document.getElementsByClassName("btnEnergia");

const contenedorEnergia=document.getElementById("valorEnergia");

/*convierte valor en arreglo, lo recorre, crea el evento y asiga, la data, y el valor en imagen a dos constante */
Array.from(btnsEnergia).forEach(botonEnergia => {

    const valorEnergia=botonEnergia.dataset.valorenergia;
    const imgEnergia=botonEnergia.children[0];

    botonEnergia.addEventListener("click",()=> {
    if (contenedorEnergia.children.length===0 || contenedorEnergia.style.display === "none"){    /*debugger; contenedorEnergia.innerHTML=imgEnergia*/
    contenedorEnergia.style.display = "block"; // lo mostramos de nuevo
    contenedorEnergia.innerHTML = ""; // limpiamos por si acaso
    const copia = botonEnergia.cloneNode(true); // clona el botón entero // true = clona también hijos
    contenedorEnergia.appendChild(copia);

    const valorEnergia=botonEnergia.dataset.valorenergia;
    ultimoNumero=valorEnergia;
    // Guardar el último valor en localStorage
localStorage.setItem("ultimoEnergia", JSON.stringify({
  tipo: "energia",
  valor: ultimoNumero,
  timestamp: Date.now()
}));

// Recuperar el último valor
const ultimoGuardado = JSON.parse(localStorage.getItem("ultimoEnergia"));

if (ultimoGuardado) {
  console.log("Último valor guardado:", ultimoGuardado.valor);
  console.log("Fecha:", new Date(ultimoGuardado.timestamp));
}

    }
    else { alert( `Ya tenes un valor asignado de energia, si deseas cambiar desmarca la etiqueta en el segmento "mi día"`)}
            });

});

// Cuando alguien haga click en el div...
contenedorEnergia.addEventListener("click", () => {
  contenedorEnergia.style.display = "none"
});



});


/*modal emergente "NO LO SE"*/

const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
  modal.classList.add("visible");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("visible");
});

// Opcional: cerrar si se hace click fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("visible");
  }
});

