import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry(25, 25, 25);
const geo = new THREE.EdgesGeometry(geometry);
const mat = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 2});
const wireframe = new THREE.LineSegments(geo, mat);
scene.add(wireframe)
camera.position.z = 50;

const particlegeometry = new THREE.BufferGeometry();
// const vertices = [-4, 4, 2, 4, 4, 2, -4, -4, 2, 4, -4, 2, -4, 4, -2, 4, 4, -2, -4, -4, -2, 4, -4, -2];
const vertices = [];
const materials = []
var amountOfParticles = 500;

const textureLoader = new THREE.TextureLoader();
const redParticle = textureLoader.load( 'js/red_particle.png' );
const blueParticle = textureLoader.load('js/blue_particle.png')

const size = 0.02;
const concentration = 2;

for ( let i = 0; i < amountOfParticles; i ++ ) {

	var x = (Math.random() * 2000 * 1/concentration - 1000 * 1/concentration)*size;
	var y = (Math.random() * 2000 * 1/concentration - 1000 * 1/concentration)*size;
	var z = (Math.random() * 2000 * 1/concentration - 1000 * 1/concentration)*size;

	vertices.push( x, y, z );

}

particlegeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

for ( let i = 0; i < 5; i ++ ) {
    if (i%2==0) {
        materials[ i ] = new THREE.PointsMaterial( { size: 0.5 , map: blueParticle, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
    } else {
        materials[ i ] = new THREE.PointsMaterial( { size: 0.5 , map: redParticle, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
    }

	const particles = new THREE.Points( particlegeometry, materials[ i ] );

	particles.rotation.x = Math.random() * 6;
	particles.rotation.y = Math.random() * 6;
	particles.rotation.z = Math.random() * 6;

	scene.add( particles );}

function animate() {
    const time = Date.now() * 0.00005;
    requestAnimationFrame(animate);
    for ( let i = 0; i < scene.children.length; i ++ ) {

		const object = scene.children[ i ];

		if ( object instanceof THREE.Points ) {

			object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
            

		}

	}
    renderer.render(scene, camera)
}

animate()