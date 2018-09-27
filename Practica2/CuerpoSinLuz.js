
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Con las clases  Astro  y  Estrella  (que hereda de Astro) se explica como se implementan
   las clases en  Javascript  mediante prototipos.
   
   ******* ******* ******* ******* ******* ******* ******* */


// CuerpoSinLuz   va a heredar de la clase   CuerpoCeleste 

CuerpoSinLuz = function (radio, tiempoGiro, textura, posicion) {
  
  CuerpoCeleste.call (this, radio, textura, tiempoGiro);

  // Agregar la translación
  this.translacion.position.x=posicion;
  
  var rotacionInicial = { angulo : 0 };
  var rotacionFinal = { angulo : 2 * Math.PI };
  var inicio={x: 65, y:0};
  var fin={x: -65, y:0};
  var rotacion=this.rotacion;

  this.interpolador2 = new TWEEN.Tween(rotacionInicial).to(rotacionFinal, tiempoGiro)
    .onUpdate (function(){
      // Dentro de esta función podemos acceder a  this.elAstro  gracias a la referencia que hemos almacenado previamente en   astro
      rotacion.rotation.y = rotacionInicial.angulo;
    })
    .repeat (Infinity)
    .start();

    //EXAMEN
  var rotacionelipse=this.rotacionelipse;
  this.interpolador3 = new TWEEN.Tween(inicio).to(fin, tiempoGiro)
    .onUpdate (function(){
      // Dentro de esta función podemos acceder a  this.elAstro  gracias a la referencia que hemos almacenado previamente en   astro
      rotacionelipse.position.x = inicio.x;
      rotacionelipse.position.y = inicio.y;
    })
    .yoyo(true)
    .repeat (Infinity)
    .start();
  //this.add (this.rotacion);
}

// La clase  Astro  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
CuerpoSinLuz.prototype = Object.create (CuerpoCeleste.prototype);

// Indicamos cuál es su constructor
CuerpoSinLuz.prototype.constructor = CuerpoSinLuz;

  // Ahora se añaden los nuevos métodos públicos de la clase. Se añaden como prototipos.


