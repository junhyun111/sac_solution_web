const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const siteHeader = document.querySelector('.site-header');
const languageQuery = new URLSearchParams(window.location.search).get('lang');
const currentLanguage = languageQuery === 'en' ? 'en' : 'ko';
const heroVideo = document.querySelector('.hero-video__item');
const urlWithLanguage = (href) => {
  const nextUrl = new URL(href, window.location.href);
  if (nextUrl.origin !== window.location.origin) return href;
  if (currentLanguage === 'en') nextUrl.searchParams.set('lang', 'en');
  else nextUrl.searchParams.delete('lang');
  return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
};

if (heroVideo) {
  heroVideo.addEventListener('ended', () => {
    heroVideo.classList.remove('is-active');
    heroVideo.classList.add('is-restarting');

    window.setTimeout(() => {
      heroVideo.currentTime = 0;
      heroVideo.classList.remove('is-restarting');
      heroVideo.classList.add('is-active');
      heroVideo.play().catch(() => {});
    }, 1500);
  });
}

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

  const navigationSubmenus = {
    'company.html': [
      ['회사소개', 'company.html#about'],
      ['기술·인증', 'company.html#technology'],
      ['연혁', 'company.html#history'],
      ['CI', 'company.html#ci'],
      ['오시는 길', 'company.html#location'],
    ],
    'solutions.html': [
      ['재난·안전', 'solutions.html?tab=safety'],
      ['방송·문화', 'solutions.html?tab=broadcast'],
      ['시스템 통합', 'solutions.html?tab=integration'],
      ['스마트 통신·ICT', 'solutions.html?tab=smart'],
    ],
    'technology.html': [
      ['Emergency Communication', 'technology.html?tab=emergency'],
      ['Resilient Broadcast', 'technology.html?tab=resilient'],
      ['Integrated Infrastructure', 'technology.html?tab=infrastructure'],
      ['On-device AI', 'technology.html?tab=ondevice'],
      ['Intelligent Safety', 'technology.html?tab=safety'],
      ['ITS', 'technology.html?tab=its'],
    ],
  };

  Object.entries(navigationSubmenus).forEach(([href, items]) => {
    const link = [...navLinks.children].find((element) => element.matches(`a[href="${href}"]`));
    if (!link) return;
    const dropdown = document.createElement('div');
    dropdown.className = 'nav-dropdown';
    const submenu = document.createElement('div');
    submenu.className = 'nav-submenu';
    submenu.setAttribute('aria-label', `${link.textContent} 세부 메뉴`);
    items.forEach(([label, destination]) => {
      const item = document.createElement('a');
      item.href = destination;
      item.textContent = label;
      submenu.append(item);
    });
    link.replaceWith(dropdown);
    dropdown.append(link, submenu);
  });

}

const solutionDescriptions = {
  safety: '분산된 재난 정보를 경보 수신, CCTV 관제, 비상방송과 하나의 대응 흐름으로 연동합니다. 상황 발생 시 필요한 안내를 빠르게 전파하고, 현장과 관제센터가 동일한 정보를 바탕으로 대응할 수 있도록 지원합니다.',
  broadcast: '관공서와 교육·체육·문화시설의 규모, 공간 특성, 운영 목적을 분석해 음향·영상·방송 설비를 설계합니다. 평상시 안내부터 행사 운영과 비상 상황까지 안정적으로 사용할 수 있는 방송 환경을 구축합니다.',
  integration: '방송, 경보, CCTV, 네트워크 등 개별 설비와 데이터를 하나의 운영 환경으로 통합합니다. 기존 시스템의 연계 조건과 현장 운영 흐름을 함께 검토해 관리와 대응이 효율적으로 이어지는 구조를 설계합니다.',
  smart: '도시와 교통 인프라에서 발생하는 현장 정보를 통신망과 통합 모니터링 체계로 연결합니다. 실시간 데이터 수집과 제어 환경을 기반으로 운영자가 시설 상태와 상황을 빠르게 판단할 수 있도록 지원합니다.',
};

Object.entries(solutionDescriptions).forEach(([solution, description]) => {
  const summary = document.querySelector(`[data-solution-panel="${solution}"] .detail-hero p`);
  if (summary) summary.textContent = description;
});

