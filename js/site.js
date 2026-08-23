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
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

const technologyArchitectures = {
  emergency: {
    label: '긴급방송 동작 흐름도',
    steps: [
      ['경보 수신', '유무선 네트워크로 표준 경보 정보 수신'],
      ['SAC 경보 단말', '수신 정보 확인 및 방송 제어 신호 생성'],
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
