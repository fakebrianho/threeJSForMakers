let camera, renderer, cube, scene;
let mouse = new THREE.Vector2();
init();
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("rgb(255, 200, 30)");
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // var dLight = new THREE.DirectionalLight(0xffffff, 0.5);
  // dLight.position.set(4, 4, 0);
  // scene.add(dLight);
  camera.position.z = 5;
  window.addEventListener("resize", onWindowResize, false);
  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("click", onMouseClick, false);
}

function onMouseClick() {
  let gVal = Math.floor(Math.random() * 255);
  let bVal = Math.floor(Math.random() * 255);
  renderer.setClearColor(`rgb(255, ${gVal}, ${bVal})`);
  // let arrColors = ["red", "blue", "navy"];
  // let rng = Math.floor(Math.random * 2);
}

function onMouseMove(event) {
  mouse.x = (event.x / window.innerWidth) * 2 - 1;
  mouse.y = (-event.y / window.innerHeight) * 2 + 1;
  cube.material.color.setRGB(1, mouse.x, mouse.y);
  // console.log(mouse.x, mouse.y);
}

function onWindowResize() {
  windowHalfX = window.inner / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
