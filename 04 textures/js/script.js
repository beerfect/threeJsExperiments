'use strict';

function main() {
	// renderer
	const canvas = document.querySelector('canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas
	});

	// camera
	const camera = new THREE.PerspectiveCamera(75, 2, 0.5, 500);
	camera.position.set(0, 0, 3);

	// scene
	const scene = new THREE.Scene();

	// light
	{
		const light = new THREE.DirectionalLight(0xFFFFFF, 1);
		light.position.set(-1, 2, 4);
		scene.add(light);
	}





	// *******************************************
	// 
	//   				CUBES
	// 
	// *******************************************

	const cubes = [];
	const loader = new THREE.TextureLoader();
	

	// cube A (one lion texture)
	const geometryA = new THREE.BoxGeometry(1, 1, 1);
	const materialA = new THREE.MeshBasicMaterial({
		map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg', 
			// callback для ожидания загрузки текстуры
			(texture) => {
				const materialA = new THREE.MeshBasicMaterial({
					map: texture,
				})
			}		
		),
	});
	const cubeA = new THREE.Mesh(geometryA, materialA);
	cubeA.position.set(-2,0,0);
	cubes.push(cubeA);
	scene.add(cubeA);


	// cube B (6 removed textures)
	const geometryB = new THREE.BoxGeometry(1,1,1);
	const materialB = [
		new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg')}),
		new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg')}),
		new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg')}),
		new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg')}),
		new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg')}),
		new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg')}),
	];
	const cubeB = new THREE.Mesh(geometryB,materialB);
	cubeB.position.set(0,0,0);
	cubes.push(cubeB);
	scene.add(cubeB);

	// cube C (6 local textures)
	const geometryC = new THREE.BoxGeometry(1,1,1);
	const materialC = [
		new THREE.MeshPhongMaterial({map: loader.load('../textures/1.jpg')}),
		new THREE.MeshPhongMaterial({map: loader.load('../textures/2.jpg')}),
		new THREE.MeshPhongMaterial({map: loader.load('../textures/3.jpg')}),
		new THREE.MeshPhongMaterial({map: loader.load('../textures/4.jpg')}),
		new THREE.MeshPhongMaterial({map: loader.load('../textures/5.jpg')}),
		new THREE.MeshPhongMaterial({map: loader.load('../textures/6.jpg')}),
	];
	const cubeC = new THREE.Mesh(geometryC,materialC);
	cubeC.position.set(2,0,0);
	cubes.push(cubeC);
	scene.add(cubeC);


	// *******************************************
	// 
	//   			   ANIMATION
	// 
	// *******************************************


	// rendering
	function render(time) {
		time *= 0.001; 

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		  }

		// cube.rotation.x = time;
		// cube.rotation.y = time;

		for (let cube of cubes){
			cube.rotation.x = time;
			cube.rotation.y = time;
		}

		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);	

	// adaptive render size
    function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const pixelRatio = window.devicePixelRatio;
		const width = canvas.clientWidth * pixelRatio | 0;
		const height = canvas.clientHeight * pixelRatio | 0;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
		  renderer.setSize(width, height, false);
		}
		return needResize;
	  }
}

main();