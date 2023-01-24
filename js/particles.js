const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
const materials = []
var amountOfParticles = 1000;

const textureLoader = new THREE.TextureLoader();

const sprite = textureLoader.load( 'js/particle.png' );

for ( let i = 0; i < amountOfParticles; i ++ ) {

	const x = Math.random() * 2000 - 1000;
	const y = Math.random() * 2000 - 1000;
	const z = Math.random() * 2000 - 1000;

	vertices.push( x, y, z );

}

geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

for ( let i = 0; i < 5; i ++ ) {

	materials[ i ] = new THREE.PointsMaterial( { size: 10 , map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );

	const particles = new THREE.Points( geometry, materials[ i ] );

	particles.rotation.x = Math.random() * 6;
	particles.rotation.y = Math.random() * 6;
	particles.rotation.z = Math.random() * 6;

	scene.add( particles );

}

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