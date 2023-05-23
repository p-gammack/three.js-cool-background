import * as THREE from 'three';
import { gsap } from 'gsap';
import imagesLoaded from 'imagesloaded';

gsap.from('#loader-text', {
    duration: 1,
    opacity: 0,
    ease: "power1.out"
});

await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1000ms

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
        roughness: 0.58,
        transmission: 1
    } )
);
foreground.position.z = 2;
scene.add( foreground );

const light1 = new THREE.PointLight( 0xF6730C, 6, 8 );
light1.position.set( -4, -2, 1 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xEB2200, 6, 8 );
light2.position.set( 5, 2, 1);
scene.add( light2 );

const light3 = new THREE.PointLight( 0xF60C7E, 6, 8 );
light3.position.set( 0, 0, 1 );
scene.add( light3 );

const lights = [light1, light2, light3];

const ambientLight = new THREE.AmbientLight( 0x404040, 0.8 );
scene.add( ambientLight );

// const pointLightHelper = new THREE.PointLightHelper( light1, 1 );
// scene.add( pointLightHelper );

camera.position.z = 5;

const randomAngle = () => {
    return Math.random() * Math.PI * 2; // Random angle in radians
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
          light.translationX = Math.cos(randomAngle()) * speed;
        }
      
        if (positionY > boundary || positionY < -boundary) {
          light.position.y = Math.sign(positionY) * boundary;
          light.translationY = Math.sin(randomAngle()) * speed;
        }
            
        lights[i].position.x += light.translationX;
        lights[i].position.y += light.translationY;
    }

	renderer.render( scene, camera );
}

animate();

const content = document.querySelector('html');
const imgLoad = imagesLoaded(content);

const heroElements = document.getElementById('hero-text').querySelectorAll('*');

imgLoad.on('done', instance => {
    console.log('Images loaded');
    
    const tl = gsap.timeline();

    tl.to('#loader-text', {
        duration: 0.2,
        delay: 2,
        opacity: 0,
        scale: 0,
        ease: "Power3.out"
    });
    tl.to('.blinder', {
        scaleY: 0,
        stagger: 0.05,
        ease: "Power1.out"
    });
    tl.from(heroElements, {
        duration: 0.5,
        stagger: 0.1,
        opacity: 0,
        y: 28,
        ease: "power1.out"
    }, ">-0.4");    
});