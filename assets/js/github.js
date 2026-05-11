/* ============================================
   GITHUB PAGE — Particles, API, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollAnimations();
  initContributionGraph();
  fetchGitHubData();
  fetchGitHubRepos();
});

/* Particle Background */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = 80;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 105, 180, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
}

/* Scroll Animations */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.hero-text, .hero-photo, .github-card, .contribution-graph, .repos-section, .skill-card'
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  elements.forEach(el => observer.observe(el));
}

/* Contribution Graph */
function initContributionGraph() {
  const grid = document.getElementById('contribution-grid');
  if (!grid) return;
  const totalCells = 52 * 7;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'graph-cell';
    const rand = Math.random();
    let opacity;
    if (rand < 0.3) opacity = 0.05;
    else if (rand < 0.55) opacity = 0.15;
    else if (rand < 0.75) opacity = 0.3;
    else if (rand < 0.9) opacity = 0.55;
    else opacity = 0.85;
    cell.style.opacity = opacity;
    cell.style.animationDelay = `${i * 3}ms`;
    grid.appendChild(cell);
  }
}

/* GitHub API — Profile Stats */
async function fetchGitHubData() {
  const username = 'AbhishekAbrahamTA';
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('GitHub API error');
    const data = await response.json();
    animateNumber('repo-count', data.public_repos || 0);
    animateNumber('follower-count', data.followers || 0);
    animateNumber('following-count', data.following || 0);
  } catch (err) {
    console.warn('Could not fetch GitHub data:', err.message);
    document.getElementById('repo-count').textContent = '0';
    document.getElementById('follower-count').textContent = '0';
    document.getElementById('following-count').textContent = '0';
  }
}

/* GitHub API — Repositories */
async function fetchGitHubRepos() {
  const username = 'AbhishekAbrahamTA';
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  const langColors = {
    'JavaScript': '#f1e05a',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572A5',
    'TypeScript': '#2b7489',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Shell': '#89e051',
  };

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );
    if (!response.ok) throw new Error('GitHub API error');
    const repos = await response.json();

    grid.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.className = 'repo-card';

      const langColor = langColors[repo.language] || '#ff69b4';
      const desc = repo.description || 'No description';

      card.innerHTML = `
        <div class="repo-name">
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5z"/></svg>
          ${repo.name}
        </div>
        <div class="repo-desc">${desc}</div>
        <div class="repo-meta">
          ${repo.language ? `<span class="repo-lang"><span class="lang-dot" style="background:${langColor}"></span>${repo.language}</span>` : ''}
          <span>&#9733; ${repo.stargazers_count}</span>
          <span>&#128274; ${repo.forks_count}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.warn('Could not fetch repos:', err.message);
    grid.innerHTML = '<p style="color:rgba(255,255,255,0.4);text-align:center;">Could not load repositories</p>';
  }
}

/* Animate numbers */
function animateNumber(elementId, target) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
