
Obstaculo = function(posicion,tamanio,peso,textura,ruta){
	var bumper_geom = new THREE.BoxGeometry(tamanio.x, tamanio.y, tamanio.z);
    var loader = new THREE.TextureLoader();
    if(textura){
    	var ground_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( ruta ), opacity: 0.5, transparent: false }),
        .8, // high friction
        .4 // low restitution
    	);
    }
    else{
    	var ground_material = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ opacity: 0, transparent: true}),
          .8, // high friction
          .4 // low restitution
     );
    }
    
    var bumper = new Physijs.BoxMesh( bumper_geom, ground_material, peso,0);
    bumper.position.set(posicion.x, posicion.y, posicion.z);
    bumper.castShadow = true;
    bumper.receiveShadow = true;
    bumper.damage = 0;
    return bumper;
}


Obstaculo.prototype.constructor = Obstaculo;
