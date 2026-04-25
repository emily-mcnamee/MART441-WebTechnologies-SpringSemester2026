// 1. Setup Scene, Camera, and Renderer
// Add SCENE
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);



// create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

var points = [];
points.push(new THREE.Vector3(-20, 0, 0));
points.push(new THREE.Vector3(0, 20, 0));
points.push(new THREE.Vector3(20, 0, 0));
points.push( new THREE.Vector3( 20, -20, -20 ));
points.push( new THREE.Vector3( 40, -40, -40 ));

var geometry = new THREE.BufferGeometry().setFromPoints(points);
var line = new THREE.Line(geometry, material);

//ADD Line to SCENE
scene.add(line);
//RENDER
renderer.render(scene, camera);

