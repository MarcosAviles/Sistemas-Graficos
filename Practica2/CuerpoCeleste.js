
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Con las clases  Astro  y  Estrella  (que hereda de Astro) se explica como se implementan
   las clases en  Javascript  mediante prototipos.
   
   ******* ******* ******* ******* ******* ******* ******* */


// CuerpoCeleste  va a heredar de la clase   Object3D   de la biblioteca THREE

CuerpoCeleste = function (radio, textura, tiempoGiro) {
  // La propia función que define la clase es su constructor
  // Lo primero que se hace es llamar al constructor de su superclase, en este caso   Object3D
  // Como parámetros se pasa a sí misma,   this,   más otros parámetros que hicieran falta pasarle a la superclase.
  THREE.Object3D.call (this);
  
  // Las variables   var   son variables  locales  al constructor. No son accesibles desde los métodos prototipo.
  var rotacionInicial = { angulo : 0 };
  var rotacionFinal = { angulo : 2 * Math.PI };
  var cargadorTextura = new THREE.TextureLoader();
  
  // Las variables   this.   son variables de instancia públicas.
  // Siempre hay que nombrarlas con la sintaxis   this.variable   No poner   this.   daría error ya que no sería la misma variable.
  
  this.texturaCargada = cargadorTextura.load (textura);
  //var diffuseColor = new THREE.Color().setHSL( 0.1, 0.1, 0.1 );
  this.elCuerpoCeleste = new THREE.Mesh (
        new THREE.SphereGeometry (radio,100,20,0,2*Math.PI,0,Math.PI),
        new THREE.MeshLambertMaterial ({
          color: 0x0f0f0f, 
          map: this.texturaCargada
        })
      );

  var rotacionpropia = this.elCuerpoCeleste;
  this.interpolador = new TWEEN.Tween(rotacionInicial).to(rotacionFinal, tiempoGiro/2)
    .onUpdate (function(){
      // Dentro de esta función podemos acceder a  this.elAstro  gracias a la referencia que hemos almacenado previamente en   astro
      rotacionpropia.rotation.y = rotacionInicial.angulo;
    })
    .repeat (Infinity)
    .start();

  this.translacion = new THREE.Object3D();
  this.rotacion=new THREE.Object3D();

  //EXAMEN
  this.rotacionelipse=new THREE.Object3D();

  this.rotacion.add(this.rotacionelipse);
  this.rotacionelipse.add (this.translacion);
  this.translacion.add(this.elCuerpoCeleste);
  this.add(this.rotacion);
  
}

// La clase  CuerpoCeleste  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
CuerpoCeleste.prototype = Object.create (THREE.Object3D.prototype);
// Indicamos cuál es su constructor
CuerpoCeleste.prototype.constructor = CuerpoCeleste;