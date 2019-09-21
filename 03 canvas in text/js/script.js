'use strict';

function main() {
	// renderer
	const canvas = document.querySelector('canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas
	});

	// camera
	const camera = new THREE.PerspectiveCamera(75, 2, 0.5, 500);
	camera.position.set(0, 0, 2);

	// scene
	const scene = new THREE.Scene();

	// light
	{
		const light = new THREE.DirectionalLight(0xFFFFFF, 1);
		light.position.set(-1, 2, 4);
		scene.add(light);
	}

	// cube
	const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3);
	const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

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

	// render
	function render(time) {
		time *= 0.001; 

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		  }

		cube.rotation.x = time;
		cube.rotation.y = time;

		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

main();