const siteFooter = document.querySelector('.footer');
if (siteFooter) {
  siteFooter.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <img class="footer-logo" src="images/saclogo.svg" alt="SAC Solution" width="110" height="62">
          <p>경기도 남양주시 순화궁로 272 동광비즈타워 11층 1112호</p>
          <p>031-570-2792 · sacsound@naver.com · FAX 070-7966-2795</p>
        </div>
        <div>
          <h3>바로가기</h3>
          <div class="footer-links"><a href="solutions.html">솔루션</a><a href="company.html">회사소개</a><a href="company.html#history">연혁</a></div>
        </div>
        <div>
          <h3>핵심 분야</h3>
          <div class="footer-links"><a href="solutions.html?tab=safety">재난·안전</a><a href="solutions.html?tab=broadcast">방송·문화</a><a href="solutions.html?tab=smart">스마트 통신</a></div>
        </div>
        <div>
          <h3>문의</h3>
          <div class="footer-links"><a href="contact.html">프로젝트 문의</a><a href="tel:0315702792">031-570-2792</a><a href="mailto:sacsound@naver.com">이메일 보내기</a></div>
        </div>
      </div>
      <div class="copyright">© <span data-year></span> SAC Solution Corporation. All rights reserved.</div>
    </div>
  `;
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
}

const navigateWithPageTransition = (event) => {
  const link = event.target.closest('.site-header a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target && link.target !== '_self') return;

  const destination = new URL(link.href, window.location.href);
  const current = new URL(window.location.href);
  const isPageChange = destination.origin === current.origin
    && (destination.pathname !== current.pathname || destination.search !== current.search);
  if (!isPageChange) return;

  event.preventDefault();
  document.body.classList.add('page-transitioning');
  window.setTimeout(() => {
    window.location.assign(destination.href);
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240);
};

document.addEventListener('click', navigateWithPageTransition);

const technologyArchitectures = {
  emergency: {
    label: '긴급방송 동작 흐름도',
    steps: [
      ['경보 수신', '유무선 네트워크로 표준 경보 정보 수신'],
      ['경보 단말', '수신 정보 확인 및 방송 제어 신호 생성'],
      ['우선방송', '내장 앰프와 우선 스피커로 즉시 안내'],
      ['자동 전환', '기존 전관방송 기동 후 방송 경로 전환'],
      ['상태 모니터링', '앰프 출력과 스피커 회선 이상 감시'],
    ],
  },
  resilient: {
    label: '방송 연속성 확보 흐름도',
    steps: [
      ['상태 감지', '앰프와 스피커 회선 상태를 상시 확인'],
      ['이상 판단', '장비·회선의 이상 구간과 영향을 분석'],
      ['대체 경로', '필요한 방송 경로와 우선순위를 선택'],
      ['안내 유지', '중요 구역의 비상 안내를 지속'],
      ['운영 확인', '복구 상태와 방송 체계 가용성을 점검'],
    ],
  },
  infrastructure: {
    label: '통합 인프라 운영 흐름도',
    steps: [
      ['현장 설비', '방송·경보·CCTV·센서 등 개별 설비 연결'],
      ['데이터 수집', '상태와 이벤트 정보를 표준 흐름으로 수집'],
      ['통합 플랫폼', '데이터와 제어 조건을 하나의 환경으로 통합'],
      ['통합 관제', '운영자가 현장 상황과 설비 상태를 확인'],
      ['운영 연동', '필요한 제어와 업무 조치로 연결'],
    ],
  },
  ondevice: {
    label: '온디바이스 AI 방송 흐름도',
    steps: [
      ['현장 입력', '음향·센서 등 현장 데이터를 수집'],
      ['On-device AI', '현장 장치에서 데이터를 즉시 분석'],
      ['상황 분석', '이벤트 유형과 위험 수준을 판단'],
      ['로컬 판단', '외부 연결에 덜 의존해 대응을 결정'],
      ['맞춤 방송', '상황에 맞는 안내 방송으로 연결'],
    ],
  },
  safety: {
    label: '지능형 안전 대응 흐름도',
    steps: [
      ['센서·영상', '여러 현장 신호와 설비 상태를 수집'],
      ['위험 징후', '비정상 상황과 위험 이벤트를 감지'],
      ['상황 판단', '위치·유형·영향도를 종합적으로 분석'],
      ['대응 시나리오', '상황에 맞는 경보와 안내를 선택'],
      ['방송·관제', '현장 전파와 운영자 대응으로 연결'],
    ],
  },
  its: {
    label: '지능형 교통 운영 흐름도',
    steps: [
      ['현장 장비', '도로·교차로의 영상과 제어 설비 연결'],
      ['교통 데이터', '교통량과 현장 정보를 수집·전달'],
      ['통신 네트워크', '현장 장비와 통합센터를 안정적으로 연결'],
      ['통합 관제', '교통 상황과 시설 상태를 함께 확인'],
      ['신호·운영', '운영 판단을 현장 제어와 안내에 반영'],
    ],
  },
};

Object.entries(technologyArchitectures).forEach(([technology, architecture]) => {
  const panel = document.querySelector(`[data-technology-panel="${technology}"]`);
  const visual = panel?.querySelector('.tech-visual, .system-architecture');
  if (!visual) return;

  if (!visual.previousElementSibling?.classList.contains('tech-architecture-heading')) {
    const architectureHeading = document.createElement('h3');
    architectureHeading.className = 'tech-architecture-heading';
    architectureHeading.textContent = 'SYSTEM ARCHITECTURE';
    visual.before(architectureHeading);
  }

  visual.className = 'system-architecture';
  visual.setAttribute('aria-label', architecture.label);
  visual.innerHTML = `
    <ol class="system-architecture__steps">
      ${architecture.steps.map(([title, description], index) => `<li><b>${String(index + 1).padStart(2, '0')}</b><h3>${title}</h3><p>${description}</p></li>`).join('')}
    </ol>
  `;
});

const technologyNarratives = {
  emergency: '유·무선 네트워크 환경과 기존 전관방송 설비의 상태를 함께 고려해, 방송 시작 시점과 전환 조건을 세밀하게 설계합니다. 필요한 안내는 빠르게 시작하고, 이후에는 시설의 기존 방송 체계와 안정적으로 연동할 수 있도록 구성합니다.',
  resilient: '앰프와 스피커 회선, 방송 경로의 상태를 지속적으로 확인하고 일부 구간의 이상이 전체 안내 체계의 중단으로 이어지지 않도록 대비합니다. 시설 규모와 중요 구역에 따라 우선순위와 대체 경로를 검토해 가용성을 높입니다.',
  infrastructure: '통합의 핵심은 장비를 한 화면에 모으는 데 있지 않습니다. 각 설비의 데이터 형식과 제어 조건, 운영 담당자의 업무 흐름을 분석해 정보가 필요한 시점에 정확히 전달되고 필요한 조치로 이어지는 구조를 만듭니다.',
  ondevice: '현장 장치에서 AI 추론을 수행하면 외부 서버 연결이나 전송 지연에 덜 의존하면서 이벤트에 빠르게 대응할 수 있습니다. SAC Solution은 음향·센서 정보와 현장 방송의 연결 방식을 검토하며, 적용 환경에 맞는 지능형 안내 기술을 연구하고 있습니다.',
  safety: '영상·음향·환경 센서와 설비 상태 정보는 각각 분리된 데이터가 아니라 하나의 안전 판단 근거가 될 수 있습니다. 여러 신호를 연결해 위험 징후를 더 빨리 파악하고, 상황과 위치에 맞는 방송·경보·관제 동작으로 이어지는 체계를 설계합니다.',
  its: '교통 인프라는 현장 장비, 통신망, 신호 제어와 통합 관제가 동시에 작동해야 합니다. 도로와 교차로에서 수집되는 정보를 신뢰성 있게 전달하고, 운영자가 교통 상황과 시설 상태를 함께 판단할 수 있는 연결 구조를 구축합니다.',
};

Object.entries(technologyNarratives).forEach(([technology, narrative]) => {
  const intro = document.querySelector(`[data-technology-panel="${technology}"] .tech-panel-intro`);
  if (!intro || intro.querySelector('.tech-panel-detail')) return;
  const detail = document.createElement('p');
  detail.className = 'tech-panel-detail';
  detail.textContent = narrative;
  intro.append(detail);
});

document.querySelectorAll('.technology-page .tech-status').forEach((element) => element.remove());
document.querySelectorAll('.technology-page .tech-detail > h3').forEach((element) => {
  element.textContent = 'KEY TECHNOLOGIES';
});

const animatedComponentSelectors = [
  '.solutions-page .solution-filter',
  '.solutions-page .detail-hero-grid > *',
  '.solutions-page .detail-overview-grid > *',
  '.solutions-page .detail-capabilities .section-intro',
  '.solutions-page .detail-capability',
  '.technology-page .tech-hero--simple .container',
  '.technology-page .tech-tabs',
  '.technology-page .tech-panel-intro',
  '.technology-page .tech-visual, .technology-page .system-architecture',
  '.technology-page .tech-detail > h3, .technology-page .tech-architecture-heading',
  '.technology-page .tech-detail-grid article',
  '.technology-page .related-solutions',
];

document.querySelectorAll(animatedComponentSelectors.join(',')).forEach((element) => {
  element.setAttribute('data-reveal', '');
});

document.querySelectorAll(
  '.solutions-page .detail-hero-grid, .solutions-page .detail-overview-grid, .solutions-page .detail-capability-grid, .technology-page .tech-detail-grid',
).forEach((element) => element.classList.add('stagger'));

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
    history.replaceState(null, '', urlWithLanguage(link.getAttribute('href')));
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
      history.replaceState(null, '', urlWithLanguage(`${window.location.pathname}?tab=${tab.dataset.solutionTab}`));
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
      history.replaceState(null, '', urlWithLanguage(`${window.location.pathname}?tab=${tab.dataset.technologyTab}`));
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
      history.replaceState(null, '', urlWithLanguage(`${window.location.pathname}?tab=${targetTab.dataset.technologyTab}`));
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
    const isEnglish = document.documentElement.lang === 'en';
    const subject = isEnglish
      ? `[SAC Solution Project Inquiry] ${value('organization')} · ${value('solution')}`
      : `[홈페이지 프로젝트 문의] ${value('organization')} · ${value('solution')}`;
    const body = isEnglish
      ? [
        'SAC Solution Project Inquiry',
        '',
        `Company / Organization: ${value('organization')}`,
        `Contact Name: ${value('contact_name')}`,
        `Phone Number: ${value('phone')}`,
        `Email: ${value('email')}`,
        `Solution of Interest: ${value('solution')}`,
        `Project Location: ${value('region') || 'Not provided'}`,
        `Budget Range: ${value('budget') || 'Not selected'}`,
        '',
        'Inquiry Details:',
        value('message')
      ].join('\n')
      : [
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
    if (status) status.textContent = isEnglish
      ? 'Opening your email draft. Please press Send to complete your inquiry.'
      : '이메일 작성 화면을 여는 중입니다. 전송 버튼을 눌러 문의를 완료해 주세요.';
    window.location.href = `mailto:sacsound@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Site language switcher
const englishTranslations = {
  '에스에이씨솔루션 홈': 'SAC Solution Home',
  '메뉴 열기': 'Open menu',
  '주요 메뉴': 'Primary navigation',
  '바로가기': 'Navigate',
  '홈': 'Home',
  '솔루션': 'Solutions',
  '회사소개': 'About',
  '연혁': 'History',
  '기술·인증': 'Technology & Certifications',
  '오시는 길': 'Location',
  '문의': 'Contact',
  '프로젝트 문의': 'Project Inquiry',
  '이메일 보내기': 'Send Email',
  '핵심 분야': 'Core Areas',
  '재난·안전': 'Safety',
  '방송·문화': 'Broadcast & Culture',
  '시스템 통합': 'System Integration',
  '스마트 통신': 'Smart Communications',
  '스마트 통신·ICT': 'Smart Communications & ICT',
  '재난·안전 솔루션': 'Safety Solutions',
  '방송·문화 설비': 'Broadcast & Cultural Facilities',
  '경기도 남양주시 순화궁로 272 동광비즈타워 11층 1112호': 'Suite 1112, Dongkwang Biz Tower, 272 Sunhwagung-ro, Namyangju-si, Gyeonggi-do, Republic of Korea',

  '에스에이씨솔루션은 재난의 순간부터 일상의 공간까지,': 'From moments of disaster to everyday spaces, SAC Solution',
  '사람과 정보를 더 빠르고 안전하게 연결하는 기술을 만듭니다.': 'creates technology that connects people and information faster and more safely.',
  '현장에 꼭 필요한 시스템이 신뢰할 수 있는 안전으로 이어지도록 함께하겠습니다.': 'We work with you to turn essential on-site systems into safety you can rely on.',
  '현장에 필요한 시스템을': 'Connecting the systems your site needs',
  '하나의 흐름으로 연결합니다': 'into one seamless flow',
  '방송·통신 하드웨어와 소프트웨어를 통합해 안전성, 운영 효율, 신속한 대응을 함께 확보합니다.': 'We integrate broadcast and communications hardware and software to deliver safety, operational efficiency, and rapid response.',
  '재난·안전 솔루션 상세 보기': 'View Safety Solutions details',
  '재난·안전 정보를 통합 관리하는 지능형 관제센터': 'Intelligent control center for integrated safety information management',
  '분산된 재난 정보를 경보, CCTV, 비상방송과 연결해 신속한 현장 대응을 지원합니다.': 'We connect distributed safety information with alerts, CCTV, and emergency broadcasting for rapid on-site response.',
  '솔루션 살펴보기': 'Explore solutions',
  '방송·문화 설비 상세 보기': 'View Broadcast & Cultural Facilities details',
  '전문 방송 및 음향 믹싱 콘솔': 'Professional broadcast and audio mixing console',
  '시설의 규모와 운영 목적에 맞는 음향·영상 환경과 방송 설비를 구축합니다.': 'We build audio, video, and broadcasting environments tailored to each facility’s scale and operational purpose.',
  '시스템 통합 상세 보기': 'View System Integration details',
  '시스템 통합을 위한 서버와 네트워크 인프라': 'Server and network infrastructure for system integration',
  '개별 설비와 데이터를 하나의 운영 환경으로 통합하고 연동 방식을 설계합니다.': 'We integrate individual equipment and data into one operating environment and design how they interconnect.',
  '스마트 통신·ICT 상세 보기': 'View Smart Communications & ICT details',
  '통신망으로 연결된 스마트시티 교통 인프라': 'Smart-city transport infrastructure connected by communications networks',
  '도시와 교통 인프라를 통신망과 통합 모니터링 체계로 연결합니다.': 'We connect urban and transport infrastructure through communications networks and integrated monitoring.',
  '현장 분석부터 운영 지원까지': 'From site analysis to operational support',
  '구축 전 과정을 함께합니다': 'we support every stage of delivery',
  '시설 환경과 기존 설비를 먼저 파악하고, 필요한 시스템을 설계·연동한 뒤 안정적인 운영을 지원합니다.': 'We assess the facility and existing equipment, design and integrate the required systems, then support stable operation.',
  '현장 분석': 'Site Analysis',
  '시설 유형, 운영 환경, 기존 설비와 필요한 대응 범위를 확인합니다.': 'We review the facility type, operating environment, existing equipment, and required response scope.',
  '통합 설계': 'Integrated Design',
  '방송·통신·관제 설비와 네트워크의 구성 및 연동 방식을 설계합니다.': 'We design the configuration and integration of broadcast, communications, control equipment, and networks.',
  '구축·연동': 'Deployment & Integration',
  '현장 조건에 맞춰 장비를 구축하고 개별 시스템을 하나의 흐름으로 연결합니다.': 'We deploy equipment for site conditions and connect individual systems into one flow.',
  '운영 지원': 'Operational Support',
  '설비 상태를 확인하고 안정적인 운영을 위한 유지보수를 지원합니다.': 'We monitor equipment status and provide maintenance for stable operation.',

  '회사소개 바로가기': 'About navigation',
  '안전과 일상을 연결하는': 'Connecting safety and everyday life',
  '방송통신 솔루션 기업': 'through broadcast and communications solutions',
  '에스에이씨솔루션은 재난 및 안전 설비, 방송·문화 설비, 시스템 통합과 스마트 통신 인프라를 제공합니다. 소프트웨어와 하드웨어를 아우르는 기술력으로 현장의 문제를 해결합니다.': 'SAC Solution delivers safety equipment, broadcast and cultural facilities, system integration, and smart communications infrastructure. We solve on-site challenges with expertise spanning software and hardware.',
  '지속적인 연구개발과 책임 있는 시공을 통해 고객이 신뢰할 수 있는 시스템, 사회의 안전에 기여하는 기술을 만들어 가겠습니다.': 'Through continuous R&D and responsible delivery, we create dependable systems and technology that contributes to a safer society.',
  '사업 분야 확인하기': 'Explore our solutions',
  '에스에이씨솔루션 방송통신 설비 현장': 'SAC Solution broadcast and communications installation site',
  '연구개발로 만드는': 'Built through research and development',
  '신뢰할 수 있는 기술': 'technology you can trust',
  '기업부설연구소를 기반으로 재난·민방위 경보와 방송 시스템의 신속성, 안정성, 연동성을 높이는 기술을 연구합니다.': 'Through our corporate research institute, we develop technology that improves the speed, reliability, and interoperability of disaster alerts and broadcasting systems.',
  '기업부설연구소 인정서 크게 보기': 'View corporate research institute certificate',
  '에스에이씨솔루션 기업부설연구소 인정서': 'SAC Solution corporate research institute certificate',
  '기업부설연구소 인정서': 'Corporate Research Institute Certificate',
  '한국산업기술진흥협회 인정': 'Recognized by the Korea Industrial Technology Association',
  '제202311674호 · 2023년 6월': 'No. 202311674 · June 2023',
  '원본 크게 보기': 'View original',
  '특허증 크게 보기': 'View patent certificate',
  '재난 및 민방위 경보 시스템 특허증': 'Disaster and civil defense alert system patent certificate',
  '재난·민방위 경보 시스템 특허': 'Disaster & Civil Defense Alert System Patent',
  '재난 및 민방위 경보 수신 시 즉시 방송이 가능한 경보 시스템': 'Alert system capable of immediate broadcasting upon receiving disaster and civil defense alerts',
  '특허 제10-2607096호 · 2023년 11월': 'Patent No. 10-2607096 · November 2023',
  '에스에이씨솔루션의 보유 기술': 'SAC Solution Technologies',
  '재난경보 즉시 방송': 'Immediate Disaster Alert Broadcasting',
  '경보 수신과 동시에 내장 앰프와 우선방송 스피커를 구동해 초기 안내 지연을 최소화합니다.': 'Upon receiving an alert, built-in amplifiers and priority speakers activate immediately to minimize initial announcement delays.',
  '표준 경보 프로토콜 수신': 'Standard Alert Protocol Reception',
  '이더넷과 LTE 등 유무선 통신을 통해 재난·민방위 표준 경보 정보를 수신합니다.': 'Receives standard disaster and civil defense alerts over wired and wireless networks including Ethernet and LTE.',
  '전관방송 자동 연동': 'Automatic PA System Handover',
  '기존 전관방송 설비가 기동되면 경보 단말기의 임시 방송에서 전관방송으로 자동 전환합니다.': 'Automatically hands over from temporary alert-terminal broadcasts to the existing PA system once it starts.',
  '스피커 회선 이중화': 'Speaker Line Redundancy',
  '우선방송 회선 이상을 감지하고 보조 회선으로 전환해 비상방송의 연속성을 확보합니다.': 'Detects priority-speaker line faults and switches to a backup line to keep emergency broadcasting continuous.',
  '설비 상태 모니터링': 'Equipment Status Monitoring',
  '앰프 출력과 스피커 선로 상태를 상시 감시하고 이상 발생 시 관리자에게 상태를 알립니다.': 'Continuously monitors amplifier output and speaker lines, notifying operators of faults.',
  '통합 시스템 설계': 'Integrated System Design',
  '재난경보, CCTV, 방송, 네트워크와 통합상황실을 현장 환경에 맞춰 설계하고 연동합니다.': 'Designs and integrates disaster alerts, CCTV, broadcasting, networks, and integrated control rooms for each site.',
  '축적된 경험 위에': 'Building on proven experience,',
  '새로운 기술을 더합니다': 'we advance new technology',
  '기술 특허 등록': 'Technology Patent Registration',
  '등록특허 제10-2689842호 취득': 'Acquired registered Patent No. 10-2689842',
  '연구개발 기반 강화': 'Strengthened R&D Foundation',
  '기업부설연구소 인정, 본사 공장 등록 및 재난경보 관련 특허 등록': 'Corporate research institute recognition, headquarters factory registration, and disaster-alert patent registration',
  '사업 기반 확장': 'Expanded Business Foundation',
  '정보통신공사업 면허 취득, 소프트웨어사업자 및 여성기업 확인': 'Information and communications construction license; certified software business and women-owned business',
  '에스에이씨솔루션 설립': 'SAC Solution Established',
  '방송·AV 및 정보통신 시스템 사업 시작': 'Launched broadcast, AV, and information communications systems business',
  '에스에이씨솔루션 CI': 'SAC Solution CI',
  '연결과 신뢰를 상징하는': 'A symbol of connection and trust',
  'SAC는 Smart AI Communication의 의미를 담고 있습니다. 선명한 블루는 전문 기술과 신뢰, 더 안전한 미래를 향한 비전을 표현합니다.': 'SAC stands for Smart AI Communication. Its vivid blue expresses expertise, trust, and a vision for a safer future.',
  '경기도 남양주시 순화궁로 272': '272 Sunhwagung-ro, Namyangju-si, Gyeonggi-do',
  '동광비즈타워 11층 1112호': 'Suite 1112, 11F Dongkwang Biz Tower',
  '지도에서 보기': 'View on map',

  '솔루션 분야 선택': 'Select solution area',
  '분산된 재난 정보를 경보, CCTV, 비상방송과 유기적으로 연동해 긴급 상황을 신속하게 전달합니다.': 'We integrate distributed safety information with alerts, CCTV, and emergency broadcasting to communicate emergencies quickly.',
  '재난 신호부터': 'From disaster signals',
  '현장 전파까지': 'to on-site communication',
  '경보 수신과 방송 설비, 관제 환경을 하나의 대응 흐름으로 연결합니다.': 'We connect alert reception, broadcast equipment, and the control environment into one response flow.',
  '적용 대상': 'Applications',
  '공공청사, 통합관제센터, 재난 대응 시설, 다중이용시설': 'Public offices, integrated control centers, disaster-response facilities, and multi-use facilities',
  '주요 기능': 'Key Functions',
  '재난·민방위 경보 수신, CCTV 안전 관제, 비상방송, 실시간 정보 전파': 'Disaster and civil defense alert reception, CCTV safety monitoring, emergency broadcasting, and real-time information distribution',
  '구축 범위': 'Scope of Delivery',
  '현장 분석, 경보 단말 및 방송 설비, 기존 시스템 연동, 상태 모니터링': 'Site analysis, alert terminals and broadcast equipment, existing-system integration, and status monitoring',
  '운영 지원': 'Operational Support',
  '설비 상태 확인, 회선 이상 감시, 현장 환경에 맞는 유지보수 지원': 'Equipment checks, line-fault monitoring, and maintenance tailored to the site environment',
  '핵심 기능': 'Core Capabilities',
  '표준 경보 수신': 'Standard Alert Reception',
  '유무선 네트워크로 재난·민방위 표준 경보 정보를 수신합니다.': 'Receives standard disaster and civil defense alerts over wired and wireless networks.',
  '즉시 비상방송': 'Immediate Emergency Broadcasting',
  '경보 수신과 동시에 우선방송을 시작해 초기 안내 지연을 줄입니다.': 'Starts priority broadcasting as soon as an alert is received to reduce initial announcement delays.',
  '통합 상태 감시': 'Integrated Status Monitoring',
  '방송 장비와 스피커 회선 상태를 확인해 대응 체계의 연속성을 지원합니다.': 'Checks broadcast equipment and speaker-line status to sustain the response system.',
  '관공서와 교육·체육·문화시설의 규모와 운영 목적에 맞는 음향·영상 환경을 구축합니다.': 'We build audio and video environments suited to the scale and operational needs of government, education, sports, and cultural facilities.',
  '시설의 용도에 맞는': 'Broadcasting environments',
  '방송 환경': 'for every facility use',
  '이용 편의와 시설 운영 효율을 함께 고려해 장비 구성부터 시스템 연동까지 지원합니다.': 'We support everything from equipment configuration to system integration, balancing user convenience and operational efficiency.',
  '관공서, 교육시설, 체육시설, 공연장 및 문화공간': 'Government offices, educational facilities, sports facilities, performance venues, and cultural spaces',
  '구내·전관 방송, 전문 AV, 주차관제, 출입통제, 시설 통합 운영': 'In-house and PA broadcasting, professional AV, parking control, access control, and integrated facility operation',
  '음향·영상 설계, 장비 구성, 배선 및 시공, 운영 시스템 연동': 'Audio/video design, equipment configuration, cabling and installation, and operational system integration',
  '시설별 사용 환경을 반영한 운용 구성과 설비 유지보수 지원': 'Operating configuration and equipment maintenance tailored to each facility’s use environment',
  '구내·전관 방송': 'In-house & PA Broadcasting',
  '시설 규모와 안내 목적에 맞는 방송 설비를 구성합니다.': 'Configures broadcasting systems for the facility scale and announcement purpose.',
  '전문 AV 시스템': 'Professional AV Systems',
  '음향과 영상 장비를 공간의 사용 목적에 맞춰 설계합니다.': 'Designs audio and video equipment for the purpose of each space.',
  '시설 운영 연동': 'Facility Operations Integration',
  '주차·출입 등 연계 설비를 포함한 운영 환경을 구축합니다.': 'Builds an operating environment that includes connected equipment such as parking and access control.',
  '개별 설비와 데이터를 하나의 운영 흐름으로 연결해 더 명확한 시설 관리 환경을 만듭니다.': 'We connect individual equipment and data into one operating flow for clearer facility management.',
  '분산된 설비와 정보를': 'Connecting distributed equipment and information',
  '하나의 체계로': 'into one system',
  '설계 단계부터 시공, 데이터 연동, 운영 이후의 관리까지 통합 관점으로 지원합니다.': 'We provide integrated support from design and construction through data integration and post-deployment management.',
  '통합상황실, 공공·산업시설, 복합시설, 시설 운영 조직': 'Integrated control rooms, public and industrial facilities, mixed-use facilities, and facility operations teams',
  '재난 플랫폼 컨설팅, SI·FMS·BEMS, 통합배선, 통합 모니터링': 'Disaster-platform consulting, SI/FMS/BEMS, structured cabling, and integrated monitoring',
  '요구사항 분석, 통합 설계, 정보통신공사, 개별 장비·데이터 연동': 'Requirements analysis, integrated design, information and communications construction, and equipment/data integration',
  '구축 후 시스템 점검과 유지보수로 운영 안정성을 지원': 'Post-deployment system checks and maintenance to support operational stability',
  '통합상황실 구축': 'Integrated Control Room Delivery',
  '운영자가 핵심 정보를 한눈에 파악할 수 있는 관제 환경을 구성합니다.': 'Builds a control environment where operators can grasp key information at a glance.',
  '통합배선 설계': 'Structured Cabling Design',
  '시설의 확장성과 유지관리 효율을 고려해 통신 인프라를 설계합니다.': 'Designs communications infrastructure with scalability and maintenance efficiency in mind.',
  '정보통신공사·유지보수': 'ICT Construction & Maintenance',
  '시공부터 점검, 장애 대응까지 운영 단계에 맞춰 지원합니다.': 'Supports each operational stage from construction and inspection to fault response.',
  '도시와 도로의 현장 정보를 빠르게 수집하고, 연결된 데이터로 더 효율적인 운영을 지원합니다.': 'We rapidly collect field information from cities and roads, using connected data to support more efficient operation.',
  '현장 데이터가 연결되는': 'Where field data connects:',
  '스마트 인프라': 'smart infrastructure',
  '통신 인프라와 현장 장비, 모니터링 환경을 하나로 구성해 도시 운영의 가시성을 높입니다.': 'We unify communications infrastructure, field equipment, and monitoring environments to improve visibility into city operations.',
  '스마트시티, 도로·교통시설, 도시 기반시설, 통합 모니터링 센터': 'Smart cities, road and transport facilities, urban infrastructure, and integrated monitoring centers',
  '지능형 교통체계, 교통정보 수집·제공, 신호제어, 통합 모니터링': 'Intelligent transport systems, traffic information collection and delivery, signal control, and integrated monitoring',
  '네트워크 인프라, 현장 단말, 정보 수집, 관제 시스템 통합': 'Network infrastructure, field terminals, information collection, and control-system integration',
  '장비·네트워크 상태 확인과 운영 환경에 맞춘 유지보수 지원': 'Equipment and network checks, plus maintenance tailored to the operating environment',
  '스마트시티 인프라': 'Smart-city Infrastructure',
  '도시 기반시설과 통신 환경을 연결하는 확장 가능한 인프라를 구성합니다.': 'Builds scalable infrastructure that connects urban facilities and communications environments.',
  '교통정보 수집·제공': 'Traffic Information Collection & Delivery',
  '현장 데이터를 수집하고 필요한 운영 주체와 이용자에게 전달합니다.': 'Collects field data and delivers it to the operators and users who need it.',
  '통합 모니터링': 'Integrated Monitoring',
  '시설과 네트워크의 상태를 통합적으로 파악할 수 있는 환경을 구축합니다.': 'Builds an environment for integrated visibility into facilities and network status.',
  '분산된 재난 정보를 경보 수신, CCTV 관제, 비상방송과 하나의 대응 흐름으로 연동합니다. 상황 발생 시 필요한 안내를 빠르게 전파하고, 현장과 관제센터가 동일한 정보를 바탕으로 대응할 수 있도록 지원합니다.': 'We integrate distributed safety information with alert reception, CCTV monitoring, and emergency broadcasting into one response flow. This enables necessary guidance to be delivered quickly and supports coordinated response by sites and control centers using the same information.',
  '관공서와 교육·체육·문화시설의 규모, 공간 특성, 운영 목적을 분석해 음향·영상·방송 설비를 설계합니다. 평상시 안내부터 행사 운영과 비상 상황까지 안정적으로 사용할 수 있는 방송 환경을 구축합니다.': 'We analyze the scale, spatial characteristics, and operational goals of government, educational, sports, and cultural facilities to design audio, video, and broadcasting systems. We build reliable broadcast environments for everyday announcements, events, and emergencies.',
  '방송, 경보, CCTV, 네트워크 등 개별 설비와 데이터를 하나의 운영 환경으로 통합합니다. 기존 시스템의 연계 조건과 현장 운영 흐름을 함께 검토해 관리와 대응이 효율적으로 이어지는 구조를 설계합니다.': 'We integrate individual systems and data—including broadcasting, alerts, CCTV, and networks—into one operating environment. By reviewing existing-system dependencies and on-site workflows together, we design structures that keep management and response efficient.',
  '도시와 교통 인프라에서 발생하는 현장 정보를 통신망과 통합 모니터링 체계로 연결합니다. 실시간 데이터 수집과 제어 환경을 기반으로 운영자가 시설 상태와 상황을 빠르게 판단할 수 있도록 지원합니다.': 'We connect field information from urban and transport infrastructure to communications networks and integrated monitoring systems. With real-time data collection and control environments, operators can quickly assess facility conditions and situations.',

  '긴급방송 동작 흐름도': 'Emergency Broadcast Operation Flow',
  '경보 수신': 'Alert Reception',
  '유무선 네트워크로 표준 경보 정보 수신': 'Receive standard alert information through wired and wireless networks',
  '경보 단말': 'Alert Terminal',
  '수신 정보 확인 및 방송 제어 신호 생성': 'Verify received information and generate broadcast control signals',
  '우선방송': 'Priority Broadcasting',
  '내장 앰프와 우선 스피커로 즉시 안내': 'Deliver immediate guidance through built-in amplifiers and priority speakers',
  '자동 전환': 'Automatic Handover',
  '기존 전관방송 기동 후 방송 경로 전환': 'Switch the broadcast path after the existing PA system starts',
  '상태 모니터링': 'Status Monitoring',
  '앰프 출력과 스피커 회선 이상 감시': 'Monitor amplifier output and speaker-line faults',

  '방송 연속성 확보 흐름도': 'Broadcast Continuity Flow',
  '상태 감지': 'Status Detection',
  '앰프와 스피커 회선 상태를 상시 확인': 'Continuously check amplifier and speaker-line status',
  '이상 판단': 'Fault Assessment',
  '장비·회선의 이상 구간과 영향을 분석': 'Analyze fault locations and impacts across equipment and lines',
  '대체 경로': 'Alternative Path',
  '필요한 방송 경로와 우선순위를 선택': 'Select the required broadcast path and priority',
  '안내 유지': 'Maintain Guidance',
  '중요 구역의 비상 안내를 지속': 'Continue emergency guidance in critical areas',
  '운영 확인': 'Operational Check',
  '복구 상태와 방송 체계 가용성을 점검': 'Check recovery status and broadcast-system availability',

  '통합 인프라 운영 흐름도': 'Integrated Infrastructure Operation Flow',
  '현장 설비': 'Field Equipment',
  '방송·경보·CCTV·센서 등 개별 설비 연결': 'Connect individual equipment such as broadcasting, alerts, CCTV, and sensors',
  '데이터 수집': 'Data Collection',
  '상태와 이벤트 정보를 표준 흐름으로 수집': 'Collect status and event information through a standard flow',
  '통합 플랫폼': 'Integrated Platform',
  '데이터와 제어 조건을 하나의 환경으로 통합': 'Integrate data and control conditions into one environment',
  '통합 관제': 'Integrated Control',
  '운영자가 현장 상황과 설비 상태를 확인': 'Enable operators to review site conditions and equipment status',
  '운영 연동': 'Operations Integration',
  '필요한 제어와 업무 조치로 연결': 'Connect to the required controls and operational actions',

  '온디바이스 AI 방송 흐름도': 'On-device AI Broadcast Flow',
  '현장 입력': 'Field Input',
  '음향·센서 등 현장 데이터를 수집': 'Collect field data such as audio and sensor signals',
  '현장 장치에서 데이터를 즉시 분석': 'Analyze data immediately on the on-site device',
  '상황 분석': 'Situation Analysis',
  '이벤트 유형과 위험 수준을 판단': 'Assess event type and risk level',
  '로컬 판단': 'Local Decision',
  '외부 연결에 덜 의존해 대응을 결정': 'Decide the response with less reliance on external connections',
  '맞춤 방송': 'Tailored Broadcast',
  '상황에 맞는 안내 방송으로 연결': 'Deliver an announcement tailored to the situation',

  '지능형 안전 대응 흐름도': 'Intelligent Safety Response Flow',
  '센서·영상': 'Sensors & Video',
  '여러 현장 신호와 설비 상태를 수집': 'Collect multiple field signals and equipment-status data',
  '위험 징후': 'Risk Indicators',
  '비정상 상황과 위험 이벤트를 감지': 'Detect abnormal situations and risk events',
  '상황 판단': 'Situation Assessment',
  '위치·유형·영향도를 종합적으로 분석': 'Analyze location, type, and impact together',
  '대응 시나리오': 'Response Scenario',
  '상황에 맞는 경보와 안내를 선택': 'Select alerts and guidance for the situation',
  '방송·관제': 'Broadcast & Control',
  '현장 전파와 운영자 대응으로 연결': 'Connect to on-site communication and operator response',

  '지능형 교통 운영 흐름도': 'Intelligent Transport Operations Flow',
  '현장 장비': 'Field Equipment',
  '도로·교차로의 영상과 제어 설비 연결': 'Connect video and control equipment at roads and intersections',
  '교통 데이터': 'Traffic Data',
  '교통량과 현장 정보를 수집·전달': 'Collect and deliver traffic volume and field information',
  '통신 네트워크': 'Communications Network',
  '현장 장비와 통합센터를 안정적으로 연결': 'Reliably connect field equipment and the integrated center',
  '교통 상황과 시설 상태를 함께 확인': 'Review traffic conditions and facility status together',
  '신호·운영': 'Signal & Operations',
  '운영 판단을 현장 제어와 안내에 반영': 'Apply operational decisions to field control and guidance',

  '유·무선 네트워크 환경과 기존 전관방송 설비의 상태를 함께 고려해, 방송 시작 시점과 전환 조건을 세밀하게 설계합니다. 필요한 안내는 빠르게 시작하고, 이후에는 시설의 기존 방송 체계와 안정적으로 연동할 수 있도록 구성합니다.': 'We carefully design broadcast start times and handover conditions by considering both wired and wireless network environments and the condition of the existing PA system. Required guidance starts quickly, then integrates reliably with the facility’s existing broadcast system.',
  '앰프와 스피커 회선, 방송 경로의 상태를 지속적으로 확인하고 일부 구간의 이상이 전체 안내 체계의 중단으로 이어지지 않도록 대비합니다. 시설 규모와 중요 구역에 따라 우선순위와 대체 경로를 검토해 가용성을 높입니다.': 'We continuously check amplifiers, speaker lines, and broadcast paths so faults in one area do not interrupt the entire guidance system. We review priorities and alternative paths for the facility scale and critical areas to improve availability.',
  '통합의 핵심은 장비를 한 화면에 모으는 데 있지 않습니다. 각 설비의 데이터 형식과 제어 조건, 운영 담당자의 업무 흐름을 분석해 정보가 필요한 시점에 정확히 전달되고 필요한 조치로 이어지는 구조를 만듭니다.': 'Integration is not simply about placing equipment on one screen. We analyze each system’s data formats, control conditions, and operator workflows to create structures where information arrives accurately when needed and leads to the right action.',
  '현장 장치에서 AI 추론을 수행하면 외부 서버 연결이나 전송 지연에 덜 의존하면서 이벤트에 빠르게 대응할 수 있습니다. SAC Solution은 음향·센서 정보와 현장 방송의 연결 방식을 검토하며, 적용 환경에 맞는 지능형 안내 기술을 연구하고 있습니다.': 'Running AI inference on on-site devices enables faster event response with less dependence on external servers and transmission delays. SAC Solution is researching intelligent guidance technology for each application environment by examining how audio and sensor data connect with on-site broadcasting.',
  '영상·음향·환경 센서와 설비 상태 정보는 각각 분리된 데이터가 아니라 하나의 안전 판단 근거가 될 수 있습니다. 여러 신호를 연결해 위험 징후를 더 빨리 파악하고, 상황과 위치에 맞는 방송·경보·관제 동작으로 이어지는 체계를 설계합니다.': 'Video, audio, environmental sensors, and equipment-status information are not isolated data; together they can inform a safety decision. We connect multiple signals to identify risk signs sooner and design systems that lead to broadcasts, alerts, and control actions suited to the situation and location.',
  '교통 인프라는 현장 장비, 통신망, 신호 제어와 통합 관제가 동시에 작동해야 합니다. 도로와 교차로에서 수집되는 정보를 신뢰성 있게 전달하고, 운영자가 교통 상황과 시설 상태를 함께 판단할 수 있는 연결 구조를 구축합니다.': 'Transport infrastructure requires field equipment, communications networks, signal control, and integrated control to operate together. We reliably deliver information collected from roads and intersections and build connected structures that let operators assess traffic conditions and facility status together.',

  '기술 영역 선택': 'Select technology area',
  '경보와 방송 사이의 시간을 줄입니다.': 'We reduce the time between an alert and a broadcast.',
  '재난 상황에서는 수신된 정보가 실제 현장에 얼마나 빠르게 전달되는지가 중요합니다. SAC Solution은 재난·민방위 경보 수신 직후 우선방송을 시작하고, 기존 전관방송 시스템이 준비되면 방송 경로를 자동 전환하는 즉시 방송 기술을 개발했습니다.': 'In a disaster, what matters is how quickly received information reaches the real site. SAC Solution starts priority broadcasting immediately after receiving disaster or civil defense alerts, then automatically switches the broadcast path when the existing PA system is ready.',
  '이더넷·LTE 등 유·무선 네트워크를 통해 재난 및 민방위 경보 정보를 수신합니다.': 'Receives disaster and civil defense alerts through wired and wireless networks such as Ethernet and LTE.',
  '기존 방송설비의 기동을 기다리지 않고 긴급 안내를 시작합니다.': 'Starts emergency announcements without waiting for the existing broadcast equipment to start.',
  '기존 전관방송이 정상 기동되면 방송 경로를 자동 전환합니다.': 'Automatically switches the broadcast path when the existing PA system starts normally.',
  '경보 수신, 판단, 방송 제어를 하나의 대응 흐름으로 구성합니다.': 'Combines alert reception, decision-making, and broadcast control into one response flow.',
  '재난·안전 솔루션 →': 'Safety Solutions →',
  '방송·문화 설비 →': 'Broadcast & Cultural Facilities →',
  '비상 상황에서도 방송은 멈추지 않아야 합니다.': 'Broadcasting must not stop, even in an emergency.',
  '비상방송 시스템의 성능은 정상 상황이 아니라 장애 상황에서 결정됩니다. 방송 장비와 스피커 회선을 지속적으로 확인하고, 일부 회선의 이상에도 중요한 안내가 유지될 수 있는 방송 구조를 설계합니다.': 'An emergency broadcasting system is defined by how it performs under failure, not normal conditions. We continuously check broadcast equipment and speaker lines, designing systems that retain critical announcements even when some lines fail.',
  '우선방송 회선 이상 시 대체 방송 경로를 사용할 수 있도록 구성합니다.': 'Configures an alternative broadcast path for priority-broadcast line faults.',
  '앰프 출력 상태를 지속적으로 확인해 장비 이상을 파악합니다.': 'Continuously checks amplifier output to detect equipment faults.',
  '스피커 선로 상태를 감시해 방송 체계의 가용성을 높입니다.': 'Monitors speaker-line condition to increase broadcast-system availability.',
  '일부 이상이 전체 방송 체계에 미치는 영향을 최소화합니다.': 'Minimizes the impact of partial faults on the entire broadcast system.',
  '서로 다른 시스템을 하나의 운영 환경으로 연결합니다.': 'We connect different systems into one operating environment.',
  '방송, 경보, CCTV, 네트워크, 센서와 관제 시스템은 실제 현장에서 하나의 대응 체계로 움직여야 합니다. 기존 설비와 신규 시스템을 분석하고, 데이터와 제어 흐름을 통합해 운영 환경을 설계합니다.': 'Broadcasting, alerts, CCTV, networks, sensors, and control systems must operate as one response system in the field. We assess existing equipment and new systems, then integrate data and control flows into the operating environment.',
  '방송·경보·영상·관제 시스템을 하나의 운영 환경으로 통합합니다.': 'Integrates broadcast, alert, video, and control systems into one operating environment.',
  '데이터와 제어 신호 전달을 위한 통신 인프라를 설계합니다.': 'Designs communications infrastructure for data and control-signal transmission.',
  '여러 설비의 상태와 정보를 하나의 환경에서 확인합니다.': 'Enables status and information from multiple systems to be checked in one environment.',
  '기존 방송·통신 설비를 활용하면서 신규 시스템과 연동합니다.': 'Integrates new systems while making use of existing broadcast and communications equipment.',
  '시스템 통합 →': 'System Integration →',
  '스마트 통신·ICT →': 'Smart Communications & ICT →',
  '클라우드를 기다리지 않고, 현장에서 판단합니다.': 'We make decisions on site, without waiting for the cloud.',
  'AI 연산을 현장 장치에서 수행해 현장의 상황을 보다 빠르게 인지하고 필요한 안내를 제공하는 지능형 방송 기술을 연구하고 있습니다. 철도차량, 역사, 공공시설 적용을 검토하는 R&D 프로젝트입니다.': 'We are researching intelligent broadcasting technology that performs AI processing on on-site devices to recognize conditions faster and provide the needed guidance. This R&D project is being explored for rail vehicles, stations, and public facilities.',
  '데이터를 외부 서버에 전송하지 않고 현장 장치에서 분석합니다.': 'Analyzes data on site without sending it to an external server.',
  '상황과 위험 유형에 따라 필요한 안내를 선택하는 기술입니다.': 'Selects the guidance needed for each situation and risk type.',
  '이벤트와 대응 사이의 지연을 최소화하는 구조를 연구합니다.': 'Researches architectures that minimize latency between events and responses.',
  '외부 연결이 제한된 상황에서도 핵심 기능을 수행합니다.': 'Maintains core functions even when external connectivity is limited.',
  '위험을 감지하는 것에서 대응하는 것까지.': 'From detecting risk to responding to it.',
  '센서와 영상, 장비 상태, 네트워크에서 수집되는 정보를 연결하고 위험 상황에 따라 필요한 경보·방송·관제 동작으로 이어지는 지능형 안전 시스템을 연구합니다.': 'We research intelligent safety systems that connect sensor, video, equipment-status, and network data to the alerts, broadcasts, and control actions needed for each risk situation.',
  '영상, 음향, 환경 센서와 장비 상태 정보를 함께 수집합니다.': 'Collects video, audio, environmental-sensor, and equipment-status information together.',
  '현장의 비정상 상황과 위험 이벤트를 식별하는 기술을 연구합니다.': 'Researches technology for identifying abnormal situations and risk events in the field.',
  '위험의 종류와 위치에 맞는 경보·방송 시나리오를 적용합니다.': 'Applies alert and broadcast scenarios suited to the risk type and location.',
  '감지부터 방송·관제까지의 대응 과정을 연결합니다.': 'Connects the response process from detection through broadcasting and control.',
  '도로의 정보를 연결해 더 안전한 이동을 만듭니다.': 'We connect road information to make mobility safer.',
  'ITS는 도로와 차량, 교통시설에서 발생하는 데이터를 수집하고 통신망과 관제 시스템으로 연결해 교통 운영의 효율성과 안전성을 높이는 기술입니다.': 'ITS collects data from roads, vehicles, and transport facilities, then connects it to communications networks and control systems to improve traffic efficiency and safety.',
  '교통량과 현장 정보를 수집하는 통신·현장 인프라를 구성합니다.': 'Builds communications and field infrastructure to collect traffic and site information.',
  '현장 신호 설비와 관제 시스템 사이의 제어 환경을 구축합니다.': 'Builds a control environment between field signal equipment and control systems.',
  '현장 장비와 통합센터 간 데이터 통신 환경을 설계합니다.': 'Designs the data-communications environment between field equipment and the integrated center.',
  '교통정보와 시스템 상태를 통합적으로 확인합니다.': 'Provides integrated visibility into traffic information and system status.',

  '프로젝트 정보를': 'Tell us about your',
  '알려주세요': 'project',
  '시설 유형과 구축 지역, 현재 운영 중인 설비를 알려주시면 상담에 필요한 내용을 확인해 연락드리겠습니다.': 'Tell us your facility type, project location, and currently operating equipment. We will review what is needed for a consultation and get in touch.',
  '회사·기관명': 'Company / Organization',
  '담당자명': 'Contact Name',
  '전화번호': 'Phone Number',
  '이메일': 'Email',
  '관심 솔루션': 'Solution of Interest',
  '선택해 주세요': 'Please select',
  '기타': 'Other',
  '프로젝트 지역': 'Project Location',
  '예: 경기도 남양주시': 'e.g., Namyangju-si, Gyeonggi-do',
  '예산 범위': 'Budget Range',
  '선택하지 않음': 'Not selected',
  '협의 필요': 'To be discussed',
  '5천만원 미만': 'Under KRW 50 million',
  '5천만원~1억원': 'KRW 50–100 million',
  '1억원~5억원': 'KRW 100–500 million',
  '5억원 이상': 'Over KRW 500 million',
  '문의 내용': 'Inquiry Details',
  '시설 유형, 기존 설비, 필요한 기능과 예상 일정을 알려주세요.': 'Please tell us your facility type, existing equipment, required functions, and expected schedule.',
  '문의 답변을 위한 개인정보 수집 및 이용에 동의합니다. 입력 정보는 상담 목적으로만 사용됩니다.': 'I agree to the collection and use of personal information for this inquiry. The information entered will only be used for consultation.',
  '이메일로 문의하기': 'Send Inquiry by Email',
  '버튼을 누르면 입력 내용이 포함된 이메일 작성 화면이 열립니다.': 'Clicking the button opens an email draft containing the information you entered.',
  '빠른 확인이 필요하시면': 'For a faster response,',
  '직접 연락해 주세요': 'please contact us directly',
  '상담 시 함께 알려주세요': 'Please include in your inquiry',
  '시설 유형과 프로젝트 지역': 'Facility type and project location',
  '현재 운영 중인 방송·통신 설비': 'Currently operating broadcast and communications equipment',
  '필요한 기능과 예상 일정': 'Required functions and expected schedule',

  '에스에이씨솔루션 | 재난안전·방송통신 시스템 구축': 'SAC Solution | Safety, Broadcasting & Communications Systems',
  '회사소개 | 에스에이씨솔루션': 'About | SAC Solution',
  '솔루션 | 에스에이씨솔루션': 'Solutions | SAC Solution',
  '프로젝트 문의 | 에스에이씨솔루션': 'Project Inquiry | SAC Solution',
  'Technology | 에스에이씨솔루션': 'Technology | SAC Solution',
  '재난안전, 방송문화, 시스템 통합, 스마트 통신까지 에스에이씨솔루션의 사업 분야를 확인하세요.': 'Explore SAC Solution’s business areas, from safety and broadcasting to system integration and smart communications.',
  '시설과 운영 환경에 맞는 방송·통신·관제 시스템의 설계와 구축 범위를 확인하세요.': 'Explore the design and delivery scope for broadcast, communications, and control systems tailored to your facility and operating environment.',
  '에스에이씨솔루션의 재난경보, 방송 신뢰성, 통합 인프라 및 지능형 안전 기술 연구를 소개합니다.': 'Explore SAC Solution’s research in disaster alerts, broadcast reliability, integrated infrastructure, and intelligent safety technology.',
  '에스에이씨솔루션': 'SAC Solution',
  'ko_KR': 'en_US',
  '회사정보': 'Company Information',
  '통합 관제 환경을 구성하는 시스템 설비': 'System equipment for an integrated control environment',
  '스마트시티 기반의 통합 교통 및 도시 인프라': 'Smart-city integrated transport and urban infrastructure',
  '외부 연결이 제한된 상황에서도 핵심 기능을 수행하는 구조입니다.': 'An architecture that maintains core functions even when external connectivity is limited.',
  'Google 지도에서 보기': 'View on Google Maps'
};

const translateEnglishDocument = () => {
  document.documentElement.lang = 'en';
  document.title = englishTranslations[document.title] || document.title;

  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
  textNodes.forEach((node) => {
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (!englishTranslations[trimmed]) return;
    node.nodeValue = original.replace(trimmed, englishTranslations[trimmed]);
  });

  document.querySelectorAll('[alt], [aria-label], [placeholder], meta[content]').forEach((element) => {
    ['alt', 'aria-label', 'placeholder', 'content'].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && englishTranslations[value]) element.setAttribute(attribute, englishTranslations[value]);
    });
  });
};

