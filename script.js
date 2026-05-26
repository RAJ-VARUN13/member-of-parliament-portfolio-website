/* Shared Interactive Controller for Dr. Pradip Varma Portfolio */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Render the unified premium header
  renderHeader();
  
  normalizeHomepageOrder();

  // 1. Initial render of all dynamic elements (if their containers exist on the current page)
  renderAllDynamicContent();

  // 2. Setup Navbar links and mobile collapses
  setupNavigation();

  // 3. Initialize common actions (like Leaflet maps and Wikipedia)
  initGlobalEvents();

  // 4. Hide the page loader (fallback if window load triggers slow or bypasses)
  hidePageLoader();
});

function renderHeader() {
  const headerEl = document.getElementById('global-header');
  if (!headerEl) return;
  
  // Determine active nav item based on current page filename
  const pathname = window.location.pathname;
  const page = pathname.split('/').pop() || 'index.html';
  
  const isHome = page === 'index.html' || page === '';
  const isBiography = page === 'biography.html';
  const isVision = page === 'vision.html';
  const isAchievements = page === 'achievements.html';
  const isParliament = page === 'parliament.html';
  const isGallery = page === 'gallery.html';
  const isEvents = page === 'events.html';
  const isContact = page === 'contact.html';
  
  headerEl.innerHTML = `
    <!-- Tricolor Stripe -->
    <div class="tricolor-stripe">
      <div class="saffron" style="background-color: #FF9933; flex: 1;"></div>
      <div class="white" style="background-color: #FFFFFF; flex: 1;"></div>
      <div class="green" style="background-color: #138808; flex: 1;"></div>
    </div>

    <!-- Navigation Header -->
    <div class="nav-header-container">
      <div class="brand-logo-area">
        <div class="navbar-profile-badge">
          <img src="assets/images/DrPKV.png" alt="Dr. Pradip Kumar Varma Profile" class="navbar-profile-badge-img">
        </div>
        <div class="brand-text-block">
          <div class="brand-name"><a href="index.html">DR. PRADIP VARMA</a></div>
          <div class="brand-title-sub">MP (Rajya Sabha) &bull; BJP Jharkhand</div>
        </div>
      </div>

      <!-- Center: Navigation menu -->
      <nav id="navbar" class="header-nav-menu">
        <ul>
          <li><a href="index.html" id="nav-home" class="${isHome ? 'active' : ''}">Home</a></li>
          <li><a href="biography.html" id="nav-biography" class="${isBiography ? 'active' : ''}">About</a></li>
          <li><a href="vision.html" id="nav-vision" class="${isVision ? 'active' : ''}">Vision</a></li>
          <li><a href="achievements.html" id="nav-achievements" class="${isAchievements ? 'active' : ''}">Public Work</a></li>
          <li><a href="parliament.html" id="nav-parliament" class="${isParliament ? 'active' : ''}">Rajya Sabha</a></li>
          <li><a href="gallery.html" id="nav-gallery" class="${isGallery ? 'active' : ''}">Media</a></li>
          <li><a href="events.html" id="nav-events" class="${isEvents ? 'active' : ''}">Events</a></li>
          <li><a href="contact.html" id="nav-contact" class="${isContact ? 'active' : ''}">Contact</a></li>
        </ul>
      </nav>

      <!-- Right side: CTA Button and Google Translate -->
      <div class="header-right-cta">
        <a href="contact.html#contact-form" class="btn btn-primary header-cta-btn">Join the Movement</a>
        <div id="google_translate_element" class="header-translate-widget"></div>
      </div>

      <!-- Mobile hamburger toggle -->
      <button class="mobile-toggle" aria-label="Toggle Menu">
        <i class="fa fa-bars"></i>
      </button>
    </div>
    <div class="nav-backdrop"></div>
  `;
}

function normalizeHomepageOrder() {
  const main = document.querySelector('main');
  const about = document.querySelector('.about-section-home');
  const vision = document.querySelector('.vision-section');
  const journey = document.querySelector('.journey-section-home');
  if (!main || !about || !vision || !journey) return;

  // Revision order: About -> Vision, then extended journey/education content.
  if (about.nextElementSibling !== vision) {
    main.insertBefore(vision, journey);
  }
}

