import { walker } from "./modules/walker.js";
let camera, renderer, cube, scene, walk;

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
  renderer.setClearColor(0x506ca2);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

  cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  walk = new walker();
  // let walkie = walk.display(scene);
  walk.display(scene);
  // scene.add(walkie);

  var dLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dLight.position.set(4, 4, 0);
  scene.add(dLight);
  camera.position.z = 20;
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  // windowHalfX = window.innerWidth / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  walk.step();
  renderer.render(scene, camera);
};

animate();
