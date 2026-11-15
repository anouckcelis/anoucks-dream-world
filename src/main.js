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

// Graslaag boven op het eiland
const grassGeometry = new THREE.CylinderGeometry(
    2.65,
    2.65,
    0.12,
    8
);

const grassMaterial = new THREE.MeshStandardMaterial({
    color: '#8b91c9',
    roughness: 1
});

const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.position.y = 0.38;
scene.add(grass);

// Huisje - muren
const houseGeometry = new THREE.BoxGeometry(1.8, 1.5, 1.5);

const houseMaterial = new THREE.MeshStandardMaterial({
    color: '#f3e5ff',
    roughness: 0.9
});

const house = new THREE.Mesh(houseGeometry, houseMaterial);
house.position.set(0, 1.15, 0);
scene.add(house);

// Dak van het huisje
const roofGeometry = new THREE.ConeGeometry(1.45, 1.2, 4);

const roofMaterial = new THREE.MeshStandardMaterial({
    color: '#565194',
    roughness: 0.9
});

const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(0, 2.5, 0);
roof.rotation.y = Math.PI / 4;

scene.add(roof);

// Schoorsteen
const chimneyGeometry = new THREE.BoxGeometry(0.3, 0.9, 0.3);

const chimneyMaterial = new THREE.MeshStandardMaterial({
    color: '#85477a'
});

const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
chimney.position.set(0.55, 2.35, -0.25);

scene.add(chimney);

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
