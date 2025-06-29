document.addEventListener("DOMContentLoaded", () => {
  console.log("Etapa 1 - Iniciando aplicación");

  obtenerElementosDOM();
  configurarValidaciones();

  elementos.formulario.addEventListener("submit", manejarEnvioFormulario);
});

const elementos = {
  formulario: null,
  nombre: null,
  precio: null,
  categoria: null,
  mensaje: null,
  totalProductos: null,
  precioPromedio: null,
  categoriasUnicas: null,
};

const productos = [];
let contadorId = 1;

function obtenerElementosDOM() {
  elementos.formulario = document.getElementById("formulario-producto");
  elementos.nombre = document.getElementById("nombre");
  elementos.precio = document.getElementById("precio");
  elementos.categoria = document.getElementById("categoria");
  elementos.mensaje = document.getElementById("mensaje");
  elementos.totalProductos = document.getElementById("total-productos");
  elementos.precioPromedio = document.getElementById("precio-promedio");
  elementos.categoriasUnicas = document.getElementById("categorias-unicas");
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
  const campo = document.getElementById(nombreCampo);
  const mensaje = document.getElementById(`error-${nombreCampo}`);
  campo.classList.remove("error");
  mensaje.textContent = "";
}

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

function manejarEnvioFormulario(evento) {
  evento.preventDefault();

  if (!validarFormulario()) {
    mostrarMensaje("Por favor corrige los errores en el formulario", "error");
    return;
  }

  const datos = obtenerDatosFormulario();
  const nuevoProducto = {
    id: contadorId++,
    ...datos,
    fechaCreacion: new Date().toISOString(),
  };

  agregarProducto(nuevoProducto);
  limpiarFormulario();
  mostrarMensaje("Producto agregado correctamente", "success");
}

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
        <div class="producto-item" data-id="${p.id}">
          <div class="producto-info">
            <h3>${escapeHTML(p.nombre)}</h3>
            <p>Categoría: ${escapeHTML(p.categoria)} | Precio: $${p.precio.toFixed(2)}</p>
          </div>
          <button 
            class="btn btn-danger" 
            onclick="eliminarProducto(${p.id})"
            title="Eliminar producto"
          >
            🗑️
          </button>
        </div>`;
    })
    .join("");

  contenedor.innerHTML = html;
  actualizarEstadisticas();
}

function eliminarProducto(id) {
  const indice = productos.findIndex((producto) => producto.id === id);

  if (indice !== -1) {
    const eliminado = productos.splice(indice, 1)[0];
    actualizarListaProductos();
    console.log(`Producto "${eliminado.nombre}" eliminado`);
  }
}

window.eliminarProducto = eliminarProducto;

function calcularEstadisticas() {
  const total = productos.length;
  const sumaPrecios = productos.reduce((suma, p) => suma + p.precio, 0);
  const promedio = total === 0 ? 0 : sumaPrecios / total;
  const categorias = new Set(productos.map((p) => p.categoria.toLowerCase()));

  return {
    total,
    promedio,
    categorias: categorias.size,
  };
}

function actualizarEstadisticas() {
  const stats = calcularEstadisticas();

  elementos.totalProductos.textContent = stats.total;
  elementos.precioPromedio.textContent = `$${stats.promedio.toFixed(2)}`;
  elementos.categoriasUnicas.textContent = stats.categorias;
}

function mostrarMensaje(texto, tipo = "success") {
  const el = elementos.mensaje;

  el.textContent = texto;
  el.className = `mensaje ${tipo} fade-in`;

  el.classList.remove("hidden");
  setTimeout(() => {
    el.classList.add("hidden");
  }, 4000);
}

function limpiarFormulario() {
  elementos.formulario.reset();

  const campos = ["nombre", "precio", "categoria"];
  campos.forEach((campo) => {
    limpiarErrorCampo(campo);
  });
}

function escapeHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

window.escapeHTML = escapeHTML;
