/* ═══════════════════════════════════════════════════════════
   SANGEETHUB PREMIUM — COMPLETE APPLICATION LOGIC
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════════════════════
// DATA STORE
// ═══════════════════════════════════════════════════════════
      
const SONGS = [
  { id: 1, title: 'The Last Letter', artist: 'Maan Panu', album: 'Emotions', genre: 'Hindi', mood: 'sad', src: 'Songs/song1.mp3', cover: 'Images/c1.png', duration: '3:42', plays: 1204, year: 2023 },
  { id: 2, title: 'Moves', artist: 'Shubh', album: 'Moves EP', genre: 'punjabi', mood: 'energetic', src: 'Songs/song2.mp3', cover: 'Images/c2.png', duration: '3:08', plays: 3871, year: 2023 },
  { id: 3, title: 'Tension', artist: 'Dhanda Nyoliwala', album: 'Kohram', genre: 'haryanvi', mood: 'party', src: 'Songs/song3.mp3', cover: 'Images/c3.png', duration: '3:28', plays: 2653, year: 2022 },
  { id: 4, title: 'Haryana To Punjab', artist: 'Kaka', album: 'Collaborations', genre: 'punjabi', mood: 'party', src: 'Songs/song6.mp3', cover: 'Images/c6.png', duration: '4:05', plays: 1889, year: 2023 },
  { id: 5, title: 'Guilty', artist: 'Karan Aunjla,Inder Chahal', album: 'Collaborations', genre: 'punjabi', mood: 'chill', src: 'Songs/song5.mp3', cover: 'Images/c5.png', duration: '4:30', plays: 987, year: 2021 },
  { id: 6, title: 'Not Guilty', artist: 'Dhanda Nyoliwala', album: 'Kohram', genre: 'hindi', mood: 'cold', src: 'Songs/song4.mp3', cover: 'Images/c4.png', duration: '3:04', plays: 2055, year: 2026 },
  { id: 7, title: 'Kohram Intro', artist: 'Dhanda Nyoliwala', album: 'Kohram', genre: 'haryanvi', mood: 'party', src: 'Songs/song7.mp3', cover: 'Images/c7.png', duration: '3:11', plays: 2785, year: 2025 },
  { id: 8, title: 'Pagal Banawe', artist: 'Bali Sharma', album: 'Sinta', genre: 'haryanvi', mood: 'party', src: 'Songs/Song8.mp3', cover: 'Images/c8.png', duration: '3:39', plays: 2785, year: 2024 },
  { id: 10, title: 'Tough', artist: 'Krish Rao', album: 'Tough', genre: 'haryanvi', mood: 'energetic', src: 'Songs/song10.mp3', cover: 'Images/c10.png', duration: '2:39', plays: 1200, year: 2026 },
  { id: 11, title: 'Do Numbari', artist: 'Dhanda Nyoliwala', album: 'Mirzapur The Movie', genre: 'haryanvi', mood: 'aggressive', src: 'Songs/song11.mp3', cover: 'Images/c11.png', duration: '2:43', plays: 3450, year: 2026 },
  { id: 12, title: '9:45', artist: 'Prabh Singh', album: '9:45', genre: 'punjabi', mood: 'romantic', src: 'Songs/song12.mp3', cover: 'Images/c12.png', duration: '1:57', plays: 8900, year: 2023 },
  { id: 13, title: 'Godhe 3', artist: 'Masoom Sharma', album: 'Godhe 3', genre: 'haryanvi', mood: 'energetic', src: 'Songs/song14.mp3', cover: 'Images/c14.png', duration: '2:50', plays: 2100, year: 2025 },
  { id: 14, title: 'Main Vohe', artist: 'Masoom Sharma', album: 'Main Vohe', genre: 'haryanvi', mood: 'intense', src: 'Songs/song13.mp3', cover: 'Images/c13.png', duration: '3:10', plays: 1540, year: 2026 }];

const ARTISTS = [
  { id: 1, name: 'Shubh', emoji: '🎤', followers: '4.2M', verified: true, songs: [2], color: 'linear-gradient(135deg,#7C3AED,#5B21B6)' },
  { id: 2, name: 'Maan Panu', emoji: '🎵', followers: '1.8M', verified: true, songs: [1], color: 'linear-gradient(135deg,#06B6D4,#0891B2)' },
  { id: 3, name: 'Dhanda Nyoliwala', emoji: '🔥', followers: '2.3M', verified: true, songs: [3,4,7,11], color: 'linear-gradient(135deg,#10B981,#059669)' },
  { id: 4, name: 'Kaka', emoji: '🎶', followers: '3.1M', verified: false, songs: [4], color: 'linear-gradient(135deg,#F59E0B,#D97706)' },
  { id: 5, name: 'Karan Aunjla', emoji: '🌟', followers: '5.6M', verified: true, songs: [5], color: 'linear-gradient(135deg,#EF4444,#DC2626)' },
  { id: 6, name: 'Masoom Sharma', emoji: '🫀', followers: '2.9M', verified: true, songs: [13,14], color: 'linear-gradient(135deg,#8B5CF6,#7C3AED)' },
];

const GENRES = [
  { name: 'Punjabi', emoji: '🎺', color: '#7C3AED', songs: 1420, filter: 'punjabi' },
  { name: 'Haryanvi', emoji: '🥁', color: '#06B6D4', songs: 640, filter: 'haryanvi' },
  { name: 'Hindi Pop', emoji: '🎸', color: '#10B981', songs: 3200, filter: 'hindi' },
  { name: 'Chill', emoji: '🧊', color: '#8B5CF6', songs: 890, filter: 'chill' },
  { name: 'Party', emoji: '🎉', color: '#F59E0B', songs: 1100, filter: 'party' },
  { name: 'Romantic', emoji: '💕', color: '#EF4444', songs: 760, filter: 'romantic' },
  { name: 'Sad', emoji: '😢', color: '#6366F1', songs: 430, filter: 'sad' },
  { name: 'Energetic', emoji: '⚡', color: '#0EA5E9', songs: 980, filter: 'energetic' },
];

const FEATURES = [
  { icon: '📴', title: 'Offline Listening', desc: 'Download your favorites and enjoy music without an internet connection, anytime.', color: '#7C3AED' },
  { icon: '🎧', title: 'Hi-Fi Audio Quality', desc: 'Experience crystal-clear sound with lossless audio up to 320kbps streaming.', color: '#06B6D4' },
  { icon: '🤖', title: 'Smart Recommendations', desc: 'Our AI learns your taste and curates personalized playlists just for you.', color: '#10B981' },
  { icon: '📱', title: 'Cross-Device Sync', desc: 'Start on your phone, continue on your laptop. Your music follows you everywhere.', color: '#F59E0B' },
  { icon: '🎼', title: 'Custom Equalizer', desc: 'Fine-tune your audio with a studio-grade 5-band equalizer for the perfect sound.', color: '#EF4444' },
  { icon: '🎵', title: 'Unlimited Playlists', desc: 'Create and share as many playlists as you want with no restrictions.', color: '#8B5CF6' },
];

const TESTIMONIALS = [
  { text: 'SangeetHub completely changed how I experience music. The 3D visuals and immersive player are unlike anything I\'ve seen.', name: 'Priya S.', role: 'Music Enthusiast', initials: 'PS', stars: 5 },
  { text: 'The audio quality is phenomenal and the interface feels so premium. Worth every penny of the subscription!', name: 'Arjun K.', role: 'DJ & Producer', initials: 'AK', stars: 5 },
  { text: 'I love how it recommends songs I never knew I needed. My daily commute is 10x better now.', name: 'Neha R.', role: 'Software Engineer', initials: 'NR', stars: 5 },
  { text: 'The cross-device sync is seamless. I start a playlist on my phone and it\'s already playing on my laptop.', name: 'Rohan M.', role: 'Content Creator', initials: 'RM', stars: 5 },
  { text: 'Best music app I\'ve used. The offline feature saved me on countless flights!', name: 'Kavya T.', role: 'Traveller', initials: 'KT', stars: 5 },
  { text: 'The equalizer controls are incredible. I can finally tune my music to exactly how I like it.', name: 'Vikram P.', role: 'Audiophile', initials: 'VP', stars: 5 },
];

// ═══════════════════════════════════════════════════════════
// APP STATE
// ═══════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════
// CENTRAL PLAYBACK CONTROLLER
// One authoritative engine: local | youtube | null.
// Every engine must claim ownership before it can affect UI/playback.
// ═══════════════════════════════════════════════════════════
const playbackController = {
  activeEngine: null,
  session: 0,
  youtubeApi: null,

  claim(engine) {
    if (!['local', 'youtube', null].includes(engine)) return this.session;
    if (this.activeEngine === engine) return this.session;

    this.activeEngine = engine;
    this.session += 1;

    if (engine === 'local') {
      try { this.youtubeApi?.pause?.(); } catch (e) {}
    } else if (engine === 'youtube') {
      try {
        DOM?.audio?.pause?.();
        if (DOM?.audio) DOM.audio.currentTime = 0;
      } catch (e) {}
    } else {
      try { DOM?.audio?.pause?.(); } catch (e) {}
      try { this.youtubeApi?.pause?.(); } catch (e) {}
    }

    return this.session;
  },

  isActive(engine) {
    return this.activeEngine === engine;
  },

  token() {
    return this.session;
  },

  registerYouTube(api) {
    this.youtubeApi = api;
  }
};

window.SangeetHubPlayback = playbackController;

const state = {
  currentPage: 'landing',
  player: {
    currentSongIndex: -1,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 0, // 0=off, 1=all, 2=one
    volume: 0.8,
    progress: 0,
    duration: 0,
    queue: [...SONGS],
  },
  favorites: new Set(JSON.parse(localStorage.getItem('sh_favorites') || '[]')),
  playlists: JSON.parse(localStorage.getItem('sh_playlists') || '[]'),
  history: JSON.parse(localStorage.getItem('sh_history') || '[]'),
  user: JSON.parse(localStorage.getItem('sh_user') || 'null'),
  recentSearches: JSON.parse(localStorage.getItem('sh_searches') || '[]'),
  theme: localStorage.getItem('sh_theme') || 'dark',
  totalPlayed: parseInt(localStorage.getItem('sh_totalPlayed') || '0'),
  totalMinutes: parseInt(localStorage.getItem('sh_totalMinutes') || '0'),
  sleepTimer: null,
  lastVolume: parseFloat(localStorage.getItem('sh_volume') || '0.8'),
};

// ═══════════════════════════════════════════════════════════
// DOM REFERENCES
// ═══════════════════════════════════════════════════════════

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const DOM = {
  loader: $('loader'),
  app: $('app'),
  sidebar: $('sidebar'),
  sidebarToggle: $('sidebarToggle'),
  mobileMenuBtn: $('mobileMenuBtn'),
  globalSearch: $('globalSearch'),
  searchDropdown: $('searchDropdown'),
  themeToggle: $('themeToggle'),
  themeIcon: $('themeIcon'),
  authBtn: $('authBtn'),
  authModal: $('authModal'),
  topbarUser: $('topbarUser'),
  pageContent: $('pageContent'),
  // player
  playerBar: $('playerBar'),
  playerCover: $('playerCover'),
  playerTitle: $('playerTitle'),
  playerArtist: $('playerArtist'),
  playerLikeBtn: $('playerLikeBtn'),
  playBtn: $('playBtn'),
  playIcon: $('playIcon'),
  prevBtn: $('prevBtn'),
  nextBtn: $('nextBtn'),
  shuffleBtn: $('shuffleBtn'),
  repeatBtn: $('repeatBtn'),
  progressTrack: $('progressTrack'),
  progressFill: $('progressFill'),
  progressThumb: $('progressThumb'),
  currentTime: $('currentTime'),
  duration: $('duration'),
  volumeRange: $('volumeRange'),
  volumeFill: $('volumeFill'),
  muteBtn: $('muteBtn'),
  volIcon: $('volIcon'),
  queueBtn: $('queueBtn'),
  fullscreenPlayerBtn: $('fullscreenPlayerBtn'),
  playerVisualizer: $('playerVisualizer'),
  // queue
  queuePanel: $('queuePanel'),
  closeQueueBtn: $('closeQueueBtn'),
  queueCurrent: $('queueCurrent'),
  queueList: $('queueList'),
  // fullscreen
  fullscreenPlayer: $('fullscreenPlayer'),
  fsBg: $('fsBg'),
  fsCloseBtn: $('fsCloseBtn'),
  fsCover: $('fsCover'),
  fsTitle: $('fsTitle'),
  fsArtist: $('fsArtist'),
  fsPlayBtn: $('fsPlayBtn'),
  fsPlayIcon: $('fsPlayIcon'),
  fsPrevBtn: $('fsPrevBtn'),
  fsNextBtn: $('fsNextBtn'),
  fsShuffleBtn: $('fsShuffleBtn'),
  fsRepeatBtn: $('fsRepeatBtn'),
  fsLikeBtn: $('fsLikeBtn'),
  fsCurrentTime: $('fsCurrentTime'),
  fsDuration: $('fsDuration'),
  fsProgressTrack: $('fsProgressTrack'),
  fsProgressFill: $('fsProgressFill'),
  fsProgressThumb: $('fsProgressThumb'),
  fsVinylWrap: $('fsVinylWrap'),
  fsVolume: $('fsVolume'),
  
  // playlist
  playlistModal: $('playlistModal'),
  playlistModalClose: $('playlistModalClose'),
  playlistName: $('playlistName'),
  playlistDesc: $('playlistDesc'),
  createPlaylistSubmit: $('createPlaylistSubmit'),
  createPlaylistBtn: $('createPlaylistBtn'),
  createPlaylistSidebar: $('createPlaylistSidebar'),
  // toast
  toastContainer: $('toastContainer'),
  // audio
  audio: $('audioEngine'),
  // misc
  heroCanvas: $('heroCanvas'),
  typedText: $('typedText'),
  vinylCoverImg: $('vinylCoverImg'),
  userMenuBtn: $('userMenuBtn'),
  sidebarUserName: $('sidebarUserName'),
  sidebarAvatar: $('sidebarAvatar'),
  waveformCanvas: $('waveformCanvas'),
};

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════

window.addEventListener('load', () => {
  applyTheme(state.theme);
  setTimeout(initApp, 1600);
});

function initApp() {
  // Fade loader
  DOM.loader.classList.add('fade-out');
  setTimeout(() => { DOM.loader.style.display = 'none'; }, 600);
  DOM.app.classList.remove('hidden');

  // Init all modules
  initHeroCanvas();
  initTypedText();
  initLandingPage();
  initPlayer();
  initNavigation();
  initSearch();
  initAuth();
  initTheme();
  initModals();
  initScrollAnimations();
  initMobileNav();
  updatePlayerUI();
  updateSidebarPlaylists();
  updateAuthUI();
  initCounterAnimation();
  initTestimonialSlider();
  initSidebarCollapse();

  // Show player bar (hidden by default until first play)
  DOM.playerBar.style.display = 'grid';

  // Welcome toast
  setTimeout(() => showToast('Welcome to SangeetHub! 🎵', 'info'), 500);
}

// ═══════════════════════════════════════════════════════════
// HERO CANVAS (Three.js Particle System)
// ═══════════════════════════════════════════════════════════

function initHeroCanvas() {
  if (typeof THREE === 'undefined') return;
  const canvas = DOM.heroCanvas;
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle system
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    const isAccent = Math.random() > 0.5;
    colors[i * 3] = isAccent ? 0.04 : 0.49;
    colors[i * 3 + 1] = isAccent ? 0.71 : 0.23;
    colors[i * 3 + 2] = isAccent ? 0.83 : 0.93;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05, vertexColors: true, transparent: true,
    opacity: 0.7, sizeAttenuation: true,
  });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Sound wave rings
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.TorusGeometry(1.5 + i * 0.8, 0.005, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x7C3AED : 0x06B6D4,
      transparent: true, opacity: 0.15 + i * 0.05,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3 + i * 0.2;
    ring.position.set(3, 0, -2);
    scene.add(ring);
    rings.push(ring);
  }

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame += 0.005;

    particles.rotation.y = frame * 0.1 + mouseX * 0.05;
    particles.rotation.x = frame * 0.05 + mouseY * 0.03;

    rings.forEach((ring, i) => {
      ring.rotation.z = frame * (0.3 + i * 0.1);
      ring.material.opacity = 0.08 + Math.sin(frame * 2 + i) * 0.06;
    });

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// ═══════════════════════════════════════════════════════════
// TYPED TEXT (Hero)
// ═══════════════════════════════════════════════════════════

function initTypedText() {
  if (!DOM.typedText || typeof Typed === 'undefined') {
    if (DOM.typedText) DOM.typedText.textContent = 'Beat Drop';
    return;
  }
  new Typed('#typedText', {
    strings: ['Beat Drop', 'Soul Shine', 'Deep Groove', 'Pure Vibes', 'Every Note'],
    typeSpeed: 80, backSpeed: 50, backDelay: 2000, loop: true, showCursor: true,
    cursorChar: '|',
  });
}

// ═══════════════════════════════════════════════════════════
// LANDING PAGE SECTIONS
// ═══════════════════════════════════════════════════════════

function initLandingPage() {
  renderTrendingList();
  renderArtistsGrid();
  renderGenresGrid();
  renderFeaturesGrid();
  renderTestimonials();
  setupHeroButtons();
}

function renderTrendingList() {
  const container = $('trendingList');
  if (!container) return;
  const sorted = [...SONGS].sort((a, b) => b.plays - a.plays);
  container.innerHTML = sorted.map((s, i) => createTrackRow(s, i + 1)).join('');
  addTrackRowListeners(container);
}

function createTrackRow(song, num) {
  const liked = state.favorites.has(song.id);
  return `
    <div class="track-row ${state.player.currentSongIndex >= 0 && state.player.queue[state.player.currentSongIndex]?.id === song.id ? 'playing' : ''}"
         data-song-id="${song.id}">
      <span class="track-num">${num || ''}</span>
      <span class="track-play-inline"><i class="fas fa-play"></i></span>
      <img class="track-cover" src="${song.cover}" alt="${song.title}" onerror="this.src='Images/cover1.jpg'">
      <div class="track-info">
        <div class="track-title">${song.title}</div>
        <div class="track-artist">${song.artist}</div>
      </div>
      <button class="track-like-btn ${liked ? 'liked' : ''}" data-song-id="${song.id}" aria-label="Like">
        <i class="${liked ? 'fas' : 'far'} fa-heart"></i>
      </button>
      <span class="track-duration">${song.duration}</span>
    </div>`;
}

function addTrackRowListeners(container) {
  container.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.track-like-btn')) return;
      const id = parseInt(row.dataset.songId);
      const idx = state.player.queue.findIndex(s => s.id === id);
      if (idx >= 0) playSong(idx);
    });
  });
  container.querySelectorAll('.track-like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(parseInt(btn.dataset.songId));
      const id = parseInt(btn.dataset.songId);
      const liked = state.favorites.has(id);
      btn.className = `track-like-btn ${liked ? 'liked' : ''}`;
      btn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i>`;
    });
  });
}

function renderArtistsGrid() {
  const g = $('artistsGrid');
  if (!g) return;
  g.innerHTML = ARTISTS.map(a => `
    <div class="artist-card fade-in" data-artist-id="${a.id}">
      <div class="artist-img-wrap">
        <div class="artist-img-placeholder" style="background:${a.color}">
          ${a.emoji}
        </div>
      </div>
      <div class="artist-name">${a.name} ${a.verified ? '<i class="fas fa-check-circle artist-verified"></i>' : ''}</div>
      <div class="artist-followers">${a.followers} followers</div>
    </div>`).join('');
  g.querySelectorAll('.artist-card').forEach(card => {
    card.addEventListener('click', () => {
      const artist = ARTISTS.find(a => a.id === parseInt(card.dataset.artistId));
      if (artist) {
        const songs = SONGS.filter(s => artist.songs.includes(s.id));
        if (songs.length) { playSong(state.player.queue.findIndex(s => s.id === songs[0].id)); }
        showToast(`Playing ${artist.name}'s music 🎤`, 'success');
      }
    });
  });
}

function renderGenresGrid() {
  const g = $('genresGrid');
  if (!g) return;
  const gradient = c => `linear-gradient(135deg, ${c}cc, ${c}66)`;
  g.innerHTML = GENRES.map(genre => `
    <div class="genre-card" style="background:${gradient(genre.color)}" data-filter="${genre.filter}">
      <span class="genre-emoji">${genre.emoji}</span>
      <div class="genre-name">${genre.name}</div>
      <div class="genre-count">${genre.songs.toLocaleString()} songs</div>
    </div>`).join('');
  g.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', () => {
      navigateTo('explore');
      setTimeout(() => filterExplore(card.dataset.filter), 200);
    });
  });
}

function renderFeaturesGrid() {
  const g = $('featuresGrid');
  if (!g) return;
  g.innerHTML = FEATURES.map(f => `
    <div class="feature-card">
      <div class="feature-icon" style="background:${f.color}22; color:${f.color}; border:1px solid ${f.color}44">
        ${f.icon}
      </div>
      <div class="feature-title">${f.title}</div>
      <div class="feature-desc">${f.desc}</div>
    </div>`).join('');
}

function renderTestimonials() {
  const track = $('testimonialsTrack');
  const dots = $('testimonialDots');
  if (!track || !dots) return;
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');
}

function initTestimonialSlider() {
  const track = $('testimonialsTrack');
  const dots = $('testimonialDots');
  if (!track || !dots) return;
  const total = TESTIMONIALS.length;
  let visible = getVisibleCount();
  let current = 0;
  const maxDots = Math.ceil(total / visible);

  function getVisibleCount() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  }

  function buildDots() {
    visible = getVisibleCount();
    const cnt = Math.ceil(total / visible);
    dots.innerHTML = Array.from({ length: cnt }, (_, i) =>
      `<div class="t-dot ${i === current ? 'active' : ''}" data-idx="${i}"></div>`
    ).join('');
    dots.querySelectorAll('.t-dot').forEach(d => {
      d.addEventListener('click', () => { current = parseInt(d.dataset.idx); slide(); });
    });
  }

  function slide() {
    const cardW = track.children[0]?.offsetWidth + 24 || 324;
    track.style.transform = `translateX(-${current * visible * cardW}px)`;
    dots.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    if (current >= Math.ceil(total / visible) - 1) current = -1;
  }

  buildDots();
  window.addEventListener('resize', buildDots);
  setInterval(() => { current++; slide(); }, 4500);
}

function setupHeroButtons() {
  const startBtn = $('heroStartBtn');
  const exploreBtn = $('heroExploreBtn');
  const viewAll = $('viewAllTrending');
  if (startBtn) startBtn.addEventListener('click', () => navigateTo('app-home'));
  if (exploreBtn) exploreBtn.addEventListener('click', () => navigateTo('explore'));
  if (viewAll) viewAll.addEventListener('click', () => navigateTo('explore'));
}

// ═══════════════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════

function initCounterAnimation() {
  const counters = $$('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = Math.floor(start);
          if (start >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ═══════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (GSAP)
// ═══════════════════════════════════════════════════════════

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Section titles
  gsap.utils.toArray('.landing-section').forEach(section => {
    gsap.fromTo(section.querySelectorAll('.section-overline, .section-title, .section-desc'), {
      y: 40, opacity: 0,
    }, {
      y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 85%', once: true },
    });
  });

  // Cards
  gsap.utils.toArray('.feature-card, .artist-card, .genre-card').forEach((card, i) => {
    gsap.fromTo(card, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: (i % 4) * 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 90%', once: true },
    });
  });
}

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════

function initNavigation() {
  // Sidebar nav items
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
  });

  // Mobile nav
  $$('.mob-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });

  // History buttons (basic)
  $('histBack')?.addEventListener('click', () => window.history.back());
  $('histForward')?.addEventListener('click', () => window.history.forward());
}

function navigateTo(page) {
  if (!page) return;
  state.currentPage = page;

  // Update pages
  $$('.page').forEach(p => p.classList.remove('active'));
  const targetPage = $(`page-${page}`);
  if (targetPage) targetPage.classList.add('active');

  // Update nav items
  $$('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  $$('.mob-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Close mobile sidebar
  closeMobileSidebar();

  // Render page content
  switch (page) {
    case 'app-home': renderHomePage(); break;
    case 'explore': renderExplorePage(); break;
    case 'search': renderSearchPage(); break;
    case 'library': renderLibraryPage(); break;
    case 'favorites': renderFavoritesPage(); break;
    case 'dashboard': renderDashboard(); break;
    case 'admin': renderAdminPage(); break;
  }

  // Scroll to top
  const pageEl = $(`page-${page}`);
  if (pageEl) pageEl.scrollTop = 0;
  DOM.pageContent?.scrollTo(0, 0);
}

// ═══════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════

function renderHomePage() {
  updateGreeting();
  renderQuickPicks();
  renderSongsGrid($('recentlyPlayedGrid'), getRecentlyPlayed());
  renderSongsGrid($('trendingGrid'), [...SONGS].sort((a, b) => b.plays - a.plays).slice(0, 4));
  renderSongsGrid($('newReleasesGrid'), [...SONGS].sort((a, b) => b.year - a.year).slice(0, 4));
}

function updateGreeting() {
  const el = $('greetingText');
  if (!el) return;
  const h = new Date().getHours();
  el.textContent = h < 12 ? 'Good Morning ☀️' : h < 17 ? 'Good Afternoon 🌤️' : 'Good Evening 🌙';
  if (state.user) el.textContent += `, ${state.user.name.split(' ')[0]}`;
}

function getRecentlyPlayed() {
  const ids = state.history.slice(-4).reverse();
  const songs = ids.map(id => SONGS.find(s => s.id === id)).filter(Boolean);
  return songs.length ? songs : SONGS.slice(0, 4);
}

function renderQuickPicks() {
  const container = $('quickPicks');
  if (!container) return;
  const picks = SONGS.slice(0, 6);
  container.innerHTML = picks.map(s => `
    <div class="quick-pick-item" data-song-id="${s.id}">
      <img src="${s.cover}" alt="${s.title}" onerror="this.src='Images/cover1.jpg'" />
      <span>${s.title}</span>
      <div class="quick-pick-play"><i class="fas fa-play"></i></div>
    </div>`).join('');
  container.querySelectorAll('.quick-pick-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = state.player.queue.findIndex(s => s.id === parseInt(item.dataset.songId));
      if (idx >= 0) playSong(idx);
    });
  });

  // Shuffle all
  $('shuffleAllBtn')?.addEventListener('click', () => {
    state.player.isShuffle = true;
    playSong(Math.floor(Math.random() * state.player.queue.length));
    updateShuffleUI();
  });
}

function renderSongsGrid(container, songs) {
  if (!container || !songs) return;
  if (!songs.length) {
    container.innerHTML = `<div class="empty-state"><i class="fas fa-music"></i><p>No songs here yet</p></div>`;
    return;
  }
  container.innerHTML = songs.map(s => createSongCard(s)).join('');
  container.querySelectorAll('.song-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.song-card-like')) return;
      const idx = state.player.queue.findIndex(s => s.id === parseInt(card.dataset.songId));
      if (idx >= 0) playSong(idx);
    });
    card.querySelector('.song-card-like')?.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(card.dataset.songId);
      toggleFavorite(id);
      const likeEl = card.querySelector('.song-card-like');
      const liked = state.favorites.has(id);
      likeEl.className = `song-card-like ${liked ? 'liked' : ''}`;
      likeEl.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i>`;
    });
  });
}

function createSongCard(song) {
  const liked = state.favorites.has(song.id);
  return `
    <div class="song-card" data-song-id="${song.id}">
      <div class="song-card-img-wrap">
        <img src="${song.cover}" alt="${song.title}" onerror="this.src='Images/cover1.jpg'" />
        <div class="song-card-overlay">
          <div class="song-card-play"><i class="fas fa-play"></i></div>
        </div>
      </div>
      <div class="song-card-like ${liked ? 'liked' : ''}">
        <i class="${liked ? 'fas' : 'far'} fa-heart"></i>
      </div>
      <div class="song-card-title">${song.title}</div>
      <div class="song-card-artist">${song.artist}</div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════
// EXPLORE PAGE
// ═══════════════════════════════════════════════════════════

function renderExplorePage() {
  const genresApp = $('genresGridApp');
  if (genresApp) {
    genresApp.innerHTML = GENRES.map(g => `
      <div class="genre-card" style="background:linear-gradient(135deg,${g.color}cc,${g.color}66)" data-filter="${g.filter}">
        <span class="genre-emoji">${g.emoji}</span>
        <div class="genre-name">${g.name}</div>
        <div class="genre-count">${g.songs.toLocaleString()}</div>
      </div>`).join('');
    genresApp.querySelectorAll('.genre-card').forEach(card => {
      card.addEventListener('click', () => filterExplore(card.dataset.filter));
    });
  }
  renderSongsGrid($('moodGrid'), SONGS.filter(s => s.mood === 'chill' || s.mood === 'romantic'));
  renderSongsGrid($('exploreGrid'), SONGS);

  // Filter tabs
  $$('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterExplore(tab.dataset.filter);
    });
  });
}

function filterExplore(filter) {
  const filtered = filter === 'all' ? SONGS : SONGS.filter(s => s.genre === filter || s.mood === filter);
  renderSongsGrid($('exploreGrid'), filtered);
}

// ═══════════════════════════════════════════════════════════
// SEARCH PAGE
// ═══════════════════════════════════════════════════════════

function initSearch() {
  // Global topbar search
  DOM.globalSearch?.addEventListener('input', debounce(e => {
    const q = e.target.value.trim();
    if (q.length < 2) { DOM.searchDropdown.classList.remove('show'); return; }
    const results = searchSongs(q).slice(0, 5);
    renderSearchDropdown(results, q);
  }, 200));

  document.addEventListener('click', e => {
    if (!DOM.globalSearch?.contains(e.target)) {
      DOM.searchDropdown?.classList.remove('show');
    }
  });
}

function renderSearchPage() {
  renderRecentSearches();
  const input = $('searchPageInput');
  const results = $('searchResults');
  const content = $('searchContent');

  if (!input) return;
  input.addEventListener('input', debounce(e => {
    const q = e.target.value.trim();
    if (!q) {
      results?.classList.add('hidden');
      content?.classList.remove('hidden');
      return;
    }
    results?.classList.remove('hidden');
    content?.classList.add('hidden');
    renderPageSearchResults(q);
  }, 200));

  $('clearSearch')?.addEventListener('click', () => {
    if (input) input.value = '';
    results?.classList.add('hidden');
    content?.classList.remove('hidden');
  });

  $$('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const q = input?.value.trim() || '';
      if (q) renderPageSearchResults(q, tab.dataset.tab);
    });
  });
}

function searchSongs(q) {
  q = q.toLowerCase();
  return SONGS.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.album.toLowerCase().includes(q) ||
    s.genre.toLowerCase().includes(q)
  );
}

function renderSearchDropdown(results, q) {
  const dd = DOM.searchDropdown;
  if (!dd) return;
  if (!results.length) { dd.classList.remove('show'); return; }
  dd.innerHTML = results.map(s => `
    <div class="search-drop-item" data-song-id="${s.id}">
      <img src="${s.cover}" alt="${s.title}" onerror="this.src='Images/cover1.jpg'" />
      <div class="search-drop-info">
        <p>${highlight(s.title, q)}</p>
        <span>${s.artist}</span>
      </div>
      <i class="fas fa-play" style="color:var(--primary-light);font-size:0.8rem"></i>
    </div>`).join('');
  dd.classList.add('show');
  dd.querySelectorAll('.search-drop-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = state.player.queue.findIndex(s => s.id === parseInt(item.dataset.songId));
      if (idx >= 0) playSong(idx);
      dd.classList.remove('show');
      addRecentSearch(DOM.globalSearch?.value);
    });
  });
}

function renderPageSearchResults(q, tab = 'all') {
  const container = $('searchResultsContent');
  if (!container) return;
  const songs = searchSongs(q);
  addRecentSearch(q);

  if (!songs.length) {
    container.innerHTML = `<div class="empty-state"><i class="fas fa-search"></i><p>No results for "${q}"</p><span>Try searching for something else</span></div>`;
    return;
  }

  const filtered = tab === 'songs' ? songs : tab === 'artists' ? [] : songs;
  container.innerHTML = `<div class="tracks-list">${filtered.map((s, i) => createTrackRow(s, i + 1)).join('')}</div>`;
  addTrackRowListeners(container);
}

function renderRecentSearches() {
  const list = $('recentSearchList');
  const section = $('recentSearchesSection');
  if (!list) return;
  if (!state.recentSearches.length) {
    if (section) section.style.display = 'none';
    return;
  }
  if (section) section.style.display = '';
  list.innerHTML = state.recentSearches.slice(-8).reverse().map(s => `
    <span class="recent-search-chip" data-q="${s}">
      <i class="fas fa-history" style="font-size:0.7rem;color:var(--text-muted)"></i> ${s}
    </span>`).join('');
  list.querySelectorAll('.recent-search-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = $('searchPageInput');
      if (input) { input.value = chip.dataset.q; input.dispatchEvent(new Event('input')); }
    });
  });
}

function addRecentSearch(q) {
  if (!q || q.length < 2) return;
  state.recentSearches = [...new Set([...state.recentSearches, q])].slice(-10);
  localStorage.setItem('sh_searches', JSON.stringify(state.recentSearches));
}

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:rgba(124,58,237,0.3);color:var(--primary-light);border-radius:2px">$1</mark>');
}

// ═══════════════════════════════════════════════════════════
// LIBRARY PAGE
// ═══════════════════════════════════════════════════════════

function renderLibraryPage() {
  const content = $('libraryContent');
  if (!content) return;
  renderLibTab('playlists');
  $$('.lib-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.lib-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderLibTab(tab.dataset.libtab);
    });
  });
}

function renderLibTab(tab) {
  const content = $('libraryContent');
  if (!content) return;
  if (tab === 'playlists') {
    const playlists = state.playlists;
    if (!playlists.length) {
      content.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-list"></i>
          <p>No playlists yet</p>
          <span>Create your first playlist to get started</span>
          <button class="btn btn-primary btn-sm" style="margin-top:16px" onclick="openPlaylistModal()">
            <i class="fas fa-plus"></i> Create Playlist
          </button>
        </div>`;
      return;
    }
    content.innerHTML = `<div class="songs-grid">${playlists.map(p => createPlaylistCard(p)).join('')}</div>`;
    content.querySelectorAll('.playlist-card').forEach(card => {
      card.addEventListener('click', () => {
        const pl = state.playlists.find(p => p.id === parseInt(card.dataset.plId));
        if (pl) {
          const songs = SONGS.filter(s => pl.songs.includes(s.id));
          if (songs.length) playSong(state.player.queue.findIndex(s => s.id === songs[0].id));
          showToast(`Playing "${pl.name}" 🎵`, 'success');
        }
      });
    });
  } else if (tab === 'albums') {
    const albums = [...new Set(SONGS.map(s => s.album))].map(album => ({
      name: album, songs: SONGS.filter(s => s.album === album), cover: SONGS.find(s => s.album === album)?.cover,
    }));
    content.innerHTML = `<div class="songs-grid">${albums.map(a => `
      <div class="song-card">
        <div class="song-card-img-wrap"><img src="${a.cover}" alt="${a.name}" onerror="this.src='Images/cover1.jpg'" /></div>
        <div class="song-card-title">${a.name}</div>
        <div class="song-card-artist">${a.songs.length} songs</div>
      </div>`).join('')}</div>`;
  } else {
    content.innerHTML = `<div class="artists-grid">${ARTISTS.map(a => `
      <div class="artist-card">
        <div class="artist-img-wrap">
          <div class="artist-img-placeholder" style="background:${a.color}">${a.emoji}</div>
        </div>
        <div class="artist-name">${a.name}</div>
        <div class="artist-followers">${a.followers} followers</div>
      </div>`).join('')}</div>`;
  }
}

function createPlaylistCard(pl) {
  return `
    <div class="playlist-card" data-pl-id="${pl.id}">
      <div class="playlist-card-img-placeholder">🎵</div>
      <div class="playlist-card-title">${pl.name}</div>
      <div class="playlist-card-meta">${pl.songs.length} songs · ${pl.desc || 'Custom playlist'}</div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════
// FAVORITES PAGE
// ═══════════════════════════════════════════════════════════

function renderFavoritesPage() {
  const list = $('favoritesList');
  const count = $('likedCount');
  const favorites = SONGS.filter(s => state.favorites.has(s.id));
  if (count) count.textContent = `${favorites.length} songs`;
  if (!list) return;
  if (!favorites.length) {
    list.innerHTML = `<div class="empty-state"><i class="fas fa-heart"></i><p>No liked songs yet</p><span>Heart songs you love and they'll appear here</span></div>`;
    return;
  }
  list.innerHTML = `<div class="tracks-list">${favorites.map((s, i) => createTrackRow(s, i + 1)).join('')}</div>`;
  addTrackRowListeners(list);

  $('playLikedBtn')?.addEventListener('click', () => {
    if (favorites.length) {
      const idx = state.player.queue.findIndex(s => s.id === favorites[0].id);
      if (idx >= 0) playSong(idx);
    }
  });
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════

function renderDashboard() {
  // Stats
  const stEl = $('statTotalSongs'); if (stEl) stEl.textContent = state.totalPlayed;
  const slEl = $('statLiked'); if (slEl) slEl.textContent = state.favorites.size;
  const shEl = $('statHours'); if (shEl) shEl.textContent = Math.floor(state.totalMinutes / 60) + 'h';
  const spEl = $('statPlaylists'); if (spEl) spEl.textContent = state.playlists.length;

  // Weekly chart
  const wCtx = $('weeklyChart')?.getContext('2d');
  if (wCtx && typeof Chart !== 'undefined') {
    if (window._weeklyChart) window._weeklyChart.destroy();
    window._weeklyChart = new Chart(wCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Minutes', data: [45, 62, 38, 75, 90, 120, 55],
          backgroundColor: 'rgba(124,58,237,0.6)',
          borderColor: '#7C3AED', borderWidth: 2, borderRadius: 6,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9CA3AF' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9CA3AF' } },
        },
      },
    });
  }

  // Genre chart
  const gCtx = $('genreChart')?.getContext('2d');
  if (gCtx && typeof Chart !== 'undefined') {
    if (window._genreChart) window._genreChart.destroy();
    window._genreChart = new Chart(gCtx, {
      type: 'doughnut',
      data: {
        labels: ['Punjabi', 'Haryanvi', 'Hindi', 'Other'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B'],
          borderWidth: 0, hoverOffset: 6,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#9CA3AF', padding: 12 } } },
        cutout: '65%',
      },
    });
  }

  // Top songs
  const topList = $('topSongsList');
  if (topList) {
    const top = [...SONGS].sort((a, b) => b.plays - a.plays).slice(0, 5);
    topList.innerHTML = top.map((s, i) => `
      <div class="top-song-row" data-song-id="${s.id}" style="cursor:pointer">
        <div class="top-song-num">${i + 1}</div>
        <img class="top-song-img" src="${s.cover}" alt="${s.title}" onerror="this.src='Images/cover1.jpg'">
        <div class="top-song-info">
          <div class="top-song-title">${s.title}</div>
          <div class="top-song-artist">${s.artist}</div>
        </div>
        <div class="top-song-plays">${s.plays.toLocaleString()}</div>
      </div>`).join('');
    topList.querySelectorAll('.top-song-row').forEach(row => {
      row.addEventListener('click', () => {
        const idx = state.player.queue.findIndex(s => s.id === parseInt(row.dataset.songId));
        if (idx >= 0) playSong(idx);
      });
    });
  }

  // Activity
  const actList = $('activityList');
  if (actList) {
    const recent = state.history.slice(-5).reverse().map(id => SONGS.find(s => s.id === id)).filter(Boolean);
    if (!recent.length) {
      actList.innerHTML = `<div class="empty-state" style="padding:20px"><i class="fas fa-history"></i><p>No activity yet</p></div>`;
    } else {
      actList.innerHTML = recent.map(s => `
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(124,58,237,0.2);color:var(--primary-light)">
            <i class="fas fa-play"></i>
          </div>
          <div class="activity-text">Played <strong>${s.title}</strong></div>
          <div class="activity-time">Recently</div>
        </div>`).join('');
    }
  }
}

// ═══════════════════════════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════════════════════════

function renderAdminPage() {
  renderAdminTab('songs');
  $$('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderAdminTab(tab.dataset.admintab);
    });
  });
}

function renderAdminTab(tab) {
  const content = $('adminContent');
  if (!content) return;
  if (tab === 'songs') {
    content.innerHTML = `
      <button class="admin-add-btn" onclick="showToast('Add song feature coming soon!','info')">
        <i class="fas fa-plus"></i> Add Song
      </button>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>#</th><th>Cover</th><th>Title</th><th>Artist</th><th>Album</th><th>Genre</th><th>Plays</th><th>Actions</th></tr></thead>
          <tbody>${SONGS.map((s, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><img src="${s.cover}" alt="${s.title}" onerror="this.src='Images/cover1.jpg'"></td>
              <td><strong>${s.title}</strong></td>
              <td>${s.artist}</td>
              <td>${s.album}</td>
              <td><span class="badge badge-primary">${s.genre}</span></td>
              <td>${s.plays.toLocaleString()}</td>
              <td>
                <button class="admin-action-btn edit" onclick="showToast('Edit: ${s.title}','info')">Edit</button>
                <button class="admin-action-btn delete" onclick="showToast('Delete: ${s.title}','error')">Delete</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } else if (tab === 'artists') {
    content.innerHTML = `
      <button class="admin-add-btn" onclick="showToast('Add artist feature coming soon!','info')">
        <i class="fas fa-plus"></i> Add Artist
      </button>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>#</th><th>Artist</th><th>Followers</th><th>Songs</th><th>Verified</th><th>Actions</th></tr></thead>
          <tbody>${ARTISTS.map((a, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><strong>${a.emoji} ${a.name}</strong></td>
              <td>${a.followers}</td>
              <td>${a.songs.length}</td>
              <td>${a.verified ? '<span class="badge badge-success">Yes</span>' : '<span class="badge" style="background:var(--glass-strong)">No</span>'}</td>
              <td>
                <button class="admin-action-btn edit" onclick="showToast('Edit artist','info')">Edit</button>
                <button class="admin-action-btn delete" onclick="showToast('Cannot delete','error')">Remove</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } else if (tab === 'users') {
    const users = [
      { name: 'Admin User', email: 'admin@sangeet.com', role: 'Admin', joined: '2023-01-15' },
      { name: state.user?.name || 'Guest', email: state.user?.email || 'guest@sangeet.com', role: 'User', joined: '2024-06-01' },
    ];
    content.innerHTML = `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>${users.map((u, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><strong>${u.name}</strong></td>
              <td>${u.email}</td>
              <td><span class="badge ${u.role === 'Admin' ? 'badge-primary' : 'badge-accent'}">${u.role}</span></td>
              <td>${u.joined}</td>
              <td><button class="admin-action-btn edit">Edit</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } else {
    content.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon" style="--c:#7C3AED"><i class="fas fa-music"></i></div><div class="stat-info"><span class="stat-value">${SONGS.length}</span><span class="stat-label">Total Songs</span></div></div>
        <div class="stat-card"><div class="stat-icon" style="--c:#06B6D4"><i class="fas fa-users"></i></div><div class="stat-info"><span class="stat-value">2</span><span class="stat-label">Total Users</span></div></div>
        <div class="stat-card"><div class="stat-icon" style="--c:#10B981"><i class="fas fa-headphones"></i></div><div class="stat-info"><span class="stat-value">${SONGS.reduce((a, s) => a + s.plays, 0).toLocaleString()}</span><span class="stat-label">Total Plays</span></div></div>
        <div class="stat-card"><div class="stat-icon" style="--c:#F59E0B"><i class="fas fa-list"></i></div><div class="stat-info"><span class="stat-value">${state.playlists.length}</span><span class="stat-label">Playlists</span></div></div>
      </div>`;
  }
}

// ═══════════════════════════════════════════════════════════
// MUSIC PLAYER ENGINE
// ═══════════════════════════════════════════════════════════

function initPlayer() {
  const audio = DOM.audio;
  if (!audio) return;
  if (audio.dataset.sangeetBound === '1') return;
  audio.dataset.sangeetBound = '1';

  audio.volume = state.player.volume;

  audio.addEventListener('timeupdate', onTimeUpdate);
  audio.addEventListener('loadedmetadata', onMetaLoaded);
  audio.addEventListener('ended', onSongEnded);
  audio.addEventListener('error', () => {
    if (!playbackController.isActive('local')) return;
    showToast('Could not load audio file', 'warning');
    nextSong();
  });

  DOM.playerLikeBtn?.addEventListener('click', () => {
    const song = currentSong();
    if (!song) return;
    toggleFavorite(song.id);
    updateLikeButtons();
  });
  DOM.fsLikeBtn?.addEventListener('click', () => {
    const song = currentSong();
    if (!song) return;
    toggleFavorite(song.id);
    updateLikeButtons();
  });

  DOM.fullscreenPlayerBtn?.addEventListener('click', openFullscreen);
  DOM.fsCloseBtn?.addEventListener('click', closeFullscreen);

  initPlayerShortcuts();
  initMediaSession();
  setVolume(state.lastVolume);
  updatePlayerUI();
}

function playSong(index) {
  if (index < 0 || index >= state.player.queue.length) return;
  const song = state.player.queue[index];
  const audio = DOM.audio;
  if (!audio) return;

  const session = playbackController.claim('local');
  audio.pause();
  audio.currentTime = 0;

  state.player.currentSongIndex = index;
  state.player.isPlaying = false;
  state.player.progress = 0;
  state.player.duration = 0;

  audio.src = song.src;
  audio.load();

  updatePlayerUI();
  addToHistory(song.id);
  trackPlay(song.id);
  updateQueue();

  if (DOM.vinylCoverImg) DOM.vinylCoverImg.src = song.cover;

  const playPromise = audio.play();
  if (playPromise?.then) {
    playPromise.then(() => {
      if (!playbackController.isActive('local') || playbackController.token() !== session) return;
      state.player.isPlaying = true;
      updatePlayPauseUI();
    }).catch(() => {
      if (!playbackController.isActive('local') || playbackController.token() !== session) return;
      state.player.isPlaying = false;
      updatePlayPauseUI();
      showToast('Tap play to start this track', 'info');
    });
  }
}

function togglePlay() {
  const audio = DOM.audio;
  const yt = window.SangeetHubYouTube;

  if (playbackController.isActive('youtube')) {
    yt?.togglePlay?.();
    return;
  }

  if (state.player.currentSongIndex < 0) {
    playSong(0);
    return;
  }

  if (audio.paused) {
    const session = playbackController.claim('local');
    audio.play().then(() => {
      if (!playbackController.isActive('local') || playbackController.token() !== session) return;
      state.player.isPlaying = true;
      updatePlayPauseUI();
    }).catch(() => {});
  } else {
    audio.pause();
    state.player.isPlaying = false;
    updatePlayPauseUI();
  }
}

function nextSong() {
  if (playbackController.isActive('youtube')) {
    window.SangeetHubYouTube?.next?.();
    return;
  }

  const q = state.player.queue;
  if (!q.length) return;
  let next;
  if (state.player.isShuffle && q.length > 1) {
    do { next = Math.floor(Math.random() * q.length); }
    while (next === state.player.currentSongIndex);
  } else {
    next = (state.player.currentSongIndex + 1) % q.length;
  }
  playSong(next);
}

function prevSong() {
  if (playbackController.isActive('youtube')) {
    window.SangeetHubYouTube?.previous?.();
    return;
  }

  const audio = DOM.audio;
  if (audio && audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  const q = state.player.queue;
  if (!q.length) return;
  const prev = (state.player.currentSongIndex - 1 + q.length) % q.length;
  playSong(prev);
}

function toggleShuffle() {
  state.player.isShuffle = !state.player.isShuffle;
  updateShuffleUI();
  showToast(state.player.isShuffle ? 'Shuffle on 🔀' : 'Shuffle off', 'info');
}

function updateShuffleUI() {
  DOM.shuffleBtn?.classList.toggle('active', state.player.isShuffle);
  DOM.fsShuffleBtn?.classList.toggle('active', state.player.isShuffle);
}

function cycleRepeat() {
  state.player.repeatMode = (state.player.repeatMode + 1) % 3;
  const labels = ['Repeat off', 'Repeat all 🔁', 'Repeat one 🔂'];
  const icons = ['fa-redo', 'fa-redo', 'fa-redo'];
  updateRepeatUI();
  showToast(labels[state.player.repeatMode], 'info');
}

function updateRepeatUI() {
  const active = state.player.repeatMode > 0;
  DOM.repeatBtn?.classList.toggle('active', active);
  DOM.fsRepeatBtn?.classList.toggle('active', active);
  const icon = state.player.repeatMode === 2 ? 'fa-redo' : 'fa-redo';
  if (DOM.repeatBtn) DOM.repeatBtn.querySelector('i').className = `fas ${icon}`;
}

function setVolume(v) {
  state.player.volume = Math.max(0, Math.min(1, v));
  if (DOM.audio) DOM.audio.volume = state.player.volume;
  if (playbackController.isActive('youtube')) {
    window.SangeetHubYouTube?.setVolume?.(state.player.volume * 100);
  }
  try { localStorage.setItem('sh_volume', String(state.player.volume)); } catch (e) {}
  updateVolumeUI(state.player.volume);
}

function updateVolumeUI(v) {
  const pct = (v * 100).toFixed(0);
  if (DOM.volumeFill) DOM.volumeFill.style.width = pct + '%';
  if (DOM.volumeRange) DOM.volumeRange.value = pct;
  if (DOM.fsVolume) DOM.fsVolume.value = pct;
  const icon = v === 0 ? 'fa-volume-mute' : v < 0.5 ? 'fa-volume-down' : 'fa-volume-up';
  if (DOM.volIcon) DOM.volIcon.className = `fas ${icon}`;
}

let lastVolume = 0.8;
function toggleMute() {
  if (state.player.volume > 0) {
    lastVolume = state.player.volume;
    setVolume(0);
  } else {
    setVolume(lastVolume);
  }
}

function onTimeUpdate() {
  if (!playbackController.isActive('local') || !DOM.audio) return;
  const duration = Number.isFinite(DOM.audio.duration) ? DOM.audio.duration : 0;
  const current = DOM.audio.currentTime || 0;
  state.player.duration = duration;
  state.player.progress = duration ? (current / duration) * 100 : 0;
  setProgressUI(state.player.progress, current, duration);
}

function onMetaLoaded() {
  if (!playbackController.isActive('local') || !DOM.audio) return;
  state.player.duration = Number.isFinite(DOM.audio.duration) ? DOM.audio.duration : 0;
  setProgressUI(0, DOM.audio.currentTime || 0, state.player.duration);
}

function onSongEnded() {
  if (!playbackController.isActive('local')) return;

  state.player.isPlaying = false;

  if (state.player.repeatMode === 2) {
    DOM.audio.currentTime = 0;
    DOM.audio.play().catch(() => {});
    return;
  }

  if (state.player.repeatMode === 0 && state.player.currentSongIndex >= state.player.queue.length - 1) {
    updatePlayPauseUI();
    return;
  }

  nextSong();
}

function currentSong() {
  const idx = state.player.currentSongIndex;
  return idx >= 0 ? state.player.queue[idx] : null;
}

function initPlayerShortcuts() {
  if (window.__sangeetShortcutsBound) return;
  window.__sangeetShortcutsBound = true;

  document.addEventListener('keydown', event => {
    const tag = document.activeElement?.tagName;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || document.activeElement?.isContentEditable) return;
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        if (event.shiftKey) nextSong();
        else seekBy(5);
        break;
      case 'ArrowLeft':
        if (event.shiftKey) prevSong();
        else seekBy(-5);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setVolume(state.player.volume + 0.05);
        break;
      case 'ArrowDown':
        event.preventDefault();
        setVolume(state.player.volume - 0.05);
        break;
      case 'KeyM':
        toggleMute();
        break;
      case 'KeyS':
        toggleShuffle();
        break;
      case 'KeyR':
        cycleRepeat();
        break;
    }
  });
}

function seekBy(seconds) {
  const audio = DOM.audio;
  if (!audio || !Number.isFinite(audio.duration)) return;
  audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
}

function initMediaSession() {
  if (!('mediaSession' in navigator)) return;

  navigator.mediaSession.setActionHandler('play', () => togglePlay());
  navigator.mediaSession.setActionHandler('pause', () => togglePlay());
  navigator.mediaSession.setActionHandler('previoustrack', () => prevSong());
  navigator.mediaSession.setActionHandler('nexttrack', () => nextSong());
  navigator.mediaSession.setActionHandler('seekbackward', () => seekBy(-10));
  navigator.mediaSession.setActionHandler('seekforward', () => seekBy(10));
}

function updateMediaSession(song) {
  if (!('mediaSession' in navigator) || !song) return;
  if ('MediaMetadata' in window) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title || 'SangeetHub',
      artist: song.artist || 'Unknown artist',
      album: song.album || 'SangeetHub',
      artwork: song.cover ? [{ src: song.cover, sizes: '512x512', type: 'image/png' }] : []
    });
  }
}

function setSleepTimer(minutes) {
  if (state.sleepTimer) clearTimeout(state.sleepTimer);
  if (!minutes) {
    state.sleepTimer = null;
    showToast('Sleep timer cancelled', 'info');
    return;
  }
  state.sleepTimer = setTimeout(() => {
    try { DOM.audio?.pause(); } catch (e) {}
    try { window.SangeetHubYouTube?.pause?.(); } catch (e) {}
    state.player.isPlaying = false;
    updatePlayPauseUI();
    showToast('Sleep timer ended 🌙', 'info');
    state.sleepTimer = null;
  }, minutes * 60 * 1000);
  showToast(`Sleep timer set for ${minutes} min`, 'info');
}

function updatePlayerUI() {
  const song = currentSong();
  if (!song) return;

  if (DOM.playerTitle) DOM.playerTitle.textContent = song.title;
  if (DOM.playerArtist) DOM.playerArtist.textContent = song.artist;
  if (DOM.playerCover) { DOM.playerCover.src = song.cover; DOM.playerCover.onerror = () => DOM.playerCover.src = 'Images/cover1.jpg'; }
  if (DOM.fsTitle) DOM.fsTitle.textContent = song.title;
  if (DOM.fsArtist) DOM.fsArtist.textContent = song.artist;
  if (DOM.fsCover) { DOM.fsCover.src = song.cover; DOM.fsCover.onerror = () => DOM.fsCover.src = 'Images/cover1.jpg'; }

  // Fullscreen bg
  if (DOM.fsBg) DOM.fsBg.style.backgroundImage = `url(${song.cover})`;

  updatePlayPauseUI();
  updateLikeButtons();
  updateMediaSession(song);

  // Vinyl spin
  const fsVinyl = document.querySelector('.fs-vinyl');
  if (fsVinyl) fsVinyl.classList.toggle('spinning', state.player.isPlaying);

  // Visualizer
  if (DOM.playerVisualizer) DOM.playerVisualizer.classList.toggle('active', state.player.isPlaying);

  // Update all track rows
  document.querySelectorAll('.track-row').forEach(row => {
    row.classList.toggle('playing', row.dataset.songId == song.id);
  });
}

function updatePlayPauseUI() {
  const playing = state.player.isPlaying;
  const icon = playing ? 'fa-pause' : 'fa-play';
  if (DOM.playIcon) DOM.playIcon.className = `fas ${icon}`;
  if (DOM.fsPlayIcon) DOM.fsPlayIcon.className = `fas ${icon}`;
  if (DOM.playerVisualizer) DOM.playerVisualizer.classList.toggle('active', playing);
  const fsVinyl = document.querySelector('.fs-vinyl');
  if (fsVinyl) fsVinyl.classList.toggle('spinning', playing);
}

function updateLikeButtons() {
  const song = currentSong();
  if (!song) return;
  const liked = state.favorites.has(song.id);

  if (DOM.playerLikeBtn) {
    DOM.playerLikeBtn.classList.toggle('liked', liked);
    const toggle = $('playerLoveSwitch');
    if (toggle) toggle.checked = liked;
    DOM.playerLikeBtn.setAttribute('aria-pressed', String(liked));
    DOM.playerLikeBtn.setAttribute('title', liked ? 'Remove from favourites' : 'Add to favourites');
  }

  if (DOM.fsLikeBtn) {
    DOM.fsLikeBtn.classList.toggle('liked', liked);
    const toggle = $('fsLoveSwitch');
    if (toggle) toggle.checked = liked;
    DOM.fsLikeBtn.setAttribute('aria-pressed', String(liked));
    DOM.fsLikeBtn.setAttribute('title', liked ? 'Remove from favourites' : 'Add to favourites');
  }
}

// ═══════════════════════════════════════════════════════════
// QUEUE
// ═══════════════════════════════════════════════════════════

function toggleQueue() {
  DOM.queuePanel?.classList.toggle('open');
  updateQueue();
}
function closeQueue() { DOM.queuePanel?.classList.remove('open'); }

function updateQueue() {
  const current = DOM.queueCurrent;
  const list = DOM.queueList;
  const song = currentSong();
  if (current && song) {
    current.innerHTML = `<div class="queue-item active">
      <img src="${song.cover}" alt="${song.title}" onerror="this.src='Images/cover1.jpg'" />
      <div class="queue-item-info">
        <div class="queue-item-title">${song.title}</div>
        <div class="queue-item-artist">${song.artist}</div>
      </div>
      <i class="fas fa-volume-up" style="color:var(--primary-light);font-size:0.75rem"></i>
    </div>`;
  }
  if (list) {
    const remaining = state.player.queue.slice(state.player.currentSongIndex + 1);
    if (!remaining.length) { list.innerHTML = `<div class="empty-state" style="padding:20px"><i class="fas fa-list-ol"></i><p>Queue is empty</p></div>`; return; }
    list.innerHTML = remaining.map((s, i) => `
      <div class="queue-item" data-idx="${state.player.currentSongIndex + 1 + i}">
        <img src="${s.cover}" alt="${s.title}" onerror="this.src='Images/cover1.jpg'" />
        <div class="queue-item-info">
          <div class="queue-item-title">${s.title}</div>
          <div class="queue-item-artist">${s.artist}</div>
        </div>
      </div>`).join('');
    list.querySelectorAll('.queue-item').forEach(item => {
      item.addEventListener('click', () => playSong(parseInt(item.dataset.idx)));
    });
  }
}

// ═══════════════════════════════════════════════════════════
// FULLSCREEN PLAYER
// ═══════════════════════════════════════════════════════════

function openFullscreen() {
  DOM.fullscreenPlayer?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  updatePlayerUI();
}
function closeFullscreen() {
  DOM.fullscreenPlayer?.classList.add('hidden');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════════
// WAVEFORM VISUALIZER
// ═══════════════════════════════════════════════════════════

function initWaveform() {
  const canvas = DOM.waveformCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
  canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  drawWaveform(0);
}

function drawWaveform(progress) {
  const canvas = DOM.waveformCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  ctx.clearRect(0, 0, w, h);

  const bars = 80;
  const bW = w / bars - 1;
  for (let i = 0; i < bars; i++) {
    const x = i * (bW + 1);
    const height = (Math.sin(i * 0.3) * 0.3 + Math.sin(i * 0.7) * 0.2 + 0.5) * h * 0.8;
    const playedPct = i / bars;
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    if (playedPct < progress) {
      gradient.addColorStop(0, '#7C3AED');
      gradient.addColorStop(1, '#06B6D4');
    } else {
      gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
      gradient.addColorStop(1, 'rgba(255,255,255,0.05)');
    }
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, (h - height) / 2, Math.max(2, bW), height, 2);
    ctx.fill();
  }
}

// ═══════════════════════════════════════════════════════════
// FAVORITES / HISTORY
// ═══════════════════════════════════════════════════════════

function toggleFavorite(songId) {
  if (state.favorites.has(songId)) {
    state.favorites.delete(songId);
    showToast('Removed from Liked Songs', 'info');
  } else {
    state.favorites.add(songId);
    showToast('Added to Liked Songs ❤️', 'success');
  }
  localStorage.setItem('sh_favorites', JSON.stringify([...state.favorites]));
  updateLikeButtons();
}

function addToHistory(songId) {
  state.history = [...state.history.filter(id => id !== songId), songId].slice(-50);
  localStorage.setItem('sh_history', JSON.stringify(state.history));
}

function trackPlay(songId) {
  state.totalPlayed++;
  localStorage.setItem('sh_totalPlayed', state.totalPlayed);
}

// ═══════════════════════════════════════════════════════════
// AUTHENTICATION
// ═══════════════════════════════════════════════════════════

function initAuth() {
  DOM.authBtn?.addEventListener('click', openAuthModal);
  DOM.authModalClose?.addEventListener('click', closeAuthModal);
  DOM.authModal?.addEventListener('click', e => { if (e.target === DOM.authModal) closeAuthModal(); });

  DOM.loginSubmitBtn?.addEventListener('click', handleLogin);
  DOM.registerSubmitBtn?.addEventListener('click', handleRegister);

  $$('.modal-tab').forEach(tab => {
    if (!tab.closest('#authModal')) return;
    tab.addEventListener('click', () => {
      $$('.modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const which = tab.dataset.authtab;
      DOM.loginForm?.classList.toggle('hidden', which !== 'login');
      DOM.registerForm?.classList.toggle('hidden', which !== 'register');
    });
  });

  DOM.userMenuBtn?.addEventListener('click', showUserMenu);
}

function openAuthModal() { DOM.authModal?.classList.remove('hidden'); }
function closeAuthModal() { DOM.authModal?.classList.add('hidden'); }

function handleLogin() {
  const email = DOM.loginEmail?.value.trim();
  const pass = DOM.loginPassword?.value;
  if (!email || !pass) { showToast('Please fill in all fields', 'error'); return; }
  // Demo credentials
  const user = { name: email === 'admin@sangeet.com' ? 'Admin User' : email.split('@')[0], email, role: email === 'admin@sangeet.com' ? 'admin' : 'user' };
  loginUser(user);
}

function handleRegister() {
  const name = DOM.regName?.value.trim();
  const email = DOM.regEmail?.value.trim();
  const pass = DOM.regPassword?.value;
  if (!name || !email || !pass) { showToast('Please fill in all fields', 'error'); return; }
  if (pass.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
  const user = { name, email, role: 'user' };
  loginUser(user);
}

function loginUser(user) {
  state.user = user;
  localStorage.setItem('sh_user', JSON.stringify(user));
  closeAuthModal();
  updateAuthUI();
  showToast(`Welcome, ${user.name}! 🎵`, 'success');
  if (user.role === 'admin') {
    // Show admin nav
    const adminNav = document.createElement('li');
    adminNav.className = 'nav-item';
    adminNav.dataset.page = 'admin';
    adminNav.innerHTML = '<i class="fas fa-shield-alt"></i><span>Admin</span><div class="nav-indicator"></div>';
    adminNav.addEventListener('click', () => navigateTo('admin'));
    document.querySelector('.nav-list')?.appendChild(adminNav);
  }
}

function logoutUser() {
  state.user = null;
  localStorage.removeItem('sh_user');
  updateAuthUI();
  showToast('Signed out successfully', 'info');
  if (state.currentPage === 'admin') navigateTo('landing');
}

function updateAuthUI() {
  if (state.user) {
    if (DOM.authBtn) {
      DOM.authBtn.textContent = state.user.name.split(' ')[0];
      DOM.authBtn.removeEventListener('click', openAuthModal);
    }
    if (DOM.sidebarUserName) DOM.sidebarUserName.textContent = state.user.name;
    if (DOM.sidebarAvatar) DOM.sidebarAvatar.innerHTML = `<span>${state.user.name.charAt(0).toUpperCase()}</span>`;
  } else {
    if (DOM.authBtn) {
      DOM.authBtn.textContent = 'Sign In';
      DOM.authBtn.addEventListener('click', openAuthModal);
    }
    if (DOM.sidebarUserName) DOM.sidebarUserName.textContent = 'Guest';
  }
}

function showUserMenu() {
  if (!state.user) { openAuthModal(); return; }
  // Simple dropdown-style toast menu
  showToast(`Signed in as ${state.user.email}. <a href="#" onclick="logoutUser();return false" style="color:var(--accent)">Sign Out</a>`, 'info');
}

// ═══════════════════════════════════════════════════════════
// PLAYLIST MANAGEMENT
// ═══════════════════════════════════════════════════════════

function initModals() {
  DOM.createPlaylistBtn?.addEventListener('click', openPlaylistModal);
  DOM.createPlaylistSidebar?.addEventListener('click', openPlaylistModal);
  DOM.playlistModalClose?.addEventListener('click', closePlaylistModal);
  DOM.playlistModal?.addEventListener('click', e => { if (e.target === DOM.playlistModal) closePlaylistModal(); });
  DOM.createPlaylistSubmit?.addEventListener('click', createPlaylist);
}

function openPlaylistModal() { DOM.playlistModal?.classList.remove('hidden'); }
function closePlaylistModal() { DOM.playlistModal?.classList.add('hidden'); }

function createPlaylist() {
  const name = DOM.playlistName?.value.trim();
  const desc = DOM.playlistDesc?.value.trim();
  if (!name) { showToast('Please enter a playlist name', 'error'); return; }
  const pl = { id: Date.now(), name, desc, songs: [], created: new Date().toISOString() };
  state.playlists.push(pl);
  localStorage.setItem('sh_playlists', JSON.stringify(state.playlists));
  closePlaylistModal();
  if (DOM.playlistName) DOM.playlistName.value = '';
  if (DOM.playlistDesc) DOM.playlistDesc.value = '';
  updateSidebarPlaylists();
  showToast(`Playlist "${name}" created! 🎵`, 'success');
}

function updateSidebarPlaylists() {
  const container = $('sidebarPlaylists');
  if (!container) return;
  container.innerHTML = state.playlists.slice(-5).map(pl => `
    <div class="playlist-sidebar-item" data-pl-id="${pl.id}">
      <i class="fas fa-music"></i>
      <span>${pl.name}</span>
    </div>`).join('');
  container.querySelectorAll('.playlist-sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo('library');
      setTimeout(() => renderLibTab('playlists'), 100);
    });
  });
}

// ═══════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════

function initTheme() {
  DOM.themeToggle?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(state.theme);
    localStorage.setItem('sh_theme', state.theme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (DOM.themeIcon) {
    DOM.themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

// ═══════════════════════════════════════════════════════════
// SIDEBAR COLLAPSE
// ═══════════════════════════════════════════════════════════

function initSidebarCollapse() {
  DOM.sidebarToggle?.addEventListener('click', () => {
    DOM.sidebar?.classList.toggle('collapsed');
  });
}

// ═══════════════════════════════════════════════════════════
// MOBILE NAV & SIDEBAR
// ═══════════════════════════════════════════════════════════

function initMobileNav() {
  DOM.mobileMenuBtn?.addEventListener('click', openMobileSidebar);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';
  overlay.addEventListener('click', closeMobileSidebar);
  document.body.appendChild(overlay);
}

function openMobileSidebar() {
  DOM.sidebar?.classList.add('mobile-open');
  $('sidebarOverlay')?.classList.add('show');
}

function closeMobileSidebar() {
  DOM.sidebar?.classList.remove('mobile-open');
  $('sidebarOverlay')?.classList.remove('show');
}

// ═══════════════════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ═══════════════════════════════════════════════════════════

function showToast(message, type = 'info', duration = 3500) {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'} toast-icon"></i><span>${message}</span>`;
  DOM.toastContainer?.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ═══════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// Global expose for inline onclick handlers
window.showToast = showToast;
window.openPlaylistModal = openPlaylistModal;
window.logoutUser = logoutUser;
window.navigateTo = navigateTo;

/* ============================================================
   SANGEETHUB — YOUTUBE PLAYLIST PLAYER
   ============================================================

   This layer replaces the local MP3 playback engine with
   YouTube's official IFrame Player API while keeping the
   existing SangeetHub player UI.

   Features:
   - YouTube / YouTube Music playlist support
   - Custom play/pause controls
   - Next / previous
   - Shuffle
   - Repeat
   - Volume
   - Progress bar
   - Queue
   - Current song title
   - Artist/channel
   - YouTube thumbnail
   - Playlist saved in localStorage
   - Playlist URL or playlist ID accepted

   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     CONFIGURATION
     ========================================================== */

  const YT_PLAYLIST_STORAGE_KEY =
    'sangeethub_youtube_playlist_id';

  /*
   * Put your default playlist ID here if you want the website
   * to start with one automatically.
   *
   * Example:
   *
   * const DEFAULT_YOUTUBE_PLAYLIST_ID =
   *   'PLxxxxxxxxxxxxxxxx';
   *
   * Leave it empty if you want users to enter their own playlist.
   */
  const DEFAULT_YOUTUBE_PLAYLIST_ID = '';

  let youtubePlayer = null;

  let youtubeReady = false;

  let youtubePlayerReady = false;

  let youtubePlaylist = [];

  let youtubeCurrentIndex = 0;

  let youtubeShuffle = false;

  let youtubeRepeat = false;

  let youtubeLastVideoId = null;

  let youtubeProgressTimer = null;

  let youtubeVolume = 80;

  let youtubeInitialized = false;


  /* ==========================================================
     DOM HELPERS
     ========================================================== */

  const $ = (id) => document.getElementById(id);

  function getElement(id) {
    return document.getElementById(id);
  }


  /* ==========================================================
     PLAYLIST ID EXTRACTION
     ========================================================== */

  function extractYouTubePlaylistId(value) {
    if (!value) {
      return null;
    }

    value = String(value).trim();

    /*
     * Already a playlist ID
     */
    if (
      !value.includes('/') &&
      !value.includes('?') &&
      !value.includes('&') &&
      !value.includes('=')
    ) {
      return value;
    }

    try {
      const url = new URL(value);

      const listId = url.searchParams.get('list');

      if (listId) {
        return listId;
      }
    } catch (error) {
      console.warn(
        '[SangeetHub] Invalid YouTube URL:',
        error
      );
    }

    /*
     * Fallback for URLs where URL() did not parse correctly.
     */
    const match = value.match(/[?&]list=([^&]+)/);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  }


  /* ==========================================================
     LOCAL STORAGE
     ========================================================== */

  function getSavedPlaylistId() {
    try {
      const saved = localStorage.getItem(
        YT_PLAYLIST_STORAGE_KEY
      );

      if (saved) {
        return saved;
      }
    } catch (error) {
      console.warn(
        '[SangeetHub] localStorage unavailable.',
        error
      );
    }

    return DEFAULT_YOUTUBE_PLAYLIST_ID || '';
  }


  function savePlaylistId(id) {
    try {
      localStorage.setItem(
        YT_PLAYLIST_STORAGE_KEY,
        id
      );
    } catch (error) {
      console.warn(
        '[SangeetHub] Could not save playlist.',
        error
      );
    }
  }


  function clearSavedPlaylist() {
    try {
      localStorage.removeItem(
        YT_PLAYLIST_STORAGE_KEY
      );
    } catch (error) {
      console.warn(
        '[SangeetHub] Could not clear playlist.',
        error
      );
    }
  }


  /* ==========================================================
     TOAST
     ========================================================== */

  function ytToast(message) {
    /*
     * Use existing SangeetHub toast if available.
     */
    if (
      typeof window.showToast === 'function'
    ) {
      window.showToast(message);
      return;
    }

    const container =
      getElement('toastContainer');

    if (!container) {
      console.log('[SangeetHub]', message);
      return;
    }

    const toast =
      document.createElement('div');

    toast.className = 'toast';

    toast.innerHTML = `
      <i class="fab fa-youtube"></i>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('show');

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }


  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }


  /* ==========================================================
     YOUTUBE API READY
     ========================================================== */

  window.onYouTubeIframeAPIReady = function () {
    console.log(
      '[SangeetHub] YouTube IFrame API ready.'
    );

    youtubeReady = true;

    initializeYouTubePlayer();
  };


  /* ==========================================================
     INITIALIZE YOUTUBE PLAYER
     ========================================================== */

  function initializeYouTubePlayer() {
    if (youtubeInitialized) {
      return;
    }

    if (!youtubeReady) {
      return;
    }

    const host =
      getElement('youtubePlayerHost');

    if (!host) {
      console.error(
        '[SangeetHub] youtubePlayerHost missing.'
      );

      return;
    }

    youtubeInitialized = true;

    youtubePlayer = new YT.Player(
      'youtubePlayerHost',
      {
        width: '1',
        height: '1',

        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1
        },

        events: {
          onReady:
            onYouTubePlayerReady,

          onStateChange:
            onYouTubeStateChange,

          onError:
            onYouTubeError
        }
      }
    );
  }


  /* ==========================================================
     PLAYER READY
     ========================================================== */

  function onYouTubePlayerReady(event) {
    youtubePlayerReady = true;

    youtubePlayer =
      event.target;

    playbackController.registerYouTube({
      pause: () => {
        if (youtubePlayer && youtubePlayerReady) youtubePlayer.pauseVideo();
      },
      play: () => {
        if (youtubePlayer && youtubePlayerReady) youtubePlayer.playVideo();
      },
      togglePlay: youtubePlayPause,
      next: youtubeNext,
      previous: youtubePrevious,
      setVolume: setYouTubeVolume,
      isPlaying: () => {
        if (!youtubePlayer || !youtubePlayerReady || !window.YT) return false;
        const ps = youtubePlayer.getPlayerState();
        return ps === YT.PlayerState.PLAYING || ps === YT.PlayerState.BUFFERING;
      }
    });

    youtubePlayer.setVolume(
      youtubeVolume
    );

    console.log(
      '[SangeetHub] YouTube player ready.'
    );

    const savedPlaylist =
      getSavedPlaylistId();

    if (savedPlaylist) {
      loadYouTubePlaylist(
        savedPlaylist,
        false
      );
    }

    startYouTubeProgressTimer();
  }


  /* ==========================================================
     PLAYER STATE
     ========================================================== */

  function onYouTubeStateChange(event) {
    if (!window.YT) return;

    // A YouTube callback is allowed to affect global playback state only
    // after YouTube has claimed the central controller.
    if (
      event.data === YT.PlayerState.PLAYING ||
      event.data === YT.PlayerState.BUFFERING
    ) {
      playbackController.claim('youtube');
    }

    if (!playbackController.isActive('youtube')) return;

    switch (event.data) {

      case YT.PlayerState.PLAYING:
        syncYouTubeQueue();
        updatePlayButton(true);
        updateVisualizer(true);
        updateCurrentSongMetadata();
        break;


      case YT.PlayerState.PAUSED:

        updatePlayButton(false);

        updateVisualizer(false);

        break;


      case YT.PlayerState.ENDED:

        handleYouTubeEnded();

        break;


      case YT.PlayerState.BUFFERING:
        updatePlayButton(true);
        break;


      case YT.PlayerState.CUED:

        updateCurrentSongMetadata();

        break;
    }

    syncYouTubeQueue();
  }


  /* ==========================================================
     YOUTUBE ERRORS
     ========================================================== */

  function onYouTubeError(event) {
    console.warn(
      '[SangeetHub] YouTube error:',
      event.data
    );

    let message =
      'Unable to play this YouTube video.';

    switch (event.data) {

      case 2:
        message =
          'Invalid YouTube video request.';
        break;

      case 5:
        message =
          'HTML5 playback error.';
        break;

      case 100:
        message =
          'This YouTube video is unavailable.';
        break;

      case 101:
      case 150:
        message =
          'This video cannot be played in an embedded player.';
        break;
    }

    ytToast(message);
  }


  /* ==========================================================
     LOAD PLAYLIST
     ========================================================== */

  function loadYouTubePlaylist(
    playlistValue,
    showToast = true
  ) {
    // Validate first; only claim YouTube after the playlist input is valid.
    // This prevents a failed connection from stealing the active engine.

    try {
      const localAudio = document.getElementById('audioEngine');
      if (localAudio) {
        localAudio.pause();
        localAudio.currentTime = 0;
      }
    } catch (error) {}

    const playlistId =
      extractYouTubePlaylistId(
        playlistValue
      );

    if (!playlistId) {
      ytToast(
        'Please enter a valid YouTube playlist URL or ID.'
      );

      return false;
    }

    if (
      !youtubePlayer ||
      !youtubePlayerReady
    ) {
      ytToast(
        'YouTube player is still loading.'
      );

      return false;
    }

    playbackController.claim('youtube');

    savePlaylistId(
      playlistId
    );

    try {

      youtubePlayer.loadPlaylist({
        listType: 'playlist',
        list: playlistId,
        index: 0,
        startSeconds: 0
      });

      youtubeCurrentIndex = 0;

      youtubePlaylist = [];

      if (showToast) {
        ytToast(
          'YouTube playlist connected.'
        );
      }

      updatePlaylistStatus(
        'Playlist connected successfully.'
      );

      setTimeout(() => {
        syncYouTubeQueue();
      }, 1500);

      return true;

    } catch (error) {

      console.error(
        '[SangeetHub] Playlist loading failed:',
        error
      );

      ytToast(
        'Could not load the YouTube playlist.'
      );

      return false;
    }
  }


  /* ==========================================================
     SYNC PLAYLIST
     ========================================================== */

  function syncYouTubeQueue() {
    if (
      !youtubePlayer ||
      !youtubePlayerReady
    ) {
      return;
    }

    try {

      const playlist =
        youtubePlayer.getPlaylist();

      if (
        Array.isArray(playlist)
      ) {
        youtubePlaylist =
          playlist.map(
            (videoId, index) => ({
              id: videoId,
              index: index
            })
          );
      }

      const current =
        youtubePlayer.getPlaylistIndex();

      if (
        Number.isInteger(current) &&
        current >= 0
      ) {
        youtubeCurrentIndex =
          current;
      }

      renderYouTubeQueue();

    } catch (error) {

      console.warn(
        '[SangeetHub] Queue sync failed:',
        error
      );
    }
  }


  /* ==========================================================
     CURRENT VIDEO
     ========================================================== */

  function getCurrentVideoId() {
    if (!youtubePlayer) {
      return null;
    }

    try {
      return youtubePlayer.getVideoData()
        .video_id || null;
    } catch {
      return null;
    }
  }


  function getCurrentVideoData() {
    if (!youtubePlayer) {
      return null;
    }

    try {
      return youtubePlayer.getVideoData();
    } catch {
      return null;
    }
  }


  /* ==========================================================
     UPDATE SONG METADATA
     ========================================================== */

  function updateCurrentSongMetadata() {
    if (!youtubePlayer) {
      return;
    }

    const data =
      getCurrentVideoData();

    if (!data) {
      return;
    }

    const videoId =
      data.video_id || '';

    const title =
      data.title ||
      'YouTube Music';

    const author =
      data.author ||
      'YouTube';

    /*
     * Prevent unnecessary updates.
     */
    if (
      youtubeLastVideoId === videoId
    ) {
      updateProgress();
      return;
    }

    youtubeLastVideoId =
      videoId;

    const thumbnail =
      videoId
        ? `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`
        : 'Images/cover1.jpg';

    setPlayerText(
      'playerTitle',
      title
    );

    setPlayerText(
      'playerArtist',
      author
    );

    setPlayerImage(
      'playerCover',
      thumbnail
    );

    setPlayerText(
      'fsTitle',
      title
    );

    setPlayerText(
      'fsArtist',
      author
    );

    setPlayerImage(
      'fsCover',
      thumbnail
    );

    setPlayerImage(
      'vinylCoverImg',
      thumbnail
    );

    setBackgroundImage(
      'fsBg',
      thumbnail
    );

    updateQueueCurrent(
      title,
      author,
      thumbnail
    );

    updatePlayHistory(
      videoId,
      title,
      author
    );
  }


  /* ==========================================================
     SAFE DOM UPDATES
     ========================================================== */

  function setPlayerText(
    id,
    value
  ) {
    const element =
      getElement(id);

    if (element) {
      element.textContent =
        value || '';
    }
  }


  function setPlayerImage(
    id,
    src
  ) {
    const element =
      getElement(id);

    if (
      element &&
      src
    ) {
      element.src = src;
    }
  }


  function setBackgroundImage(
    id,
    src
  ) {
    const element =
      getElement(id);

    if (
      element &&
      src
    ) {
      element.style.backgroundImage =
        `url("${src}")`;
    }
  }


  /* ==========================================================
     PLAY / PAUSE
     ========================================================== */

  let playPauseLock = false;

  function youtubePlayPause() {
    if (!youtubePlayer || !youtubePlayerReady || !window.YT) {
      ytToast('YouTube player is still loading.');
      return;
    }

    if (playPauseLock) return;

    playbackController.claim('youtube');

    const playerState = youtubePlayer.getPlayerState();

    playPauseLock = true;
    setTimeout(() => { playPauseLock = false; }, 250);

    if (playerState === YT.PlayerState.PLAYING || playerState === YT.PlayerState.BUFFERING) {
      youtubePlayer.pauseVideo();
      updatePlayButton(false);
    } else {
      youtubePlayer.playVideo();
      updatePlayButton(true);
    }
  }


  /* ==========================================================
     NEXT
     ========================================================== */

  function youtubeNext() {
    if (!youtubePlayer || !youtubePlayerReady || !youtubePlaylist.length) {
      ytToast('Connect a YouTube playlist first.');
      return;
    }

    playbackController.claim('youtube');

    // Keep the local player silent while YouTube changes tracks.
    try {
      const localAudio = document.getElementById('audioEngine');
      if (localAudio) localAudio.pause();
    } catch (error) {}

    if (
      youtubeShuffle &&
      youtubePlaylist.length > 1
    ) {
      const possible =
        youtubePlaylist
          .map(
            (_, index) => index
          )
          .filter(
            index =>
              index !==
              youtubeCurrentIndex
          );

      const random =
        possible[
          Math.floor(
            Math.random() *
            possible.length
          )
        ];

      youtubePlayer.playVideoAt(
        random
      );

      return;
    }

    youtubePlayer.nextVideo();
  }


  /* ==========================================================
     PREVIOUS
     ========================================================== */

  function youtubePrevious() {
    if (!youtubePlayer || !youtubePlayerReady || !youtubePlaylist.length) {
      ytToast('Connect a YouTube playlist first.');
      return;
    }

    playbackController.claim('youtube');

    try {
      const localAudio = document.getElementById('audioEngine');
      if (localAudio) localAudio.pause();
    } catch (error) {}

    try {

      const currentTime =
        youtubePlayer.getCurrentTime();

      /*
       * If the current song has played for more
       * than 3 seconds, restart it.
       */
      if (
        currentTime > 3
      ) {
        youtubePlayer.seekTo(
          0,
          true
        );

        return;
      }

      youtubePlayer.previousVideo();

    } catch (error) {

      console.warn(
        '[SangeetHub] Previous failed:',
        error
      );
    }
  }


  /* ==========================================================
     END HANDLER
     ========================================================== */

  function handleYouTubeEnded() {
    if (!playbackController.isActive('youtube')) return;

    updatePlayButton(false);
    updateVisualizer(false);

    if (youtubeRepeat) {

      youtubePlayer.seekTo(
        0,
        true
      );

      youtubePlayer.playVideo();

      return;
    }

    /*
     * Normally the YouTube playlist automatically
     * advances. We only manually advance when needed.
     */
    setTimeout(() => {

      const state =
        youtubePlayer.getPlayerState();

      if (
        state === YT.PlayerState.ENDED
      ) {
        youtubeNext();
      }

    }, 200);
  }


  /* ==========================================================
     SHUFFLE
     ========================================================== */

  function toggleYouTubeShuffle() {
    youtubeShuffle =
      !youtubeShuffle;

    const buttons = [
      getElement('shuffleBtn'),
      getElement('fsShuffleBtn')
    ];

    buttons.forEach(button => {

      if (!button) {
        return;
      }

      button.classList.toggle(
        'active',
        youtubeShuffle
      );

    });

    ytToast(
      youtubeShuffle
        ? 'Shuffle enabled.'
        : 'Shuffle disabled.'
    );
  }


  /* ==========================================================
     REPEAT
     ========================================================== */

  function toggleYouTubeRepeat() {
    youtubeRepeat =
      !youtubeRepeat;

    const buttons = [
      getElement('repeatBtn'),
      getElement('fsRepeatBtn')
    ];

    buttons.forEach(button => {

      if (!button) {
        return;
      }

      button.classList.toggle(
        'active',
        youtubeRepeat
      );

    });

    ytToast(
      youtubeRepeat
        ? 'Repeat enabled.'
        : 'Repeat disabled.'
    );
  }


  /* ==========================================================
     VOLUME
     ========================================================== */

  function setYouTubeVolume(
    value
  ) {
    value =
      Math.max(
        0,
        Math.min(
          100,
          Number(value) || 0
        )
      );

    youtubeVolume =
      value;

    if (
      youtubePlayer &&
      youtubePlayerReady
    ) {
      youtubePlayer.setVolume(
        value
      );
    }

    updateVolumeUI(
      value
    );
  }


  function updateVolumeUI(
    value
  ) {
    const volumeRange =
      getElement(
        'volumeRange'
      );

    if (volumeRange) {
      volumeRange.value =
        value;
    }

    const fsVolume =
      getElement(
        'fsVolume'
      );

    if (fsVolume) {
      fsVolume.value =
        value;
    }

    const volumeFill =
      getElement(
        'volumeFill'
      );

    if (volumeFill) {
      volumeFill.style.width =
        `${value}%`;
    }

    const icon =
      getElement(
        'volIcon'
      );

    if (!icon) {
      return;
    }

    icon.className =
      value === 0
        ? 'fas fa-volume-mute'
        : value < 50
          ? 'fas fa-volume-down'
          : 'fas fa-volume-up';
  }


  function toggleYouTubeMute() {
    if (!youtubePlayer || !youtubePlayerReady) return;

    if (youtubePlayer.isMuted()) {
      youtubePlayer.unMute();
      const restore = Math.max(1, Number(youtubeVolume) || 80);
      youtubePlayer.setVolume(restore);
      updateVolumeUI(restore);
    } else {
      const current = youtubePlayer.getVolume();
      if (current > 0) youtubeVolume = current;
      youtubePlayer.mute();
      updateVolumeUI(0);
    }
  }


  /* ==========================================================
     PROGRESS
     ========================================================== */

  function startYouTubeProgressTimer() {
    if (youtubeProgressTimer) {
      clearInterval(
        youtubeProgressTimer
      );
    }

    youtubeProgressTimer =
      setInterval(
        updateProgress,
        500
      );
  }


  function updateProgress() {
    if (
      !youtubePlayer ||
      !youtubePlayerReady
    ) {
      return;
    }

    try {

      const current =
        youtubePlayer.getCurrentTime();

      const duration =
        youtubePlayer.getDuration();

      if (
        !duration ||
        duration <= 0
      ) {
        return;
      }

      const percentage =
        Math.min(
          100,
          Math.max(
            0,
            (current / duration) *
            100
          )
        );

      setProgressUI(
        percentage,
        current,
        duration
      );

    } catch {
      // Player may not be initialized yet.
    }
  }


  function setProgressUI(
    percentage,
    current,
    duration
  ) {
    const fill =
      getElement(
        'progressFill'
      );

    if (fill) {
      fill.style.width =
        `${percentage}%`;
    }

    const thumb =
      getElement(
        'progressThumb'
      );

    if (thumb) {
      thumb.style.left =
        `${percentage}%`;
    }

    const currentLabel =
      getElement(
        'currentTime'
      );

    if (currentLabel) {
      currentLabel.textContent =
        formatTime(current);
    }

    const durationLabel =
      getElement(
        'duration'
      );

    if (durationLabel) {
      durationLabel.textContent =
        formatTime(duration);
    }

    const fsFill =
      getElement(
        'fsProgressFill'
      );

    if (fsFill) {
      fsFill.style.width =
        `${percentage}%`;
    }

    const fsThumb =
      getElement(
        'fsProgressThumb'
      );

    if (fsThumb) {
      fsThumb.style.left =
        `${percentage}%`;
    }

    const fsCurrent =
      getElement(
        'fsCurrentTime'
      );

    if (fsCurrent) {
      fsCurrent.textContent =
        formatTime(current);
    }

    const fsDuration =
      getElement(
        'fsDuration'
      );

    if (fsDuration) {
      fsDuration.textContent =
        formatTime(duration);
    }
  }


  function formatTime(
    seconds
  ) {
    if (
      !Number.isFinite(
        Number(seconds)
      )
    ) {
      return '0:00';
    }

    seconds =
      Math.max(
        0,
        Math.floor(seconds)
      );

    const minutes =
      Math.floor(
        seconds / 60
      );

    const remaining =
      seconds % 60;

    return `${minutes}:${String(
      remaining
    ).padStart(2, '0')}`;
  }


  function seekYouTube(event, trackId) {
    if (!youtubePlayer || !youtubePlayerReady) return;

    const track = getElement(trackId);
    if (!track) return;

    const rect = track.getBoundingClientRect();
    if (!rect.width) return;

    const clientX = event.clientX ?? (event.touches && event.touches[0]?.clientX);
    if (typeof clientX !== 'number') return;

    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const duration = youtubePlayer.getDuration();

    if (duration > 0) {
      youtubePlayer.seekTo(duration * percentage, true);
      setProgressUI(percentage * 100, duration * percentage, duration);
    }
  }

  function initYouTubeProgressDragging(trackId) {
    const track = getElement(trackId);
    if (!track || track.dataset.dragBound === '1') return;

    track.dataset.dragBound = '1';

    const move = event => {
      if (!track.dataset.dragging) return;
      seekYouTube(event, trackId);
    };

    track.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      track.dataset.dragging = '1';
      track.setPointerCapture?.(event.pointerId);
      seekYouTube(event, trackId);
    });

    track.addEventListener('pointermove', move);

    const stop = event => {
      if (!track.dataset.dragging) return;
      track.dataset.dragging = '';
      try { track.releasePointerCapture?.(event.pointerId); } catch {}
    };

    track.addEventListener('pointerup', stop);
    track.addEventListener('pointercancel', stop);
    track.addEventListener('lostpointercapture', stop);
  }


  /* ==========================================================
     QUEUE
     ========================================================== */

  function renderYouTubeQueue() {
    const queueList =
      getElement('queueList');

    if (!queueList) {
      return;
    }

    if (
      !youtubePlaylist.length
    ) {
      queueList.innerHTML = `
        <div style="
          padding:20px;
          text-align:center;
          opacity:.6;
        ">
          No YouTube playlist loaded.
        </div>
      `;

      return;
    }

    queueList.innerHTML =
      youtubePlaylist
        .map(
          (song, index) => {

            const active =
              index ===
              youtubeCurrentIndex;

            const thumbnail =
              `https://i.ytimg.com/vi/${encodeURIComponent(song.id)}/default.jpg`;

            return `
              <button
                class="queue-item ${
                  active
                    ? 'active'
                    : ''
                }"
                data-youtube-index="${index}"
                style="
                  display:flex;
                  align-items:center;
                  gap:10px;
                  width:100%;
                  border:0;
                  background:none;
                  color:inherit;
                  text-align:left;
                  cursor:pointer;
                  padding:8px;
                "
              >
                <img
                  src="${thumbnail}"
                  alt=""
                  style="
                    width:42px;
                    height:42px;
                    object-fit:cover;
                    border-radius:6px;
                  "
                />

                <div style="
                  min-width:0;
                  flex:1;
                ">
                  <div style="
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    font-weight:600;
                  ">
                    ${
                      active
                        ? '▶ Playing'
                        : `Track ${index + 1}`
                    }
                  </div>

                  <div style="
                    opacity:.55;
                    font-size:.75rem;
                  ">
                    YouTube
                  </div>
                </div>
              </button>
            `;
          }
        )
        .join('');

    queueList
      .querySelectorAll(
        '[data-youtube-index]'
      )
      .forEach(button => {

        button.addEventListener(
          'click',
          () => {

            const index =
              Number(
                button.dataset
                  .youtubeIndex
              );

            if (
              youtubePlayer &&
              youtubePlayerReady
            ) {
              youtubePlayer.playVideoAt(
                index
              );
            }

          }
        );

      });
  }


  function updateQueueCurrent(
    title,
    artist,
    thumbnail
  ) {
    const current =
      getElement(
        'queueCurrent'
      );

    if (!current) {
      return;
    }

    current.innerHTML = `
      <div style="
        display:flex;
        align-items:center;
        gap:12px;
      ">
        <img
          src="${thumbnail}"
          alt=""
          style="
            width:55px;
            height:55px;
            object-fit:cover;
            border-radius:8px;
          "
        />

        <div style="
          min-width:0;
        ">
          <strong style="
            display:block;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          ">
            ${escapeHtml(title)}
          </strong>

          <span style="
            opacity:.6;
            font-size:.8rem;
          ">
            ${escapeHtml(artist)}
          </span>
        </div>
      </div>
    `;
  }


  /* ==========================================================
     PLAY BUTTON UI
     ========================================================== */

  function updatePlayButton(
    playing
  ) {
    const playIcon =
      getElement('playIcon');

    if (playIcon) {
      playIcon.className =
        playing
          ? 'fas fa-pause'
          : 'fas fa-play';
    }

    const fsPlayIcon =
      getElement(
        'fsPlayIcon'
      );

    if (fsPlayIcon) {
      fsPlayIcon.className =
        playing
          ? 'fas fa-pause'
          : 'fas fa-play';
    }
  }


  function updateVisualizer(
    playing
  ) {
    const visualizer =
      getElement(
        'playerVisualizer'
      );

    if (visualizer) {
      visualizer.classList.toggle(
        'playing',
        playing
      );
    }

    const vinyl =
      getElement(
        'vinyl3d'
      );

    if (vinyl) {
      vinyl.classList.toggle(
        'playing',
        playing
      );
    }

    const fsVinyl =
      getElement(
        'fsVinylWrap'
      );

    if (fsVinyl) {
      fsVinyl.classList.toggle(
        'playing',
        playing
      );
    }
  }


  /* ==========================================================
     PLAY HISTORY
     ========================================================== */

  function updatePlayHistory(
    videoId,
    title,
    artist
  ) {
    if (!videoId) {
      return;
    }

    try {

      const key =
        'sangeethub_youtube_history';

      const existing =
        JSON.parse(
          localStorage.getItem(
            key
          ) || '[]'
        );

      const filtered =
        existing.filter(
          item =>
            item.videoId !==
            videoId
        );

      filtered.unshift({
        videoId,
        title,
        artist,
        playedAt:
          Date.now()
      });

      localStorage.setItem(
        key,
        JSON.stringify(
          filtered.slice(0, 50)
        )
      );

    } catch (error) {

      console.warn(
        '[SangeetHub] History error:',
        error
      );
    }
  }


  /* ==========================================================
     BUTTON BINDING
     ========================================================== */

  function bindYouTubeControls() {
    const playerBar = getElement('playerBar');

    if (playerBar && !playerBar.dataset.youtubeControlsBound) {
      playerBar.dataset.youtubeControlsBound = '1';

      playerBar.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button) return;

        // Shared playback buttons are handled by the central player.
        // This listener only owns YouTube-specific UI actions.
        switch (button.id) {
          case 'youtubePlaylistSettingsBtn':
            event.preventDefault();
            event.stopPropagation();
            openYouTubePlaylistModal();
            break;
        }
      });

      playerBar.addEventListener('input', event => {
        if (event.target.id === 'volumeRange') {
          setYouTubeVolume(event.target.value);
        }
      });

      const progress = getElement('progressTrack');
      if (progress) {
        progress.addEventListener('click', event => {
          seekYouTube(event, 'progressTrack');
        });
        initYouTubeProgressDragging('progressTrack');
      }
    }

    // Fullscreen controls use their own IDs because they live outside playerBar.
    bind('fsPlayBtn', 'click', youtubePlayPause);
    bind('fsNextBtn', 'click', youtubeNext);
    bind('fsPrevBtn', 'click', youtubePrevious);
    bind('fsShuffleBtn', 'click', toggleYouTubeShuffle);
    bind('fsRepeatBtn', 'click', toggleYouTubeRepeat);
    bind('fsVolume', 'input', event => setYouTubeVolume(event.target.value));

    const fsProgress = getElement('fsProgressTrack');
    if (fsProgress) {
      bind('fsProgressTrack', 'click', event => seekYouTube(event, 'fsProgressTrack'));
      initYouTubeProgressDragging('fsProgressTrack');
    }

    bind('youtubePlaylistModalClose', 'click', closeYouTubePlaylistModal);
    bind('youtubePlaylistSaveBtn', 'click', saveYouTubePlaylistFromModal);
    bind('youtubePlaylistClearBtn', 'click', clearYouTubePlaylist);

    // Keyboard playback is centralized in initPlayerShortcuts().
    // Do not install a second YouTube keyboard listener here.
  }


  function bind(
    id,
    event,
    callback
  ) {
    const element =
      getElement(id);

    if (!element) {
      return;
    }

    element.addEventListener(
      event,
      callback
    );
  }


  /* ==========================================================
     PLAYLIST MODAL
     ========================================================== */

  function openYouTubePlaylistModal() {
    const modal =
      getElement(
        'youtubePlaylistModal'
      );

    if (!modal) {
      return;
    }

    const input =
      getElement(
        'youtubePlaylistInput'
      );

    const saved =
      getSavedPlaylistId();

    if (input) {
      input.value =
        saved || '';
    }

    updatePlaylistStatus(
      saved
        ? 'A YouTube playlist is currently connected.'
        : 'No YouTube playlist is connected.'
    );

    modal.classList.remove(
      'hidden'
    );
  }


  function closeYouTubePlaylistModal() {
    const modal =
      getElement(
        'youtubePlaylistModal'
      );

    if (modal) {
      modal.classList.add(
        'hidden'
      );
    }
  }


  function saveYouTubePlaylistFromModal() {
    const input =
      getElement(
        'youtubePlaylistInput'
      );

    if (!input) {
      return;
    }

    const value =
      input.value.trim();

    const playlistId =
      extractYouTubePlaylistId(
        value
      );

    if (!playlistId) {

      updatePlaylistStatus(
        'Invalid playlist URL or ID.'
      );

      ytToast(
        'Invalid YouTube playlist.'
      );

      return;
    }

    const loaded =
      loadYouTubePlaylist(
        playlistId,
        true
      );

    if (loaded) {
      closeYouTubePlaylistModal();
    }
  }


  function clearYouTubePlaylist() {
    clearSavedPlaylist();

    youtubePlaylist = [];

    youtubeCurrentIndex = 0;

    if (
      youtubePlayer &&
      youtubePlayerReady
    ) {

      try {
        youtubePlayer.stopVideo();
      } catch {}
    }

    renderYouTubeQueue();

    updatePlaylistStatus(
      'YouTube playlist removed.'
    );

    ytToast(
      'YouTube playlist removed.'
    );
  }


  function updatePlaylistStatus(
    message
  ) {
    const status =
      getElement(
        'youtubePlaylistStatus'
      );

    if (status) {
      status.textContent =
        message;
    }
  }


  /* ==========================================================
     INITIALIZATION
     ========================================================== */

  function initializeYouTubeIntegration() {

    console.log(
      '[SangeetHub] Initializing YouTube integration...'
    );

    bindYouTubeControls();

    /*
     * Initialize API immediately if it is already loaded.
     */
    if (
      window.YT &&
      window.YT.Player
    ) {

      youtubeReady = true;

      initializeYouTubePlayer();

    } else {

      console.log(
        '[SangeetHub] Waiting for YouTube API...'
      );
    }

    /*
     * Set initial volume UI.
     */
    updateVolumeUI(
      youtubeVolume
    );
  }


  /* ==========================================================
     START AFTER DOM LOAD
     ========================================================== */

  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initializeYouTubeIntegration
    );

  } else {

    initializeYouTubeIntegration();
  }


  /* ==========================================================
     PUBLIC API
     ========================================================== */

  window.SangeetHubYouTube = {

    loadPlaylist:
      loadYouTubePlaylist,

    togglePlay:
      youtubePlayPause,

    play:
      () => {
        if (
          youtubePlayer &&
          youtubePlayerReady
        ) {
          playbackController.claim('youtube');
          youtubePlayer.playVideo();
        }
      },

    pause:
      () => {
        if (
          youtubePlayer &&
          youtubePlayerReady
        ) {
          youtubePlayer.pauseVideo();
        }
      },

    next:
      youtubeNext,

    previous:
      youtubePrevious,

    getPlaylist:
      () => youtubePlaylist,

    getPlayer:
      () => youtubePlayer
  };


})();

