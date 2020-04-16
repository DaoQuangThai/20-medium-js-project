const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date();

const timeLeft = new Date('July 31, 2020, 00:00:00');

// Set background Text
// year.innerText = `Be Focus!`;

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  const diff = timeLeft - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24); // day
  const h = Math.floor(diff / 1000 / 60 / 60) % 24; // hours left of day
  const m = Math.floor(diff / 1000 / 60) % 60; // minute left of a hours
  const s = Math.floor(diff / 1000) % 60; // second left of minutes

  // Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

// Show spinner before countdown
setTimeout(() => {
  // remove something from the DOM
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

// Run every second
setInterval(updateCountdown, 1000);
