let preguntas;
let indice = 0;
let puntuacion = 0;
let idioma = 'es'; 

window.onload = () => {

  const params = new URLSearchParams(window.location.search);
  if (params.has('lang')) {
    idioma = params.get('lang');
  }

  cargarPreguntas();
  
  document.getElementById('btnSiguiente').addEventListener('click', () => {
    indice++;
    if (indice < preguntas.length) {
      mostrarPregunta();
    } else {
      terminarQuiz();
    }
  });

  document.getElementById('btnSalir').addEventListener('click', () => {
    window.location.href = "index.html";
  });
};

function cargarPreguntas() {
  const archivo = idioma === 'en' ? 'preguntas_en.xml' : 'preguntas_es.xml';

  fetch(archivo)
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar el archivo XML');
      return response.text();
    })
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
      preguntas = Array.from(data.getElementsByTagName('question'));
      indice = 0;
      puntuacion = 0;
      mostrarPregunta();
    })
    .catch(err => {
      document.getElementById('pregunta').textContent = 'Error cargando preguntas.';
      console.error(err);
    });
}

function mostrarPregunta() {
  const pregunta = preguntas[indice];
  const texto = pregunta.getElementsByTagName('wording')[0].textContent;
  const opciones = pregunta.getElementsByTagName('choice');

  document.getElementById('pregunta').textContent = texto;

  const contenedor = document.getElementById('opciones');
  contenedor.innerHTML = '';

  for (let i = 0; i < opciones.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = opciones[i].textContent;
    btn.onclick = () => {

      if (opciones[i].getAttribute('correct') === 'yes') {
        puntuacion++;
      }

 
      const botones = contenedor.querySelectorAll('button');
      botones.forEach(b => b.disabled = true);


      if (opciones[i].getAttribute('correct') === 'yes') {
        btn.style.backgroundColor = 'green';
      } else {
        btn.style.backgroundColor = 'red';

        for (let j = 0; j < opciones.length; j++) {
          if (opciones[j].getAttribute('correct') === 'yes') {
            botones[j].style.backgroundColor = 'green';
            break;
          }
        }
      }


      document.getElementById('btnSiguiente').style.display = 'inline-block';
    };
    contenedor.appendChild(btn);
  }

  document.getElementById('btnSiguiente').style.display = 'none';


  document.getElementById('resultado').textContent = '';
}

function terminarQuiz() {
  document.getElementById('pregunta').textContent = idioma === 'en' ? 'Quiz finished' : 'Quiz terminado';
  document.getElementById('opciones').innerHTML = '';
  document.getElementById('resultado').textContent = `${idioma === 'en' ? 'Score' : 'Puntuación'}: ${puntuacion} / ${preguntas.length}`;
  document.getElementById('btnSiguiente').style.display = 'none';
}
