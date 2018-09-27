
Pelota = function(posicion){
	var sphere_geometry = new THREE.SphereGeometry( 2, 32, 32  );
    var material = new THREE.MeshLambertMaterial({ opacity: 1 });
    var shape = new Physijs.SphereMesh(sphere_geometry, material, 0.01, 1);
    shape.material.color.setRGB( Math.random() * 100 / 100, Math.random() * 100 / 100, Math.random() * 100 / 100 );
    shape.castShadow = true;
    shape.receiveShadow = true;
    shape.position.set(posicion.x, posicion.y, posicion.z);
    return shape;
}

//Pelota.prototype = Object.create (THREE.Object3D.prototype);

Pelota.prototype.constructor = Pelota;
