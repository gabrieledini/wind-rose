const compass = document.getElementById('compass');
const overlay = document.getElementById('overlay-labels');
const needleRed = document.getElementById('needle-red');
const arrow = document.getElementById('arrow');
const direction = document.getElementById('direction');

const venti8 = [
  { angle: 0, name: 'Tramontana' },
  { angle: 45, name: 'Grecale' },
  { angle: 90, name: 'Levante' },
  { angle: 135, name: 'Scirocco' },
  { angle: 180, name: 'Ostro' },
  { angle: 225, name: 'Libeccio' },
  { angle: 270, name: 'Ponente' },
  { angle: 315, name: 'Maestrale' }
];

function drawOverlay() {
  overlay.innerHTML = '';
  const r = compass.clientWidth / 2;
  venti8.forEach(v => {
    const rad = (v.angle - 90) * Math.PI / 180;
    const x = r + Math.cos(rad) * (r - 40);
    const y = r + Math.sin(rad) * (r - 40);
    const span = document.createElement('span');
    span.textContent = v.name;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    overlay.appendChild(span);
  });
}

function updateCompass(alpha) {
  //const rot = 360 - alpha;
  const rot = alpha;
  needleRed.style.transform = `rotate(${rot}deg)`;
  //overlay.style.transform = `rotate(${rot}deg)`; // ghiera solidale
  //arrow.style.transform = `rotate(${rot}deg)`; // freccia solidale
  direction.textContent = `Direzione: ${Math.round(alpha)}°`;
}

function handleOrientation(e) {
  const alpha = e.webkitCompassHeading ?? e.alpha;
  updateCompass(alpha);
}

if (window.DeviceOrientationEvent) {
  await sleep(3000);
  window.addEventListener('deviceorientation', handleOrientation, true);
} else {
  alert('Dispositivo non supportato.');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

drawOverlay();
window.addEventListener('resize', drawOverlay);
