/**
 * script.js – Gushwork Creative Agency
 * =====================================================
 * Handles:
 *  1. Sticky header  – show/hide on scroll with direction detection
 *  2. Mobile nav     – hamburger toggle
 *  3. Image carousel – prev/next, dot indicators, keyboard nav, touch/drag
 *  4. Scroll-reveal  – IntersectionObserver for fade-in animations
 *  5. Counter animation – animated number count-up in Stats section
 * =====================================================
 */

/* ── Wait for DOM to be fully parsed ── */
document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================
     1. STICKY HEADER
     Shows when scrollY > heroHeight, hides on scroll up.
  ========================================================== */
  const stickyHeader = document.getElementById("stickyHeader");
  const hero = document.getElementById("hero");

  let lastScrollY = window.scrollY;
  let ticking = false; // requestAnimationFrame guard

  function updateHeader() {
    const heroBottom = hero
      ? hero.getBoundingClientRect().bottom + window.scrollY
      : 0;
    const scrollY = window.scrollY;
    const scrollDown = scrollY > lastScrollY;

    if (scrollY > heroBottom) {
      // Past the hero fold
      if (scrollDown) {
        // Scrolling DOWN past hero → show header
        stickyHeader.classList.add("is-visible");
        stickyHeader.removeAttribute("aria-hidden");
      } else {
        // Scrolling UP near the top of page → hide header
        if (scrollY < 80) {
          stickyHeader.classList.remove("is-visible");
          stickyHeader.setAttribute("aria-hidden", "true");
        }
        // Keep visible when scrolling up but still below hero
      }
    } else {
      // Still within hero → always hide sticky header
      stickyHeader.classList.remove("is-visible");
      stickyHeader.setAttribute("aria-hidden", "true");
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true },
  );

  /* ==========================================================
     2. MOBILE NAV – hamburger toggle
  ========================================================== */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      hamburgerBtn.classList.toggle("is-open", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        hamburgerBtn.classList.remove("is-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ==========================================================
     3. IMAGE CAROUSEL
     - Translates the track by card width + gap on each step
     - Updates dot indicators
     - Supports keyboard (← →), mouse drag, and touch swipe
  ========================================================== */
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsWrap = document.getElementById("carouselDots");

  if (track && prevBtn && nextBtn) {
    const cards = Array.from(track.querySelectorAll(".carousel__card"));
    const GAP = 24; // px – must match CSS gap
    let currentIndex = 0; // active slide index
    let slidesToShow = getSlidesToShow();

    /** How many slides are visible at once based on viewport */
    function getSlidesToShow() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    const totalSlides = cards.length;
    const maxIndex = () => totalSlides - slidesToShow;

    /* ── Build dot buttons ── */
    function buildDots() {
      dotsWrap.innerHTML = "";
      const count = maxIndex() + 1;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("button");
        dot.className =
          "carousel__dot" + (i === currentIndex ? " is-active" : "");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.setAttribute("aria-selected", String(i === currentIndex));
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    /** Move carousel to a given index */
    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex()));

      // Calculate offset: each card width + gap
      const cardWidth = cards[0].getBoundingClientRect().width;
      const offset = currentIndex * (cardWidth + GAP);

      track.style.transform = `translateX(-${offset}px)`;

      // Update dots
      dotsWrap.querySelectorAll(".carousel__dot").forEach((dot, i) => {
        const active = i === currentIndex;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });

      // Enable/disable buttons
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex();
    }

    /* ── Button listeners ── */
    prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
    nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

    /* ── Keyboard navigation (← →) when carousel is focused ── */
    document.getElementById("carousel").addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentIndex - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(currentIndex + 1);
      }
    });

    /* ── Touch / mouse drag support ── */
    let dragStartX = 0;
    let isDragging = false;
    const DRAG_THRESHOLD = 50; // px minimum for a swipe to register

    function onDragStart(clientX) {
      dragStartX = clientX;
      isDragging = true;
    }

    function onDragEnd(clientX) {
      if (!isDragging) return;
      isDragging = false;
      const delta = dragStartX - clientX;
      if (delta > DRAG_THRESHOLD) goTo(currentIndex + 1);
      if (delta < -DRAG_THRESHOLD) goTo(currentIndex - 1);
    }

    // Touch events
    track.addEventListener(
      "touchstart",
      (e) => onDragStart(e.touches[0].clientX),
      { passive: true },
    );
    track.addEventListener(
      "touchend",
      (e) => onDragEnd(e.changedTouches[0].clientX),
      { passive: true },
    );

    // Mouse drag events
    track.addEventListener("mousedown", (e) => {
      onDragStart(e.clientX);
      track.style.cursor = "grabbing";
    });
    track.addEventListener("mouseup", (e) => {
      onDragEnd(e.clientX);
      track.style.cursor = "";
    });
    track.addEventListener("mouseleave", () => {
      isDragging = false;
      track.style.cursor = "";
    });

    /* ── Recalculate on resize (handles slidesToShow changes) ── */
    window.addEventListener("resize", () => {
      slidesToShow = getSlidesToShow();
      // Clamp index in case we're now showing more slides
      if (currentIndex > maxIndex()) currentIndex = maxIndex();
      buildDots();
      goTo(currentIndex);
    });

    /* ── Initialise ── */
    buildDots();
    goTo(0);
  }

  /* ==========================================================
     4. SCROLL-REVEAL
     Adds .reveal to key elements, IntersectionObserver triggers
     .is-visible when they enter the viewport.
  ========================================================== */
  const revealTargets = document.querySelectorAll(
    ".service-card, .section-heading, .section-label, .about__text, .about__img-block, .stat, .contact__heading",
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12 },
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ==========================================================
     5. COUNTER ANIMATION
     Counts up stat numbers when the stats section scrolls in.
  ========================================================== */
  const statNums = document.querySelectorAll(".stat__num[data-target]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400; // ms
        const startTime = performance.now();

        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out-quad
          const eased = 1 - (1 - progress) * (1 - progress);
          el.textContent = Math.round(eased * target);

          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  statNums.forEach((el) => counterObserver.observe(el));

  /* ==========================================================
     SMOOTH CLOSE: close mobile nav when user clicks outside
  ========================================================== */
  document.addEventListener("click", (e) => {
    const mobileNav = document.getElementById("mobileNav");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    if (
      mobileNav &&
      mobileNav.classList.contains("is-open") &&
      !mobileNav.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      mobileNav.classList.remove("is-open");
      hamburgerBtn.classList.remove("is-open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  });
}); // end DOMContentLoaded
