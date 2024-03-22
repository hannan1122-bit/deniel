import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let scene, camera, renderer, controls;

scene = new THREE.Scene();
scene.background = new THREE.Color('#fff');

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;
// camera.position.y = 5;

renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = -Math.PI * 2;
controls.update();

const url = './OrangeSunriseArtPrint.jpg'
let shirt;
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
loader.load('./model.gltf', (model) => {
  shirt = model.scene.children[0].children[0].children[0].children[0].children[0];
  textureLoader.load(url, (tex) => {
    shirt.material = new THREE.MeshStandardMaterial({map: tex});
  });
  scene.add(model.scene)
})

scene.add(new THREE.AmbientLight('white'))

const dirLight = new THREE.DirectionalLight('white');
dirLight.position.set(0, 10, 0);
scene.add(dirLight)

const render = () => {
    requestAnimationFrame(render);
    shirt.rotation.y+=0.02;
    renderer.render(scene, camera);
}
render();
function onWindowResize() {
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);