/* SANGEETHUB EXPERIENCE: playlist-first + lyrics + cinematic visuals */
(()=>{'use strict';
const PK='sangeethub_youtube_playlist_id',LK='sangeethub_lyrics_v3';let cv,ct,raf,on=false,meta={id:'',title:'Select a song',artist:'YouTube'};
const $=id=>document.getElementById(id);
const pid=v=>{if(!v)return null;v=String(v).trim();if(/^[A-Za-z0-9_-]{10,}$/.test(v)&&!v.includes('/'))return v;try{return new URL(v).searchParams.get('list')}catch(e){return(v.match(/[?&]list=([A-Za-z0-9_-]+)/)||[])[1]||null}};
const saved=()=>{try{return localStorage.getItem(PK)||''}catch(e){return''}};
const ls=()=>{try{return JSON.parse(localStorage.getItem(LK)||'{}')}catch(e){return{}}};
function openPL(){const m=$('youtubePlaylistModal');if(!m)return;$('youtubePlaylistInput').value=saved();$('youtubePlaylistStatus').textContent=saved()?'Saved playlist on this device.':'Paste a public YouTube / YouTube Music playlist URL or ID.';m.classList.remove('hidden')}
function loadPL(v){const id=pid(v);if(!id){$('youtubePlaylistStatus').textContent='Invalid YouTube playlist URL or ID.';return}try{localStorage.setItem(PK,id)}catch(e){}if(window.SangeetHubYouTube?.loadPlaylist){const ok=window.SangeetHubYouTube.loadPlaylist(id,true);if(ok!==false)$('youtubePlaylistModal').classList.add('hidden')}}
function clearPL(){try{localStorage.removeItem(PK)}catch(e){}try{window.SangeetHubYouTube?.getPlayer()?.stopVideo()}catch(e){}$('youtubePlaylistStatus').textContent='Playlist cleared.'}
function lyrics(){const m=$('lyricsModal');if(!m)return;const s=ls();$('lyricsTitle').textContent=meta.title;$('lyricsArtist').textContent=meta.artist;$('lyricsInput').value=s[meta.id]||'';m.classList.remove('hidden')}
function saveLyrics(){if(!meta.id){$('lyricsStatus').textContent='Play a YouTube track first.';return}const s=ls();s[meta.id]=$('lyricsInput').value;try{localStorage.setItem(LK,JSON.stringify(s))}catch(e){}$('lyricsStatus').textContent='Lyrics saved on this device.'}
function clearLyrics(){if(!meta.id)return;const s=ls();delete s[meta.id];try{localStorage.setItem(LK,JSON.stringify(s))}catch(e){}$('lyricsInput').value='';$('lyricsStatus').textContent='Lyrics cleared.'}
function sync(){try{const p=window.SangeetHubYouTube?.getPlayer?.();if(!p?.getVideoData)return;const d=p.getVideoData();if(!d?.video_id)return;meta={id:d.video_id,title:d.title||'YouTube Track',artist:d.author||'YouTube'};['playerTitle','fsTitle'].forEach(x=>$(x)&&($(x).textContent=meta.title));['playerArtist','fsArtist'].forEach(x=>$(x)&&($(x).textContent=meta.artist));$('visualMoodLabel')&&( $('visualMoodLabel').textContent='MOOD • '+mood(meta.title+' '+meta.artist).name)}catch(e){}}
function mood(s){s=s.toLowerCase();if(/sad|alone|rain|night|broken/.test(s))return{name:'MELANCHOLIC',rgb:'90,100,190'};if(/love|romantic|heart/.test(s))return{name:'ROMANTIC',rgb:'220,60,120'};if(/party|dance|club|bass/.test(s))return{name:'PARTY',rgb:'245,158,11'};if(/rap|hype|energy|power|tough/.test(s))return{name:'ENERGETIC',rgb:'124,58,237'};if(/chill|lofi|calm/.test(s))return{name:'CHILL',rgb:'6,182,212'};return{name:'DREAM',rgb:'124,58,237'}}
function resize(){if(!cv)return;const d=Math.min(devicePixelRatio||1,2);cv.width=innerWidth*d;cv.height=innerHeight*d;ct.setTransform(d,0,0,d,0,0)}
function visual(){cv=$('cinematicVisualCanvas');if(!cv)return;ct=cv.getContext('2d');resize();addEventListener('resize',resize);draw()}
function draw(){if(!on)return;const m=mood(meta.title+' '+meta.artist),t=performance.now()/1000,r=m.rgb;ct.clearRect(0,0,innerWidth,innerHeight);const g=ct.createRadialGradient(innerWidth*.5,innerHeight*.45,0,innerWidth*.5,innerHeight*.45,Math.max(innerWidth,innerHeight)*.8);g.addColorStop(0,'rgba('+r+',.24)');g.addColorStop(.5,'rgba('+r+',.05)');g.addColorStop(1,'rgba(0,0,0,.95)');ct.fillStyle=g;ct.fillRect(0,0,innerWidth,innerHeight);for(let i=0;i<9;i++){const x=innerWidth/2+Math.cos(t*.15+i)*innerWidth*(.12+i*.035),y=innerHeight/2+Math.sin(t*.2+i)*innerHeight*(.1+i*.025),q=80+Math.sin(t*1.4+i)*35;const b=ct.createRadialGradient(x,y,0,x,y,q);b.addColorStop(0,'rgba('+r+',.17)');b.addColorStop(1,'rgba('+r+',0)');ct.fillStyle=b;ct.beginPath();ct.arc(x,y,q,0,7);ct.fill()}raf=requestAnimationFrame(draw)}
function toggle(){on=!on;document.body.classList.toggle('cinematic-mode',on);$('cinematicVisualStage')?.classList.toggle('active',on);if(on){cancelAnimationFrame(raf);draw()}else cancelAnimationFrame(raf)}
function bindExperience(){$('youtubePlaylistModalClose')?.addEventListener('click',()=>$('youtubePlaylistModal')?.classList.add('hidden'));$('youtubePlaylistSaveBtn')?.addEventListener('click',()=>loadPL($('youtubePlaylistInput').value));$('youtubePlaylistClearBtn')?.addEventListener('click',clearPL);$('lyricsBtn')?.addEventListener('click',lyrics);$('lyricsModalClose')?.addEventListener('click',()=>$('lyricsModal')?.classList.add('hidden'));$('lyricsSaveBtn')?.addEventListener('click',saveLyrics);$('lyricsClearBtn')?.addEventListener('click',clearLyrics);$('cinematicVisualsBtn')?.addEventListener('click',toggle);visual();setInterval(sync,700);const id=saved();if(id)setTimeout(()=>loadPL(id),2000)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',bindExperience):bindExperience();
})();
