let data = null;

const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
  data = JSON.parse(this.responseText);
};
xhttp.open("GET", "nasa_json.txt", true);
xhttp.send();

function mostrarFecha() {
  if (data) {
    document.getElementById("fecha").textContent = data.date;
  }
}

function mostrarExplicacion() {
  if (data) {
    document.getElementById("explicacion").textContent = data.explanation;
  }
}

function mostrarURL() {
  if (data) {
    const urlEl = document.getElementById("url");
    urlEl.textContent = data.url;
    urlEl.href = data.url;
  }
}

function mostrarImagen() {
  if (data) {
    const img = document.getElementById("nasaImage");
    img.src = data.url;
    img.alt = data.title;
  }
}