/* ============================================================
   LUNARA: Shared JS
   Handles: navbar mobile drawer, cookie banner, privacy/terms modals
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar mobile drawer ── */
  function initNavbar() {
    const btn = document.querySelector('.nav-mobile-btn');
    const drawer = document.querySelector('.mobile-drawer');
    if (!btn || !drawer) return;
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('open');
        drawer.classList.remove('open');
      });
    });
  }

  /* ── Cookie banner ── */
  function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    if (localStorage.getItem('lunara_cookie_choice')) {
      banner.classList.add('hidden');
      return;
    }
    const accept = document.getElementById('cookieAccept');
    const decline = document.getElementById('cookieDecline');
    function dismiss(choice) {
      localStorage.setItem('lunara_cookie_choice', choice);
      banner.classList.add('hidden');
    }
    if (accept)  accept.addEventListener('click', () => dismiss('accepted'));
    if (decline) decline.addEventListener('click', () => dismiss('declined'));
  }

  /* ── Modals ── */
  function initModals() {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        const id = trigger.dataset.modal;
        const backdrop = document.getElementById(id);
        if (backdrop) backdrop.classList.add('open');
      });
    });
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });
    });
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-backdrop').classList.remove('open');
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCookieBanner();
    initModals();
  });
})();
