
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

function configurarValidaciones() {
  const campos = ["nombre", "precio", "categoria"];
  campos.forEach((campo) => {
    const input = document.getElementById(campo);
    input.addEventListener("blur", () => validarCampo(campo));
    input.addEventListener("input", () => limpiarErrorCampo(campo));
  });
}

function validarCampo(nombreCampo) {
  const input = document.getElementById(nombreCampo);
  const valor = input.value.trim();
  let error = "";

  if (valor === "") {
    error = `El campo ${nombreCampo} es obligatorio`;
  }

  mostrarErrorCampo(nombreCampo, error);
  return error === "";
}

function mostrarErrorCampo(nombreCampo, mensajeError) {
  const input = document.getElementById(nombreCampo);
  const error = document.getElementById(`error-${nombreCampo}`);

  if (mensajeError) {
    input.classList.add("error");
    error.textContent = mensajeError;
  } else {
    input.classList.remove("error");
    error.textContent = "";
  }
}

function limpiarErrorCampo(nombreCampo) {
  const input = document.getElementById(nombreCampo);
  const error = document.getElementById(`error-${nombreCampo}`);
  input.classList.remove("error");
  error.textContent = "";
}

// función desde DOMContentLoaded
// document.addEventListener("DOMContentLoaded", () => {
//   obtenerElementosDOM();
//   configurarValidaciones();
// });

function validarFormulario() {
  const campos = ["nombre", "precio", "categoria"];
  let formularioValido = true;

  campos.forEach((campo) => {
    const valido = validarCampo(campo);
    if (!valido) formularioValido = false;
  });

  return formularioValido;
}

function obtenerDatosFormulario() {
  return {
    nombre: elementos.nombre.value.trim(),
    precio: parseFloat(elementos.precio.value),
    categoria: elementos.categoria.value.trim(),
  };
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerElementosDOM();
  configurarValidaciones();

  // elementos.formulario.addEventListener("submit", (evento) => {
  //   evento.preventDefault();

  //   if (!validarFormulario()) {
  //     console.warn("Formulario no válido");
  //     return;
  //   }

  //   const datos = obtenerDatosFormulario();
  //   console.log("Producto listo para ser agregado:", datos);
  // });
});

const productos = [];

function agregarProducto(producto) {
  productos.push(producto);
  actualizarListaProductos();
}

function actualizarListaProductos() {
  const contenedor = document.getElementById("lista-productos");

  if (productos.length === 0) {
    contenedor.innerHTML = `
      <div class="productos-vacio">
        <p>No hay productos registrados. Agrega uno usando el formulario.</p>
      </div>`;
    return;
  }

  const html = productos
    .map((p) => {
      return `
        <div class="producto-item">
          <div class="producto-info">
            <h3>${p.nombre}</h3>
            <p>Categoría: ${p.categoria} | Precio: $${p.precio.toFixed(2)}</p>
          </div>
        </div>`;
    })
    .join("");

  contenedor.innerHTML = html;
}

let contadorId = 1;

elementos.formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!validarFormulario()) return;

  const datos = obtenerDatosFormulario();

  const nuevoProducto = {
    id: contadorId++,
    ...datos,
    fechaCreacion: new Date().toISOString(),
  };

  agregarProducto(nuevoProducto);
  elementos.formulario.reset();
});

