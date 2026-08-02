const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

// 페이지 스크롤을 방해하지 않도록, 사용자가 선택한 뒤에만 지도를 조작합니다.
const interactiveMaps = document.querySelectorAll('[data-interactive-map]');
interactiveMaps.forEach((mapCard) => {
  const activateButton = mapCard.querySelector('.map-activate');
  const mapFrame = mapCard.querySelector('iframe');
  if (!activateButton || !mapFrame) return;

  const deactivateMap = () => mapCard.classList.remove('is-active');

  activateButton.addEventListener('click', () => {
    mapCard.classList.add('is-active');
    mapFrame.focus();
  });

  mapCard.addEventListener('mouseleave', deactivateMap);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') deactivateMap();
  });
  document.addEventListener('pointerdown', (event) => {
    if (!mapCard.contains(event.target)) deactivateMap();
  });
});

const revealElements = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        return;
      }

      // 위쪽으로 퇴장할 때 transform을 되돌리면 관찰 경계를 반복해서
      // 넘나들 수 있으므로, 화면 아래쪽에 있을 때만 다음 등장을 준비합니다.
      if (entry.boundingClientRect.top >= window.innerHeight) {
        entry.target.classList.remove('revealed');
      }
    });
  }, { threshold: 0.14 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('revealed'));
}

const sectionLinks = document.querySelectorAll('.anchor-inner a[href^="#"]');
const linkedSections = [...sectionLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const centerAnchorLink = (link) => {
  const slider = link?.closest('.anchor-inner');
  if (!slider) return;
  const left = link.offsetLeft - (slider.clientWidth - link.offsetWidth) / 2;
  slider.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
};

const updateActiveSection = () => {
  if (!linkedSections.length) return;
  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
  const anchorHeight = document.querySelector('.anchor-nav')?.offsetHeight || 0;
  const marker = window.scrollY + headerHeight + anchorHeight + 36;
  let current = linkedSections[0];

  linkedSections.forEach((section) => {
    if (section.offsetTop <= marker) current = section;
  });

  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current.id}`;
    const wasActive = link.classList.contains('active');
    link.classList.toggle('active', isActive);
    if (isActive && !wasActive) centerAnchorLink(link);
  });
};

sectionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const anchorHeight = document.querySelector('.anchor-nav')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - anchorHeight - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    centerAnchorLink(link);
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

// 문장이 화면에 들어오면 단어가 순서대로 부드럽게 나타납니다.
const textRevealTargets = document.querySelectorAll(
  '.section-title, .solution-copy h2, .company-intro h2, .tech-copy h2, .sub-hero h1, .cta h2'
);

textRevealTargets.forEach((element) => {
  let wordIndex = 0;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    if (!node.nodeValue.trim()) return;
    const fragment = document.createDocumentFragment();
    node.nodeValue.split(/(\s+)/).forEach((part) => {
      if (!part.trim()) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }
      const word = document.createElement('span');
      word.className = 'word';
      word.style.setProperty('--word-index', wordIndex++);
      word.textContent = part;
      fragment.appendChild(word);
    });
    node.parentNode.replaceChild(fragment, node);
  });
  element.classList.add('word-reveal');
});

if ('IntersectionObserver' in window) {
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('text-visible');
        return;
      }

      if (entry.boundingClientRect.top >= window.innerHeight) {
        entry.target.classList.remove('text-visible');
      }
    });
  }, { threshold: 0.35 });
  textRevealTargets.forEach((element) => textObserver.observe(element));
} else {
  textRevealTargets.forEach((element) => element.classList.add('text-visible'));
}

// 페이지 진행률과 이미지의 아주 미세한 패럴랙스 움직임을 함께 갱신합니다.
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.setAttribute('aria-hidden', 'true');
document.body.appendChild(progressBar);

const parallaxElements = document.querySelectorAll('[data-parallax]');
let scrollTicking = false;
const updateScrollMotion = () => {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;

  parallaxElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.035;
    element.style.setProperty('--parallax-y', `${Math.max(-18, Math.min(18, offset))}px`);
  });
  updateActiveSection();
  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateScrollMotion);
}, { passive: true });
updateScrollMotion();

// 메인 비주얼: 데이터 흐름을 연상시키는 가벼운 네트워크 애니메이션입니다.
const canvas = document.querySelector('#network-canvas');
if (canvas) {
  const context = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let particles = [];
  let animationFrame;
  const pointer = { x: -1000, y: -1000 };

  const makeParticles = () => {
    const count = width < 700 ? 22 : 42;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      radius: Math.random() * 1.4 + .6
    }));
  };

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    makeParticles();
  };

  const drawNetwork = () => {
    context.clearRect(0, 0, width, height);
    particles.forEach((particle, index) => {
      if (!reducedMotion) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      }

      const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
      const glow = pointerDistance < 170 ? .85 : .48;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(117, 224, 255, ${glow})`;
      context.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const target = particles[next];
        const distance = Math.hypot(particle.x - target.x, particle.y - target.y);
        if (distance > 145) continue;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(target.x, target.y);
        context.strokeStyle = `rgba(87, 204, 255, ${(1 - distance / 145) * .2})`;
        context.lineWidth = .7;
        context.stroke();
      }
    });

    if (!reducedMotion) animationFrame = window.requestAnimationFrame(drawNetwork);
  };

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });
  canvas.addEventListener('pointerleave', () => {
    pointer.x = -1000;
    pointer.y = -1000;
  });
  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(animationFrame);
    resizeCanvas();
    drawNetwork();
  });
  resizeCanvas();
  drawNetwork();
}
