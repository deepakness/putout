// Sidebar navigation with focus management
(function () {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('overlay');
  var menuToggle = document.getElementById('menu-toggle');
  var mobileTocToggle = document.getElementById('mobile-toc-toggle');

  if (!sidebar) return;

  var focusableSelector = 'a[href], button, [tabindex]:not([tabindex="-1"])';

  function getFocusableElements() {
    return Array.prototype.slice.call(sidebar.querySelectorAll(focusableSelector));
  }

  function openMenu() {
    sidebar.classList.remove('-translate-x-full');
    if (overlay) {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100', 'pointer-events-auto');
    }
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');

    // Focus the first link inside the sidebar
    var focusable = getFocusableElements();
    if (focusable.length) {
      focusable[0].focus();
    }
  }

  function closeMenu() {
    sidebar.classList.add('-translate-x-full');
    if (overlay) {
      overlay.classList.remove('opacity-100', 'pointer-events-auto');
      overlay.classList.add('opacity-0', 'pointer-events-none');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  }

  function isDesktop() {
    return window.matchMedia('(min-width: 768px)').matches;
  }

  function isSidebarOpen() {
    // On desktop (md+), sidebar is always visible — not "open" for toggle purposes
    if (isDesktop()) return false;
    return !sidebar.classList.contains('-translate-x-full');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!isSidebarOpen()) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  }

  if (mobileTocToggle) {
    mobileTocToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      openMenu();
    });
  }

  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('click', function (e) {
    if (isSidebarOpen() && !sidebar.contains(e.target) && (!menuToggle || !menuToggle.contains(e.target))) {
      closeMenu();
    }
  });

  // Focus trap and Escape handling
  document.addEventListener('keydown', function (e) {
    if (!isSidebarOpen()) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    // Focus trap: keep Tab cycling within the sidebar
    if (e.key === 'Tab') {
      var focusable = getFocusableElements();
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!isDesktop()) closeMenu();
    });
  });

  // Desktop sidebar collapse/expand toggle
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var contentWrapper = document.getElementById('content-wrapper');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isCollapsed = sidebar.classList.contains('sidebar-collapsed');
      if (isCollapsed) {
        sidebar.classList.remove('sidebar-collapsed');
        if (contentWrapper) {
          contentWrapper.classList.remove('md:ml-14');
          contentWrapper.classList.add('md:ml-64');
        }
        sidebarToggle.setAttribute('aria-label', 'Collapse sidebar');
      } else {
        sidebar.classList.add('sidebar-collapsed');
        if (contentWrapper) {
          contentWrapper.classList.remove('md:ml-64');
          contentWrapper.classList.add('md:ml-14');
        }
        sidebarToggle.setAttribute('aria-label', 'Expand sidebar');
      }
    });
  }
})();

