'use strict';

//scene
const scene = new THREE.Scene();

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//camera
const fieldOfView = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const clipping = {
    min: 0.5,
    max: 500
};
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, clipping.min, clipping.max);

let cameraPosition = {
    x: 0,
    y: 0,
    z: 5,
    reset: function(){
        this.x = 0;
        this.y = 0;
        this.z = 5;
    },
    lookAtCenter: false,
};

camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

// light
let lightPosition = {
    x: 1,
    y: 1,
    z: 1,
    reset: function(){
        this.x = 1;
        this.y = 1;
        this.z = 1;
    }
};
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
scene.add(light);


// cube
let cubeSize = {
    width: 1,
    height: 1,
    depth: 1,
    normalize: function(){
        this.width = 1;
        this.height = 1;
        this.depth = 1;
    }
}

let cubePosition = {
    x: 0,
    y: 0,
    z: 0,
    reset: function(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

var geometry = new THREE.BoxGeometry(cubeSize.width, cubeSize.height, cubeSize.depth);
for (var i = 0; i < geometry.faces.length; i += 2) {
    let currentColor = Math.random() * 0xffffff;
    geometry.faces[i].color.setHex(currentColor);
    geometry.faces[i+1].color.setHex(currentColor);
}

var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors,
});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);



// rotationSpeed
let rotationSpeed = {
    rotationSpeed_x: 0,
    rotationSpeed_y: 0,
    rotationSpeed_z: 0,
    stop: function () {
        this.rotationSpeed_x = 0;
        this.rotationSpeed_y = 0;
        this.rotationSpeed_z = 0;
    }
};

// GUI
let gui = new dat.GUI();

let cameraOptions = gui.addFolder('camera position');
cameraOptions.add(cameraPosition, 'x',-10,10,0.1);
cameraOptions.add(cameraPosition, 'y',-10,10,0.1);
cameraOptions.add(cameraPosition, 'z',-10,10,0.1);
cameraOptions.add(cameraPosition, 'lookAtCenter');
cameraOptions.add(cameraPosition, 'reset');

let gui_ligthPosition = gui.addFolder('light position');
gui_ligthPosition.add(lightPosition, 'x', -10,10,0.1);
gui_ligthPosition.add(lightPosition, 'y', -10,10,0.1);
gui_ligthPosition.add(lightPosition, 'z', -10,10,0.1);
gui_ligthPosition.add(lightPosition, 'reset');

let position = gui.addFolder('cubes position');
position.add(cubePosition, 'x',-5,5,0.10);
position.add(cubePosition, 'y',-5,5,0.10);
position.add(cubePosition, 'z',-5,5,0.10);
position.add(cubePosition, 'reset');

let size = gui.addFolder('cube size');
size.add(cubeSize, 'width').min(1).max(5).step(0.1);
size.add(cubeSize, 'height').min(1).max(5).step(0.1);
size.add(cubeSize, 'depth').min(1).max(5).step(0.1);
size.add(cubeSize, 'normalize');

let rotation = gui.addFolder('rotation speed');
rotation.add(rotationSpeed, 'rotationSpeed_x').min(-10).max(10).step(1);
rotation.add(rotationSpeed, 'rotationSpeed_y').min(-10).max(10).step(1);
rotation.add(rotationSpeed, 'rotationSpeed_z').min(-10).max(10).step(1);
rotation.add(rotationSpeed,'stop');

var axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );

renderer.render(scene, camera);

var animate = function () {
    requestAnimationFrame(animate);

    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    if(cameraPosition.lookAtCenter){
        camera.lookAt(0,0,0);
    }

    light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);

    cube.position.set(cubePosition.x,cubePosition.y,cubePosition.z);

    cube.scale.x = cubeSize.width;
    cube.scale.y = cubeSize.height;
    cube.scale.z = cubeSize.depth;

    cube.rotation.x += rotationSpeed.rotationSpeed_x / 500;
    cube.rotation.y += rotationSpeed.rotationSpeed_y / 500;
    cube.rotation.z += rotationSpeed.rotationSpeed_z / 500;
    renderer.render(scene, camera);
};

animate();