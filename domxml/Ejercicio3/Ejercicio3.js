let xmlDoc = null;

window.onload = () => {
  const req = new XMLHttpRequest();
  req.open("GET", "books.xml", true);
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      xmlDoc = req.responseXML;
    }
  };
  req.send();
};

function verPrimerTitulo() {
  const titulo = xmlDoc.getElementsByTagName("book")[0]
                       .getElementsByTagName("title")[0].textContent;
  mostrar(`<strong>Primer título:</strong> ${titulo}`);
}

function verTodosTitulos() {
  const libros = xmlDoc.getElementsByTagName("book");
  let lista = "";
  for (let libro of libros) {
    lista += libro.getElementsByTagName("title")[0].textContent + "<br>";
  }
  mostrar(`<strong>Todos los títulos:</strong><br>${lista}`);
}

function atributosLibro() {
  const libro = xmlDoc.getElementsByTagName("book")[3];
  mostrar(`<strong>Atributos del cuarto libro:</strong> ${libro.attributes.length}`);
}

function valoresAtributos() {
  const libro = xmlDoc.getElementsByTagName("book")[3];
  let datos = "";
  for (let i = 0; i < libro.attributes.length; i++) {
    datos += `${libro.attributes[i].name}: ${libro.attributes[i].value}<br>`;
  }
  mostrar(`<strong>Valores de los atributos:</strong><br>${datos}`);
}

function cuentaAutores() {
  const autores = xmlDoc.getElementsByTagName("book")[2].getElementsByTagName("author");
  mostrar(`<strong>Número de autores del tercer libro:</strong> ${autores.length}`);
}

function listarAutores() {
  const autores = xmlDoc.getElementsByTagName("book")[2].getElementsByTagName("author");
  let nombres = "";
  for (let autor of autores) {
    nombres += autor.textContent + "<br>";
  }
  mostrar(`<strong>Autores:</strong><br>${nombres}`);
}

function verTabla() {
  const libros = xmlDoc.getElementsByTagName("book");
  let tabla = `<table><tr><th>Título</th><th>Autor principal</th><th>Precio</th><th>Año</th></tr>`;
  for (let libro of libros) {
    const t = libro.getElementsByTagName("title")[0]?.textContent || "N/A";
    const a = libro.getElementsByTagName("author")[0]?.textContent || "N/A";
    const p = libro.getElementsByTagName("price")[0]?.textContent || "N/A";
    const y = libro.getElementsByTagName("year")[0]?.textContent || "N/A";
    tabla += `<tr><td>${t}</td><td>${a}</td><td>${p}</td><td>${y}</td></tr>`;
  }
  tabla += `</table>`;
  mostrar(`<strong>Libros disponibles:</strong><br>${tabla}`);
}

function mostrar(html) {
  document.getElementById("resultado").innerHTML = html;
}
