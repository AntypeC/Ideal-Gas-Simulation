import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry(3, 3, 3);
const geo = new THREE.EdgesGeometry(geometry);
const mat = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 2});
const wireframe = new THREE.LineSegments(geo, mat);
scene.add(wireframe)
camera.position.z = 5;



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}

animate()