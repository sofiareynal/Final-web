let detalle = document.querySelector("#detalle-receta");

fetch("js/recetas.json")
  .then(respuesta => respuesta.json())
  .then(recetas => {
    recetas.forEach(receta => {
      let menu = document.querySelector("#menu-" + receta.tipo);

      menu.innerHTML += `
        <button class="btn btn-receta border text-start"
                onclick="mostrarReceta('${receta.nombre}')">
          ${receta.nombre}
          <span class="d-block fst-italic">${receta.tiempo} · ${receta.dificultad}</span>
        </button>
      `;
    });

    mostrarReceta(recetas[0].nombre);
  });

function mostrarReceta(nombre) {
  fetch("js/recetas.json")
    .then(respuesta => respuesta.json())
    .then(recetas => {
      const receta = recetas.find(receta => receta.nombre === nombre);

      let listaIngredientes = receta.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join("");
      let listaPasos = receta.pasos.map(paso => `<li class="mb-2">${paso}</li>`).join("");

      detalle.innerHTML = `
        <div class="card-body p-4 p-md-5">
          <p class="etiqueta text-uppercase fw-bold mb-2">Receta ${receta.tipo}</p>

          <h2 class="card-title mb-4">${receta.nombre}</h2>

          <img src="${receta.imagen}" class="img-fluid rounded-3 mb-4 foto-receta" alt="${receta.nombre}">

          <p class="card-text mb-4">${receta.descripcion}</p>

          <div class="d-flex flex-column flex-md-row gap-3 mb-4">
            <p class="dato border rounded-3 p-3 mb-0"><i class="bi bi-clock"></i> ${receta.tiempo}</p>
            <p class="dato border rounded-3 p-3 mb-0"><i class="bi bi-people"></i> ${receta.porciones}</p>
            <p class="dato border rounded-3 p-3 mb-0"><i class="bi bi-bar-chart"></i> ${receta.dificultad}</p>
          </div>

          <div class="row g-4">
            <div class="col-md-5">
              <h3 class="h4 mb-3">Ingredientes</h3>
              <ul>${listaIngredientes}</ul>
            </div>

            <div class="col-md-7">
              <h3 class="h4 mb-3">Preparación</h3>
              <ol>${listaPasos}</ol>
            </div>
          </div>
        </div>
      `;
    });
}

const formulario = document.querySelector("#miFormulario");
const mensajeGracias = document.querySelector("#mensajeGracias");

formulario.addEventListener("submit", function (event) {

  event.preventDefault();

  if (!formulario.checkValidity()) {
    event.stopPropagation();
    formulario.classList.add("was-validated");
    return;
  }

  formulario.classList.add("was-validated");
  formulario.classList.add("d-none");
  mensajeGracias.classList.remove("d-none");

});

const botonModal = document.querySelector("#botonModal");

botonModal.addEventListener("click", function () {
  formulario.classList.remove("d-none");
  formulario.classList.remove("was-validated");
  mensajeGracias.classList.add("d-none");
});
