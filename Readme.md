# Evaluación 2

Procesar formulario - modificación del DOM

El proyecto se dividirá por Partes o Etapas de desarrollo

### Etapa 1 | Estructura mínima y base visual:

- Se incorpora la estructura base del proyecto, tanto para
  - HTML
  - CSS
  - Javascript


### Etapa 2 | Campos del formulario y estilos básicos

Agregamos los campos al formulario

### Etapa 3 | Validación básica de campos y errores visuales
- Solo se actualiza los inputs para que tengan el atributo required.
- Además, se usa span con ID para mensajes de error.

### Etapa 4 | Validación del formulario completo y estructura de datos básica
- No hay cambios en esta etapa, se agrega el atributo `novalidate` al formulario para evitar la validación del navegador.


### Etapa 5 | Guardar productos y mostrarlos en pantalla

Agregamos un contenedor para mostrar la lista de productos debajo del formulario


### Etapa 6 | Eliminar productos desde la interfaz
No hay cambios en esta etapa en el HTML original. Pero se modifica el código generado dinámicamente en Javascript para agregar un botón de eliminación.


### Etapa 7 | Mostrar estadísticas de productos (total, promedio, categorías únicas)

La idea central es poder plasmar los productos que el usuario ingrese en el input de "Agregar Productos"

### Etapa 8 | Mensajes de alerta al usuario (éxito y error)
Cuando el usuario introduce entradas válidas este mensaje de "Producto agregado correctamente" se puede visualizar en color verde. 

Mientras que cuando el usuario no completa los campos pero intenta enviar el formulario vacío, este emite un mensaje de error con "Por favor corrige los errores en el formulario"


### Etapa 9 | Limpiar formulario y errores tras agregar producto

Se muestra un botón de color rojo, una vez que el usuario ingresa un producto al carrito de compras. El cual le ayuda a limpiar el formulario.

### Etapa 10 | Accesibilidad y protección (escape HTML + IDs únicos)

Esto ayuda a que el usuario ingrese datos válidos.

Ejemplo: si el usuario intenta introducir letras en el campo de números, el sistema no lo permite.


## Según Rúbrica se cumple con:

- Modificación del DOM con JavaScript
- Validación de formularios HTML
- Uso de arreglos y objetos en la aplicación
- Organización del código con funciones

### Se implementan Issues

Tareas pendientes:

- Revisión de código seguro
- Limite de ingreso de datos para evitar el ataque de "buffer overflow"
- Imput solo con datos válidos
