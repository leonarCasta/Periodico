/* =========================================================
   LA VOZ DEL ANÁHUAC — validación del formulario de suscripción
   ========================================================= */
(function () {
  'use strict';

  var formulario = document.getElementById('form-suscripcion');
  if (!formulario) return;

  var mensaje = document.getElementById('mensaje-suscripcion');
  var campos = {
    nombre: document.getElementById('nombre'),
    pueblo: document.getElementById('pueblo'),
    correo: document.getElementById('correo')
  };

  var correccion = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  function avisar(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = 'suscripcion__mensaje' + (tipo ? ' ' + tipo : '');
  }

  function error(campo, texto) {
    var caja = formulario.querySelector('[data-error="' + campo + '"]');
    if (caja) caja.textContent = texto;
    if (campos[campo]) campos[campo].setAttribute('aria-invalid', texto ? 'true' : 'false');
  }

  function limpiar() {
    Object.keys(campos).forEach(function (clave) { error(clave, ''); });
    avisar('', '');
  }

  function revisar(campo) {
    var valor = campos[campo].value.trim();
    if (campo === 'nombre' && valor.length < 3) {
      error('nombre', 'Escriba su nombre completo.');
      return false;
    }
    if (campo === 'pueblo' && valor.length < 3) {
      error('pueblo', 'Indique el pueblo donde recibe el periódico.');
      return false;
    }
    if (campo === 'correo' && !correccion.test(valor)) {
      error('correo', 'Escriba un correo válido, como nombre@correo.com');
      return false;
    }
    error(campo, '');
    return true;
  }

  Object.keys(campos).forEach(function (clave) {
    campos[clave].addEventListener('blur', function () { revisar(clave); });
    campos[clave].addEventListener('input', function () {
      if (campos[clave].getAttribute('aria-invalid') === 'true') revisar(clave);
    });
  });

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limpiar();

    var valido = true;
    Object.keys(campos).forEach(function (clave) {
      if (!revisar(clave)) valido = false;
    });

    if (!valido) {
      avisar('Revise los datos señalados antes de suscribirse.', 'error');
      return;
    }

    avisar(
      'Queda suscrita la persona de ' + campos.nombre.value.trim() +
      ', de ' + campos.pueblo.value.trim() +
      '. El próximo número saldrá el sábado 23 de septiembre de 1813.',
      'ok'
    );
    formulario.reset();
  });
})();