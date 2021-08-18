let geometry;
let material;
let sphere;
class walker {
  construction(_x = 0, _y = 0, _z = 0, _r = 1) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.r = _r;
  }
  display = (s) => {
    geometry = new THREE.SphereGeometry(this.r, 20, 20);
    material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    sphere = new THREE.Mesh(geometry, material);
    s.add(sphere);
    // return sphere;
    // scene.add(sphere);
  };
  step = () => {
    let rng = Math.floor(Math.random() * 6);
    // console.log(rng);
    if (rng == 1) {
      // console.log("s");
      sphere.position.x += 0.1;
      // this.x++;
    } else if (rng == 2) {
      sphere.position.y += 0.1;
      // this.y++;
    } else if (rng == 3) {
      sphere.position.z += 0.1;
      // this.z++;
    } else if (rng == 4) {
      sphere.position.x -= 0.1;
      // this.x--;
    } else if (rng == 5) {
      sphere.position.y -= 0.1;
      // this.y--;
    } else if (rng == 6) {
      sphere.position.z -= 0.1;
      // this.z--;
    }
  };
}

export { walker };
// export class ClassName
