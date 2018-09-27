 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Con las clases  Astro  y  Estrella  (que hereda de Astro) se explica como se implementan
   las clases en  Javascript  mediante prototipos.
   
   ******* ******* ******* ******* ******* ******* ******* */

// Satelite  hereda de CuerpoSinLuz

Satelite = function (radio, tiempoGiro, textura, posicion) {
  // La propia función que define la clase es su constructor
  // Lo primero que se hace es llamar al constructor de su superclase, en este caso   Astro
  // Como parámetros se pasa a sí misma,   this,   más los otros parámetros que hicieran falta pasarle a la superclase.
  
  CuerpoSinLuz.call (this, radio, tiempoGiro, textura, posicion);
}

// La clase  Estrella  hereda los métodos de su superclase, en este caso la clase  Astro
Satelite.prototype = Object.create (CuerpoSinLuz.prototype);

// Indicamos cuál es su constructor
Satelite.prototype.constructor = Satelite;


