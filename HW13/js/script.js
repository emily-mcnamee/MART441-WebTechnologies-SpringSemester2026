
const CAMERA_CONFIG = {
  position: { x: 0, y: 0, z: 100 }, // 👈 easy to tweak
  lookAt: { x: 0, y: 0, z: 0 },
  fitOffset: 2.5, // 👈 how far away the camera sits (bigger = farther)
};

var pyramids = [];

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

  // ✅ Always position camera in front of scene (simple + safe)
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
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  return light;
}

function getRenderer() {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
} 

function loadModel() {
  var loader = new THREE.OBJLoader();

  loader.load('models/Pyramid.obj', function (object) {

  // scale + center (same as before)
  var box = new THREE.Box3().setFromObject(object);
  var size = new THREE.Vector3();
  box.getSize(size);

  var maxDim = Math.max(size.x, size.y, size.z);
  var scale = 50 / maxDim;
  object.scale.set(scale, scale, scale);

  var scaledBox = new THREE.Box3().setFromObject(object);
  var scaledSize = new THREE.Vector3();
  scaledBox.getSize(scaledSize);

  box.setFromObject(object);
  var center = new THREE.Vector3();
  box.getCenter(center);
  object.position.sub(center);

  // ORIGINAL
  scene.add(object);
  pyramids.push(object);

  // CLONE (flipped + below)
  var pyramid2 = object.clone();
  pyramid2.rotation.x = Math.PI;
  pyramid2.position.set(0, -scaledSize.y * 0.5, 0);

  scene.add(pyramid2);
  pyramids.push(pyramid2);

  //fitCameraToScene(camera, scene, controls);
});

}

function render() {
  requestAnimationFrame(render);

  // Rotate all pyramids
  pyramids.forEach(pyramid => {
    pyramid.rotation.y += 0.005; // 👈 speed (smaller = slower)
  });

  renderer.render(scene, camera);
  controls.update();
}
