const needle = document.getElementById('needle');
const direction = document.getElementById('direction');

const compass = document.getElementById('compass');
const labels = document.getElementById('labels');
const venti = [
  {angle: 0, name: 'Tramontana'},
  {angle: 45, name: 'Grecale'},
  {angle: 90, name: 'Levante'},
  {angle: 135, name: 'Scirocco'},
  {angle: 180, name: 'Ostro'},
  {angle: 225, name: 'Libeccio'},
  {angle: 270, name: 'Ponente'},
  {angle: 315, name: 'Maestrale'}
];

function updateCompass(angle) {
  const rotation = 360 - angle;
  needle.style.transform = `rotate(${rotation}deg)`;
  direction.textContent = `Direzione: ${Math.round(angle)}°`;
}

function handleOrientation(event) {
  if (event.absolute || event.webkitCompassHeading) {
    const heading = event.webkitCompassHeading || event.alpha;
    updateCompass(heading);
  } else {
    updateCompass(event.alpha);
  }
}

function createLabels() {
  const r = compass.clientWidth / 2;
  venti.forEach(v => {
    const span = document.createElement('span');
    span.textContent = v.name;
    const rad = (v.angle - 90) * Math.PI / 180;
    const x = r + Math.cos(rad) * (r - 20);
    const y = r + Math.sin(rad) * (r - 20);
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    labels.appendChild(span);
  });
}

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleOrientation, true);
} else {
  alert('Il tuo dispositivo non supporta la bussola.');
}

createLabels();
