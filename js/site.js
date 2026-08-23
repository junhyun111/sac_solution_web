const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const siteHeader = document.querySelector('.site-header');

if (navLinks) {
  const navigationOrder = ['index.html', 'company.html', 'solutions.html', 'technology.html', 'contact.html'];
  const navigationLinks = new Map([...navLinks.querySelectorAll('a')].map((link) => [link.getAttribute('href'), link]));
  if (!navigationLinks.has('technology.html')) {
    const technologyLink = document.createElement('a');
    technologyLink.href = 'technology.html';
    technologyLink.textContent = 'TECHNOLOGY';
    navigationLinks.set('technology.html', technologyLink);
  }
  navigationOrder.forEach((href) => {
    const link = navigationLinks.get(href);
    if (link) navLinks.append(link);
  });
}

const closeMenu = () => {
  if (!menuButton || !navLinks) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  siteHeader?.classList.remove('header-hidden');
};

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? '메뉴 닫기' : '메뉴 열기');
    navLinks.classList.toggle('open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
    if (willOpen) siteHeader?.classList.remove('header-hidden');
  });

  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

const revealElements = document.querySelectorAll('[data-reveal]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('revealed'));
}

const sectionLinks = document.querySelectorAll('.anchor-inner a[href^="#"], .solution-rail a[href^="#"]');
const linkedSections = [...new Set([...sectionLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean))];

const centerAnchorLink = (link) => {
  const slider = link?.closest('.anchor-inner');
  if (!slider) return;
  const left = link.offsetLeft - (slider.clientWidth - link.offsetWidth) / 2;
  slider.scrollTo({ left: Math.max(0, left), behavior: reducedMotion ? 'auto' : 'smooth' });
};

const getNavigationOffset = () => {
  const headerHeight = siteHeader?.classList.contains('header-hidden') ? 0 : siteHeader?.offsetHeight || 0;
  const anchorHeight = document.querySelector('.anchor-nav')?.offsetHeight || 0;
  return headerHeight + anchorHeight + 12;
};

