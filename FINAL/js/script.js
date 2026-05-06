class ModelLoader {
  constructor(scene) {
    this.scene = scene;
    this.loader = new THREE.OBJLoader(); 
    this.models = {};
  }

  load(path, options = {}) {
    const {
      name = null,
      position = { x: 0, y: 0, z: 0 },
      targetSize = 80,
      rotation = null,
      onLoad = null,
      copies = 0,
      spacing = 0,
    } = options;

    this.loader.load(path, (object) => {

      // SCALE
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = targetSize / maxDim;
      object.scale.set(scale, scale, scale);

      // CENTER
      box.setFromObject(object);
      const center = new THREE.Vector3();
      box.getCenter(center);
      object.position.sub(center);

      // POSITION OFFSET
      object.position.set(
        object.position.x + position.x,
        object.position.y + position.y,
        object.position.z + position.z
      );

      // assign a name to model and store it into the array
      if (name) {
        object.name = name;          // Three.js native property
        this.models[name] = object;  // store for easy lookup
      }
      
      if (rotation) {
      object.rotation.set(
        rotation.x || 0,
        rotation.y || 0,
        rotation.z || 0
      );
    }
      
      // ADD TO SCENE
      this.scene.add(object);

      // OPTIONAL CALLBACK
      if (onLoad) onLoad(object);
    });
  }
  // retrieve name
    get(name) {
    return this.models[name];
  }


}

const CAMERA_CONFIG = {
  position: { x: 0, y: 0, z: 100 }, 
  lookAt: { x: 0, y: 0, z: 0 },
  fitOffset: 1.5,
};

init();
render(); 


function init() {
  scene = getScene();
  camera = getCamera();
  renderer = getRenderer();
  controls = getControls(camera, renderer);
  light = getLight(scene);

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
  light2.position.set(-50, -80, -20);

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

const loader = new ModelLoader(scene);

  fetch('./models.json')

    .then(response => response.json())
    .then(data => {
      data.models.forEach(model => {

        loader.load(model.path, {
          name: model.name,
          position: model.position,
          targetSize: model.scale,
          rotation: model.rotation,
          copies: model.copies,
          spacing: model.spacing,
          onLoad: (obj) => {
            fitCameraToScene(camera, scene, controls);

            if (model.copies) {
            for (let i = 0; i < model.copies; i++) {
              const clone = obj.clone();

              clone.position.x += i * (model.spacing || 0);
              clone.position.y += model.offsetY || 20;

              scene.add(clone);
          }
        }

            console.log(obj.name + " loaded");
          }
          
        });
      });
    });

console.log("FETCHING MODELS...");


function render() {
  requestAnimationFrame(render);

  // Rotate all pyramids
 /* pyramids.forEach(pyramid => {
    pyramid.rotation.y += 0.005; // speed (smaller = slower)
  }); */

  // Rotate toruses (in opposite directions)
  /* if (toruses.length >= 2) {
  toruses[0].rotation.z += 0.01;  // clockwise
  toruses[1].rotation.z -= 0.02;  // counterclockwise
  }*/

  renderer.render(scene, camera);
  controls.update();
}
