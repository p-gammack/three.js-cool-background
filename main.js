import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const rockAlbedo = new THREE.TextureLoader().load('img/rock_surface/vlzkba1fw_4K_Albedo.jpg');
const rockNormal = new THREE.TextureLoader().load('img/rock_surface/vlzkba1fw_4K_Normal.jpg');

const background = new THREE.Mesh(
    new THREE.PlaneGeometry( 16, 16 ),
    new THREE.MeshStandardMaterial( {
        map: rockAlbedo,
        normalMap: rockNormal,
        color: 0x999999
    } )
);
scene.add( background );

const foreground = new THREE.Mesh (
    new THREE.PlaneGeometry( 16, 16 ),
    new THREE.MeshPhysicalMaterial( {
        roughness: 0.5,
        transmission: 1
    } )
);
foreground.position.z = 2;
scene.add( foreground );

const light1 = new THREE.PointLight( 0xeb7d00, 2, 6);
light1.position.set( -4, -2, 1 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0x005aeb, 2, 6 );
light2.position.set ( 5, 2, 1);
scene.add( light2 );

// const pointLightHelper = new THREE.PointLightHelper( light1, 1 );
// scene.add( pointLightHelper );

camera.position.z = 5;

const animate = () => {
	requestAnimationFrame( animate );

    light1.position.x += 0.001;
    light2.position.x -= 0.001;

    if (light1.position.x > 11) {
        light1.position.x = -12;
    }
    if (light2.position.x < -13) {
        light2.position.x = 12;
    }
    
    // console.log(light1.position.x);

	renderer.render( scene, camera );
}

animate();