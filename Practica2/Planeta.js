 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Con las clases  Astro  y  Estrella  (que hereda de Astro) se explica como se implementan
   las clases en  Javascript  mediante prototipos.
   
   ******* ******* ******* ******* ******* ******* ******* */

// Planeta  hereda de   CuerpoSinLuz

Planeta = function (radio, tiempoGiro, textura, posicion) {
  // La propia función que define la clase es su constructor
  // Lo primero que se hace es llamar al constructor de su superclase, en este caso   Astro
  // Como parámetros se pasa a sí misma,   this,   más los otros parámetros que hicieran falta pasarle a la superclase.
  
  CuerpoSinLuz.call (this, radio, tiempoGiro, textura, posicion);
  
}

//Metodo para añadir satelite y lo añade al nodo this.translacion

// La clase  Estrella  hereda los métodos de su superclase, en este caso la clase  Astro
Planeta.prototype = Object.create (CuerpoSinLuz.prototype);

// Indicamos cuál es su constructor
Planeta.prototype.constructor = Planeta;

Planeta.prototype.addSatelite = function(satelite){
	this.translacion.add(satelite);

}