// Reading progress bar (scoped to <main> content) with rAF throttle
(function () {
  var progressBar = document.getElementById('progress-bar');
  var mainEl = document.getElementById('main-content');
  if (!progressBar || !mainEl) return;

  var ticking = false;

  function updateProgress() {
    var rect = mainEl.getBoundingClientRect();
    var mainTop = window.scrollY + rect.top;
    var mainHeight = rect.height;
    var scrolled = window.scrollY - mainTop;
    var visible = mainHeight - window.innerHeight;
    var progress;
    if (visible <= 0) {
      progress = 100;
    } else {
      progress = Math.max(0, Math.min((scrolled / visible) * 100, 100));
    }
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
})();

// Prefetch next chapter at 50% scroll with rAF throttle
(function () {
  var mainEl = document.getElementById('main-content');
  if (!mainEl) return;

  var nextLinks = document.querySelectorAll('[data-next-chapter]');
  if (!nextLinks.length) return;
  var nextUrl = nextLinks[0].getAttribute('href');
  if (!nextUrl) return;

  var prefetched = false;
  var ticking = false;

  function checkPrefetch() {
    if (prefetched) return;
    var rect = mainEl.getBoundingClientRect();
    var mainTop = window.scrollY + rect.top;
    var mainHeight = rect.height;
    var scrolled = window.scrollY - mainTop;
    var visible = mainHeight - window.innerHeight;
    if (visible <= 0) return;
    var progress = scrolled / visible;
    if (progress >= 0.5) {
      prefetched = true;
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = nextUrl;
      document.head.appendChild(link);
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking && !prefetched) {
      requestAnimationFrame(function () {
        checkPrefetch();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// Keyboard arrow navigation between chapters
(function () {
  var prevLink = document.querySelector('nav[aria-label="Chapter navigation"] a:first-child');
  var nextLink = document.querySelector('[data-next-chapter]');

  if (!prevLink && !nextLink) return;

  document.addEventListener('keydown', function (e) {
    // Don't trigger when typing in inputs or textareas
    var tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement.isContentEditable) return;

    if (e.key === 'ArrowLeft' && prevLink) {
      window.location.href = prevLink.getAttribute('href');
    } else if (e.key === 'ArrowRight' && nextLink) {
      window.location.href = nextLink.getAttribute('href');
    }
  });
})();

// Swipe gesture navigation on mobile
(function () {
  var prevLink = document.querySelector('nav[aria-label="Chapter navigation"] a:first-child');
  var nextLink = document.querySelector('[data-next-chapter]');

  if (!prevLink && !nextLink) return;

  var touchStartX = 0;
  var touchStartY = 0;
  var minSwipeDistance = 50;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].screenX - touchStartX;
    var dy = e.changedTouches[0].screenY - touchStartY;

    // Only trigger if horizontal movement is greater than vertical (not a scroll)
    if (Math.abs(dx) < minSwipeDistance || Math.abs(dx) < Math.abs(dy)) return;

    // Check that the sidebar is not open
    var sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.classList.contains('-translate-x-full')) return;

    if (dx > 0 && prevLink) {
      // Swipe right → previous chapter
      window.location.href = prevLink.getAttribute('href');
    } else if (dx < 0 && nextLink) {
      // Swipe left → next chapter
      window.location.href = nextLink.getAttribute('href');
    }
  }, { passive: true });
})();

// Dark mode toggle
(function () {
  var toggle = document.getElementById('dark-mode-toggle');
  var iconLight = document.getElementById('dm-icon-light');
  var iconDark = document.getElementById('dm-icon-dark');
  var iconAuto = document.getElementById('dm-icon-auto');
  var label = document.getElementById('dm-label');

  if (!toggle) return;

  var modes = ['light', 'dark', 'auto'];

  function getPreference() {
    return localStorage.getItem('darkMode') || 'auto';
  }

  function applyMode(mode) {
    var dark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function updateUI(mode) {
    iconLight.classList.add('hidden');
    iconDark.classList.add('hidden');
    iconAuto.classList.add('hidden');

    if (mode === 'light') {
      iconLight.classList.remove('hidden');
      label.textContent = 'Light';
    } else if (mode === 'dark') {
      iconDark.classList.remove('hidden');
      label.textContent = 'Dark';
    } else {
      iconAuto.classList.remove('hidden');
      label.textContent = 'Auto';
    }
  }

  // Initialize
  var current = getPreference();
  updateUI(current);

  // Toggle click cycles: light → dark → auto
  toggle.addEventListener('click', function () {
    current = modes[(modes.indexOf(current) + 1) % modes.length];
    localStorage.setItem('darkMode', current);
    // Add transition class briefly for smooth color change
    document.documentElement.classList.add('dark-transition');
    applyMode(current);
    updateUI(current);
    setTimeout(function () {
      document.documentElement.classList.remove('dark-transition');
    }, 300);
  });

  // Listen for system preference changes when in auto mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (getPreference() === 'auto') {
      applyMode('auto');
    }
  });
})();

// Scroll-to-top button
(function () {
  var btn = document.getElementById('scroll-to-top');
  var mainEl = document.getElementById('main-content');
  if (!btn || !mainEl) return;

  var visible = false;
  var ticking = false;

  function checkVisibility() {
    var rect = mainEl.getBoundingClientRect();
    var mainTop = window.scrollY + rect.top;
    var mainHeight = rect.height;
    var scrolled = window.scrollY - mainTop;
    var visible2 = mainHeight - window.innerHeight;
    if (visible2 <= 0) return;

    var progress = scrolled / visible2;
    var shouldShow = progress >= 0.3;

    if (shouldShow && !visible) {
      visible = true;
      btn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      btn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else if (!shouldShow && visible) {
      visible = false;
      btn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      btn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        checkVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
