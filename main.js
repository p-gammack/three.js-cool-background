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
        roughness: 0.55,
        transmission: 1
    } )
);
foreground.position.z = 2;
scene.add( foreground );

const light1 = new THREE.PointLight( 0xfca247, 10, 6 );
light1.position.set( -4, -2, 1 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0x47c3fc, 10, 6 );
light2.position.set ( 5, 2, 1);
scene.add( light2 );

const lights = [light1, light2];

const ambientLight = new THREE.AmbientLight( 0x404040, 0.8 );
scene.add( ambientLight );

// const pointLightHelper = new THREE.PointLightHelper( light1, 1 );
// scene.add( pointLightHelper );

camera.position.z = 5;

const randomAngle = () => {
    return Math.random() * Math.PI * 2; // Rabdom angle in radians
}

const speed = 0.02;
const boundary = 5;

for (let i = 0; i < lights.length; i++) {
    const angle = randomAngle();
    const translationX = Math.cos(angle) * speed;
    const translationY = Math.sin(angle) * speed;
  
    lights[i].translationX = translationX;
    lights[i].translationY = translationY;
  }

const animate = () => {
	requestAnimationFrame( animate );

    for (let i = 0; i < lights.length; i++) {
        const light = lights[i];
        const positionX = light.position.x;
        const positionY = light.position.y;
      
        if (positionX > boundary || positionX < -boundary) {
          light.position.x = Math.sign(positionX) * boundary;
          const angle = randomAngle();
          light.translationX = Math.cos(angle) * speed;
        }
      
        if (positionY > boundary || positionY < -boundary) {
          light.position.y = Math.sign(positionY) * boundary;
          const angle = randomAngle();
          light.translationY = Math.sin(angle) * speed;
        }
            
        lights[i].position.x += lights[i].translationX;
        lights[i].position.y += lights[i].translationY;
    }

	renderer.render( scene, camera );
}

animate();