const languageNavigation = document.querySelector('.nav');
if (languageNavigation) {
  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  switcher.setAttribute('role', 'group');
  switcher.setAttribute('aria-label', 'Language selection');

  ['ko', 'en'].forEach((language, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = language.toUpperCase();
    button.setAttribute('aria-pressed', String(currentLanguage === language));
    button.setAttribute('aria-label', language === 'ko' ? '한국어로 보기' : 'View in English');
    button.addEventListener('click', () => {
      if (language === currentLanguage) return;
      const nextUrl = new URL(window.location.href);
      if (language === 'en') nextUrl.searchParams.set('lang', 'en');
      else nextUrl.searchParams.delete('lang');
      window.location.href = nextUrl.toString();
    });
    switcher.append(button);
    if (index === 0) {
      const separator = document.createElement('span');
      separator.setAttribute('aria-hidden', 'true');
      switcher.append(separator);
    }
  });
  languageNavigation.append(switcher);
}

if (currentLanguage === 'en') {
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetUrl = new URL(href, window.location.href);
    if (targetUrl.origin === window.location.origin && (targetUrl.pathname.endsWith('.html') || href.startsWith('#'))) {
      link.setAttribute('href', urlWithLanguage(href));
    }
  });
  translateEnglishDocument();
  window.requestAnimationFrame(translateEnglishDocument);
}
