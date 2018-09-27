 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Con las clases  Astro  y  Estrella  (que hereda de Astro) se explica como se implementan
   las clases en  Javascript  mediante prototipos.
   
   ******* ******* ******* ******* ******* ******* ******* */

// Estrella  hereda de CuerpoCeleste

Estrella = function (radio, textura,tiempoGiro) {
  // La propia función que define la clase es su constructor
  // Lo primero que se hace es llamar al constructor de su superclase, en este caso   Astro
  // Como parámetros se pasa a sí misma,   this,   más los otros parámetros que hicieran falta pasarle a la superclase.
  
  CuerpoCeleste.call (this, radio, textura, tiempoGiro);
  
  // Se le añade la componente emisiva al Astro: intensidad y textura
  this.elCuerpoCeleste.material.emissive.set(0xffffff);
  this.elCuerpoCeleste.material.emissiveMap = this.texturaCargada;
  
  // Le ponemos una luz puntual
  this.elCuerpoCeleste.add (new THREE.PointLight(0xffffff,50,0,1));
}

// La clase  Estrella  hereda los métodos de su superclase, en este caso la clase CuerpoCeleste
Estrella.prototype = Object.create (CuerpoCeleste.prototype);

// Indicamos cuál es su constructor
Estrella.prototype.constructor = Estrella;

Estrella.prototype.addPlaneta = function(planeta){
  this.translacion.add(planeta);

}
