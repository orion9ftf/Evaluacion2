
document.addEventListener("DOMContentLoaded", () => {
  console.log("Etapa 1 - probando js");
});


const elementos = {
  formulario: null,
  nombre: null,
  precio: null,
  categoria: null,
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Probando Etapa 2");
  obtenerElementosDOM();
});

function obtenerElementosDOM() {
  elementos.formulario = document.getElementById("formulario-producto");
  elementos.nombre = document.getElementById("nombre");
  elementos.precio = document.getElementById("precio");
  elementos.categoria = document.getElementById("categoria");
}
