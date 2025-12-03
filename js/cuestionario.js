// Variable global para guardar el último número
let ultimoEstado = null;

/*me trae elementos del html ENGLOBA EL DOM PARA DEJAR QUE SE CARGUE PRIMERO*/
document.addEventListener("DOMContentLoaded", () => {
const btnsEstado=document.getElementsByClassName("btnEstado");

const contenedorEstado=document.getElementById("valorEstado");

/*convierte valor en arreglo, lo recorre, crea el evento y asiga, la data, y el valor en imagen a dos constante */
Array.from(btnsEstado).forEach(botonEstado => {

    const valorEstado=botonEstado.dataset.valorestado;
    const imgEstado=botonEstado.children[0];

    botonEstado.addEventListener("click",()=> {
    if (contenedorEstado.children.length===0 || contenedorEstado.style.display === "none"){    /*debugger; contenedorEnergia.innerHTML=imgEnergia*/
    contenedorEstado.style.display = "block"; // lo mostramos de nuevo
    contenedorEstado.innerHTML = ""; // limpiamos por si acaso
    const copia = botonEstado.cloneNode(true); // clona el botón entero // true = clona también hijos
    contenedorEstado.appendChild(copia);

    const valorEstado=botonEstado.dataset.valorestado;
    ultimoEstado=valorEstado;
    // Guardar el último valor en localStorage
localStorage.setItem("ultimoEstado", JSON.stringify({
  tipo: "estado",
  valor: ultimoEstado,
  timestamp: Date.now()
}));

// Recuperar el último valor
const ultimoGuardadoEstado = JSON.parse(localStorage.getItem("ultimoEstado"));

if (ultimoGuardadoEstado) {
  console.log("Último valor guardado:", ultimoGuardadoEstado.valor);
  console.log("Fecha:", new Date(ultimoGuardadoEstado.timestamp));
}

    }
    else { alert( `Ya tenes un valor asignado de "Estado", si deseas cambiar desmarca la etiqueta en el segmento "mi día"`)}
            });

});

// Cuando alguien haga click en el div...
contenedorEstado.addEventListener("click", () => {
  contenedorEstado.style.display = "none"
});



});


/*modal emergente "NO LO SE"*/

const modalEstado = document.getElementById("modal-estado");
const openBtnEstado = document.getElementById("estadoModal");
const closeBtnEstado = document.getElementById("closeModalEstado");

openBtnEstado.addEventListener("click", () => {
  modalEstado.classList.add("visible");
});

closeBtnEstado.addEventListener("click", () => {
  modalEstado.classList.remove("visible");
});

// Opcional: cerrar si se hace click fuera del contenido
modalEstado.addEventListener("click", (e) => {
  if (e.target === modalEstado) {
    modalEstado.classList.remove("visible");
  }
});



// Variable global para guardar el último número
let ultimoDolor = null;


/*me trae elementos del html ENGLOBA EL DOM PARA DEJAR QUE SE CARGUE PRIMERO*/
document.addEventListener("DOMContentLoaded", () => {
const btnsDolor=document.getElementsByClassName("btnDolor");

const contenedorDolor=document.getElementById("valorDolor");

/*convierte valor en arreglo, lo recorre, crea el evento y asiga, la data, y el valor en imagen a dos constante */
Array.from(btnsDolor).forEach(botonDolor => {

    const valorDolor=botonDolor.dataset.valordolor;
    const imgDolor=botonDolor.children[0];

    botonDolor.addEventListener("click",()=> {
    if (contenedorDolor.children.length===0 || contenedorDolor.style.display === "none"){    /*debugger; contenedorEnergia.innerHTML=imgEnergia*/
    contenedorDolor.style.display = "block"; // lo mostramos de nuevo
    contenedorDolor.innerHTML = ""; // limpiamos por si acaso
    const copia = botonDolor.cloneNode(true); // clona el botón entero // true = clona también hijos
    contenedorDolor.appendChild(copia);

    const valorDolor=botonDolor.dataset.valordolor;
    ultimoDolor=valorDolor;
    // Guardar el último valor en localStorage
localStorage.setItem("ultimoDolor", JSON.stringify({
  tipo: "dolor",
  valor: ultimoDolor,
  timestamp: Date.now()
}));

// Recuperar el último valor
const ultimoGuardadoDolor = JSON.parse(localStorage.getItem("ultimoDolor"));

if (ultimoGuardadoDolor) {
  console.log("Último valor guardado:", ultimoGuardadoDolor.valor);
  console.log("Fecha:", new Date(ultimoGuardadoDolor.timestamp));
}

    }
    else { alert( `Ya tenes un valor asignado de "Dolor", si deseas cambiar desmarca la etiqueta en el segmento "Mi día"`)}
            });

});

// Cuando alguien haga click en el div...
contenedorDolor.addEventListener("click", () => {
  contenedorDolor.style.display = "none"
});



});


/*modal emergente "NO LO SE"*/

const modalDolor  = document.getElementById("modal-dolor");
const openBtnDolor = document.getElementById("dolorModal");
const closeBtnDolor = document.getElementById("closeModalEstado");

openBtnDolor.addEventListener("click", () => {
  modalDolor.classList.add("visible");
});

closeBtnDolor.addEventListener("click", () => {
  modalDolor.classList.remove("visible");
});

// Opcional: cerrar si se hace click fuera del contenido
modalDolor.addEventListener("click", (e) => {
  if (e.target === modalDolor) {
    modalDolor.classList.remove("visible");
  }
});

