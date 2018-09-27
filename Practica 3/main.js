'use strict';

Physijs.scripts.worker = 'js/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var initScene, render, createShape, loader, renderer, render_stats, scene,
perderVida=true, clock = new THREE.Clock(), trackballControls=null,
objetos=[], restricciones=[], life=100, nivel=1, collision=false, timeout;

initScene = function() {
	scene = new Physijs.Scene;
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	var container=document.getElementById( 'viewport' );
	container.appendChild( renderer.domElement );
	render_stats= new Stats();
	//container.appendChild( render_stats.domElement );
  scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
  scene.addEventListener( 'update',
        function() {
             scene.simulate( undefined, 2 );
        }
  );
  
  setLife(life);
  
  document.getElementById("Reiniciar").onclick = function(){reiniciar();};

  /************************Camara***************************/
  crearCamara(scene);
  window.addEventListener( 'resize', onWindowResize, false );
  animate();
     
  /*************Luz************/
  crearLuz(scene);

  iniciarPartida();
  
  /********Objetos fuera del tablero para saber la inclinacion visual del tablero**********/

  var obstaculo= new Obstaculo(new THREE.Vector3 (54, 0, 48), new THREE.Vector3 (2, 2, 10),0, true,'images/rocks.jpg');
  scene.add(obstaculo);
     
  obstaculo = new Obstaculo(new THREE.Vector3 (48, 0, 54), new THREE.Vector3 (10, 2, 2),0, true,'images/rocks.jpg');
  scene.add(obstaculo);

  obstaculo = new Obstaculo(new THREE.Vector3 (-54, 0, 48), new THREE.Vector3 (2, 2, 10),0, true,'images/rocks.jpg');
  scene.add(obstaculo);

  obstaculo = new Obstaculo(new THREE.Vector3 (-48, 0, 54), new THREE.Vector3 (10, 2, 2),0, true,'images/rocks.jpg');
  scene.add(obstaculo);

  obstaculo = new Obstaculo(new THREE.Vector3 (54, 0, -48), new THREE.Vector3 (2, 2, 10),0, true,'images/rocks.jpg');
  scene.add(obstaculo);

  obstaculo = new Obstaculo(new THREE.Vector3 (48, 0, -54), new THREE.Vector3 (10, 2, 2),0, true ,'images/rocks.jpg');
  scene.add(obstaculo);

  obstaculo = new Obstaculo( new THREE.Vector3 (-54, 0, -48), new THREE.Vector3 (2, 2, 10),0, true,'images/rocks.jpg');
  scene.add(obstaculo);

  obstaculo = new Obstaculo(new THREE.Vector3 (-48, 0, -54), new THREE.Vector3 (10, 2, 2),0, true,'images/rocks.jpg');
  scene.add(obstaculo);
    
  /*************************Eventos del teclado********************************************/
  document.addEventListener('keydown', function(ev){
    switch( ev.keyCode ) {
      case 37:
        //Left
        scene.tablero.setAngularVelocity( new THREE.Vector3(1, 0, 0) );
      break;
      case 39:
        //Right
        scene.tablero.setAngularVelocity( new THREE.Vector3(-1, 0, 0) );
      break;
      case 38:
        //Up
        scene.tablero.setAngularVelocity( new THREE.Vector3(0, 0, 1) );
      break;
      case 40:
        // Down                      
        scene.tablero.setAngularVelocity( new THREE.Vector3(0, 0, -1) );
      break;
    }
  });
  
  document.addEventListener('keyup', function(ev) {
      scene.tablero.setAngularVelocity( new THREE.Vector3(0, 0, 0) );
  });

  requestAnimationFrame( render );
  scene.simulate();
};

