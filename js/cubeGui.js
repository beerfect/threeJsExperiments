'use strict';

//scene
const scene = new THREE.Scene();
var axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//camera
let cameraOptions = {
    fieldOfView:75,
    aspectRatio: window.innerWidth / window.innerHeight,
    clipping: {
        min: 0.5,
        max: 500
    },
}

const camera = new THREE.PerspectiveCamera(
    cameraOptions.fieldOfView, 
    cameraOptions.aspectRatio, 
    cameraOptions.clipping.min, 
    cameraOptions.clipping.max
);

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
const lightDirectional = new THREE.DirectionalLight(0xFFFFFF, 1);
lightDirectional.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
// scene.add(lightDirectional);

var lightAmbient = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( lightAmbient );

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


var geometry = new THREE.BoxGeometry(cubeSize.width, cubeSize.height, cubeSize.depth);

let facesColors = {};

for (let i = 0; i < geometry.faces.length / 2; i ++){
    let faceColor = Math.random() * 0xffffff;
    facesColors[i] = faceColor;
}

for (var i = 0; i < geometry.faces.length/2; i ++) {
    geometry.faces[i*2].color.setHex(facesColors[i]);
    geometry.faces[i*2 +1].color.setHex(facesColors[i]);
}

var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors,
});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// cubePosition
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

renderer.render(scene, camera);








// *******************************************************
// 
//                      ИНТЕРФЕЙС
// 
// *******************************************************

let gui = new dat.GUI();

let gui_camera = gui.addFolder('camera');

let gui_cameraOptions = gui_camera.addFolder('options');
gui_cameraOptions.add(cameraOptions, 'fieldOfView',1,179,1);

let gui_cameraPosition = gui_camera.addFolder('position');
gui_cameraPosition.add(cameraPosition, 'x',-10,10,0.1);
gui_cameraPosition.add(cameraPosition, 'y',-10,10,0.1);
gui_cameraPosition.add(cameraPosition, 'z',-10,10,0.1);
gui_cameraPosition.add(cameraPosition, 'lookAtCenter');
gui_cameraPosition.add(cameraPosition, 'reset');

let gui_ligthPosition = gui.addFolder('light position');
gui_ligthPosition.add(lightPosition, 'x', -10,10,0.1);
gui_ligthPosition.add(lightPosition, 'y', -10,10,0.1);
gui_ligthPosition.add(lightPosition, 'z', -10,10,0.1);
gui_ligthPosition.add(lightPosition, 'reset');

let gui_cubePosition = gui.addFolder('cube position');
gui_cubePosition.add(cubePosition, 'x',-5,5,0.10);
gui_cubePosition.add(cubePosition, 'y',-5,5,0.10);
gui_cubePosition.add(cubePosition, 'z',-5,5,0.10);
gui_cubePosition.add(cubePosition, 'reset');

let gui_cubeSize = gui.addFolder('cube size');
gui_cubeSize.add(cubeSize, 'width').min(1).max(5).step(0.1);
gui_cubeSize.add(cubeSize, 'height').min(1).max(5).step(0.1);
gui_cubeSize.add(cubeSize, 'depth').min(1).max(5).step(0.1);
gui_cubeSize.add(cubeSize, 'normalize');

let gui_rotationSpeed = gui.addFolder('rotation speed');
gui_rotationSpeed.add(rotationSpeed, 'rotationSpeed_x').min(-10).max(10).step(1);
gui_rotationSpeed.add(rotationSpeed, 'rotationSpeed_y').min(-10).max(10).step(1);
gui_rotationSpeed.add(rotationSpeed, 'rotationSpeed_z').min(-10).max(10).step(1);
gui_rotationSpeed.add(rotationSpeed,'stop');

let gui_facesColors = gui.addFolder('faces colors');
for( let key in facesColors){
    gui_facesColors.addColor(facesColors, `${key}`);
}

console.log(geometry.faces);




// *******************************************************
// 
//                    ЦИКЛ АНИМАЦИИ
// 
// *******************************************************

var animate = function () {
    requestAnimationFrame(animate);

    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    if(cameraPosition.lookAtCenter){
        camera.lookAt(0,0,0);
    }

    camera.fov = cameraOptions.fieldOfView;
    camera.updateProjectionMatrix();

    lightDirectional.position.set(lightPosition.x, lightPosition.y, lightPosition.z);

    cube.position.set(cubePosition.x,cubePosition.y,cubePosition.z);

    cube.scale.x = cubeSize.width;
    cube.scale.y = cubeSize.height;
    cube.scale.z = cubeSize.depth;

    cube.rotation.x += rotationSpeed.rotationSpeed_x / 500;
    cube.rotation.y += rotationSpeed.rotationSpeed_y / 500;
    cube.rotation.z += rotationSpeed.rotationSpeed_z / 500;
    renderer.render(scene, camera);
    geometry.colorsNeedUpdate = true;

    for (var i = 0; i < geometry.faces.length/2; i ++) {
        geometry.faces[i*2].color.setHex(facesColors[i]);
        geometry.faces[i*2 +1].color.setHex(facesColors[i]);
    }

};

animate();