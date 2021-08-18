let camera, renderer, scene, orbit;
const textureLoader = new THREE.TextureLoader();
let count = 0;
init();
function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0000000, 0.0008);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.x = 00;
  camera.position.y = 0;
  camera.position.z = 30;
  camera.lookAt(scene.position);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const geometry = new THREE.BufferGeometry();
  const smokeTexture = textureLoader.load("../assets/textures/ps_smoke.png");

  let x = 100;
  let y = 100;
  let vertices = [];
  orbit = new THREE.OrbitControls(camera, renderer.domElement);
  orbit.update();

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const xPos = i / 10;
      const yPos =
        Math.sin((i / 100) * Math.PI * 2) + Math.cos((i / 100) * Math.PI) * 1;
      const zPos = j / 10;
      vertices.push(xPos, yPos, zPos);
    }
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  material = new THREE.PointsMaterial({
    size: 0.2,
    transparent: true,
    blending: THREE.AdditiveBlending,
    color: 0x55ff55,
    map: smokeTexture,
  });
  pointCloud = new THREE.Points(geometry, material);
  pointCloud.sizeAttenuation = true;
  pointCloud.sortPoints = true;
  scene.add(pointCloud);
}

const animate = function () {
  requestAnimationFrame(animate);
  step = 0.005;
  // var count = 0;
  // let pc = pointCloud.geometry.attributes.position.array;
  // for (let i = 0; i < pc.length; i++) {
  // pc[i + 1] += 1;
  // (Math.sin((pc[i] / 20 + step) * Math.PI * 2) +
  // Math.cos((pc[i + 2] / 5 + step * 2) * Math.PI)) /
  // 2;
  // }
  //   v.y =
  //     (Math.sin((v.x / 20 + step) * Math.PI * 2) +
  //       Math.cos((v.z / 5 + step * 2) * Math.PI)) /
  //     2;
  // });
  const positions = pointCloud.geometry.attributes.position.array;
  positions.forEach(function (position) {
    console.log(position);
    position++;
  });
  // const scales = pointCloud.geometry.attributes.scale.array;

  // let i = 0,
  //   j = 0;
  // const AMOUNTX = 50,
  //   AMOUNTY = 50;
  // for (let ix = 0; ix < AMOUNTX; ix++) {
  //   for (let iy = 0; iy < AMOUNTY; iy++) {
  //     positions[i + 1] =
  //       Math.sin((ix + count) * 50) * 50 + Math.sin((iy + count) * 0.5) * 50;
  //     // scales[j] =
  //     // (Math.sin((ix + count) * 0.3) + 1) * 20 +
  //     // (Math.sin((iy + count) * 0.5) + 1) * 20;

  //     i += 3;
  //     j++;
  //   }
  // }
  orbit.update();
  pointCloud.geometry.attributes.position.array.needsUpdate = true;
  renderer.render(scene, camera);
};
// customGeometry();
animate();
