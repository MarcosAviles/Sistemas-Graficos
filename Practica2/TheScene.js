
/* ******* ******* ******* ******* ******* ******* ******* 

Javascript implementa el paradigma de la orientación a objetos de una manera diferente a otros
lenguajes como Java o C++

Se podría decir que una función es una clase.

Dentro de esa función las variables y funciones que se declaren con   var   serían 
variables de instancia y métodos privados.

Mientras que lo que se declare con   this.   serían 
variables de instancia y métodos públicos.

Ver como ejemplo esta clase   TheScene.

El problema está, que en cada objeto que se cree a partir de una clase definida de esta manera, se repite todo el código de todos los métodos, con lo que las necesidades de memoria aumentan considerablemente.

Lo deseable sería que el código de los métodos existiera solamente una vez, común para todos los objetos que se creen de dicha clase.

Para ello, debemos recurrir al modo de definición de métodos de clases mediante prototipos.

Para la clase   TheScene,   dado que es una clase fachada, de la que solo va a existir un objeto, no importa definirla de la manera que se muestra en este archivo. Pero para clases de las que se van a instanciar muchos objetos, lo recomendable es hacerlo mediante prototipos.

En las clases   Astro   y   Estrella   que se incluyen en este proyecto, se tiene un ejemplo de cómo se definen clases mediante prototipos.

   ******* ******* ******* ******* ******* ******* ******* */


/// Clase fachada, la escena
TheScene = function (renderer) {
  THREE.Scene.call (this);
  
  var camera = null;
  // El objeto que permite interactuar con la cámara
  var trackballControls = null;
  var axis = null;
  var ambientLight = null;
  var luz = null;
  
  /// Se crea la cámara, es necesario el renderer para interactuar con ella
  /**
   * @param renderer - El renderer que muestra la imagen y al mismo tiempo captura la interacción del usuario
   */
  var createCamera = function (self, renderer) {
    // Se define una cámara en perspectiva, con un ángulo de visión de 45 grados,
    // Un ratio de aspecto según las dimensiones de la ventana
    // Y unos planos de recorte cercano y lejano
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Dónde se sitúa y hacia donde mira
    camera.position.set (80, 80, 80);
    var look = new THREE.Vector3 (0,0,0);
    camera.lookAt(look);
    
    // El objeto que permite orbitar la cámara, reencuadrarla y hacer zoom
    trackballControls = new THREE.TrackballControls (camera, renderer);
    trackballControls.rotateSpeed = 5;
    trackballControls.zoomSpeed = -2;
    trackballControls.panSpeed = 0.5;
    trackballControls.target = look;
  }
  
  /// Se crean las luces y se añaden a la escena
  var createLights = function (self) {
    // Una ambiental
    ambientLight = new THREE.AmbientLight(0xffffff, 5);
    self.add (ambientLight);
  }
  
  /// Se crea el modelo
  /**
   * @return La raiz de la rama del modelo
   */
  var createModel = function (self) {
    var sol = new Estrella (8,'./imagenes/sol.jpg',0);
    var mercurio = new Planeta(2,12000,'./imagenes/mercurio.jpg',15);
    sol.addPlaneta(mercurio);
    var venus = new Planeta(2,10000,'./imagenes/venus.jpg',25);
    sol.addPlaneta(venus);
    var tierra = new Planeta(2,14000,'./imagenes/tierra.jpg',35);
    var luna = new Satelite(0.5,4000,'./imagenes/luna.jpg',4);
    tierra.addSatelite(luna);
    sol.addPlaneta(tierra);
    var marte = new Planeta(2,10000,'./imagenes/marte.jpg',50);
    var fobos = new Satelite(0.5,4000,'./imagenes/fobos.jpg',4);
    var deimos = new Satelite(0.5,6000,'./imagenes/deimos.jpg',6);
    marte.addSatelite(fobos);
    marte.addSatelite(deimos);
    sol.addPlaneta(marte);
    var jupiter = new Planeta(2,12000,'./imagenes/jupiter.jpg',65);
    var lo = new Satelite(0.5,6000,'./imagenes/lo.jpg',4);
    var europa = new Satelite(0.5,4000,'./imagenes/europa.jpg',6);
    var calisto = new Satelite(0.5,8000,'./imagenes/calisto.jpg',8);
    jupiter.addSatelite(lo);
    jupiter.addSatelite(europa);
    jupiter.addSatelite(calisto);
    sol.addPlaneta(jupiter);
    self.add(sol);
  }

  // Crear el fondo de la escena
  var crearFondo = function(self){

  
    // Las variables   var   son variables  locales  al constructor. No son accesibles desde los métodos prototipo.
  
    var cargadorTextura = new THREE.TextureLoader();
  
    // Las variables   this.   son variables de instancia públicas.
    // Siempre hay que nombrarlas con la sintaxis   this.variable   No poner   this.   daría error ya que no sería la misma variable.
  
    var texturaFondo = cargadorTextura.load ('./imagenes/fondo.jpg');
    
    var esfera = new THREE.Mesh (
          new THREE.SphereGeometry (550,100,20,0,2*Math.PI,0,Math.PI),
          new THREE.MeshLambertMaterial ({
            color: 0x0f0f0f, 
            map: texturaFondo,
            side: THREE.BackSide          })
      );
    
    // Alamacenamos en la variable local   astro   una referencia  al atributo this.elAstro
    self.add (esfera);
  }
  
  /// Inicializador
  /**
   * @param renderer - El renderer donde se visualizará la escena
   */
  var init = function (self, renderer) {
    createLights (self);
    luz = true;
    createCamera (self, renderer);
    axis = new THREE.AxisHelper (25);
    self.add (axis);
    crearFondo(self);
    createModel(self);
        
  }
      
      // public
    
      /// Teniendo en cuenta los controles de la GUI se modifica en la escena todo lo necesario. Se realliza mediante mensajes a los objetos que correspondan. Los mensajes al modelo se realizan a través de su fachada.
  this.animate = function (controls) {
        // Se muestran o no los) ejes
    axis.visible = controls.axis;
    if(controls.onOff){
    	ambientLight.intensity=5;
    }
    else{
    	ambientLight.intensity=0;
    }
    //this.onOff(luz,ambientLight);
    //this.startStop(controls.startStop);
  }

  /*this.onOff = function (estado,aux){
  	if(estado==true){
  		aux.intensity = 0;
  		luz = false;
  	}
  	else{
  		aux.intensity = 5;
  		luz = true;
  	}
  	
  }*/
  
  /// Getter de la cámara
  this.getCamera = function () {
    return camera;
  }
  
  /// Getter del controlador de la cámara
  this.getCameraControls = function () {
    return trackballControls;
  }
  
  /// Modifica el ratio de aspecto de la cámara
  /**
   * @param anAspectRatio - El nuevo ratio de aspecto de la cámara
   */
  this.setCameraAspect = function (anAspectRatio) {
    camera.aspect = anAspectRatio;
    camera.updateProjectionMatrix();
  }
  
  // constructor
  
  init (this, renderer);
}

TheScene.prototype = Object.create (THREE.Scene.prototype);
TheScene.prototype.constructor = TheScene;

