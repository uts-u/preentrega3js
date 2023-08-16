document.addEventListener('DOMContentLoaded', function () {
  const formularioPresupuesto = document.getElementById('formulario-presupuesto');
  const contenedorResultado = document.getElementById('resultado');
  const inputPresupuesto = document.getElementById('presupuesto');
  const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
  
  formularioPresupuesto.addEventListener('submit', function (evento) {
    evento.preventDefault();
  
    const presupuesto = parseFloat(inputPresupuesto.value);
  
    if (isNaN(presupuesto)) {
      alert('Por favor, introduzca el presupuesto dispuesto a gastar.');
      return;
    }
  
    guardarPresupuestoEnLocalStorage(presupuesto);
    actualizarOpciones(presupuesto);
  });
  
  function guardarPresupuestoEnLocalStorage(presupuesto) {
    localStorage.setItem('presupuestoHomestudio', presupuesto);
  }
  
  function cargarPresupuestoDesdeLocalStorage() {
    return parseFloat(localStorage.getItem('presupuestoHomestudio'));
  }
  
  function actualizarOpciones(presupuesto) {
    contenedorResultado.classList.remove('oculto');
  
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach(opcion => {
      opcion.style.display = 'none';
    });
  
    let idOpcion = '';
  
    if (presupuesto < 1000) {
      idOpcion = 'opcion-1';
      mostrarAlertaYConsola("Homestudio básico", "Equipamiento básico");
    } else if (presupuesto >= 1000 && presupuesto < 2000) {
      idOpcion = 'opcion-2';
      mostrarAlertaYConsola("Homestudio estándar", "Equipamiento estándar");
    } else if (presupuesto >= 2000 && presupuesto < 5000) {
      idOpcion = 'opcion-3';
      mostrarAlertaYConsola("Homestudio avanzado", "Equipamiento avanzado");
    } else {
      idOpcion = 'opcion-4';
      mostrarAlertaYConsola("Homestudio profesional", "Equipamiento profesional");
    }
  
    const opcionSeleccionada = document.getElementById(idOpcion);
    opcionSeleccionada.style.display = 'block';
  }

  function mostrarAlertaYConsola(alertaTexto, consolaTexto) {
    alert(alertaTexto);
    console.log(consolaTexto);

    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.textContent = consolaTexto;
    contenedorTarjetas.appendChild(tarjeta);
  }
  
  // Cargar presupuesto desde LocalStorage al cargar la página
  const presupuestoGuardado = cargarPresupuestoDesdeLocalStorage();
  if (!isNaN(presupuestoGuardado)) {
    inputPresupuesto.value = presupuestoGuardado;
  }
});
