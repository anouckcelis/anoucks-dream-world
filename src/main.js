import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#b9c9ee');

// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(0, 4, 12);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.querySelector('#app').appendChild(renderer.domElement);

// Licht
const ambientLight = new THREE.AmbientLight('#ffffff', 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
directionalLight.position.set(5, 8, 5);
scene.add(directionalLight);

// Zwevend eiland
const islandGeometry = new THREE.CylinderGeometry(2.7, 1.9, 1.4, 8);

const islandMaterial = new THREE.MeshStandardMaterial({
    color: '#565194',
    roughness: 0.9
});

const island = new THREE.Mesh(islandGeometry, islandMaterial);
island.position.y = -0.5;
scene.add(island);

// Bovenkant van het eiland
const topGeometry = new THREE.CylinderGeometry(2.7, 2.7, 0.12, 8);

const topMaterial = new THREE.MeshStandardMaterial({
    color: '#b7a8df',
    roughness: 1
});

const islandTop = new THREE.Mesh(topGeometry, topMaterial);
islandTop.position.y = 0.26;
scene.add(islandTop);



// Animatie
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Aanpassen bij het wijzigen van de schermgrootte
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
