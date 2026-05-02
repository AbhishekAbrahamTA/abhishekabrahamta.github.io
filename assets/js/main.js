/* ===== Particle & Sparkle Generator ===== */

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  createSparkles();
  addMouseTrail();
});

function createParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;

  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 5;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');
    particle.style.setProperty('--duration', duration + 's');
    particle.style.setProperty('--delay', delay + 's');

    container.appendChild(particle);
  }
}

function createSparkles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;

  const count = 40;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;

    sparkle.style.left = x + '%';
    sparkle.style.top = y + '%';
    sparkle.style.setProperty('--duration', duration + 's');
    sparkle.style.setProperty('--delay', delay + 's');

    container.appendChild(sparkle);
  }
}

/* Mouse trail effect */
function addMouseTrail() {
  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'rgba(255, 105, 180, 0.7)';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.transition = 'all 0.8s ease-out';

    document.body.appendChild(trail);

    requestAnimationFrame(() => {
      trail.style.opacity = '0';
      trail.style.transform = 'scale(3)';
    });

    setTimeout(() => trail.remove(), 800);
  });
}
