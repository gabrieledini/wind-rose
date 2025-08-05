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
  const rot = 360 - alpha;
  //const rotDir = alpha - 360;
  needleRed.style.transform = `rotate(${rot}deg)`;
  //overlay.style.transform = `rotate(${rot}deg)`; // ghiera solidale
  //arrow.style.transform = `rotate(${rot}deg)`; // freccia solidale
  direction.textContent = `Direzione: ${Math.round(rot)}° v3`;
}

let initialHeading = null;

function getHeadingFromOrientationEvent(event) {
  let heading = 0;

  if (event.webkitCompassHeading !== undefined) {
    // iOS Safari
    heading = event.webkitCompassHeading;
  } else if (event.alpha !== null) {
    // Android e altri browser
    heading = 360 - event.alpha;
  }
  return heading;
}

function handleOrientation(e) {
  //const alpha = e.webkitCompassHeading ?? e.alpha;
  const heading = getHeadingFromOrientationEvent(e);

  if (initialHeading === null) {
    initialHeading = heading; // Salva valore iniziale al primo evento
    console.log("Direzione iniziale memorizzata:", initialHeading);
  }

  const delta = (heading - initialHeading + 360) % 360;

  console.log(`Rotazione rispetto all’inizio: ${Math.round(delta)}°`);
  updateCompass(delta);
}

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleOrientation, true);
} else {
  alert('Dispositivo non supportato.');
}


drawOverlay();

window.addEventListener('resize', drawOverlay);
