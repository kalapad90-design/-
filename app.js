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

  const catalogGrid = document.getElementById('catalogGrid');
  const filtersContainer = document.getElementById('catalogFilters');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  function createCardElement(key, index) {
    const card = document.createElement('div');
    card.className = 'key-card is-active';
    card.setAttribute('data-id', key.id);
    card.setAttribute('data-category', key.category);
    card.setAttribute('data-index', index);

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

  function renderGridView() {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';
    const items = currentCatalog.length > 0 ? currentCatalog : ORIGINAL_CATALOG;
    if (items.length === 0) {
      catalogGrid.innerHTML = '<div style="padding: 3rem 1rem; text-align: center; color: var(--color-gray-500); grid-column: 1 / -1; font-weight: 600;">По выбранным категориям ключи не найдены</div>';
      return;
    }
    items.forEach((key, idx) => {
      const card = createCardElement(key, idx);
      catalogGrid.appendChild(card);
    });
  }

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

  updateFilterUI();
  renderGridView();
});