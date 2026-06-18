document.addEventListener('DOMContentLoaded', () => {
  const bookEl = document.getElementById('book');
  const wrapEl = document.querySelector('.book-wrap');
  const currentEl = document.getElementById('pageCurrent');
  const totalEl = document.getElementById('pageTotal');
  const prevBtn = document.querySelector('.nav--prev');
  const nextBtn = document.querySelector('.nav--next');

  const total = PAGES.length;
  totalEl.textContent = String(total).padStart(2, '0');

  // width / height ratio of a single A5 page
  const PAGE_RATIO = 420 / 595;

  let pageFlip = null;

  function buildPageNodes() {
    bookEl.innerHTML = '';
    PAGES.forEach((entry, i) => {
      const isLast = i === total - 1;

      if (typeof entry === 'object' && entry.type === 'cover-composite') {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page vellum-cover';
        pageDiv.setAttribute('data-density', 'hard');

        const bg = document.createElement('img');
        bg.className = 'page-image cover-bg';
        bg.src = `assets/pages/${entry.bg}`;
        bg.alt = 'Page 1';
        bg.draggable = false;

        const haze = document.createElement('div');
        haze.className = 'cover-haze';

        const overlay = document.createElement('img');
        overlay.className = 'page-image cover-overlay';
        overlay.src = `assets/pages/${entry.overlay}`;
        overlay.alt = '';
        overlay.draggable = false;

        pageDiv.appendChild(bg);
        pageDiv.appendChild(haze);
        pageDiv.appendChild(overlay);
        bookEl.appendChild(pageDiv);
        return;
      }

      const pageDiv = document.createElement('div');
      pageDiv.className = 'page' + (isLast ? ' vellum' : '');
      pageDiv.setAttribute('data-density', isLast ? 'hard' : 'soft');

      const img = document.createElement('img');
      img.className = 'page-image';
      img.src = `assets/pages/${entry}`;
      img.loading = 'lazy';
      img.alt = `Page ${i + 1}`;
      img.draggable = false;

      pageDiv.appendChild(img);

      if (typeof LINKS !== 'undefined') {
        LINKS.filter((l) => l.page === i + 1 && l.url).forEach((l) => {
          const a = document.createElement('a');
          a.className = 'hotspot';
          a.href = l.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.style.left = l.x + '%';
          a.style.top = l.y + '%';
          a.style.width = l.w + '%';
          a.style.height = l.h + '%';
          a.setAttribute('aria-label', 'Open related link');
          pageDiv.appendChild(a);
        });
      }

      bookEl.appendChild(pageDiv);
    });
  }

  // Figure out the single-page width/height that fills the available
  // box as much as possible. We deliberately do NOT pre-shrink for a
  // two-page spread here — StPageFlip (usePortrait: true) decides for
  // itself whether there's room for a spread or whether to fall back
  // to a single centered page, based on the container width it sees.
  function fitPageSize() {
    const availW = wrapEl.clientWidth;
    const availH = wrapEl.clientHeight;

    let pageH = availH;
    let pageW = pageH * PAGE_RATIO;

    if (pageW > availW) {
      pageW = availW;
      pageH = pageW / PAGE_RATIO;
    }

    // small safety margin to avoid 1px rounding overflow / scrollbars
    pageW *= 0.97;
    pageH *= 0.97;

    return { pageW: Math.floor(pageW), pageH: Math.floor(pageH) };
  }

  function refreshCounter() {
    const current = pageFlip.getCurrentPageIndex();
    currentEl.textContent = String(current + 1).padStart(2, '0');
    prevBtn.disabled = current <= 0;
    nextBtn.disabled = current >= total - 1;
  }

  function initBook(restorePage) {
    if (pageFlip) {
      try { pageFlip.destroy(); } catch (e) { /* noop */ }
      pageFlip = null;
    }
    buildPageNodes();

    const { pageW, pageH } = fitPageSize();

    pageFlip = new St.PageFlip(bookEl, {
      width: pageW,
      height: pageH,
      size: 'fixed',
      showCover: true,
      maxShadowOpacity: 0.4,
      mobileScrollSupport: true,
      usePortrait: true,
      flippingTime: 700,
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    if (restorePage) {
      pageFlip.turnToPage(restorePage);
    }

    pageFlip.on('flip', refreshCounter);
    refreshCounter();
  }

  initBook(0);

  prevBtn.addEventListener('click', () => pageFlip.flipPrev());
  nextBtn.addEventListener('click', () => pageFlip.flipNext());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') pageFlip.flipNext();
    if (e.key === 'ArrowLeft') pageFlip.flipPrev();
  });

  // Recompute fit on resize/orientation change, preserving position.
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const restorePage = pageFlip.getCurrentPageIndex();
      initBook(restorePage);
    }, 150);
  });
});
