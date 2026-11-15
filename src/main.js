import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();
// Groep voor het volledige eiland
const islandGroup = new THREE.Group();
scene.add(islandGroup);
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
islandGroup.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
directionalLight.position.set(5, 8, 5);
islandGroup.add(directionalLight);

// Zwevend eiland
const islandGeometry = new THREE.CylinderGeometry(2.7, 1.9, 1.4, 8);

const islandMaterial = new THREE.MeshStandardMaterial({
    color: '#565194',
    roughness: 0.9
});

const island = new THREE.Mesh(islandGeometry, islandMaterial);
island.position.y = -0.5;
islandGroup.add(island);

// Bovenkant van het eiland
const topGeometry = new THREE.CylinderGeometry(2.7, 2.7, 0.12, 8);

const topMaterial = new THREE.MeshStandardMaterial({
    color: '#b7a8df',
    roughness: 1
});

const islandTop = new THREE.Mesh(topGeometry, topMaterial);
islandTop.position.y = 0.26;
islandGroup.add(islandTop);

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
islandGroup.add(grass);

// Huisje - muren
const houseGeometry = new THREE.BoxGeometry(1.8, 1.5, 1.5);

const houseMaterial = new THREE.MeshStandardMaterial({
    color: '#f3e5ff',
    roughness: 0.9
});

const house = new THREE.Mesh(houseGeometry, houseMaterial);
house.position.set(0, 1.15, 0);
islandGroup.add(house);

// Dak van het huisje
const roofGeometry = new THREE.ConeGeometry(1.45, 1.2, 4);

const roofMaterial = new THREE.MeshStandardMaterial({
    color: '#565194',
    roughness: 0.9
});

const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(0, 2.5, 0);
roof.rotation.y = Math.PI / 4;

islandGroup.add(roof);

// Schoorsteen
const chimneyGeometry = new THREE.BoxGeometry(0.3, 0.9, 0.3);

const chimneyMaterial = new THREE.MeshStandardMaterial({
    color: '#85477a'
});

const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
chimney.position.set(0.55, 2.35, -0.25);

islandGroup.add(chimney);

// Voordeur
const doorGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.08);

const doorMaterial = new THREE.MeshStandardMaterial({
    color: '#85477a'
});

const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 0.75, 0.79);

islandGroup.add(door);

// Ramen
const windowGeometry = new THREE.BoxGeometry(0.45, 0.45, 0.08);

const windowMaterial = new THREE.MeshStandardMaterial({
    color: '#8ecbff',
    metalness: 0.2,
    roughness: 0.2
});

// Linkerraam
const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
leftWindow.position.set(-0.58, 1.2, 0.79);
islandGroup.add(leftWindow);

// Rechterraam
const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
rightWindow.position.set(0.58, 1.2, 0.79);
islandGroup.add(rightWindow);

// Zijramen links
const sideWindowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
sideWindowLeft.position.set(-0.91, 1.2, -0.35);
sideWindowLeft.rotation.y = Math.PI / 2;
islandGroup.add(sideWindowLeft);

const sideWindowLeft2 = new THREE.Mesh(windowGeometry, windowMaterial);
sideWindowLeft2.position.set(-0.91, 1.2, 0.4);
sideWindowLeft2.rotation.y = Math.PI / 2;
islandGroup.add(sideWindowLeft2);

// Zijramen rechts
const sideWindowRight = new THREE.Mesh(windowGeometry, windowMaterial);
sideWindowRight.position.set(0.91, 1.2, -0.35);
sideWindowRight.rotation.y = Math.PI / 2;
islandGroup.add(sideWindowRight);

const sideWindowRight2 = new THREE.Mesh(windowGeometry, windowMaterial);
sideWindowRight2.position.set(0.91, 1.2, 0.4);
sideWindowRight2.rotation.y = Math.PI / 2;
islandGroup.add(sideWindowRight2);

// Raam achteraan
const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
backWindow.position.set(0, 1.2, -0.79);
islandGroup.add(backWindow);

// Functie om een bloemetje te maken
function addFlower(x, z, color) {
    const flowerGroup = new THREE.Group();

    // Kort groen steeltje
    const stemGeometry = new THREE.CylinderGeometry(0.018, 0.025, 0.18, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: '#6b9b65' });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);

    stem.position.y = 0.09;
    flowerGroup.add(stem);

    // Bloemblaadjes
    const petalGeometry = new THREE.SphereGeometry(0.1, 12, 12);
    const petalMaterial = new THREE.MeshStandardMaterial({ color: color });

    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;

        const petal = new THREE.Mesh(petalGeometry, petalMaterial);

        petal.scale.set(0.8, 0.45, 1.2);
        petal.position.set(
            Math.cos(angle) * 0.09,
            0.2,
            Math.sin(angle) * 0.09
        );
        petal.rotation.y = -angle;

        flowerGroup.add(petal);
    }

    // Geel hartje
    const centerGeometry = new THREE.SphereGeometry(0.055, 12, 12);
    const centerMaterial = new THREE.MeshStandardMaterial({ color: '#ffdf70' });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);

    center.position.y = 0.22;
    flowerGroup.add(center);

    // Plaats het bloemetje op het eiland
    flowerGroup.position.set(x, 0.44, z);

    islandGroup.add(flowerGroup);
}

// Bloemetjes links van het huis
addFlower(-1.5, 0.5, '#ff8fab');
addFlower(-1.8, 0, '#ffe066');
addFlower(-1.6, -0.7, '#b28dff');
addFlower(-1.4, -1.4, '#8ecbff');
addFlower(-0.8, -1.8, '#ff9f68');

// Bloemetjes achter het huis
addFlower(-0.2, -1.9, '#ff8fab');
addFlower(0.5, -1.9, '#ffe066');
addFlower(1.0, -1.5, '#b28dff');
addFlower(-1.9, -0.9, '#ff9f68');

// Extra kleurrijke bloemetjes links
addFlower(-2.0, 0.7, '#8ecbff');
addFlower(-1.9, 1.1, '#ff8fab');
addFlower(-1.3, -0.3, '#ffe066');

// Animatie
function animate() {
    requestAnimationFrame(animate);

    islandGroup.rotation.y += 0.003;

    renderer.render(scene, camera);
}

animate();

// Aanpassen bij het wijzigen van de schermgrootte
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
