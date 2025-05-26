let xmlDoc = null;

// Cargar el XML al iniciar
window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "books.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      xmlDoc = xhr.responseXML;
    }
  };
  xhr.send();
};

function mostrarTitulo1() {
  const titulo = xmlDoc.getElementsByTagName("book")[0]
                .getElementsByTagName("title")[0].textContent;
  mostrarResultado(`<strong>Título del primer libro:</strong> ${titulo}`);
}

function mostrarTodosTitulos() {
  const books = xmlDoc.getElementsByTagName("book");
  let titulos = "";
  for (let i = 0; i < books.length; i++) {
    titulos += books[i].getElementsByTagName("title")[0].textContent + "<br>";
  }
  mostrarResultado(`<strong>Todos los títulos:</strong><br>${titulos}`);
}

function mostrarNumAtributosLibro4() {
  const book4 = xmlDoc.getElementsByTagName("book")[3];
  const numAttrs = book4.attributes.length;
  mostrarResultado(`<strong>Número de atributos del cuarto libro:</strong> ${numAttrs}`);
}

function mostrarValoresAtributosLibro4() {
  const book4 = xmlDoc.getElementsByTagName("book")[3];
  let valores = "";
  for (let i = 0; i < book4.attributes.length; i++) {
    valores += `${book4.attributes[i].name}: ${book4.attributes[i].value}<br>`;
  }
  mostrarResultado(`<strong>Valores de los atributos del cuarto libro:</strong><br>${valores}`);
}

function mostrarNumAutoresLibro3() {
  const autores = xmlDoc.getElementsByTagName("book")[2]
                 .getElementsByTagName("author");
  mostrarResultado(`<strong>Número de autores del tercer libro:</strong> ${autores.length}`);
}

function mostrarAutoresLibro3() {
  const autores = xmlDoc.getElementsByTagName("book")[2]
                 .getElementsByTagName("author");
  let lista = "";
  for (let i = 0; i < autores.length; i++) {
    lista += autores[i].textContent + "<br>";
  }
  mostrarResultado(`<strong>Autores del tercer libro:</strong><br>${lista}`);
}

function mostrarTabla() {
  const books = xmlDoc.getElementsByTagName("book");
  let tabla = `<table><tr><th>Título</th><th>Primer autor</th><th>Precio</th><th>Año</th></tr>`;
  for (let i = 0; i < books.length; i++) {
    const title = books[i].getElementsByTagName("title")[0]?.textContent || "N/A";
    const author = books[i].getElementsByTagName("author")[0]?.textContent || "N/A";
    const price = books[i].getElementsByTagName("price")[0]?.textContent || "N/A";
    const year = books[i].getElementsByTagName("year")[0]?.textContent || "N/A";
    tabla += `<tr><td>${title}</td><td>${author}</td><td>${price}</td><td>${year}</td></tr>`;
  }
  tabla += `</table>`;
  mostrarResultado(`<strong>Tabla de libros:</strong><br>${tabla}`);
}

function mostrarResultado(html) {
  document.getElementById("output").innerHTML = html;
}