let camera, renderer, scene;
const gravity = 0.5;
const wind = 1;
const roC = 0.025;
let theta = 0.0001;
let particles = [];
init();
function init() {
  let layerCount = 5;
  let snowPerLayer = 2000;
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0000000, 0.0008);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const textureLoader = new THREE.TextureLoader();
  const sprite1 = textureLoader.load("../textures/sprites/snowflake1.png");
  const sprite2 = textureLoader.load("../textures/sprites/snowflake2.png");
  const sprite3 = textureLoader.load("../textures/sprites/snowflake3.png");
  const sprite4 = textureLoader.load("../textures/sprites/snowflake4.png");
  const sprite5 = textureLoader.load("../textures/sprites/snowflake5.png");

  for (let l = 0; l < layerCount; l++) {
    for (let i = 0; i < snowPerLayer; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      vertices.push(x, y, z);
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    switch (l) {
      case 0:
        material = new THREE.PointsMaterial({
          size: 5,
          map: sprite1,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
        });
        break;
      case 1:
        material = new THREE.PointsMaterial({
          size: 5,
          map: sprite2,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
        });
        break;
      case 2:
        material = new THREE.PointsMaterial({
          size: 5,
          map: sprite3,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
        });
        break;
      case 3:
        material = new THREE.PointsMaterial({
          size: 5,
          map: sprite4,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
        });
        break;
      case 4:
        material = new THREE.PointsMaterial({
          size: 5,
          map: sprite5,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
        });
        break;
    }
    snowFlakes = new THREE.Points(geometry, material);
    scene.add(snowFlakes);
  }

  camera.position.z = 1000;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

const animate = function () {
  theta += 0.01;

  requestAnimationFrame(animate);
  for (let i = 0; i < scene.children.length; i++) {
    const object = scene.children[i];
    // for (let l = 0; l < object.geometry.attributes.position.array.length; l++) {
    // const positions = object.geometry.attributes.position.array;
    // positions[l + 1] = Math.sin(theta) * 100;
    // }
    // object.geometry.attributes.position.needsUpdate = true;

    // const position = object.geometry.attributes.position.array;
    // let xPos, yPos, zPos, index;
    // xPos = yPos = zPos = index = 0;
    // for (let p = 0, pM = 10000; p < pM; p++) {
    //   xPos = position[index++];
    //   yPos = position[index++] = Math.sin(theta) * 2000;
    //   zPos = position[index++];
    //   // yPos += Math.sin(theta) * 5;
    // }
    object.position.y -= gravity;
    if (object.position.y < 0 || object.position.y > window.innerHeight) {
      object.position.y = window.innerHeight;
    }
    if (object.position.z > camera.position.z) {
      object.position.z -= Math.random() * 2000 - 1000;
    }
  }
  camera.position.z -= 0.15;
  renderer.render(scene, camera);
};

animate();
// const positions = line.geometry.attributes.position.array;

// let x, y, z, index;
// x = y = z = index = 0;

// for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {

//     positions[ index ++ ] = x;
//     positions[ index ++ ] = y;
//     positions[ index ++ ] = z;

//     x += ( Math.random() - 0.5 ) * 30;
//     y += ( Math.random() - 0.5 ) * 30;
//     z += ( Math.random() - 0.5 ) * 30;

// }
