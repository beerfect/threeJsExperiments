'use strict';

// scene
let scene = new THREE.Scene();
scene.background = new THREE.Color('black');
const axesHelper = new THREE.AxesHelper( 1000 );
scene.add( axesHelper );
console.log(scene);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.5, 1000 );
camera.position.set(5,5,5);
camera.lookAt(0,0,0);

// light
const lightAmbient = new THREE.AmbientLight( 0xffffff );
scene.add( lightAmbient );

// sphere
let geometry_sphere = new THREE.SphereGeometry(3,30,30);
let material_sphere = new THREE.MeshBasicMaterial({color: 0x005500, wireframe: true});
let sphere = new THREE.Mesh(geometry_sphere, material_sphere);
scene.add(sphere);

// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// show
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  
}
requestAnimationFrame(render);