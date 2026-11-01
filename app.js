document.addEventListener('DOMContentLoaded', () => {

  document.documentElement.classList.remove('dark-theme');
  try {
    localStorage.removeItem('master_key_theme');
  } catch (e) {
    
  }

  function updateWorkshopStatus() {
    try {
      const now = new Date();

      const krasnoyarskTimeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Krasnoyarsk',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      const [hStr, mStr] = krasnoyarskTimeStr.split(':');
      const hour = parseInt(hStr, 10);
      const minute = parseInt(mStr, 10);
      const currentMinutes = hour * 60 + minute;

      const openMinutes = 9 * 60;
      const closeMinutes = 20 * 60;

      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

      const mapLiveStatus = document.getElementById('mapLiveStatus');
      if (mapLiveStatus) {
        if (isOpen) {
          mapLiveStatus.className = 'map-status-pill is-open';
          mapLiveStatus.innerHTML = `
            <span class="status-pulse-dot"></span>
            <span class="status-status-text">Мы открыты</span>
            <span class="status-hours-sub">до 20:00</span>
          `;
        } else {
          mapLiveStatus.className = 'map-status-pill is-closed';
          mapLiveStatus.innerHTML = `
            <span class="status-pulse-dot status-pulse-dot--closed"></span>
            <span class="status-status-text">Мы закрыты</span>
            <span class="status-hours-sub">откроемся в 09:00</span>
          `;
        }
      }

      const heroLiveStatus = document.getElementById('heroLiveStatus');
      if (heroLiveStatus) {
        if (isOpen) {
          heroLiveStatus.className = 'hero-workshop-card__status is-open';
          heroLiveStatus.innerHTML = `
            <span class="status-pulse-dot"></span>
            <span class="hero-status-text">Мастерская открыта</span>
          `;
        } else {
          heroLiveStatus.className = 'hero-workshop-card__status is-closed';
          heroLiveStatus.innerHTML = `
            <span class="status-pulse-dot status-pulse-dot--closed"></span>
            <span class="hero-status-text">Мастерская закрыта</span>
          `;
        }
      }

      const headerStatusDot = document.querySelector('.header__status-dot');
      if (headerStatusDot) {
        if (isOpen) {
          headerStatusDot.classList.remove('status-dot--closed');
          headerStatusDot.title = 'Мастерская открыта';
        } else {
          headerStatusDot.classList.add('status-dot--closed');
          headerStatusDot.title = 'Мастерская закрыта до 09:00';
        }
      }
    } catch (err) {
      console.warn('Status time check error:', err);
    }
  }

  updateWorkshopStatus();
  setInterval(updateWorkshopStatus, 30000);

  function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.btn-copy-phone');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const phone = btn.getAttribute('data-phone') || '';
        if (!phone) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(phone);
          } else {

            const temp = document.createElement('input');
            temp.value = phone;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
          }

          btn.classList.add('copied');
          setTimeout(() => {
            btn.classList.remove('copied');
          }, 1600);
        } catch (err) {
          console.error('Copy failed:', err);
        }
      });
    });
  }

  initCopyButtons();

  const ORIGINAL_CATALOG = window.KEYS_CATALOG || [];
  let currentCatalog = [...ORIGINAL_CATALOG];

  const track = document.getElementById('carouselTrack');
  const viewport = document.getElementById('carouselViewport');
  const prevBtn = document.getElementById('prevKeyBtn');
  const nextBtn = document.getElementById('nextKeyBtn');
  const counterDisplay = document.getElementById('carouselCounter');
  const dotsContainer = document.getElementById('carouselDots');
  const filtersContainer = document.getElementById('catalogFilters');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  if (!track || !viewport) return;

  let currentIndex = 0;
  let isAnimating = false;
  let bufferCount = 5;

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width < 340) return 1;
    if (width < 860) return 2;
    if (width < 1200) return 3;
    return 4;
  }

  const categoryIcons = {
    'Квартирные': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    'Автомобильные': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="3"/><path d="M5 11l2-6h10l2 6"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>',
    'Сейфовые': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 7v2"/><path d="M12 15v2"/><path d="M7 12h2"/><path d="M15 12h2"/></svg>',
    'Домофонные': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    'Специальные': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  function createCardElement(key, absoluteIndex) {
    const card = document.createElement('div');
    card.className = 'key-card';
    card.setAttribute('data-id', key.id);
    card.setAttribute('data-category', key.category);
    card.setAttribute('data-index', absoluteIndex);

    card.innerHTML = `
      <div class="key-card__thumb-box">
        <div class="key-card__img-wrap">
          <img src="${key.image}" alt="${key.name}" loading="lazy" class="key-card__img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'220\\' viewBox=\\'0 0 300 220\\'><rect width=\\'300\\' height=\\'220\\' fill=\\'%23f1f5f9\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'%2394a3b8\\' font-family=\\'sans-serif\\' font-size=\\'14\\'>${key.name}</text></svg>'">
        </div>

        <div class="key-card__badge-row">
          <span class="key-card__time-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${key.time}
          </span>
        </div>
      </div>

      <div class="key-card__body">
        <div class="key-card__meta-row">
          <span class="key-card__category">${key.category}</span>
          <span class="key-card__stock-status">В наличии</span>
        </div>

        <h3 class="key-card__title">${key.name}</h3>

        <div class="key-card__price-box">
          <span class="key-card__price-label">Стоимость дубликата:</span>
          <span class="key-card__price-val">${key.priceFormatted}</span>
        </div>

        <div class="key-card__action-box">
          <div class="key-card__speed-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Нарезка от 3 минут прямо при вас</span>
          </div>
          <div class="key-card__links-row">
            <a href="tel:+79639569122" class="key-card__call-link" title="Позвонить мастеру">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Позвонить</span>
            </a>
            <a href="https://2gis.ru/krasnoyarsk/firm/70000001052644549" target="_blank" rel="noopener" class="key-card__address-link" title="Открыть в 2ГИС">
              2ГИС →
            </a>
          </div>
        </div>
      </div>
    `;

    return card;
  }

  function buildTrack() {
    track.innerHTML = '';
    const total = currentCatalog.length;

    if (total === 0) {
      track.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted); width: 100%;">По выбранным категориям ключи не найдены</div>';
      if (counterDisplay) counterDisplay.textContent = 'Ключи не найдены';
      return;
    }

    bufferCount = Math.min(total, 5);

    for (let i = total - bufferCount; i < total; i++) {
      const card = createCardElement(currentCatalog[i], i - total);
      track.appendChild(card);
    }

    for (let i = 0; i < total; i++) {
      const card = createCardElement(currentCatalog[i], i);
      track.appendChild(card);
    }

    for (let i = 0; i < bufferCount; i++) {
      const card = createCardElement(currentCatalog[i], total + i);
      track.appendChild(card);
    }

    buildDots();
    updateTrackPosition(false);
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const total = currentCatalog.length;
    if (total <= 1) return;

    const visibleCount = getVisibleCount();
    const dotsCount = Math.max(1, Math.ceil(total / visibleCount));

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Перейти к группе ключей ${i + 1}`);
      dot.addEventListener('click', () => {
        moveToIndex(i * visibleCount);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const total = currentCatalog.length;
    if (total === 0) return;

    const visibleCount = getVisibleCount();
    const group = Math.floor(currentIndex / visibleCount);
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === group);
    });
  }

  function calculateDimensions() {
    const visibleCount = getVisibleCount();
    const viewportWidth = viewport.clientWidth;
    const gap = window.innerWidth < 560 ? 8 : 16;
    const total = currentCatalog.length;

    const cardWidth = Math.max(80, Math.floor((viewportWidth - (gap * (visibleCount - 1))) / visibleCount));

    const cards = track.querySelectorAll('.key-card');
    cards.forEach(card => {
      card.style.flex = `0 0 ${cardWidth}px`;
      card.style.width = `${cardWidth}px`;
      card.style.minWidth = `${cardWidth}px`;
      card.style.maxWidth = `${cardWidth}px`;
    });

    track.style.gap = `${gap}px`;
    return { cardWidth, gap, stepWidth: cardWidth + gap };
  }

  function updateTrackPosition(withTransition = true) {
    const total = currentCatalog.length;
    const cards = track.querySelectorAll('.key-card');
    if (cards.length === 0 || total === 0) return;

    const { stepWidth } = calculateDimensions();
    const offsetIndex = currentIndex + bufferCount;
    const translateX = -(offsetIndex * stepWidth);

    if (withTransition) {
      track.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      track.style.transition = 'none';
    }

    track.style.transform = `translateX(${translateX}px)`;

    const visibleCount = getVisibleCount();
    const activeStart = offsetIndex;
    const activeEnd = offsetIndex + visibleCount - 1;

    cards.forEach((card, idx) => {
      if (idx >= activeStart && idx <= activeEnd) {
        card.classList.remove('is-blurred');
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-blurred');
        card.classList.add('is-active');
      }
    });

    if (counterDisplay) {
      const startKey = String(currentIndex + 1).padStart(2, '0');
      const endKey = String(Math.min(total, currentIndex + visibleCount)).padStart(2, '0');
      counterDisplay.innerHTML = `Показаны <span>${startKey} — ${endKey}</span> из ${total}`;
    }

    updateDots();
  }

  function moveToIndex(newIndex) {
    const total = currentCatalog.length;
    if (isAnimating || total === 0) return;
    isAnimating = true;

    currentIndex = (newIndex + total) % total;
    updateTrackPosition(true);

    setTimeout(() => {
      isAnimating = false;
    }, 450);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const total = currentCatalog.length;
      if (isAnimating || total <= 1) return;
      isAnimating = true;

      currentIndex--;

      if (currentIndex < 0) {
        updateTrackPosition(true);
        setTimeout(() => {
          currentIndex = total - 1;
          updateTrackPosition(false);
          isAnimating = false;
        }, 450);
      } else {
        updateTrackPosition(true);
        setTimeout(() => {
          isAnimating = false;
        }, 450);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const total = currentCatalog.length;
      if (isAnimating || total <= 1) return;
      isAnimating = true;

      currentIndex++;

      if (currentIndex >= total) {
        updateTrackPosition(true);
        setTimeout(() => {
          currentIndex = 0;
          updateTrackPosition(false);
          isAnimating = false;
        }, 450);
      } else {
        updateTrackPosition(true);
        setTimeout(() => {
          isAnimating = false;
        }, 450);
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0 && nextBtn) nextBtn.click();
      if (diff < 0 && prevBtn) prevBtn.click();
    }
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateTrackPosition(false);
    }, 120);
  });

  const selectedCategories = new Set();
  const allChip = filtersContainer ? filtersContainer.querySelector('.filter-chip--all') : null;
  const categoryChips = filtersContainer ? filtersContainer.querySelectorAll('.filter-chip:not(.filter-chip--all)') : [];

  function updateFilterUI() {
    if (!filtersContainer) return;

    if (selectedCategories.size === 0) {
      if (allChip) {
        allChip.classList.add('active');
        allChip.setAttribute('aria-pressed', 'true');
      }
      categoryChips.forEach(chip => {
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      });
      currentCatalog = [...ORIGINAL_CATALOG];
    } else {
      if (allChip) {
        allChip.classList.remove('active');
        allChip.setAttribute('aria-pressed', 'false');
      }
      categoryChips.forEach(chip => {
        const cat = chip.getAttribute('data-category');
        const isActive = selectedCategories.has(cat);
        chip.classList.toggle('active', isActive);
        chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      currentCatalog = ORIGINAL_CATALOG.filter(k => selectedCategories.has(k.category));
    }

    currentIndex = 0;
    buildTrack();
  renderGridView();
  }

  if (allChip) {
    allChip.addEventListener('click', () => {
      selectedCategories.clear();
      updateFilterUI();
    });
  }

  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.getAttribute('data-category');
      if (selectedCategories.has(cat)) {
        selectedCategories.delete(cat);
      } else {
        selectedCategories.add(cat);
      }

      if (selectedCategories.size === categoryChips.length) {
        selectedCategories.clear();
      }

      updateFilterUI();
    });
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      selectedCategories.clear();
      updateFilterUI();
    });
  }

  buildTrack();

  const btnViewCarousel = document.getElementById('btnViewCarousel');
  const btnViewGrid = document.getElementById('btnViewGrid');
  const catalogGrid = document.getElementById('catalogGrid');
  const carouselContainerEl = document.querySelector('.carousel-container');
  const carouselIndicatorBarEl = document.querySelector('.carousel-indicator-bar');
  let currentViewMode = 'carousel';

  function renderGridView() {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';
    if (currentCatalog.length === 0) {
      catalogGrid.innerHTML = '<div style="padding: 3rem 1rem; text-align: center; color: var(--color-gray-500); grid-column: 1 / -1; font-weight: 600;">По выбранным категориям ключи не найдены</div>';
      return;
    }
    currentCatalog.forEach((key, idx) => {
      const card = createCardElement(key, idx);
      card.classList.remove('is-blurred');
      card.classList.add('is-active');
      card.style.flex = '';
      card.style.width = '';
      card.style.minWidth = '';
      card.style.maxWidth = '';
      catalogGrid.appendChild(card);
    });
  }

  function setViewMode(mode) {
    currentViewMode = mode;
    if (mode === 'grid') {
      if (btnViewGrid) {
        btnViewGrid.classList.add('is-active');
        btnViewGrid.setAttribute('aria-selected', 'true');
      }
      if (btnViewCarousel) {
        btnViewCarousel.classList.remove('is-active');
        btnViewCarousel.setAttribute('aria-selected', 'false');
      }
      if (carouselContainerEl) carouselContainerEl.style.display = 'none';
      if (carouselIndicatorBarEl) carouselIndicatorBarEl.style.display = 'none';
      if (catalogGrid) {
        catalogGrid.style.display = 'grid';
        renderGridView();
      }
    } else {
      if (btnViewCarousel) {
        btnViewCarousel.classList.add('is-active');
        btnViewCarousel.setAttribute('aria-selected', 'true');
      }
      if (btnViewGrid) {
        btnViewGrid.classList.remove('is-active');
        btnViewGrid.setAttribute('aria-selected', 'false');
      }
      if (catalogGrid) catalogGrid.style.display = 'none';
      if (carouselContainerEl) carouselContainerEl.style.display = 'flex';
      if (carouselIndicatorBarEl) carouselIndicatorBarEl.style.display = 'flex';
      updateCarousel();
    }
  }

  if (btnViewCarousel) btnViewCarousel.addEventListener('click', () => setViewMode('carousel'));
  if (btnViewGrid) btnViewGrid.addEventListener('click', () => setViewMode('grid'));

  const btnToggleFilters = document.getElementById('btnToggleFilters');
  const catalogFiltersEl = document.getElementById('catalogFilters');
  if (btnToggleFilters && catalogFiltersEl) {
    catalogFiltersEl.classList.add('is-collapsed');
    btnToggleFilters.addEventListener('click', () => {
      const isCollapsed = catalogFiltersEl.classList.contains('is-collapsed');
      if (isCollapsed) {
        catalogFiltersEl.classList.remove('is-collapsed');
        catalogFiltersEl.classList.add('is-expanded');
        btnToggleFilters.classList.add('is-expanded');
        btnToggleFilters.setAttribute('aria-expanded', 'true');
        btnToggleFilters.querySelector('.btn-toggle-filters__text').textContent = 'Свернуть';
      } else {
        catalogFiltersEl.classList.remove('is-expanded');
        catalogFiltersEl.classList.add('is-collapsed');
        btnToggleFilters.classList.remove('is-expanded');
        btnToggleFilters.setAttribute('aria-expanded', 'false');
        btnToggleFilters.querySelector('.btn-toggle-filters__text').textContent = 'Все категории';
      }
    });
  }

});