const updateActiveSection = () => {
  if (!linkedSections.length) return;
  const marker = window.scrollY + getNavigationOffset() + 24;
  let current = linkedSections[0];

  linkedSections.forEach((section) => {
    if (section.offsetTop <= marker) current = section;
  });

  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current.id}`;
    const wasActive = link.classList.contains('active');
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
    if (isActive && !wasActive) centerAnchorLink(link);
  });
};

sectionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - getNavigationOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', link.getAttribute('href'));
    centerAnchorLink(link);
  });
});

const solutionRail = document.querySelector('.solution-rail');
let scrollTicking = false;
let lastScrollY = window.scrollY;

const updateHeaderTheme = () => {
  if (!siteHeader) return;
  const probeY = Math.min(Math.max(siteHeader.offsetHeight / 2, 1), window.innerHeight - 1);
  const themeCarrier = document.elementsFromPoint(window.innerWidth / 2, probeY)
    .filter((element) => element !== siteHeader && !siteHeader.contains(element))
    .map((element) => element.closest('[data-header-theme]'))
    .find(Boolean);
  const fallbackDarkSurface = document.elementsFromPoint(window.innerWidth / 2, probeY)
    .filter((element) => element !== siteHeader && !siteHeader.contains(element))
    .map((element) => element.closest('.detail-hero, .cta, .footer, .solutions-page .solutions-catalogue, .solutions-page .detail-overview, .solutions-page .detail-capabilities, .technology-page .tech-hero, .technology-page .tech-index, .technology-page .tech-section, .technology-page .tech-explorer, .technology-page .tech-panel'))
    .find(Boolean);
  const isDarkBackground = themeCarrier
    ? themeCarrier.dataset.headerTheme === 'dark'
    : Boolean(fallbackDarkSurface);
  siteHeader.classList.toggle('on-dark-background', isDarkBackground);
};

const updateScrollState = () => {
  const currentScrollY = window.scrollY;
  siteHeader?.classList.toggle('scrolled', currentScrollY > 24);
  updateHeaderTheme();

  if (siteHeader) {
    const menuIsOpen = document.body.classList.contains('menu-open');
    const movedDown = currentScrollY > lastScrollY + 8;
    const movedUp = currentScrollY < lastScrollY - 8;
    const nearTop = currentScrollY < siteHeader.offsetHeight;

    if (menuIsOpen || nearTop || movedUp) siteHeader.classList.remove('header-hidden');
    else if (movedDown) siteHeader.classList.add('header-hidden');
  }

  if (solutionRail && linkedSections.length) {
    const firstSection = linkedSections[0];
    const lastSection = linkedSections[linkedSections.length - 1];
    const railStart = firstSection.offsetTop - window.innerHeight * .45;
    const railEnd = lastSection.offsetTop + lastSection.offsetHeight - window.innerHeight * .55;
    solutionRail.classList.toggle('visible', window.scrollY >= railStart && window.scrollY <= railEnd);
  }

  updateActiveSection();
  lastScrollY = currentScrollY;
  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateScrollState);
}, { passive: true });
window.addEventListener('resize', updateScrollState);
updateScrollState();

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const solutionTabs = document.querySelectorAll('[data-solution-tab]');
const solutionPanels = document.querySelectorAll('[data-solution-panel]');
const scrollToPageTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
if (solutionTabs.length && solutionPanels.length) {
  const selectSolutionTab = (solution) => {
    solutionTabs.forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab.dataset.solutionTab === solution));
    });
    solutionPanels.forEach((panel) => {
      panel.hidden = panel.dataset.solutionPanel !== solution;
    });
  };

  const requestedSolutionTab = new URLSearchParams(window.location.search).get('tab');
  if ([...solutionTabs].some((tab) => tab.dataset.solutionTab === requestedSolutionTab)) {
    selectSolutionTab(requestedSolutionTab);
  }

  solutionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      selectSolutionTab(tab.dataset.solutionTab);
      history.replaceState(null, '', `${window.location.pathname}?tab=${tab.dataset.solutionTab}`);
      scrollToPageTop();
    });
    tab.addEventListener('keydown', (event) => {
      const currentIndex = [...solutionTabs].indexOf(tab);
      let targetIndex;
      if (event.key === 'ArrowRight') targetIndex = (currentIndex + 1) % solutionTabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (currentIndex - 1 + solutionTabs.length) % solutionTabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = solutionTabs.length - 1;
      if (targetIndex === undefined) return;
      event.preventDefault();
      const targetTab = solutionTabs[targetIndex];
      targetTab.focus();
      selectSolutionTab(targetTab.dataset.solutionTab);
      scrollToPageTop();
    });
  });
}

const technologyTabs = document.querySelectorAll('[data-technology-tab]');
const technologyPanels = document.querySelectorAll('[data-technology-panel]');
document.querySelectorAll('.tech-panel-intro h2 br').forEach((breakElement) => breakElement.replaceWith(' '));
if (technologyTabs.length && technologyPanels.length) {
  const selectTechnologyTab = (technology) => {
    technologyTabs.forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab.dataset.technologyTab === technology));
    });
    technologyPanels.forEach((panel) => {
      panel.hidden = panel.dataset.technologyPanel !== technology;
    });
  };

  const requestedTechnologyTab = new URLSearchParams(window.location.search).get('tab');
  if ([...technologyTabs].some((tab) => tab.dataset.technologyTab === requestedTechnologyTab)) {
    selectTechnologyTab(requestedTechnologyTab);
  }

  technologyTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      selectTechnologyTab(tab.dataset.technologyTab);
      history.replaceState(null, '', `${window.location.pathname}?tab=${tab.dataset.technologyTab}`);
      scrollToPageTop();
    });
    tab.addEventListener('keydown', (event) => {
      const currentIndex = [...technologyTabs].indexOf(tab);
      let targetIndex;
      if (event.key === 'ArrowRight') targetIndex = (currentIndex + 1) % technologyTabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (currentIndex - 1 + technologyTabs.length) % technologyTabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = technologyTabs.length - 1;
      if (targetIndex === undefined) return;
      event.preventDefault();
      const targetTab = technologyTabs[targetIndex];
      targetTab.focus();
      selectTechnologyTab(targetTab.dataset.technologyTab);
      history.replaceState(null, '', `${window.location.pathname}?tab=${targetTab.dataset.technologyTab}`);
      scrollToPageTop();
    });
  });
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const solutionSelect = contactForm.elements.solution;
  const solutionMap = {
    safety: '재난·안전 솔루션',
    broadcast: '방송·문화 설비',
    integration: '시스템 통합',
    smart: '스마트 통신·ICT'
  };
  const requestedSolution = new URLSearchParams(window.location.search).get('solution');
  if (requestedSolution && solutionMap[requestedSolution]) {
    solutionSelect.value = solutionMap[requestedSolution];
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const value = (name) => String(data.get(name) || '').trim();
    const subject = `[홈페이지 프로젝트 문의] ${value('organization')} · ${value('solution')}`;
    const body = [
      '에스에이씨솔루션 프로젝트 문의',
      '',
      `회사·기관명: ${value('organization')}`,
      `담당자명: ${value('contact_name')}`,
      `전화번호: ${value('phone')}`,
      `이메일: ${value('email')}`,
      `관심 솔루션: ${value('solution')}`,
      `프로젝트 지역: ${value('region') || '미입력'}`,
      `예산 범위: ${value('budget') || '미선택'}`,
      '',
      '문의 내용:',
      value('message')
    ].join('\n');

    const status = contactForm.querySelector('[data-form-status]');
    if (status) status.textContent = '이메일 작성 화면을 여는 중입니다. 전송 버튼을 눌러 문의를 완료해 주세요.';
    window.location.href = `mailto:sacsound@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
