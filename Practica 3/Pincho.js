
Pincho = function(posicion,tamanio,nombre){
	var bumper, bumper_geom = new THREE.ConeGeometry( tamanio.x, tamanio.y, tamanio.z );
    var loader = new THREE.TextureLoader();
    if(nombre=='malo'){
        var ground_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ color: 0xff0000}), .8, .4 );
        bumper = new Physijs.ConeMesh( bumper_geom, ground_material, 0.1);
        bumper.name='malo';
        bumper.damage = 20;
    }
    else{
        var ground_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ color: 0x0000ff}), .8, .4 );
        bumper = new Physijs.ConeMesh( bumper_geom, ground_material, 0.1);
        bumper.name='bueno';
        bumper.damage = 5;
    }
     bumper.position.set(posicion.x, posicion.y, posicion.z);
     bumper.castShadow = true;
     bumper.receiveShadow = true;
     
     return bumper;
}


Pincho.prototype.constructor = Pincho;
