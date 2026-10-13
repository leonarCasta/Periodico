/* =========================================================
   LA VOZ DEL ANÁHUAC — carga de imágenes
   Al poner tus fotos en la carpeta "img" con el nombre indicado,
   se sustituyen solas. Si falta el archivo, se muestra el dibujo
   de respaldo que está en "img/alternos".
   ========================================================= */
(function () {
  'use strict';

  var extensiones = ['jpg', 'jpeg', 'png', 'webp'];
  var imagenes = document.querySelectorAll('.lamina img');

  Array.prototype.forEach.call(imagenes, function (imagen) {
    var base = imagen.getAttribute('src').replace(/\.[^.]+$/, '');
    var indice = 0;

    imagen.setAttribute('data-estado', 'cargando');

    imagen.addEventListener('load', function () {
      imagen.setAttribute('data-estado', 'listo');
    });

    imagen.addEventListener('error', function () {
      indice += 1;
      if (indice < extensiones.length) {
        imagen.src = base + '.' + extensiones[indice];
        return;
      }
      imagen.src = 'img/alternos/' + base.replace(/^img\//, '') + '.svg';
      imagen.setAttribute('data-respaldo', 'si');
    });
  });
})();