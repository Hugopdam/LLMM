let data = null; // Variable para almacenar los datos JSON y saltarme la carga asíncrona

const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
  data = JSON.parse(this.responseText);
};
xhttp.open("GET", "json_demo.txt", true);
xhttp.send();

function mostrarEdad() {
  document.getElementById("resultadoEdad").textContent = "Edad: " + data.age;
}

function mostrarTipoPrimeraMascota() {
  document.getElementById("resultadoTipo").textContent = "Tipo de la primera mascota: " + data.pets[0].animal;
}

function mostrarNombrePrimeraMascota() {
  document.getElementById("resultadoNombre").textContent = "Nombre de la primera mascota: " + data.pets[0].name;
}

function mostrarNumeroMascotas() {
  document.getElementById("resultadoCantidad").textContent = "Número de mascotas: " + data.pets.length;
}

function mostrarNombresMascotas() {
  const nombres = data.pets.map(pet => pet.name).join(", ");
  document.getElementById("resultadoNombres").textContent = "Nombres de mascotas: " + nombres;
}

function mostrarTodosDatos() {
  const detalles = data.pets.map(p => `${p.animal} (${p.name})`).join(", ");
  document.getElementById("resultadoParrafo").textContent = `Nombre: ${data.name}, Edad: ${data.age}, Mascotas: ${detalles}`;
}

function mostrarTabla() {
  const tabla = document.getElementById("tablaMascotas");

  // La única solución que se me ocurre para limpiar la tabla es eliminar todas las filas menos la primera
  // (que es la cabecera). No se puede hacer un innerHTML = "" porque eso eliminaría la cabecera.
  // Si no se hace así, al añadir filas a la tabla se van acumulando y no se eliminan las anteriores.
  // Si se hace un innerHTML = "" se eliminan las cabeceras.
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }

  data.pets.forEach(pet => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${pet.animal}</td><td>${pet.name}</td>`;
    tabla.appendChild(fila);
  });
}