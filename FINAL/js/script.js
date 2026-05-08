let loader;
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
      color: color,
    } = options;

    this.loader.load(path, (object) => {
      
        // APPLY METAL MATERIAL
    object.traverse((child) => {
    if (child.isMesh) {

      child.castShadow = true;
      child.receiveShadow = true;

      child.material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.82,
        roughness: 0.12,
        envMapIntensity: 0.5
      });


        }
      });

      // scale to scene
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = targetSize / maxDim;
      object.scale.set(scale, scale, scale);

      // center scene
      box.setFromObject(object);
      const center = new THREE.Vector3();
      box.getCenter(center);
      object.position.sub(center);

      // positioning offset
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
      
      // apply rotation setting if json mentions it
      if (rotation) {
      object.rotation.set(
        rotation.x || 0,
        rotation.y || 0,
        rotation.z || 0
      );
    }
      
      // add to the scene
      this.scene.add(object);

      // call back
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

  // NEW
  offset: {
    x: 0.42,
    y: 0.1,
    z: 0.8
  }

};

// initialization and rendering
init();
render(); 


function init() {
  scene = getScene();
  camera = getCamera();
  renderer = getRenderer();
  controls = getControls(camera, renderer);
  light = getLight(scene);
  loader = new ModelLoader(scene);
  setupHDR();
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
  /*camera.position.set(center.x, center.y, center.z + distance);*/

  camera.position.set(
  center.x + distance * CAMERA_CONFIG.offset.x,
  center.y + distance * CAMERA_CONFIG.offset.y,
  center.z + distance * CAMERA_CONFIG.offset.z
);

  camera.lookAt(center);

  if (controls) {
    controls.target.copy(center);
    controls.noPan = false;
    controls.dynamicDampingFactor = 0.08;
    controls.update();
  }

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
}


function getScene() {
  var scene = new THREE.Scene();
  return scene;
}


/**
 * Generate the light to be used in the scene.
 *  @param {obj} scene: the current scene object
 **/
function getLight(scene) {

  // ambient lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);


  // strong warm light from upper-right-front
  const keyLight = new THREE.DirectionalLight(0xfff1d6, 10);

  keyLight.position.set(120, 140, 160);

  keyLight.castShadow = true;

  keyLight.shadow.mapSize.width = 4096;
  keyLight.shadow.mapSize.height = 4096;

  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 600;

  keyLight.shadow.camera.left = -200;
  keyLight.shadow.camera.right = 200;
  keyLight.shadow.camera.top = 200;
  keyLight.shadow.camera.bottom = -200;

  scene.add(keyLight);

  // gives metal edge contrast
  const fillLight = new THREE.DirectionalLight(0x9bbcff, 1.8);

  fillLight.position.set(-120, 60, 80);

  scene.add(fillLight);

  // creates glowing metal edges
  const rimLight = new THREE.DirectionalLight(0xffd6aa, 2);

  rimLight.position.set(0, 120, -180);

  scene.add(rimLight);

  // Spot light on clock face
  const spotLight = new THREE.SpotLight(
    0xffffff,
    6,          
    1000,       
    Math.PI / 6, 
    0.2,         
   0.5         
  );

  spotLight.position.set(0, 70, 100);

  spotLight.target.position.set(0, 0, -30);

  spotLight.castShadow = true;

  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;

  scene.add(spotLight);
  scene.add(spotLight.target);

  // lower gear glow effect
  const lowerLight = new THREE.PointLight(0xffaa66, 10, 220);

  lowerLight.position.set(0, -90, -20);

  scene.add(lowerLight);


  return {
    ambient,
    keyLight,
    fillLight,
    rimLight,
    spotLight,
    lowerLight,

  };
}

function getRenderer() {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  return renderer;
}
  //TrackBall controls
function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2;
    controls.zoomSpeed = 0.6;
    controls.panSpeed = 0.8;
    controls.dynamicDampingFactor = 0.1;
  return controls;
} 

material = {
  color: 0xb0b0b0,
  metalness: 0.7,
  roughness: 0.18
}

const metalMaterial = new THREE.MeshStandardMaterial(material);

// creates realistic metal material
function setupHDR() {

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  new THREE.RGBELoader()
    .setPath('./hdr/')
    .load('studio.hdr', function (texture) {

      const envMap = pmremGenerator
        .fromEquirectangular(texture)
        .texture;

      scene.environment = envMap;

      texture.dispose();
      pmremGenerator.dispose();
    });
}


// floor to showcase shadow
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(320, 250),
  new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.8,
    metalness: 0
  })
  );

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -160;
  floor.position.z = -120;
  floor.receiveShadow = true;

  scene.add(floor);

  // json data fetch
  fetch('./models.json')

    .then(response => response.json())
    .then(data => {
      data.models.forEach(model => {

        loader.load(model.path, {
          name: model.name,
          position: model.position,
          targetSize: model.scale,
          rotation: model.rotation,
          color: model.color,
          onLoad: (obj) => {
            fitCameraToScene(camera, scene, controls);

            // rotation speed
            if (obj.name.startsWith("gear")) {

              const gearNumber = parseInt(
                obj.name.replace("gear", "")
              );

              // alternate directions
              const direction = gearNumber % 2 === 0 ? -1 : 1;

              // bigger gears spin slower
              obj.userData.rotationSpeed =
                0.02 * direction * (1 / Math.sqrt(model.scale / 10));
            }

            console.log(obj.name + " loaded");
          }
          
        });
      });
    });

//console.log("FETCHING MODELS...");



function render() {

  requestAnimationFrame(render);

  // gear rotation
  for (const name in loader.models) {

    const gear = loader.models[name];
    //
    if (
      gear &&
      gear.name.startsWith("gear")
    ) {

      // top gears
      if (gear.position.y > -20) {

        gear.rotation.z +=
          gear.userData.rotationSpeed;
      }

      // lower gears
      else {

        gear.rotation.z +=
          gear.userData.rotationSpeed;
      }
    }
      // clock hands
      const minuteHand = loader.get("minuteh");
      const hourHand = loader.get("hourh");

      if (minuteHand) {
        minuteHand.rotation.z += 0.001;
      }

      if (hourHand) {
        hourHand.rotation.z -= 0.0003;
      }
  }

  controls.update();

  renderer.render(scene, camera);
}
