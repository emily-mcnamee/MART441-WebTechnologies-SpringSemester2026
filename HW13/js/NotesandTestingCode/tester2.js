
var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);



/**
 * Generate a scene object with a background color
 **/
function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

/**
 * Generate the camera to be used in the scene.
 **/
function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 90, -10);
  return camera;
}

/**
 * Generate the light to be used in the scene.
 * @param {obj} scene: the current scene object
 **/
function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  return light;
}

/**
 * Generate the renderer to be used in the scene
 **/
function getRenderer() {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
 * Generate the controls to be used in the scene
**/
function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
} 

/**
 * Load Object
 **/
function loadModel() {
  var loader = new THREE.OBJLoader();

  loader.load('models/Pyramid.obj', function (object) {

    // --- SCALE OBJECT FIRST (same as before) ---
    var box = new THREE.Box3().setFromObject(object);
    var size = new THREE.Vector3();
    box.getSize(size);

    var maxDim = Math.max(size.x, size.y, size.z);
    var desiredSize = 50;
    var scale = desiredSize / maxDim;
    object.scale.set(scale, scale, scale);

    // --- RECALCULATE BOX AFTER SCALING ---
    box.setFromObject(object);
    var center = new THREE.Vector3();
    box.getCenter(center);

    // Center object at origin
    object.position.sub(center);

    scene.add(object);

    // --- CAMERA FIT LOGIC ---
    fitCameraToObject(camera, object, controls);
  });
}


function fitCameraToObject(camera, object, controls) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z);

  // Convert FOV from degrees to radians
  const fov = camera.fov * (Math.PI / 180);

  // Compute distance needed to fit object
  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

  // Add a little padding so it’s not edge-to-edge
  cameraZ *= 1.5;

  camera.position.set(center.x, center.y, center.z + cameraZ);

  // Make camera look at the object center
  camera.lookAt(center);

  // Update controls target so orbiting works correctly
  if (controls) {
    controls.target.copy(center);
    controls.update();
  }

  // Adjust near/far planes to avoid clipping
  camera.near = cameraZ / 100;
  camera.far = cameraZ * 100;
  camera.updateProjectionMatrix();
}

/**
 * Render!
 **/
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
}

loadModel();
render();