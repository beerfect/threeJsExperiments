'use strict';

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();

// light
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-1, 2, 4);
scene.add(light);


// функция, создающая кубы
function addCube(size, color, cords) {
	const geometry = new THREE.BoxGeometry(size[0], size[1] ,size[2])
	const material = new THREE.MeshPhongMaterial({color});   
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);   
	cube.position.set(cords[0],cords[1],cords[2]);   
	return cube;
}

var geometry = new THREE.BoxGeometry( 1, 1, 1 );

const cubes = [
	addCube([1,1,1], 0xffff00,  [-4,0,0]),
	addCube([1,1,1], 0xff0000,  [-2,0,0]),
	addCube([1,1,1], 0x00ff00,  [0,0,0]),
	addCube([1,1,1], 0x0000ff,  [2,0,0]),
	addCube([1,1,1], 0x000ffff,  [4,0,0]),
];

const cubesRotations = {};

for (let i = 0; i < cubes.length; i++) {
	cubesRotations[i] = {
		x: (Math.random() - 0.5)/50,
		y: (Math.random() - 0.5)/50,
		z: (Math.random() - 0.5)/50,
	};
}

let test = {
	first: 0,
	second: 0,
}
let gui = new dat.GUI();
gui.add(test, 'first').min(-100).max(100).step(1);

var animate = function () {
	requestAnimationFrame( animate );

	// cubes.forEach(cube => {
	// 	cube.rotation.x += 0.01;
	// 	cube.rotation.y += 0.01;
	// 	cube.rotation.z += 0.01;
	// });

	// cubes[0].rotation.x += 0.01;

	for (let i = 0; i < cubes.length; i++) {
		cubes[i].rotation.x += cubesRotations[i].x;
		cubes[i].rotation.y += cubesRotations[i].y;
		cubes[i].rotation.z += cubesRotations[i].z;
	}
	

	renderer.render( scene, camera );
};

animate();