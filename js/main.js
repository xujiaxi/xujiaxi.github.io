// Jiaxi Xu — personal homepage scripts
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  var yearSpan = document.getElementById('year');
  var navLinks = document.querySelectorAll('.nav-link');
  var revealEls = document.querySelectorAll('.reveal');

  // Current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Sticky header shadow on scroll
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNav();
  }

  // Mobile nav toggle
  navToggle.addEventListener('click', function () {
    var open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close mobile nav after clicking a link
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Highlight nav link for the section currently in view
  function highlightActiveNav() {
    var sections = document.querySelectorAll('main section[id], #top');
    var currentId = '';
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Reveal-on-scroll using IntersectionObserver
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
