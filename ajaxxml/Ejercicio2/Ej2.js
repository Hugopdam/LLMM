window.onload = loadDoc;

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      mostrarClima(this);
    }
  };
  xhttp.open("GET", "huelva.xml", true);
  xhttp.send();
}

function mostrarClima(xml) {
  const xmlDoc = xml.responseXML;
  const dia = xmlDoc.getElementsByTagName("dia")[0];
  const fecha = dia.getAttribute("fecha");

  // Fecha del xml y temperaturas
  document.getElementById("fecha").textContent = "Fecha: " + fecha;
  document.getElementById("tmax").textContent = dia.getElementsByTagName("maxima")[0].textContent;
  document.getElementById("tmin").textContent = dia.getElementsByTagName("minima")[0].textContent;

  const tabla = document.getElementById("tablaClima");

  // Obtener periodos por tramo horario
  const periodos = ["00-06", "06-12", "12-18", "18-24"];
  periodos.forEach(periodo => {
    const fila = document.createElement("tr");

    // Estado del cielo
    let cielo = dia.querySelector(`estado_cielo[periodo="${periodo}"]`);
    let estado = cielo ? cielo.getAttribute("descripcion") : "N/A";

    // Viento
    let viento = dia.querySelector(`viento[periodo="${periodo}"]`);
    let direccion = viento ? viento.getElementsByTagName("direccion")[0].textContent : "N/A";
    let velocidad = viento ? viento.getElementsByTagName("velocidad")[0].textContent : "N/A";

    // Humedad relativa 
    const horaRef = periodo.split("-")[0];
    let humedad = dia.querySelector(`humedad_relativa dato[hora="${horaRef}"]`);
    let humedadValor = humedad ? humedad.textContent : "N/A";

    // Construir fila con las variables obtenidas
    fila.innerHTML = `
      <td>${periodo}</td>
      <td>${estado}</td>
      <td>${direccion}</td>
      <td>${velocidad}</td>
      <td>${humedadValor}</td>
    `;

    tabla.appendChild(fila);
  });
}