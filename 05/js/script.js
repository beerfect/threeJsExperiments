'use strict';

function main() {
	// renderer
	const canvas = document.querySelector('canvas');
	const renderer = new THREE.WebGLRenderer({ canvas });

	// camera
	const camera = new THREE.PerspectiveCamera(75, 2, 0.5, 500);
	camera.position.set(8, 3.5, 8);
	camera.lookAt(0,0,0);

	// scene
	const scene = new THREE.Scene();

	// light
	{
		const light = new THREE.DirectionalLight(0xFFFFFF, 1);
		light.position.set(-1, 2, 4);
		scene.add(light);
	}

	// axis helper
	const axesHelper = new THREE.AxesHelper(500);
	scene.add(axesHelper);





	// *******************************************
	// 
	//   				PLANE
	// 
	// *******************************************

	{
		const planeSize = 8;
	  
		const loader = new THREE.TextureLoader();
		const texture = loader.load('../textures/checker.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;       
		const repeats = planeSize / 2;
		texture.repeat.set(repeats, repeats);
	  
		const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
		const planeMat = new THREE.MeshPhongMaterial({
		  map: texture,
		  side: THREE.DoubleSide,
		});
		const plane = new THREE.Mesh(planeGeo, planeMat);
		plane.rotation.x = Math.PI * -.5;
		scene.add(plane);
		plane.position.x  += planeSize/2;
		plane.position.z  += planeSize/2;

	  }














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