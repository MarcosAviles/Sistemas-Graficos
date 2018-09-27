
Objetivo = function(posicion){
	var bumper, bumper_geom = new THREE.DodecahedronGeometry( 2, 0 );
    var loader = new THREE.TextureLoader();
    var ground_material = Physijs.createMaterial(
          new THREE.MeshNormalMaterial({ color: 0x0000ff, wireframe: true}), .8, .4 );
     bumper = new Physijs.ConeMesh( bumper_geom, ground_material, 0.1);
     bumper.position.set(posicion.x, posicion.y, posicion.z);
     bumper.castShadow = true;
     bumper.receiveShadow = true;
     bumper.name='objetivo';
     bumper.damage = 0;
     return bumper;
}


Objetivo.prototype.constructor = Objetivo;
