var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();

camera.position.x = 10;
camera.position.y = 0;
camera.position.z = 90;

renderer.setClearColor(0xdddddd);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.lookAt(scene.position);
document.body.appendChild(renderer.domElement);

var increment = 0;

var render = function () {
  increment += 0.01;
  requestAnimationFrame(render);

  spinCamera();
  renderer.render(scene, camera);
};

loadFont();
render();

// SETTINGS
var text = "aems",
  height = 2,
  size = 10,
  curveSegments = 10,
  bevelThickness = 1,
  bevelSize = 0.3,
  bevelSegments = 3,
  bevelEnabled = true,
  font = undefined;

var rotation = 0;

function spinCamera() {
  rotation += 0.001;
  camera.position.z = Math.sin(rotation) * 80;
  camera.position.x = Math.cos(rotation) * 80;
  camera.lookAt(scene.position);
}

function loadFont() {
  var loader = new THREE.FontLoader();

  loader.load('fonts/helvetiker_regular.typeface.json', function (res) {
    font = res;
    createText();
  });
}

function createText() {
  // change the text here
  textGeo = new THREE.TextGeometry('Here we go!', {
    font: font,
    size: size,
    height: height,
    curveSegments: curveSegments,
    weight: "normal",
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelSegments: bevelSegments,
    bevelEnabled: bevelEnabled
  });

  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();

  // change the color here
  var color = new THREE.Color(0xff0000);
  var textMaterial = new THREE.MeshBasicMaterial({ color: color });

  var textMesh = new THREE.Mesh(textGeo, textMaterial);
  textMesh.position.x = -textGeo.boundingBox.max.x / 2;
  textMesh.castShadow = true;

  scene.add(textMesh);
}