/* Robust Page Loader Hiding Logic */
function hidePageLoader() {
  const loader = document.getElementById('page-loader');
  if (loader && !loader.classList.contains('fade-out')) {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
}

// Trigger loader hide on complete window resources load
window.addEventListener('load', hidePageLoader);

/* Dynamic Content Rendering for all pages */
function renderAllDynamicContent() {
  const data = WEBSITE_DATA;
  if (!data) return;

  // 1. Home - Stats
  const heroStatsContainer = document.getElementById('hero-stats-container');
  if (heroStatsContainer && data.profile.stats) {
    heroStatsContainer.innerHTML = data.profile.stats.map(stat => `
      <div class="stat-item">
        <div class="stat-num">${stat.num}</div>
        <div class="stat-lbl">${stat.label}</div>
      </div>
    `).join('');
  }

  // 2. Home - Photo Marquee
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack && data.gallery) {
    // Duplicate the gallery array to ensure a seamless infinite loop animation
    const marqueeImages = [...data.gallery, ...data.gallery];
    marqueeTrack.innerHTML = marqueeImages.map(item => `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
    `).join('');
  }

  // 3. Profile Page - Biography details
  const profileCardContainer = document.getElementById('profile-card-container');
  if (profileCardContainer && data.profile) {
    const detailsHtml = data.profile.details.map(detail => `
      <div class="detail-row">
        <i class="fa-solid fa-circle-check"></i>
        <span class="label">${detail.label}:</span>
        <span>${detail.value}</span>
      </div>
    `).join('');

    profileCardContainer.innerHTML = `
      <img src="${data.profile.cardPhoto}" alt="Dr. Pradip Varma Portrait">
      <h3>${data.profile.name}</h3>
      <p class="designation">
        ${data.profile.title}<br>
        ${data.profile.subtitle}
      </p>
      <div class="about-intro-details">
        ${detailsHtml}
      </div>
    `;
  }

  // 4. Profile Page - Accordions
  const accordionContainer = document.getElementById('about-accordion-container');
  if (accordionContainer && data.accordions) {
    accordionContainer.innerHTML = data.accordions.map((acc, index) => {
      const itemsHtml = acc.items.map(item => `
        <li>${item}</li>
      `).join('');

      return `
        <div class="accordion-item">
          <button class="accordion-header" id="acc-header-${acc.id}">
            <span><i class="fa-solid ${acc.iconClass} icon-left"></i> ${acc.title}</span>
            <i class="fa fa-chevron-down chevron"></i>
          </button>
          <div class="accordion-content">
            <div class="accordion-body">
              <ul>
                ${itemsHtml}
              </ul>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Accordion interaction
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isAlreadyActive = item.classList.contains('active');

        document.querySelectorAll('.accordion-item').forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isAlreadyActive && content) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // 5. Profile Page - Timeline Journey
  const timelineContainer = document.getElementById('timeline-view-container');
  if (timelineContainer && data.timeline) {
    timelineContainer.innerHTML = data.timeline.map((item, index) => {
      return `
        <div class="timeline-item timeline-right">
          <div class="timeline-card">
            ${item.image ? `<div class="timeline-card-image"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>` : ''}
            <div class="timeline-card-info">
              <div class="timeline-year">${item.year}</div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 6. Achievements Page - Focus Grid
  const achievementsGrid = document.getElementById('achievements-grid');
  if (achievementsGrid && data.achievements) {
    achievementsGrid.innerHTML = data.achievements.map(item => `
      <div class="achievement-card">
        <div class="achievement-icon">
          <i class="fa-solid ${item.iconClass}"></i>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
  }

  // 7. Rajya Sabha Speeches Video Playlist
  const playlistContainer = document.getElementById('video-playlist-container');
  if (playlistContainer && data.videos) {
    const videoCountBadge = document.getElementById('video-count-badge');
    if (videoCountBadge) videoCountBadge.textContent = `${data.videos.length} Videos`;

    playlistContainer.innerHTML = data.videos.map((vid, index) => {
      const activeClass = index === 0 ? 'active' : '';
      return `
        <div class="playlist-item ${activeClass}" 
             data-video-src="${vid.url}" 
             data-video-title="${vid.title}" 
             data-video-date="${vid.tag} - ${vid.date}"
             data-index="${index}">
          <div class="playlist-thumb">
            <img src="${vid.thumbnail}" alt="Thumbnail for ${vid.tag}" loading="lazy">
            <i class="fa fa-play-circle"></i>
          </div>
          <div class="playlist-details">
            <h4>${vid.title}</h4>
            <span>${vid.date} - ${vid.tag}</span>
          </div>
        </div>
      `;
    }).join('');

    // Pre-select first video
    const mainVideoTitle = document.getElementById('main-video-title');
    const mainVideoDate = document.getElementById('main-video-date');
    const videoPlayer = document.getElementById('rs-video-player');

    if (data.videos.length > 0) {
      if (mainVideoTitle) mainVideoTitle.textContent = data.videos[0].title;
      if (mainVideoDate) mainVideoDate.textContent = `${data.videos[0].tag} - ${data.videos[0].date}`;
      if (videoPlayer) {
        videoPlayer.src = data.videos[0].url;
        videoPlayer.poster = data.videos[0].thumbnail;
      }
    }

    // Bind playlist clicks
    playlistContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.playlist-item');
      if (!item) return;

      const videoSrc = item.getAttribute('data-video-src');
      const videoTitle = item.getAttribute('data-video-title');
      const videoDate = item.getAttribute('data-video-date');

      playlistContainer.querySelectorAll('.playlist-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (videoPlayer) {
        videoPlayer.src = videoSrc;
        videoPlayer.load();
        videoPlayer.play().catch(err => console.log('Autoplay block bypassed.'));
      }

      if (mainVideoTitle) mainVideoTitle.textContent = videoTitle;
      if (mainVideoDate) mainVideoDate.textContent = videoDate;
    });
  }

  // 8. Gallery Collage Grid
  const collageGrid = document.getElementById('collage-grid');
  if (collageGrid && data.gallery && data.mediaCoverage) {
    const combinedCollageList = [
      ...data.gallery.map(item => ({ ...item, isMedia: false, typeLabel: 'Photo' })),
      ...data.mediaCoverage.map(item => ({ ...item, isMedia: true, typeLabel: 'Press Clipping', category: 'media' }))
    ];

    collageGrid.innerHTML = combinedCollageList.map(item => `
      <div class="gallery-item" data-category="${item.category}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <i class="fa fa-expand"></i>
          <h4>${item.title}</h4>
          <span class="collage-tag">${item.typeLabel}</span>
        </div>
      </div>
    `).join('');

    setupLightboxForGrid(collageGrid);
  }
}

/* Lightbox & dynamic filtering collage logic */
function setupLightboxForGrid(grid) {
  if (!grid) return;

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let visibleItems = [];
  let currentImageIndex = 0;

  // Filter Buttons binding
  const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      const items = grid.querySelectorAll('.gallery-item');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterVal === 'all') {
          item.style.display = 'block';
        } else if (filterVal === 'photo') {
          item.style.display = (cat !== 'media') ? 'block' : 'none';
        } else if (filterVal === 'media') {
          item.style.display = (cat === 'media') ? 'block' : 'none';
        } else if (filterVal === 'events') {
          item.style.display = (cat === 'events') ? 'block' : 'none';
        }
      });
    });
  });

  // Clicking an image opens the lightbox
  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    const allItems = Array.from(grid.querySelectorAll('.gallery-item'));
    visibleItems = allItems.filter(i => i.style.display !== 'none');
    currentImageIndex = visibleItems.indexOf(item);

    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h4').textContent;

    if (lightboxModal && lightboxImg && lightboxCaption) {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = title;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  const showSlide = (step) => {
    if (visibleItems.length === 0) return;
    currentImageIndex = (currentImageIndex + step + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentImageIndex];
    if (item) {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-overlay h4').textContent;
      if (lightboxImg) lightboxImg.src = img.src;
      if (lightboxCaption) lightboxCaption.textContent = title;
    }
  };

  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showSlide(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showSlide(1));

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showSlide(-1);
      if (e.key === 'ArrowRight') showSlide(1);
    }
  });
}

/* Sticky Header and mobile navigation menu */
function setupNavigation() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  const backdrop = document.querySelector('.nav-backdrop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // Prevent background scrolling on mobile
      if (backdrop) {
        backdrop.classList.toggle('active');
      }
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.classList.remove('menu-open'); // Restore scrolling
        backdrop.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    }

    document.querySelectorAll('#navbar ul li a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.classList.remove('menu-open'); // Restore scrolling on link click
        if (backdrop) {
          backdrop.classList.remove('active');
        }
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
}

/* Leaflet maps triggers */
let contactMap = null;
let currentMarker = null;

function invalidateLeafletMap() {
  const mapElement = document.getElementById('map-element');
  if (!mapElement || typeof L === 'undefined') return;

  const coordinates = {
    ranchi: {
      latlng: [23.3644, 85.4526],
      text: "<b>Ranchi Residence & Office</b><br>313, Ranchi Puruliya Road, Birla Campus, Ara, Mahilong, Ranchi, Jharkhand - 835103"
    },
    delhi: {
      latlng: [28.6214, 77.2096],
      text: "<b>Delhi Parliament Office</b><br>402, Brahmputra Apartments, Dr. B. D. Marg, New Delhi - 110001"
    }
  };

  if (!contactMap) {
    contactMap = L.map('map-element', {
      scrollWheelZoom: false
    }).setView(coordinates.ranchi.latlng, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(contactMap);

    currentMarker = L.marker(coordinates.ranchi.latlng).addTo(contactMap)
      .bindPopup(coordinates.ranchi.text)
      .openPopup();
  }

  setTimeout(() => {
    contactMap.invalidateSize();
  }, 100);

  const mapTabBtns = document.querySelectorAll('.map-tab-btn');
  mapTabBtns.forEach(btn => {
    btn.onclick = () => {
      mapTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const locKey = btn.getAttribute('data-location');
      const target = coordinates[locKey];

      if (target && contactMap) {
        contactMap.panTo(target.latlng);
        if (currentMarker) contactMap.removeLayer(currentMarker);
        currentMarker = L.marker(target.latlng).addTo(contactMap)
          .bindPopup(target.text)
          .openPopup();
      }
    };
  });
}

function initGlobalEvents() {
  // Scroll to top binds
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Wikipedia Reader Modal Logic
  const wikiTriggers = document.querySelectorAll('.wiki-trigger');
  const wikiModal = document.getElementById('wiki-modal');
  const wikiCloseBtn = document.getElementById('wiki-close-btn');
  const wikiWrapper = document.querySelector('.wiki-iframe-wrapper');

  window.openWikiModal = (e) => {
    if (e) e.preventDefault();
    if (wikiModal && wikiWrapper) {
      wikiWrapper.innerHTML = WEBSITE_DATA.wikiHtml || '<p style="padding:20px;text-align:center;">Failed to load Wikipedia content.</p>';
      wikiModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeWikiModal = () => {
    if (wikiModal) {
      wikiModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  wikiTriggers.forEach(trigger => {
    trigger.addEventListener('click', window.openWikiModal);
  });

  if (wikiCloseBtn) {
    wikiCloseBtn.addEventListener('click', window.closeWikiModal);
  }

  if (wikiModal) {
    wikiModal.addEventListener('click', (e) => {
      if (e.target === wikiModal) window.closeWikiModal();
    });
  }

  // Auto initialize maps if map element is present on current page
  if (document.getElementById('map-element')) {
    invalidateLeafletMap();
  }

  // Initialize typing effect and growing vine
  initTypingEffect();
  initGrowthVine();

  // Unified form toggle
  const purposeSelect = document.getElementById('contact-purpose');
  const volunteerWrap = document.getElementById('volunteer-details-wrap');
  if (purposeSelect && volunteerWrap) {
    const toggleVolDetails = () => {
      if (purposeSelect.value === 'Volunteer Interest') {
        volunteerWrap.style.display = 'block';
      } else {
        volunteerWrap.style.display = 'none';
      }
    };
    purposeSelect.addEventListener('change', toggleVolDetails);
    toggleVolDetails();
  }
}

/* Typist dynamic typing animation */
function initTypingEffect() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const roles = [
    "Scholar & Ideological Worker",
    "Nation Builder & Educationist",
    "BJP Organizational General Secretary",
    "Member of Parliament (Rajya Sabha)"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  const type = () => {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingText.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  };

  type();
}

/* Scroll-based grow-path animation representing progress */
function initGrowthVine() {
  const growPath = document.getElementById('vine-grow-path');
  const section = document.querySelector('.growth-vine-section');
  if (!growPath || !section) return;

  const pathLength = growPath.getTotalLength();
  growPath.style.strokeDasharray = pathLength;
  growPath.style.strokeDashoffset = pathLength;

  const animateVine = () => {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const sectionHeight = rect.height;
    const startScroll = viewportHeight * 0.8;
    const topVisible = rect.top;

    let progress = 0;
    if (topVisible < startScroll) {
      progress = (startScroll - topVisible) / (sectionHeight + startScroll - viewportHeight * 0.3);
    }

    progress = Math.min(Math.max(progress, 0), 1);
    growPath.style.strokeDashoffset = pathLength * (1 - progress);

    const leaves = [
      { element: document.getElementById('leaf-1'), threshold: 0.15 },
      { element: document.getElementById('leaf-2'), threshold: 0.50 },
      { element: document.getElementById('leaf-3'), threshold: 0.85 }
    ];

    leaves.forEach(leaf => {
      if (leaf.element) {
        if (progress >= leaf.threshold) {
          leaf.element.classList.add('active');
        } else {
          leaf.element.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', animateVine);
  window.addEventListener('resize', () => {
    const pathLength = growPath.getTotalLength();
    growPath.style.strokeDasharray = pathLength;
    animateVine();
  });
  
  animateVine();
}

/* Interactive Popups for Growth details on Home */
window.openHomeDetail = (sectionKey) => {
  const modal = document.getElementById('home-detail-modal');
  const title = document.getElementById('detail-popup-title');
  const icon = document.getElementById('detail-popup-icon');
  const list = document.getElementById('detail-popup-list');

  const accData = WEBSITE_DATA.accordions.find(a => a.id === sectionKey);
  if (!accData || !modal || !title || !icon || !list) return;

  icon.className = `fa-solid ${accData.iconClass}`;
  title.textContent = accData.title;

  list.innerHTML = accData.items.map(item => `
    <li>${item}</li>
  `).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeHomeDetail = () => {
  const modal = document.getElementById('home-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

/* Unified Contact Form Submit Handler */
window.handleUnifiedContactSubmit = (e) => {
  e.preventDefault();
  const form = document.getElementById('unified-contact-form');
  const successMsg = document.getElementById('unified-success-msg');
  if (form && successMsg) {
    form.style.display = 'none';
    successMsg.style.display = 'block';
  }
};

/* Play Vision Video Handler */
window.playHomeVideo = (coverEl) => {
  const video = document.getElementById('home-message-video');
  if (coverEl && video) {
    coverEl.style.display = 'none';
    video.style.display = 'block';
    video.play();
  }
};

/* ========================================================================== */
/* Vanilla Scroll Animations & Interactions (IntersectionObserver)            */
/* ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSecurityHardening();
});

function initScrollAnimations() {
  const revealTargets = [
    '.cred-item',
    '.counter-card',
    '.news-card',
    '.testimonial-card',
    '.camp-card',
    '.social-post',
    '.support-card',
    '.groundwork-item',
    '.event-timeline-item',
    '.achievement-card',
    '.dashboard-stat-card',
    '.gallery-item',
    '.timeline-card'
  ].join(',');

  // Dynamically inject styles for high-performance CSS transitions
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .js-reveal {
      opacity: 0 !important;
      transform: translateY(26px) !important;
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;
      will-change: transform, opacity;
    }
    .js-reveal.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    /* Hero entrance classes */
    .hero-kicker, .hero-content h1, .hero-content p.subtitle, .hero-cta .btn, .hero-portrait-frame {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .hero-entrance-active {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .hero-portrait-frame {
      clip-path: inset(0 0 0 14%);
      transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .hero-portrait-frame.hero-entrance-active {
      clip-path: inset(0 0 0 0) !important;
    }
  `;
  document.head.appendChild(styleEl);

  // 1. Hero Entrance Animations
  if (document.querySelector('.hero-section')) {
    setTimeout(() => {
      const kicker = document.querySelector('.hero-kicker');
      const h1 = document.querySelector('.hero-content h1');
      const subtitle = document.querySelector('.hero-content p.subtitle');
      const btns = document.querySelectorAll('.hero-cta .btn');
      const frame = document.querySelector('.hero-portrait-frame');

      if (kicker) kicker.classList.add('hero-entrance-active');
      
      setTimeout(() => {
        if (h1) h1.classList.add('hero-entrance-active');
      }, 150);

      setTimeout(() => {
        if (subtitle) subtitle.classList.add('hero-entrance-active');
      }, 300);

      setTimeout(() => {
        btns.forEach((btn, idx) => {
          setTimeout(() => {
            btn.classList.add('hero-entrance-active');
          }, idx * 80);
        });
      }, 400);

      setTimeout(() => {
        if (frame) frame.classList.add('hero-entrance-active');
      }, 200);
    }, 100);
  }

  // 2. IntersectionObserver for Reveal Targets
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll(revealTargets).forEach(el => {
      el.classList.add('js-reveal');
      revealObserver.observe(el);
    });

    // 3. Staggered reveal for Vision Grid Cards
    const visionGrid = document.querySelector('.vision-grid');
    if (visionGrid) {
      const visionCards = visionGrid.querySelectorAll('.vision-card');
      visionCards.forEach(card => card.classList.add('js-reveal'));
      
      const visionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visionCards.forEach((card, idx) => {
              setTimeout(() => {
                card.classList.add('revealed');
              }, idx * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      visionObserver.observe(visionGrid);
    }

    // Staggered reveal for Social Initiatives Grid
    const socialGrid = document.querySelector('.social-init-grid');
    if (socialGrid) {
      const socialCards = socialGrid.querySelectorAll('.social-init-card');
      socialCards.forEach(card => card.classList.add('js-reveal'));

      const socialObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            socialCards.forEach((card, idx) => {
              setTimeout(() => {
                card.classList.add('revealed');
              }, idx * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      socialObserver.observe(socialGrid);
    }

    // 4. Counters count-up trigger
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.counter-number span[data-count]').forEach(el => {
      counterObserver.observe(el);
    });
  } else {
    // Fallback: instantly reveal all if browser is very old
    document.querySelectorAll(revealTargets).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // 5. Parallax for Video message cover overlay (throttled scroll performance)
  const videoBox = document.querySelector('.video-play-box');
  const videoImg = document.querySelector('.video-overlay-cover img');
  if (videoBox && videoImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = videoBox.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) {
            const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const scale = 1.06 - (scrolled * 0.06);
            videoImg.style.transform = `scale(${scale})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  if (isNaN(target)) return;
  const duration = 2000;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easeProgress = progress * (2 - progress); // easeOutQuad
    el.textContent = Math.floor(easeProgress * target).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

/* ========================================================================== */
/* Security Hardening, Anti-Inspection, and Clickjacking Protection           */
/* ========================================================================== */
function initSecurityHardening() {
  // 1. Clickjacking Protection (Frame-Busting)
  if (window.self !== window.top) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      window.location = "about:blank";
    }
  }

  // 2. Prevent Right-Click Context Menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, false);

  // 3. Block Keyboard shortcuts for Inspect Element, Developer Console, and View Source
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (Chrome/Edge/Firefox DevTools)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (DevTools Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Inspect Element selector)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }
  }, false);

  // 4. Anti-Debugger / Console Detection to deter advanced inspection
  setInterval(() => {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();
    if (endTime - startTime > 100) {
      console.warn("Security policy violation: debugger detected.");
    }
  }, 1000);
}


// Performance optimization: GSAP refactored to Vanilla JS IntersectionObserver.


// Security hardening: Client-side tampering protection enabled.


// Performance optimization: refactored scroll reveals to IntersectionObserver API.


// Security hardening: anti-tamper client protections initialized.

