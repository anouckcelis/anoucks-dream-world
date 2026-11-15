import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();
// Groep voor het volledige eiland
const islandGroup = new THREE.Group();
islandGroup.scale.set(1.3, 1.3, 1.3);
islandGroup.position.y = 0.8;
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

// Bloemen links naast het huis
addFlower(-1.25, 0.3, '#ff8fab');
addFlower(-1.65, 0.1, '#ffe066');
addFlower(-1.35, -0.4, '#b28dff');
addFlower(-1.8, -0.7, '#8ecbff');
addFlower(-1.3, -1.0, '#ff9f68');
addFlower(-1.9, -1.3, '#ff8fab');

// Bloemen achter het huis
addFlower(-0.7, -1.9, '#ffe066');
addFlower(0.2, -2.0, '#b28dff');
addFlower(0.9, -1.8, '#8ecbff');

// Bloemen aan de linkerrand
addFlower(-2.1, 0.7, '#ff9f68');
addFlower(-2.2, -0.1, '#ff8fab');
addFlower(-2.1, -0.9, '#ffe066');
addFlower(-1.9, -1.7, '#b28dff');

// Bloemen rondom de boom
addFlower(2.0, -0.7, '#ff8fab');
addFlower(2.15, 0.1, '#ffe066');
addFlower(2.0, 1.1, '#b28dff');
addFlower(1.8, 1.6, '#8ecbff');

// Bloemen rechts naast het huis
addFlower(1.4, -1.3, '#ff9f68');
addFlower(1.8, -1.5, '#ff8fab');

// Bloemen vooraan, naast het pad
addFlower(-1.4, 1.7, '#ffe066');
addFlower(-0.9, 1.9, '#b28dff');
addFlower(1.1, 1.8, '#ff8fab');

// Paadje naar de voordeur
const pathGeometry = new THREE.BoxGeometry(0.45, 0.05, 1.8);

const pathMaterial = new THREE.MeshStandardMaterial({
    color: '#d6c7f5',
    roughness: 1
});

const path = new THREE.Mesh(pathGeometry, pathMaterial);

path.position.set(0, 0.48, 1.45);

islandGroup.add(path);

// Boom aan de rechterkant van het huis
const treeGroup = new THREE.Group();

// Bruine stam
const trunkGeometry = new THREE.CylinderGeometry(0.12, 0.16, 0.8, 8);
const trunkMaterial = new THREE.MeshStandardMaterial({
    color: '#85477a',
    roughness: 1
});

const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = 0.4;

treeGroup.add(trunk);

// Groene boomkruin
const leavesGeometry = new THREE.SphereGeometry(0.55, 12, 12);
const leavesMaterial = new THREE.MeshStandardMaterial({
    color: '#69b96b',
    roughness: 1
});

const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.y = 1.1;

treeGroup.add(leaves);

// Klein hondje bij de boom
const dogGroup = new THREE.Group();

// Bruin lijfje
const dogBodyGeometry = new THREE.SphereGeometry(0.3, 12, 12);
const dogMaterial = new THREE.MeshStandardMaterial({ color: '#a66b43' });

const dogBody = new THREE.Mesh(dogBodyGeometry, dogMaterial);
dogBody.scale.set(1.3, 0.8, 0.8);
dogBody.position.set(0, 0.3, 0);

dogGroup.add(dogBody);

// Kopje
const dogHeadGeometry = new THREE.SphereGeometry(0.22, 12, 12);
const dogHead = new THREE.Mesh(dogHeadGeometry, dogMaterial);

dogHead.position.set(0.25, 0.55, 0.12);

dogGroup.add(dogHead);

// Oortjes
const earGeometry = new THREE.SphereGeometry(0.1, 8, 8);
const earMaterial = new THREE.MeshStandardMaterial({ color: '#70452f' });

const leftEar = new THREE.Mesh(earGeometry, earMaterial);
leftEar.scale.set(0.7, 1.4, 0.7);
leftEar.position.set(0.12, 0.58, 0.27);

dogGroup.add(leftEar);

const rightEar = new THREE.Mesh(earGeometry, earMaterial);
rightEar.scale.set(0.7, 1.4, 0.7);
rightEar.position.set(0.28, 0.58, -0.12);

dogGroup.add(rightEar);

// Vier pootjes
const legGeometry = new THREE.CylinderGeometry(0.055, 0.055, 0.2, 8);

const legPositions = [
    [-0.15, 0.1, 0.22],
    [0.15, 0.1, 0.22],
    [-0.15, 0.1, -0.22],
    [0.15, 0.1, -0.22]
];

legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, dogMaterial);
    leg.position.set(x, y, z);
    dogGroup.add(leg);
});

// Staartje
const tailGeometry = new THREE.ConeGeometry(0.07, 0.22, 8);
const tail = new THREE.Mesh(tailGeometry, dogMaterial);

tail.position.set(-0.4, 0.45, 0);
tail.rotation.z = -Math.PI / 2;

dogGroup.add(tail);

// Hondje op het eiland plaatsen
dogGroup.position.set(1.6, 0.44, 0.8);
dogGroup.rotation.y = -Math.PI / 4;

// Gezichtje van het hondje

// Zwarte oogjes
const eyeGeometry = new THREE.SphereGeometry(0.035, 8, 8);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: '#241a18' });

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(0.34, 0.59, 0.29);
dogGroup.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.34, 0.59, -0.05);
dogGroup.add(rightEye);

// Snoetje
const muzzleGeometry = new THREE.SphereGeometry(0.09, 10, 10);
const muzzleMaterial = new THREE.MeshStandardMaterial({ color: '#d9aa83' });

const muzzle = new THREE.Mesh(muzzleGeometry, muzzleMaterial);
muzzle.scale.set(1, 0.7, 1);
muzzle.position.set(0.44, 0.48, 0.12);
dogGroup.add(muzzle);

// Zwart neusje
const noseGeometry = new THREE.SphereGeometry(0.045, 8, 8);
const noseMaterial = new THREE.MeshStandardMaterial({ color: '#241a18' });

const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0.52, 0.51, 0.12);
dogGroup.add(nose);


islandGroup.add(dogGroup);

// Boom op het eiland plaatsen
treeGroup.position.set(1.65, 0.44, 0);

islandGroup.add(treeGroup);

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