function iniciarPartida(){
    /*********************** Tablero********************************/
  var soporte_tablero= new Obstaculo(new THREE.Vector3 (0, 100, 0), new THREE.Vector3 (100, 1, 100),0,  false, null);
  scene.add(soporte_tablero);
  objetos.push(soporte_tablero);
  var tablero= new Obstaculo(new THREE.Vector3 (0, 0, 0), new THREE.Vector3 (100, 1, 100),100, true, 'images/woodGround.jpg');
  scene.add(tablero);
  objetos.push(tablero);
  scene.tablero=tablero;
 soldarTablero(tablero,soporte_tablero);

  /*******************Paredes del tablero (posicion, tamaño, peso, sin o con textura, ruta, nombre)***********************************************/
  var obstaculo= new Obstaculo(new THREE.Vector3 (49, 2.5, 0), new THREE.Vector3 (2, 4, 95),0.1, true,'images/rocks.jpg');
  scene.add(obstaculo);
  objetos.push(obstaculo);
  soldar(obstaculo, scene.tablero);

  obstaculo = new Obstaculo( new THREE.Vector3 (-49, 2.5, 0), new THREE.Vector3 (2, 4, 95),0.1, true,'images/rocks.jpg');
  scene.add(obstaculo);
  objetos.push(obstaculo);
  soldar(obstaculo, scene.tablero);

  obstaculo = new Obstaculo( new THREE.Vector3 (0, 2.5, 49), new THREE.Vector3 (95, 4, 2),0.1, true,'images/rocks.jpg');
  scene.add(obstaculo);
  objetos.push(obstaculo);
  soldar(obstaculo, scene.tablero);

  obstaculo= new Obstaculo( new THREE.Vector3 (0, 2.5, -49), new THREE.Vector3 (95, 4, 2),0.1, true,'images/rocks.jpg');
  scene.add(obstaculo);
  objetos.push(obstaculo);
  soldar(obstaculo, scene.tablero);

  /***********************************Techo**********************************************/
  obstaculo= new Obstaculo(new THREE.Vector3 (0, 4.7, 0), new THREE.Vector3 (100, 0.1, 100),0.01, false,null);
  scene.add(obstaculo);
  objetos.push(obstaculo);
  scene.techo=obstaculo;
  soldar(obstaculo, scene.tablero);

  /******************************Objetos que restan y suman vida*******************/
  var pincho= new Pincho(new THREE.Vector3 (0, 2.5, 10), new THREE.Vector3 (2, 4, 32), 'malo');
  scene.add(pincho);
  objetos.push(pincho);
  soldar(pincho, scene.tablero);

  pincho = new Pincho(new THREE.Vector3 (20, 2.5, 10), new THREE.Vector3 (2, 4, 32), 'bueno');
  scene.add(pincho);
  objetos.push(pincho);
  soldar(pincho, scene.tablero);

  /**********************Pelota***********************/
  var pelota= new Pelota(new THREE.Vector3(0, 2.5, 0));
  scene.add(pelota);
  objetos.push(pelota);
  pelota.addEventListener('collision', function(obstaculo){
    comprobarObstaculo(obstaculo);
  });

  /****************************Objetivo**********************************************/
  var x=Math.round(Math.random()*(45-(-45))-45);
  var z=Math.round(Math.random()*(45-(-45))-45);
  var objetivo = new Objetivo(new THREE.Vector3 (x, 2.5, z));
  scene.add(objetivo);
  objetos.push(objetivo);
  soldar(objetivo, scene.tablero);

  }

  function borrarObjetos(){
    console.log(objetos.length);
    for(var i=0; i<objetos.length; i++){
      scene.remove(objetos[i]);
    }
    for(var i=0; i<restricciones.length; i++){
      scene.removeConstraint(restricciones[i]);
    }
    objetos.splice(0,objetos.length);
    restricciones.splice(0, restricciones.length);
  }

function cambiarEstadoColision(){
  collision = !collision;
  window.clearTimeout(timeout);
}

