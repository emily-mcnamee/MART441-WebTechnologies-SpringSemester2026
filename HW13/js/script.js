
const CAMERA_CONFIG = {
  position: { x: 0, y: 0, z: 100 }, 
  lookAt: { x: 0, y: 0, z: 0 },
  fitOffset: 2.5,
};

var pyramids = [];
var toruses = [];

init();
  render(); 

function init() {
  scene = getScene();
  camera = getCamera();
  renderer = getRenderer();
  controls = getControls(camera, renderer);
  light = getLight(scene);

  loadModel();

}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 2000);

  camera.position.set(
    CAMERA_CONFIG.position.x,
    CAMERA_CONFIG.position.y,
    CAMERA_CONFIG.position.z
  );

  camera.lookAt(
    CAMERA_CONFIG.lookAt.x,
    CAMERA_CONFIG.lookAt.y,
    CAMERA_CONFIG.lookAt.z
  );

  return camera;
}

  // Always make the camera be inside the scene
function fitCameraToScene(camera, scene, controls) {
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);

  let distance = Math.abs(maxDim / 2 / Math.tan(fov / 2));
  distance *= CAMERA_CONFIG.fitOffset;

  //  Always position camera in front of scene 
  camera.position.set(center.x, center.y, center.z + distance);

  camera.lookAt(center);

  if (controls) {
    controls.target.copy(center);
    controls.update();
  }

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
}

function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

/**
 * Generate the light to be used in the scene.
 *  @param {obj} scene: the current scene object
 **/
function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(40, 70, 10);

  var light2 = new THREE.PointLight(0xffffff, 1, 0);
  light2.position.set(-50, -80, 10);

  scene.add(light);
  scene.add(light2);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  return light;
  return light2;
}

function getRenderer() {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}
  //TrackBall controls
function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
} 

function loadModel() {
  var loader = new THREE.OBJLoader();

  loader.load('models/Pyramid.obj', function (object) {

  // scale + center 
  // this code was to resize the original obj's model size
  var box = new THREE.Box3().setFromObject(object);
  var size = new THREE.Vector3();
  box.getSize(size);

  var maxDim = Math.max(size.x, size.y, size.z);
  var scale = 50 / maxDim;
  object.scale.set(scale, scale, scale);

  // new variable made for the new scaled size so that other layers would use the new size rather than the original model's size
  var scaledBox = new THREE.Box3().setFromObject(object);
  var scaledSize = new THREE.Vector3();
  scaledBox.getSize(scaledSize);

  // centerpoint of models
  box.setFromObject(object);
  var center = new THREE.Vector3();
  box.getCenter(center);
  object.position.sub(center);

  // ORIGINAL Pyramid
  scene.add(object);
  pyramids.push(object);

  // CLONE (flipped + below)
  var pyramid2 = object.clone();
  pyramid2.rotation.x = Math.PI;

  const GAP_MULTIPLIER = 2; // tweak this number for bigger gap

  pyramid2.position.set(0, -scaledSize.y * GAP_MULTIPLIER, 0);

  //older positioning code; keeping it just in case
  //pyramid2.position.set(0, -scaledSize.y * 0.5, 0);

  scene.add(pyramid2);
  pyramids.push(pyramid2);

  //torus models
  var torusGeometry = new THREE.TorusGeometry(17, 1.5, 16, 100,);
  var torusMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    // glow effect
    emissive: 0x222222 
   });

  var torus1 = new THREE.Mesh(torusGeometry, torusMaterial);
  var torus2 = new THREE.Mesh(torusGeometry, torusMaterial);
  // used torus3 to figure out where the point lighting was positioned
  //var torus3 = new THREE.Mesh(torusGeometry, torusMaterial);
  //torus3.position.set(40, 70, 10);

  torus1.scale.set(1.2, 1, 1); // stretched on X
  torus2.scale.set(1.2, 1, 1);

  // Distance between pyramids
  var gap = scaledSize.y * GAP_MULTIPLIER;
  const TORUS_POSITIONS = [0.5, 0.8];


  // Place torus rings between pyramid gap
  torus1.position.y = -gap * TORUS_POSITIONS[0];
  torus1.rotation.x = Math.PI / 2;
  torus2.position.y = -gap * TORUS_POSITIONS[1];
  torus2.rotation.x = Math.PI / 2;
  
  

  scene.add(torus1);
  scene.add(torus2);
  //scene.add(torus3);

  toruses.push(torus1);
  toruses.push(torus2);

});

}

function render() {
  requestAnimationFrame(render);

  // Rotate all pyramids
  pyramids.forEach(pyramid => {
    pyramid.rotation.y += 0.005; // speed (smaller = slower)
  });

  // Rotate toruses (in opposite directions)
  if (toruses.length >= 2) {
  toruses[0].rotation.z += 0.01;  // clockwise
  toruses[1].rotation.z -= 0.02;  // counterclockwise
  }

  renderer.render(scene, camera);
  controls.update();
}