function comprobarObstaculo(objeto){
  if(objeto.name=='malo' && life>=5 && !collision){
    collision = true;
    timeout = window.setTimeout(cambiarEstadoColision, 1000);
  	life = life - objeto.damage;
    setLife(life);
  }
  if(objeto.name=='bueno' && life<=95 && !collision){
    collision = true;
    timeout = window.setTimeout(cambiarEstadoColision, 1000);
  	life = life + objeto.damage;
    setLife(life);
  }
  if(objeto.name=='objetivo'){
  	nivel+=2;
    borrarObjetos();
    iniciarPartida();
    document.getElementById("nivel").innerHTML = nivel;

    /*************Nuevo Objetivo, elemento penalizador, y sumador de vida********/
    for(var i=1; i<nivel; i++){
  	var x=Math.round(Math.random()*(45-(-45))-45);
  	var z=Math.round(Math.random()*(45-(-45))-45);
    var pincho= new Pincho(new THREE.Vector3 (x, 2.5, z), new THREE.Vector3 (2, 4, 32), 'malo');
    scene.add(pincho);
    objetos.push(pincho);
    soldar(pincho, scene.tablero);

  	x=Math.round(Math.random()*(45-(-45))-45);
  	z=Math.round(Math.random()*(45-(-45))-45);
  	var pincho2= new Pincho(new THREE.Vector3 (x, 2.5, z), new THREE.Vector3 (2, 4, 32), 'bueno');
    scene.add(pincho2);
    objetos.push(pincho2);
    soldar(pincho2, scene.tablero);

    /**************Nueva pelota subir Nivel*************/
    x=Math.round(Math.random()*(45-(-45))-45);
    z=Math.round(Math.random()*(45-(-45))-45);
    var pelota= new Pelota(new THREE.Vector3(x, 2.5, z));
    scene.add(pelota);
    objetos.push(pelota);
    pelota.addEventListener('collision', function(obstaculo){
      comprobarObstaculo(obstaculo);
    });
  }
  }

}


function onWindowResize() {
	scene.camera.aspect = window.innerWidth / window.innerHeight;
	scene.camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	scene.controls.update();
	render();
}


var crearLuz = function(escena){
	var light = new THREE.DirectionalLight( 0xFFFFFF );
	light.position.set( 20, 40, -15 );
	light.target.position.copy( scene.position );
	light.castShadow = true;
	light.shadow.camera.left = -60;
	light.shadow.camera.top = -60;
	light.shadow.camera.right = 60;
	light.shadow.camera.bottom = 60;
	light.shadow.camera.near = 20;
	light.shadow.camera.far = 200;
	light.shadow.bias = -.0001
	light.shadow.mapSize.width = light.shadow.mapSize.height = 2048;
	escena.light=light;
	escena.add( escena.light );

}

var crearCamara = function(escena){
	var camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
     );
     camera.position.set( 120, 90, 40 );
     var look = new THREE.Vector3 (0,0,0);
     camera.lookAt(look);
     escena.camera=camera;

     var controls = new THREE.TrackballControls (scene.camera, renderer.domElement);
	   controls.rotateSpeed = 0.5;
     controls.zoomSpeed = -1;
     controls.panSpeed = 0.5;
     controls.target = look;
     controls.noZoom = false;
     controls.noPan = false;
     controls.keys = [ 65, 83, 68 ];
     controls.addEventListener( 'change', render );

     escena.controls=controls;
}


var soldar = function (obstaculo, sujecion){
  var restriccion = new Physijs.DOFConstraint(obstaculo, sujecion, obstaculo.position);
  scene.addConstraint(restriccion);
  restricciones.push(restriccion);
  restriccion.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
  restriccion.setAngularUpperLimit({ x: 0, y: 0, z: 0 });
}

var soldarTablero = function (obstaculo, sujecion){
  var restriccion = new Physijs.DOFConstraint(obstaculo, sujecion, obstaculo.position);
  scene.addConstraint(restriccion);
  restricciones.push(restriccion);
  scene.tablero.restriccion=restriccion;
  restriccion.setAngularLowerLimit({ x: -0.3, y: 0, z: -0.3 });
  restriccion.setAngularUpperLimit({ x: 0.3, y: 0, z: 0.3 });
}

function render() {
     renderer.render( scene, scene.camera );
};

function setLife(value){
  if(value<=0){
  	document.getElementById("Reiniciar").style.visibility = "visible";
  	document.getElementById("partida").style.visibility = "visible";
  	scene.tablero.restriccion.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
  	scene.tablero.restriccion.setAngularUpperLimit({ x: 0, y: 0, z: 0 });
  }
  document.getElementById("lifeCounter").value = value;
}

function reiniciar(){
	location.reload(true);
}


window.onload = initScene;
