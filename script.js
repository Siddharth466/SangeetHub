/* ═══════════════════════════════════════════════════════════
   SANGEETHUB PREMIUM — REDESIGNED APPLICATION LOGIC
   Complete rewrite with bug fixes, ambient mood lighting,
   and improved architecture
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════════════════════
// DATA STORE
// ═══════════════════════════════════════════════════════════

const SONGS = [
  { id: 1,  title: 'The Last Letter', artist: 'Maan Panu',              album: 'Emotions',           genre: 'hindi',    mood: 'sad',        src: 'Songs/song1.mp3',   cover: 'Images/c1.png',  duration: '3:42', plays: 1204, year: 2023 },
  { id: 2,  title: 'Moves',           artist: 'Shubh',                  album: 'Moves EP',            genre: 'punjabi',  mood: 'energetic',  src: 'Songs/song2.mp3',   cover: 'Images/c2.png',  duration: '3:08', plays: 3871, year: 2023 },
  { id: 3,  title: 'Tension',         artist: 'Dhanda Nyoliwala',       album: 'Kohram',              genre: 'haryanvi', mood: 'party',      src: 'Songs/song3.mp3',   cover: 'Images/c3.png',  duration: '3:28', plays: 2653, year: 2022 },
  { id: 4,  title: 'Haryana To Punjab', artist: 'Kaka',                 album: 'Collaborations',      genre: 'punjabi',  mood: 'party',      src: 'Songs/song6.mp3',   cover: 'Images/c6.png',  duration: '4:05', plays: 1889, year: 2023 },
  { id: 5,  title: 'Guilty',          artist: 'Karan Aunjla, Inder Chahal', album: 'Collaborations', genre: 'punjabi',  mood: 'chill',      src: 'Songs/song5.mp3',   cover: 'Images/c5.png',  duration: '4:30', plays: 987,  year: 2021 },
  { id: 6,  title: 'Not Guilty',      artist: 'Dhanda Nyoliwala',       album: 'Kohram',              genre: 'hindi',    mood: 'chill',      src: 'Songs/song4.mp3',   cover: 'Images/c4.png',  duration: '3:04', plays: 2055, year: 2026 },
  { id: 7,  title: 'Kohram Intro',    artist: 'Dhanda Nyoliwala',       album: 'Kohram',              genre: 'haryanvi', mood: 'party',      src: 'Songs/song7.mp3',   cover: 'Images/c7.png',  duration: '3:11', plays: 2785, year: 2025 },
  { id: 8,  title: 'Pagal Banawe',    artist: 'Bali Sharma',            album: 'Sinta',               genre: 'haryanvi', mood: 'party',      src: 'Songs/Song8.mp3',   cover: 'Images/c8.png',  duration: '3:39', plays: 2785, year: 2024 },
  { id: 10, title: 'Tough',           artist: 'Krish Rao',              album: 'Tough',               genre: 'haryanvi', mood: 'energetic',  src: 'Songs/song10.mp3',  cover: 'Images/c7.png', duration: '2:39', plays: 1200, year: 2026 },
  { id: 11, title: 'Do Numbari',      artist: 'Dhanda Nyoliwala',       album: 'Mirzapur The Movie',  genre: 'haryanvi', mood: 'aggressive', src: 'Songs/song11.mp3',  cover: 'Images/c3.png', duration: '2:43', plays: 3450, year: 2026 },
  { id: 12, title: '9:45',            artist: 'Prabh Singh',            album: '9:45',                genre: 'punjabi',  mood: 'romantic',   src: 'Songs/song12.mp3',  cover: 'Images/c2.png', duration: '1:57', plays: 8900, year: 2023 },
  { id: 13, title: 'Godhe 3',         artist: 'Masoom Sharma',          album: 'Godhe 3',             genre: 'haryanvi', mood: 'energetic',  src: 'Songs/song14.mp3',  cover: 'Images/c8.png', duration: '2:50', plays: 2100, year: 2025 },
  { id: 14, title: 'Main Vohe',       artist: 'Masoom Sharma',          album: 'Main Vohe',           genre: 'haryanvi', mood: 'sad',        src: 'Songs/song13.mp3',  cover: 'Images/c6.png', duration: '3:10', plays: 1540, year: 2026 },
];

const ARTISTS = [
  { id: 1, name: 'Shubh',             emoji: '🎤', followers: '4.2M', verified: true,  songs: [2],        color: 'linear-gradient(135deg,#7C3AED,#5B21B6)' },
  { id: 2, name: 'Maan Panu',         emoji: '🎵', followers: '1.8M', verified: true,  songs: [1],        color: 'linear-gradient(135deg,#06B6D4,#0891B2)' },
  { id: 3, name: 'Dhanda Nyoliwala',  emoji: '🔥', followers: '2.3M', verified: true,  songs: [3,6,7,11], color: 'linear-gradient(135deg,#10B981,#059669)' },
  { id: 4, name: 'Kaka',              emoji: '🎶', followers: '3.1M', verified: false, songs: [4],        color: 'linear-gradient(135deg,#F59E0B,#D97706)' },
  { id: 5, name: 'Karan Aunjla',      emoji: '🌟', followers: '5.6M', verified: true,  songs: [5],        color: 'linear-gradient(135deg,#EF4444,#DC2626)' },
  { id: 6, name: 'Masoom Sharma',     emoji: '🫀', followers: '2.9M', verified: true,  songs: [13,14],    color: 'linear-gradient(135deg,#8B5CF6,#7C3AED)' },
];

const GENRES = [
  { name: 'Punjabi',   emoji: '🎺', color: '#7C3AED', songs: 1420, filter: 'punjabi'  },
  { name: 'Haryanvi',  emoji: '🥁', color: '#06B6D4', songs: 640,  filter: 'haryanvi' },
  { name: 'Hindi Pop', emoji: '🎸', color: '#10B981', songs: 3200, filter: 'hindi'    },
  { name: 'Chill',     emoji: '🧊', color: '#8B5CF6', songs: 890,  filter: 'chill'    },
  { name: 'Party',     emoji: '🎉', color: '#F59E0B', songs: 1100, filter: 'party'    },
  { name: 'Romantic',  emoji: '💕', color: '#EF4444', songs: 760,  filter: 'romantic' },
  { name: 'Sad',       emoji: '😢', color: '#6366F1', songs: 430,  filter: 'sad'      },
  { name: 'Energetic', emoji: '⚡', color: '#0EA5E9', songs: 980,  filter: 'energetic'},
];

const MOODS = [
  { name: 'Energetic', emoji: '⚡', key: 'energetic', color: '#F59E0B', desc: 'High energy anthems' },
  { name: 'Chill',     emoji: '🧊', key: 'chill',     color: '#06B6D4', desc: 'Laid-back vibes'     },
  { name: 'Romantic',  emoji: '💕', key: 'romantic',  color: '#EC4899', desc: 'Love songs'          },
  { name: 'Party',     emoji: '🎉', key: 'party',     color: '#8B5CF6', desc: 'Dancefloor hits'     },
  { name: 'Sad',       emoji: '🌧️', key: 'sad',       color: '#6366F1', desc: 'Emotional ballads'   },
  { name: 'Aggressive',emoji: '🔥', key: 'aggressive',color: '#EF4444', desc: 'Hard-hitting tracks' },
];

const FEATURES = [
  { icon: '🎵', title: 'Curated Music Library', desc: 'Browse the tracks currently included in this project and start listening in one click.', color: '#7C3AED' },
  { icon: '🎧', title: 'Playback Controls', desc: 'Play, pause, skip, seek, change volume, shuffle, and repeat supported tracks.', color: '#06B6D4' },
  { icon: '🌈', title: 'Ambient Mood Themes', desc: 'Choose a mood to change the interface atmosphere while you listen.', color: '#10B981' },
  { icon: '💗', title: 'Liked Songs', desc: 'Save favorite tracks in this browser and return to them later.', color: '#F59E0B' },
  { icon: '📚', title: 'Personal Playlists', desc: 'Create playlists and organize tracks locally in your browser.', color: '#EF4444' },
  { icon: '🔎', title: 'Search & Queue', desc: 'Find tracks from the included library and manage what plays next.', color: '#8B5CF6' },
];

const TESTIMONIALS = [
  { text: 'Choose an ambient theme to change the visual atmosphere while listening.', name: 'Ambient Themes', role: 'Visual feature', initials: 'AT', stars: 5 },
  { text: 'Start a track and control playback, seeking, volume, shuffle, and repeat.', name: 'Playback Controls', role: 'Player feature', initials: 'PC', stars: 5 },
  { text: 'Keep favorite songs in one place using the Liked Songs library.', name: 'Liked Songs', role: 'Library feature', initials: 'LS', stars: 5 },
  { text: 'Search by song title or artist to find tracks in the included library.', name: 'Song Search', role: 'Discovery feature', initials: 'SS', stars: 5 },
  { text: 'Create named playlists stored locally in this browser.', name: 'Personal Playlists', role: 'Browser feature', initials: 'PL', stars: 5 },
  { text: 'Load a public YouTube playlist in the embedded player when available.', name: 'YouTube Player', role: 'External embed', initials: 'YT', stars: 5 },
];

// ═══════════════════════════════════════════════════════════
function safeStorageGet(key) {
  try { return window.localStorage.getItem(key); }
  catch (error) { console.warn('Local storage is unavailable:', error); return null; }
}
function safeStorageSet(key, value) {
  try { window.localStorage.setItem(key, String(value)); return true; }
  catch (error) { console.warn('Could not save local setting:', key, error); return false; }
}
function safeStorageRemove(key) {
  try { window.localStorage.removeItem(key); return true; }
  catch (error) { console.warn('Could not clear local setting:', key, error); return false; }
}
function readStoredJSON(key, fallback) {
  const raw = safeStorageGet(key);
  if (raw === null || raw === '') return fallback;
  try { return JSON.parse(raw); }
  catch (error) { safeStorageRemove(key); return fallback; }
}
function readStoredArray(key) {
  const value = readStoredJSON(key, []);
  return Array.isArray(value) ? value : [];
}
function readStoredObject(key, fallback = null) {
  const value = readStoredJSON(key, fallback);
  return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
}

// APP STATE
// ═══════════════════════════════════════════════════════════

const state = {
  currentPage: 'landing',
  pageHistory: ['landing'],
  pageHistoryIndex: 0,
  activePlaylistId: null,
  mood: safeStorageGet('sh_mood') || 'default',
  theme: safeStorageGet('sh_theme') || 'dark',
  player: {
    currentSongIndex: -1,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 0, // 0=off, 1=all, 2=one
    volume: (() => { const v = Number(safeStorageGet('sh_volume')); return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.8; })(),
    progress: 0,
    duration: 0,
    queue: [...SONGS],
    history: [],
  },
  favorites: new Set(readStoredArray('sh_favorites')),
  playlists: readStoredArray('sh_playlists'),
  listenHistory: readStoredArray('sh_history'),
  user: readStoredObject('sh_user', null),
  recentSearches: readStoredArray('sh_searches'),
  totalPlayed: Math.max(0, Number.parseInt(safeStorageGet('sh_totalPlayed') || '0', 10) || 0),
  totalMinutes: Math.max(0, Number.parseInt(safeStorageGet('sh_totalMinutes') || '0', 10) || 0),
  contextSongId: null,
  isDraggingProgress: false,
  isDraggingVolume: false,
  typedInterval: null,
};

// ═══════════════════════════════════════════════════════════
// DOM HELPERS
// ═══════════════════════════════════════════════════════════

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

// ═══════════════════════════════════════════════════════════
// DOM REFERENCES
// ═══════════════════════════════════════════════════════════

let DOM = {};
function cacheDOM() {
  DOM = {
    loader: $('loader'), loaderBar: $('loaderBar'),
    app: $('app'),
    sidebar: $('sidebar'), sidebarToggle: $('sidebarToggle'),
    mobileMenuBtn: $('mobileMenuBtn'),
    globalSearch: $('globalSearch'), searchDropdown: $('searchDropdown'),
    themeToggle: $('themeToggle'), themeIcon: $('themeIcon'),
    authBtn: $('authBtn'), authModal: $('authModal'), authModalClose: $('authModalClose'),
    topbarUser: $('topbarUser'), pageContent: $('pageContent'),
    // player
    playerBar: $('playerBar'),
    playerCover: $('playerCover'), playerTitle: $('playerTitle'), playerArtist: $('playerArtist'),
    playerLikeBtn: $('playerLikeBtn'), playBtn: $('playBtn'), playIcon: $('playIcon'),
    prevBtn: $('prevBtn'), nextBtn: $('nextBtn'), shuffleBtn: $('shuffleBtn'), repeatBtn: $('repeatBtn'),
    progressTrack: $('progressTrack'), progressFill: $('progressFill'), progressThumb: $('progressThumb'),
    currentTime: $('currentTime'), duration: $('duration'),
    muteBtn: $('muteBtn'), volIcon: $('volIcon'), volumeRange: $('volumeRange'), volumeFill: $('volumeFill'),
    queueBtn: $('queueBtn'), fullscreenPlayerBtn: $('fullscreenPlayerBtn'),
    playerVisualizer: $('playerVisualizer'), playerAmbientGlow: $('playerAmbientGlow'),
    playerCoverGlow: $('playerCoverGlow'),
    audio: $('audioEngine'),
    // queue
    queuePanel: $('queuePanel'), closeQueueBtn: $('closeQueueBtn'),
    queueCurrent: $('queueCurrent'), queueList: $('queueList'),
    // fullscreen
    fullscreenPlayer: $('fullscreenPlayer'), fsBg: $('fsBg'), fsCloseBtn: $('fsCloseBtn'),
    fsCover: $('fsCover'), fsTitle: $('fsTitle'), fsArtist: $('fsArtist'), fsTags: $('fsTags'),
    fsPlayBtn: $('fsPlayBtn'), fsPlayIcon: $('fsPlayIcon'),
    fsPrevBtn: $('fsPrevBtn'), fsNextBtn: $('fsNextBtn'),
    fsShuffleBtn: $('fsShuffleBtn'), fsRepeatBtn: $('fsRepeatBtn'), fsLikeBtn: $('fsLikeBtn'),
    fsCurrentTime: $('fsCurrentTime'), fsDuration: $('fsDuration'),
    fsProgressTrack: $('fsProgressTrack'), fsProgressFill: $('fsProgressFill'), fsProgressThumb: $('fsProgressThumb'),
    fsVinylWrap: $('fsVinylWrap'), fsVolume: $('fsVolume'), fsVolFill: $('fsVolFill'),
    fsLyricsContent: $('fsLyricsContent'), waveformCanvas: $('waveformCanvas'),
    // modals
    playlistModal: $('playlistModal'), playlistModalClose: $('playlistModalClose'),
    playlistForm: $('playlistForm'),
    playlistName: $('playlistName'), playlistDesc: $('playlistDesc'),
    createPlaylistBtn: $('createPlaylistBtn'), createPlaylistSidebar: $('createPlaylistSidebar'),
    ytModal: $('ytModal'), ytModalClose: $('ytModalClose'), ytConnectBtn: $('ytConnectBtn'),
    connectYoutubePlaylist: $('connectYoutubePlaylist'), ytPlaylistUrl: $('ytPlaylistUrl'),
    ytEmbedWrap: $('ytEmbedWrap'), ytPlaylistFrame: $('ytPlaylistFrame'),
    addToPlaylistModal: $('addToPlaylistModal'), addToPlaylistModalClose: $('addToPlaylistModalClose'),
    addToPlaylistForm: $('addToPlaylistForm'), targetPlaylistSelect: $('targetPlaylistSelect'),
    // toast
    toastContainer: $('toastContainer'),
    // landing
    typedText: $('typedText'), vinylCoverImg: $('vinylCoverImg'),
    heroNowPlaying: $('heroNowPlaying'),
    // user
    sidebarUserName: $('sidebarUserName'), sidebarAvatar: $('sidebarAvatar'), userMenuBtn: $('userMenuBtn'),
    // context menu
    contextMenu: $('contextMenu'),
    // ambient
    ambientBackdrop: $('ambientBackdrop'),
  };
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════

window.addEventListener('load', () => {
  cacheDOM();
  applyTheme(state.theme);
  applyMood(state.mood, false); // apply without animation on load
  animateLoader();
  setTimeout(initApp, 2000);
});

function animateLoader() {
  let progress = 0;
  const bar = $('loaderBar');
  if (!bar) return;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    bar.style.width = progress + '%';
  }, 120);
}

function initApp() {
  updateHistoryControls();
  DOM.loader.classList.add('fade-out');
  setTimeout(() => { if (DOM.loader) DOM.loader.style.display = 'none'; }, 700);
  DOM.app.classList.remove('hidden');

  initHeroCanvas();
  initTypedText();
  initLandingPage();
  initPlayer();
  initNavigation();
  initSearch();
  initAuth();
  initTheme();
  initMoodSystem();
  initModals();
  initMobileNav();
  initSidebarCollapse();
  initCounterAnimation();
  initTestimonialSlider();
  initScrollAnimations();
  initContextMenu();
  initKeyboardShortcuts();
  updatePlayerUI();
  updateSidebarPlaylists();
  updateAuthUI();
  updateDashboard();
  updateTimeGreeting();

  setTimeout(() => showToast('Welcome to SangeetHub! 🎵', 'info'), 600);
}

// ═══════════════════════════════════════════════════════════
// HERO CANVAS (Particle System — no THREE.js dependency)
// ═══════════════════════════════════════════════════════════

function initHeroCanvas() {
  const canvas = $('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, particles = [], animId;
  let mouseX = 0, mouseY = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildParticles();
  }

  function buildParticles() {
    particles = [];
    const count = Math.floor((W * H) / 8000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? '#7C3AED' : '#06B6D4',
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx + (mouseX - W / 2) * 0.0003;
      p.y += p.vy + (mouseY - H / 2) * 0.0003;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }
    // Draw connections
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - dist / 80) * 0.15;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener('resize', resize);
  resize();
  draw();
}

// ═══════════════════════════════════════════════════════════
// TYPED TEXT
// ═══════════════════════════════════════════════════════════

function initTypedText() {
  const el = DOM.typedText;
  if (!el) return;
  const words = ['Beat Drop', 'Soul Shine', 'Deep Groove', 'Pure Vibes', 'Every Note'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) { deleting = true; return setTimeout(type, 2200); }
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; return setTimeout(type, 300); }
    }
    setTimeout(type, deleting ? 50 : 80);
  }
  setTimeout(type, 600);
}

// ═══════════════════════════════════════════════════════════
// LANDING PAGE CONTENT
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
  const sorted = [...SONGS].sort((a, b) => b.plays - a.plays).slice(0, 8);
  container.innerHTML = sorted.map((s, i) => buildTrackRow(s, i + 1)).join('');
  attachTrackRowEvents(container);
}

function buildTrackRow(song, num) {
  const liked = state.favorites.has(song.id);
  const isCurrent = state.player.currentSongIndex >= 0 &&
    state.player.queue[state.player.currentSongIndex]?.id === song.id;
  return `
    <div class="track-row ${isCurrent ? 'playing' : ''}" data-song-id="${song.id}" role="row" tabindex="0"
         aria-label="${song.title} by ${song.artist}">
      <span class="track-num">${num || ''}</span>
      <span class="track-play-inline" aria-hidden="true"><i class="fas fa-play"></i></span>
      <img class="track-cover" src="${song.cover}" alt="${song.title}"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2246%22 height=%2246%22 viewBox=%220 0 46 46%22><rect width=%2246%22 height=%2246%22 fill=%22%231E2130%22 rx=%2210%22/><text x=%2223%22 y=%2230%22 text-anchor=%22middle%22 font-size=%2220%22>🎵</text></svg>'"/>
      <div class="track-info">
        <div class="track-title">${escapeHtml(song.title)}</div>
        <div class="track-artist">${escapeHtml(song.artist)}</div>
      </div>
      <button class="track-like-btn ${liked ? 'liked' : ''}" data-song-id="${song.id}" aria-label="${liked ? 'Unlike' : 'Like'} ${song.title}">
        <i class="${liked ? 'fas' : 'far'} fa-heart"></i>
      </button>
      <span class="track-duration">${song.duration}</span>
    </div>`;
}

function attachTrackRowEvents(container) {
  container.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.track-like-btn')) return;
      const id = parseInt(row.dataset.songId);
      const idx = state.player.queue.findIndex(s => s.id === id);
      if (idx >= 0) playSong(idx);
    });
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); }
    });
    row.addEventListener('contextmenu', e => {
      e.preventDefault();
      showContextMenu(e, parseInt(row.dataset.songId));
    });
  });
  container.querySelectorAll('.track-like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.songId);
      toggleFavorite(id);
      const liked = state.favorites.has(id);
      btn.className = `track-like-btn ${liked ? 'liked' : ''}`;
      btn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i>`;
      btn.setAttribute('aria-label', `${liked ? 'Unlike' : 'Like'}`);
    });
  });
}

function renderArtistsGrid() {
  const g = $('artistsGrid');
  if (!g) return;
  g.innerHTML = ARTISTS.map(a => `
    <div class="artist-card fade-in" data-artist-id="${a.id}" role="button" tabindex="0"
         aria-label="Play ${a.name}'s music">
      <div class="artist-img-wrap">
        <div class="artist-img-placeholder" style="background:${a.color}">${a.emoji}</div>
      </div>
      <div class="artist-name">${escapeHtml(a.name)}${a.verified ? ' <i class="fas fa-circle-check artist-verified" aria-label="Verified"></i>' : ''}</div>
      <div class="artist-followers">${a.followers} followers</div>
    </div>`).join('');
  g.querySelectorAll('.artist-card').forEach(card => {
    const activate = () => {
      const artist = ARTISTS.find(a => a.id === parseInt(card.dataset.artistId));
      if (!artist) return;
      const songs = SONGS.filter(s => artist.songs.includes(s.id));
      if (songs.length) {
        const idx = state.player.queue.findIndex(s => s.id === songs[0].id);
        if (idx >= 0) playSong(idx);
      }
      showToast(`Playing ${artist.name}'s music 🎤`, 'success');
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') activate(); });
  });
}

function renderGenresGrid() {
  const g = $('genresGrid');
  if (!g) return;
  g.innerHTML = GENRES.map(genre => `
    <div class="genre-card" style="background:linear-gradient(135deg,${genre.color}cc,${genre.color}66)"
         data-filter="${genre.filter}" role="button" tabindex="0" aria-label="Browse ${genre.name}">
      <span class="genre-emoji">${genre.emoji}</span>
      <div class="genre-name">${genre.name}</div>
      <div class="genre-count">${genre.songs.toLocaleString()} songs</div>
    </div>`).join('');
  g.querySelectorAll('.genre-card').forEach(card => {
    const go = () => { navigateTo('explore'); setTimeout(() => filterExplore(card.dataset.filter), 200); };
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  });
}

function renderFeaturesGrid() {
  const g = $('featuresGrid');
  if (!g) return;
  g.innerHTML = FEATURES.map(f => `
    <div class="feature-card">
      <div class="feature-icon" style="background:${f.color}22;color:${f.color};border:1px solid ${f.color}44">
        ${f.icon}
      </div>
      <div class="feature-title">${escapeHtml(f.title)}</div>
      <div class="feature-desc">${escapeHtml(f.desc)}</div>
    </div>`).join('');
}

function renderTestimonials() {
  const track = $('testimonialsTrack');
  if (!track) return;
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${escapeHtml(t.text)}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div>
          <div class="testimonial-name">${escapeHtml(t.name)}</div>
          <div class="testimonial-role">${escapeHtml(t.role)}</div>
        </div>
      </div>
    </div>`).join('');
}

function initTestimonialSlider() {
  const track = $('testimonialsTrack');
  const dots = $('testimonialDots');
  if (!track || !dots) return;
  const total = TESTIMONIALS.length;
  let current = 0;

  function getVisible() {
    return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }
  function buildDots() {
    const cnt = Math.ceil(total / getVisible());
    dots.innerHTML = Array.from({ length: cnt }, (_, i) =>
      `<div class="t-dot ${i === current ? 'active' : ''}" data-idx="${i}" role="button" tabindex="0" aria-label="Slide ${i+1}"></div>`
    ).join('');
    dots.querySelectorAll('.t-dot').forEach(d => {
      d.addEventListener('click', () => { current = parseInt(d.dataset.idx); slide(); });
    });
  }
  function slide() {
    const visible = getVisible();
    const cardW = (track.children[0]?.offsetWidth || 320) + 20;
    track.style.transform = `translateX(-${current * visible * cardW}px)`;
    dots.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    const maxIdx = Math.ceil(total / visible) - 1;
    current = current >= maxIdx ? -1 : current;
  }
  buildDots();
  window.addEventListener('resize', () => { buildDots(); current = 0; slide(); });
  setInterval(() => { current++; slide(); }, 4500);
}

function setupHeroButtons() {
  $('heroStartBtn')?.addEventListener('click', () => navigateTo('app-home'));
  $('heroExploreBtn')?.addEventListener('click', () => navigateTo('explore'));
  $('viewAllTrending')?.addEventListener('click', () => navigateTo('explore'));
}

// ═══════════════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════

function initCounterAnimation() {
  const els = $$('.stat-num[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let start = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start).toLocaleString();
        if (start >= target) clearInterval(timer);
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(e => obs.observe(e));
}

// ═══════════════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  $$('.feature-card, .artist-card, .genre-card, .testimonial-card, .track-row').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    obs.observe(el);
  });
}

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════

function initNavigation() {
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
  });
  $('histBack')?.addEventListener('click', () => navigateHistory(-1));
  $('histForward')?.addEventListener('click', () => navigateHistory(1));
  document.querySelector('.brand[data-page]')?.addEventListener('click', event => { event.preventDefault(); navigateTo('landing'); });
}

function navigateTo(page, options = {}) {
  if (!page) return;
  if (!options.skipHistory && page !== state.currentPage) {
    state.pageHistory = state.pageHistory.slice(0, state.pageHistoryIndex + 1);
    state.pageHistory.push(page);
    state.pageHistoryIndex = state.pageHistory.length - 1;
  }
  state.currentPage = page;
  updateHistoryControls();

  // Update sidebar active state
  $$('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  $$('.mob-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Show/hide pages
  $$('.page').forEach(p => p.classList.remove('active'));
  const pageEl = $(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');

  // Page-specific inits
  if (page === 'app-home') { renderDiscoverPage(); }
  else if (page === 'explore') { renderExplorePage(); }
  else if (page === 'favorites') { renderFavorites(); }
  else if (page === 'library') { renderLibrary(); }
  else if (page === 'dashboard') { updateDashboard(); }
  else if (page === 'search') { setTimeout(() => $('searchPageInput')?.focus(), 100); }

  // Close mobile sidebar if open
  DOM.sidebar?.classList.remove('mobile-open');
  // Scroll to top
  DOM.pageContent?.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateHistory(direction) {
  const nextIndex = state.pageHistoryIndex + direction;
  if (nextIndex < 0 || nextIndex >= state.pageHistory.length) return;
  state.pageHistoryIndex = nextIndex;
  navigateTo(state.pageHistory[nextIndex], { skipHistory: true });
}
function updateHistoryControls() {
  const back = $('histBack'), forward = $('histForward');
  if (back) back.disabled = state.pageHistoryIndex <= 0;
  if (forward) forward.disabled = state.pageHistoryIndex >= state.pageHistory.length - 1;
}

// ═══════════════════════════════════════════════════════════
// DISCOVER PAGE
// ═══════════════════════════════════════════════════════════

function renderDiscoverPage() {
  // Recently Played
  const recent = $('recentlyPlayed');
  if (recent) {
    const recSongs = state.listenHistory.slice(0, 5).map(id => SONGS.find(s => s.id === id)).filter(Boolean);
    if (recSongs.length) {
      recent.innerHTML = recSongs.map((s, i) => buildTrackRow(s, i + 1)).join('');
      attachTrackRowEvents(recent);
    } else {
      recent.innerHTML = '<p style="color:var(--text-3);padding:16px 0;font-size:0.9rem">No recently played songs yet.</p>';
    }
  }
  // Trending Grid
  const tGrid = $('trendingGrid');
  if (tGrid) {
    const top = [...SONGS].sort((a, b) => b.plays - a.plays).slice(0, 6);
    tGrid.innerHTML = top.map(s => buildTrackCard(s)).join('');
    attachTrackCardEvents(tGrid);
  }
  // New Releases
  const newR = $('newReleases');
  if (newR) {
    const latest = [...SONGS].sort((a, b) => b.year - a.year).slice(0, 6);
    newR.innerHTML = latest.map(s => buildTrackCard(s)).join('');
    attachTrackCardEvents(newR);
  }
}

function buildTrackCard(song) {
  const liked = state.favorites.has(song.id);
  return `
    <div class="track-card" data-song-id="${song.id}" role="button" tabindex="0" aria-label="${song.title}">
      <div class="track-card-img-wrap">
        <img class="track-card-img" src="${song.cover}" alt="${song.title}"
             onerror="this.parentElement.innerHTML='<div style=width:100%;aspect-ratio:1;background:var(--surface3);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:2rem>🎵</div>'"/>
        <button class="track-card-play" aria-label="Play"><i class="fas fa-play"></i></button>
      </div>
      <div class="track-card-title">${escapeHtml(song.title)}</div>
      <div class="track-card-artist">${escapeHtml(song.artist)}</div>
    </div>`;
}

function attachTrackCardEvents(container) {
  container.querySelectorAll('.track-card').forEach(card => {
    const play = () => {
      const id = parseInt(card.dataset.songId);
      const idx = state.player.queue.findIndex(s => s.id === id);
      if (idx >= 0) playSong(idx);
    };
    card.addEventListener('click', play);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') play(); });
  });
}

// ═══════════════════════════════════════════════════════════
// EXPLORE PAGE
// ═══════════════════════════════════════════════════════════

function renderExplorePage() {
  // Genres mini
  const eg = $('exploreGenres');
  if (eg) {
    eg.innerHTML = GENRES.map(genre => `
      <div class="genre-card" style="background:linear-gradient(135deg,${genre.color}cc,${genre.color}66)"
           data-filter="${genre.filter}" role="button" tabindex="0">
        <span class="genre-emoji">${genre.emoji}</span>
        <div class="genre-name">${genre.name}</div>
        <div class="genre-count">${genre.songs.toLocaleString()}</div>
      </div>`).join('');
    eg.querySelectorAll('.genre-card').forEach(card => {
      card.addEventListener('click', () => filterExplore(card.dataset.filter));
    });
  }

  // Moods
  const em = $('exploreMoods');
  if (em) {
    em.innerHTML = MOODS.map(m => `
      <div class="mood-explore-card" data-filter="${m.key}" role="button" tabindex="0" style="border-color:${m.color}44">
        <div class="mood-emoji">${m.emoji}</div>
        <div class="mood-name" style="color:${m.color}">${m.name}</div>
        <div class="mood-count">${m.desc}</div>
      </div>`).join('');
    em.querySelectorAll('.mood-explore-card').forEach(card => {
      card.addEventListener('click', () => filterExplore(card.dataset.filter));
    });
  }

  // All songs
  renderExploreList('all');
  setupExploreTabs();
}

function setupExploreTabs() {
  const tabs = $('exploreTabs');
  if (!tabs) return;
  tabs.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterExplore(tab.dataset.filter);
    });
  });
}

function filterExplore(filter) {
  // Update tabs
  $$('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.filter === filter));
  renderExploreList(filter);
}

function renderExploreList(filter) {
  const list = $('exploreList');
  if (!list) return;
  const filtered = filter === 'all'
    ? SONGS
    : SONGS.filter(s => s.genre === filter || s.mood === filter);
  if (!filtered.length) {
    list.innerHTML = '<p style="color:var(--text-3);padding:20px 0;font-size:0.9rem">No songs found for this filter.</p>';
    return;
  }
  list.innerHTML = filtered.map((s, i) => buildTrackRow(s, i + 1)).join('');
  attachTrackRowEvents(list);
}

// ═══════════════════════════════════════════════════════════
// FAVORITES
// ═══════════════════════════════════════════════════════════

function renderFavorites() {
  const list = $('favoritesList');
  const cnt = $('favCount');
  if (!list) return;
  const favSongs = SONGS.filter(s => state.favorites.has(s.id));
  if (cnt) cnt.textContent = `${favSongs.length} song${favSongs.length !== 1 ? 's' : ''}`;
  if (!favSongs.length) {
    list.innerHTML = '<p style="color:var(--text-3);padding:20px 32px;font-size:0.9rem">No liked songs yet. Tap the ♥ on any song to save it here.</p>';
    return;
  }
  list.innerHTML = favSongs.map((s, i) => buildTrackRow(s, i + 1)).join('');
  attachTrackRowEvents(list);
  list.style.padding = '0 32px';

  const playAll = $('playAllFavs');
  if (playAll) {
    playAll.onclick = () => {
      const shuffled = [...favSongs].sort(() => Math.random() - 0.5);
      state.player.queue = shuffled;
      playSong(0);
    };
  }
}

// ═══════════════════════════════════════════════════════════
// LIBRARY
// ═══════════════════════════════════════════════════════════

function renderLibrary() {
  const grid = $('libraryGrid');
  if (!grid) return;
  const items = [
    { icon: '💕', name: 'Liked Songs', meta: `${state.favorites.size} songs`, color: '#EC4899', action: () => navigateTo('favorites') },
    ...state.playlists.map(pl => ({
      icon: '🎵', name: pl.name, meta: `${pl.songs?.length || 0} songs`, color: '#7C3AED', action: () => showPlaylistDetail(pl),
    })),
  ];
  grid.innerHTML = items.map((item, i) => `
    <div class="library-card" data-idx="${i}" role="button" tabindex="0" aria-label="${item.name}">
      <div class="library-card-icon" style="background:${item.color}22;color:${item.color}">${item.icon}</div>
      <div class="library-card-name">${escapeHtml(item.name)}</div>
      <div class="library-card-meta">${item.meta}</div>
    </div>`).join('');
  grid.querySelectorAll('.library-card').forEach((card, i) => {
    card.addEventListener('click', () => items[i].action());
  });
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════

function updateDashboard() {
  const t = n => document.getElementById(n);
  if (t('dashTotalPlayed')) t('dashTotalPlayed').textContent = state.totalPlayed.toLocaleString();
  if (t('dashMinutes')) t('dashMinutes').textContent = state.totalMinutes.toLocaleString();
  if (t('dashFavs')) t('dashFavs').textContent = state.favorites.size.toLocaleString();
  if (t('dashPlaylists')) t('dashPlaylists').textContent = state.playlists.length.toLocaleString();

  const most = $('mostPlayedList');
  if (most) {
    const top = [...SONGS].sort((a, b) => b.plays - a.plays).slice(0, 5);
    most.innerHTML = top.map((s, i) => buildTrackRow(s, i + 1)).join('');
    most.style.padding = '0';
    attachTrackRowEvents(most);
  }

  const activity = $('activityList');
  if (activity) {
    const recent = state.listenHistory.slice(0, 8).map(id => SONGS.find(s => s.id === id)).filter(Boolean);
    if (!recent.length) {
      activity.innerHTML = '<p style="color:var(--text-3);font-size:0.875rem">No activity yet. Start listening!</p>';
    } else {
      activity.innerHTML = recent.map(s => `
        <div class="activity-item">
          <img src="${s.cover}" alt="${s.title}" width="36" height="36"
               onerror="this.style.display='none'"/>
          <div class="activity-info">
            <div class="activity-title">${escapeHtml(s.title)}</div>
            <div class="activity-meta">${escapeHtml(s.artist)} • Recently played</div>
          </div>
        </div>`).join('');
    }
  }
}

// ═══════════════════════════════════════════════════════════
// TIME GREETING
// ═══════════════════════════════════════════════════════════

function updateTimeGreeting() {
  const el = $('greetingText');
  if (!el) return;
  const h = new Date().getHours();
  el.textContent = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : h < 21 ? 'Good Evening' : 'Good Night';
}

// ═══════════════════════════════════════════════════════════
// PLAYER
// ═══════════════════════════════════════════════════════════

function initPlayer() {
  const audio = DOM.audio;
  if (!audio) return;

  // Volume
  setVolume(state.player.volume);
  audio.volume = state.player.volume;

  // Audio events
  audio.addEventListener('timeupdate', () => {
    if (state.isDraggingProgress) return;
    const { currentTime, duration } = audio;
    if (!isFinite(duration) || duration === 0) return;
    const pct = (currentTime / duration) * 100;
    state.player.progress = pct;
    state.player.duration = duration;
    updateProgressUI(pct, currentTime, duration);
  });

  audio.addEventListener('ended', onTrackEnded);
  audio.addEventListener('error', e => {
    console.warn('Audio error:', e.type, audio.src);
    showToast('Could not play this track. Skipping...', 'error');
    setTimeout(() => nextSong(), 800);
  });

  audio.addEventListener('play', () => {
    state.player.isPlaying = true;
    updatePlayButtons();
    DOM.playerVisualizer?.classList.add('playing');
    DOM.heroNowPlaying?.querySelector('.hnp-wave')?.classList.add('playing');
  });

  audio.addEventListener('pause', () => {
    state.player.isPlaying = false;
    updatePlayButtons();
    DOM.playerVisualizer?.classList.remove('playing');
  });

  audio.addEventListener('loadedmetadata', () => {
    if (DOM.duration) DOM.duration.textContent = formatTime(audio.duration);
    if (DOM.fsDuration) DOM.fsDuration.textContent = formatTime(audio.duration);
  });

  // Progress click/drag
  if (DOM.progressTrack) {
    DOM.progressTrack.addEventListener('click', seekTo);
    DOM.progressTrack.addEventListener('mousedown', () => { state.isDraggingProgress = true; });
    document.addEventListener('mousemove', e => {
      if (!state.isDraggingProgress) return;
      seekFromEvent(DOM.progressTrack, e);
    });
    document.addEventListener('mouseup', () => { state.isDraggingProgress = false; });
    // Touch
    DOM.progressTrack.addEventListener('touchstart', () => { state.isDraggingProgress = true; }, { passive: true });
    document.addEventListener('touchmove', e => {
      if (!state.isDraggingProgress) return;
      seekFromEvent(DOM.progressTrack, e.touches[0]);
    }, { passive: true });
    document.addEventListener('touchend', () => { state.isDraggingProgress = false; });
  }

  // FS progress
  if (DOM.fsProgressTrack) {
    DOM.fsProgressTrack.addEventListener('click', e => seekFromEvent(DOM.fsProgressTrack, e));
  }

  // Volume control
  if (DOM.volumeRange) {
    DOM.volumeRange.addEventListener('click', setVolumeFromEvent);
    DOM.volumeRange.addEventListener('mousedown', () => { state.isDraggingVolume = true; });
    document.addEventListener('mousemove', e => {
      if (state.isDraggingVolume) setVolumeFromEvent(e);
    });
    document.addEventListener('mouseup', () => { state.isDraggingVolume = false; });
  }
  if (DOM.fsVolume) {
    DOM.fsVolume.addEventListener('click', e => {
      const rect = DOM.fsVolume.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setVolume(pct);
    });
  }

  // Controls
  DOM.playBtn?.addEventListener('click', togglePlay);
  DOM.prevBtn?.addEventListener('click', prevSong);
  DOM.nextBtn?.addEventListener('click', nextSong);
  DOM.shuffleBtn?.addEventListener('click', toggleShuffle);
  DOM.repeatBtn?.addEventListener('click', toggleRepeat);
  DOM.muteBtn?.addEventListener('click', toggleMute);
  DOM.queueBtn?.addEventListener('click', toggleQueue);
  DOM.closeQueueBtn?.addEventListener('click', toggleQueue);
  DOM.fullscreenPlayerBtn?.addEventListener('click', openFullscreen);
  DOM.fsCloseBtn?.addEventListener('click', closeFullscreen);
  DOM.fsPlayBtn?.addEventListener('click', togglePlay);
  DOM.fsPrevBtn?.addEventListener('click', prevSong);
  DOM.fsNextBtn?.addEventListener('click', nextSong);
  DOM.fsShuffleBtn?.addEventListener('click', toggleShuffle);
  DOM.fsRepeatBtn?.addEventListener('click', toggleRepeat);
  DOM.fsLikeBtn?.addEventListener('click', () => {
    const s = currentSong();
    if (s) toggleFavorite(s.id);
  });
  DOM.playerLikeBtn?.addEventListener('click', () => {
    const s = currentSong();
    if (s) toggleFavorite(s.id);
  });
  DOM.lyricsBtn?.addEventListener('click', () => {
    if (!DOM.fullscreenPlayer?.classList.contains('hidden')) return;
    openFullscreen();
  });
}

function currentSong() {
  const { currentSongIndex, queue } = state.player;
  return currentSongIndex >= 0 ? queue[currentSongIndex] : null;
}

function playSong(index) {
  const q = state.player.queue;
  if (index < 0 || index >= q.length) return;
  state.player.currentSongIndex = index;
  const song = q[index];

  // Update audio
  DOM.audio.src = song.src;
  DOM.audio.load();
  DOM.audio.play().catch(() => { showToast('Playback blocked. Click to play.', 'warning'); });

  // Track history
  state.totalPlayed++;
  state.listenHistory = [song.id, ...state.listenHistory.filter(id => id !== song.id)].slice(0, 50);
  safeStorageSet('sh_history', JSON.stringify(state.listenHistory));
  safeStorageSet('sh_totalPlayed', state.totalPlayed);

  updatePlayerUI();
  updateQueueUI();
  updateMoodFromSong(song);
  updateHeroNowPlaying(song);
}

function updatePlayerUI() {
  const song = currentSong();
  const playing = state.player.isPlaying;

  // Bar
  if (DOM.playerTitle) DOM.playerTitle.textContent = song?.title || 'Select a song';
  if (DOM.playerArtist) DOM.playerArtist.textContent = song?.artist || '—';
  if (DOM.playerCover && song) {
    DOM.playerCover.src = song.cover;
    DOM.playerCover.onerror = () => { DOM.playerCover.src = ''; };
    // Apply cover color to ambient glow
    if (DOM.playerAmbientGlow) {
      DOM.playerAmbientGlow.style.background = `radial-gradient(ellipse at center, var(--mood-glow), transparent 70%)`;
    }
  }
  // Like
  if (DOM.playerLikeBtn && song) {
    const liked = state.favorites.has(song.id);
    DOM.playerLikeBtn.className = `player-like-btn${liked ? ' liked' : ''}`;
    DOM.playerLikeBtn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i>`;
  }

  // Fullscreen
  if (DOM.fsTitle) DOM.fsTitle.textContent = song?.title || 'Select a song';
  if (DOM.fsArtist) DOM.fsArtist.textContent = song?.artist || '—';
  if (DOM.fsCover && song) {
    DOM.fsCover.src = song.cover;
    DOM.fsBg && (DOM.fsBg.style.backgroundImage = `url(${song.cover})`);
  }
  if (DOM.fsTags && song) {
    DOM.fsTags.innerHTML = [song.genre, song.mood].filter(Boolean).map(t =>
      `<span class="fs-tag">${t}</span>`).join('');
  }
  if (DOM.fsLikeBtn && song) {
    const liked = state.favorites.has(song.id);
    DOM.fsLikeBtn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart" style="color:${liked ? '#EC4899' : ''}"></i>`;
  }

  // Hero vinyl
  if (DOM.vinylCoverImg && song) DOM.vinylCoverImg.src = song.cover;

  updatePlayButtons();
  refreshAllTrackRows();
}

function updatePlayButtons() {
  const playing = state.player.isPlaying;
  const icon = playing ? 'fa-pause' : 'fa-play';
  if (DOM.playIcon) DOM.playIcon.className = `fas ${icon}`;
  if (DOM.fsPlayIcon) DOM.fsPlayIcon.className = `fas ${icon}`;

  // Vinyl spin
  $$('.hero-vinyl').forEach(v => v.classList.toggle('playing', playing));
  $$('.fs-vinyl').forEach(v => v.classList.toggle('playing', playing));
}

function togglePlay() {
  if (!currentSong()) {
    if (state.player.queue.length) { playSong(0); return; }
    showToast('No song selected', 'warning'); return;
  }
  if (state.player.isPlaying) {
    DOM.audio.pause();
  } else {
    DOM.audio.play().catch(() => {});
  }
}

function prevSong() {
  const { currentSongIndex, queue, history } = state.player;
  if (DOM.audio.currentTime > 3) { DOM.audio.currentTime = 0; return; }
  if (history.length) {
    const prev = state.player.history.pop();
    const idx = queue.findIndex(s => s.id === prev);
    if (idx >= 0) { playSong(idx); return; }
  }
  const next = currentSongIndex > 0 ? currentSongIndex - 1 : queue.length - 1;
  playSong(next);
}

function nextSong() {
  const { currentSongIndex, queue, isShuffle, repeatMode } = state.player;
  if (repeatMode === 2) { DOM.audio.currentTime = 0; DOM.audio.play(); return; }
  if (isShuffle) {
    let r;
    do { r = Math.floor(Math.random() * queue.length); } while (r === currentSongIndex && queue.length > 1);
    playSong(r);
  } else {
    const next = currentSongIndex < queue.length - 1 ? currentSongIndex + 1 : (repeatMode === 1 ? 0 : -1);
    if (next >= 0) playSong(next);
    else { DOM.audio.pause(); state.player.isPlaying = false; updatePlayButtons(); }
  }
}

function onTrackEnded() {
  const { repeatMode } = state.player;
  // Track minutes
  if (DOM.audio.duration && isFinite(DOM.audio.duration)) {
    state.totalMinutes += Math.floor(DOM.audio.duration / 60);
    safeStorageSet('sh_totalMinutes', state.totalMinutes);
  }
  if (repeatMode === 2) { DOM.audio.currentTime = 0; DOM.audio.play(); }
  else nextSong();
}

function toggleShuffle() {
  state.player.isShuffle = !state.player.isShuffle;
  DOM.shuffleBtn?.classList.toggle('active', state.player.isShuffle);
  DOM.fsShuffleBtn?.classList.toggle('active', state.player.isShuffle);
  showToast(state.player.isShuffle ? 'Shuffle on 🔀' : 'Shuffle off', 'info');
}

function toggleRepeat() {
  state.player.repeatMode = (state.player.repeatMode + 1) % 3;
  const mode = state.player.repeatMode;
  const labels = ['Repeat off', 'Repeat all 🔁', 'Repeat one 🔂'];
  [DOM.repeatBtn, DOM.fsRepeatBtn].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle('active', mode > 0);
    btn.querySelector('i').className = `fas ${mode === 2 ? 'fa-repeat-1' : 'fa-repeat'}`;
  });
  showToast(labels[mode], 'info');
}

function toggleMute() {
  if (DOM.audio.volume > 0) {
    state.player.lastVol = DOM.audio.volume;
    setVolume(0);
  } else {
    setVolume(state.player.lastVol || 0.8);
  }
}

function setVolume(v) {
  v = Math.max(0, Math.min(1, v));
  DOM.audio.volume = v;
  state.player.volume = v;
  safeStorageSet('sh_volume', v);
  const pct = v * 100;
  if (DOM.volumeFill) DOM.volumeFill.style.width = pct + '%';
  if (DOM.fsVolFill) DOM.fsVolFill.style.width = pct + '%';
  if (DOM.volIcon) {
    DOM.volIcon.className = `fas ${v === 0 ? 'fa-volume-xmark' : v < 0.4 ? 'fa-volume-low' : 'fa-volume-high'}`;
  }
}

function setVolumeFromEvent(e) {
  const rect = DOM.volumeRange.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  setVolume(pct);
}

function seekTo(e) { seekFromEvent(DOM.progressTrack, e); }

function seekFromEvent(trackEl, e) {
  if (!trackEl || !DOM.audio.duration) return;
  const rect = trackEl.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  DOM.audio.currentTime = pct * DOM.audio.duration;
}

function updateProgressUI(pct, current, total) {
  if (DOM.progressFill) DOM.progressFill.style.width = pct + '%';
  if (DOM.progressThumb) DOM.progressThumb.style.right = (100 - pct) / 100 * (DOM.progressTrack?.offsetWidth || 0) + 'px';
  if (DOM.currentTime) DOM.currentTime.textContent = formatTime(current);
  if (DOM.duration) DOM.duration.textContent = formatTime(total);
  if (DOM.fsProgressFill) DOM.fsProgressFill.style.width = pct + '%';
  if (DOM.fsCurrentTime) DOM.fsCurrentTime.textContent = formatTime(current);
  if (DOM.fsDuration) DOM.fsDuration.textContent = formatTime(total);
}

function formatTime(sec) {
  if (!sec || !isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ═══════════════════════════════════════════════════════════
// QUEUE
// ═══════════════════════════════════════════════════════════

function toggleQueue() {
  DOM.queuePanel?.classList.toggle('open');
  updateQueueUI();
}

function updateQueueUI() {
  const { queue, currentSongIndex } = state.player;
  const song = currentSong();

  if (DOM.queueCurrent) {
    DOM.queueCurrent.innerHTML = song ? buildQueueItem(song, true) : '';
  }
  if (DOM.queueList) {
    const upcoming = queue.slice(currentSongIndex + 1, currentSongIndex + 15);
    DOM.queueList.innerHTML = upcoming.map(s => buildQueueItem(s, false)).join('');
    DOM.queueList.querySelectorAll('.queue-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.songId);
        const idx = queue.findIndex(s => s.id === id);
        if (idx >= 0) playSong(idx);
      });
    });
  }
}

function buildQueueItem(song, isCurrent) {
  return `
    <div class="queue-item${isCurrent ? ' current' : ''}" data-song-id="${song.id}" role="button" tabindex="0">
      <img src="${song.cover}" alt="${song.title}" width="40" height="40"
           onerror="this.style.display='none'"/>
      <div class="queue-item-info">
        <div class="queue-item-title">${escapeHtml(song.title)}</div>
        <div class="queue-item-artist">${escapeHtml(song.artist)}</div>
      </div>
      <span class="queue-item-dur">${song.duration}</span>
    </div>`;
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
// MOOD SYSTEM — Ambient Lighting
// ═══════════════════════════════════════════════════════════

const MOOD_MAP = {
  energetic:  'energetic',
  party:      'party',
  chill:      'chill',
  romantic:   'romantic',
  sad:        'sad',
  cold:       'sad',
  aggressive: 'party',
  intense:    'energetic',
};

function updateMoodFromSong(song) {
  if (!song?.mood) return;
  const mapped = MOOD_MAP[song.mood] || 'default';
  // Don't auto-override if user has manually set a mood (unless it's still default)
  if (state.mood === 'default') {
    applyMood(mapped);
  }
}

function applyMood(mood, animate = true) {
  state.mood = mood;
  safeStorageSet('sh_mood', mood);
  document.documentElement.setAttribute('data-mood', mood);

  // Update mood buttons
  $$('.mood-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mood === mood);
  });
}

function initMoodSystem() {
  $$('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyMood(btn.dataset.mood);
      showToast(`Mood: ${btn.title} 🎨`, 'info');
    });
  });
  applyMood(state.mood, false);
}

// ═══════════════════════════════════════════════════════════
// HERO NOW PLAYING
// ═══════════════════════════════════════════════════════════

function updateHeroNowPlaying(song) {
  if (!DOM.heroNowPlaying || !song) return;
  const title = DOM.heroNowPlaying.querySelector('.hnp-title');
  const artist = DOM.heroNowPlaying.querySelector('.hnp-artist');
  if (title) title.textContent = song.title;
  if (artist) artist.textContent = song.artist;
  if (DOM.vinylCoverImg) DOM.vinylCoverImg.src = song.cover;
}

// ═══════════════════════════════════════════════════════════
// FAVORITES
// ═══════════════════════════════════════════════════════════

function toggleFavorite(songId) {
  if (state.favorites.has(songId)) {
    state.favorites.delete(songId);
    showToast('Removed from liked songs', 'info');
  } else {
    state.favorites.add(songId);
    showToast('Added to liked songs ♥', 'success');
  }
  safeStorageSet('sh_favorites', JSON.stringify([...state.favorites]));
  updatePlayerUI();
  if (state.currentPage === 'favorites') renderFavorites();
  if (state.currentPage === 'dashboard') updateDashboard();
}

// ═══════════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════════

function initSearch() {
  if (DOM.globalSearch) {
    DOM.globalSearch.addEventListener('input', debounce(e => performSearch(e.target.value), 200));
    DOM.globalSearch.addEventListener('focus', () => {
      if (DOM.globalSearch.value) performSearch(DOM.globalSearch.value);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#topbarSearch')) DOM.searchDropdown?.classList.remove('show');
    });
    DOM.globalSearch.addEventListener('keydown', e => {
      if (e.key === 'Escape') { DOM.globalSearch.blur(); DOM.searchDropdown?.classList.remove('show'); }
    });
  }

  // Search page input
  const spi = $('searchPageInput');
  if (spi) {
    spi.addEventListener('input', debounce(e => {
      const v = e.target.value.trim();
      const resultsEl = $('searchPageResults');
      if (!resultsEl) return;
      if (!v) { renderRecentSearches(); return; }
      const results = SONGS.filter(s =>
        s.title.toLowerCase().includes(v.toLowerCase()) ||
        s.artist.toLowerCase().includes(v.toLowerCase()) ||
        s.genre.toLowerCase().includes(v.toLowerCase())
      );
      resultsEl.innerHTML = results.length
        ? `<div class="content-section"><div class="section-head"><h2>Results for "${escapeHtml(v)}"</h2></div>
           <div class="tracks-list">${results.map((s, i) => buildTrackRow(s, i + 1)).join('')}</div></div>`
        : `<p style="color:var(--text-3);padding:32px;text-align:center">No results for "${escapeHtml(v)}"</p>`;
      if (results.length) {
        attachTrackRowEvents(resultsEl.querySelector('.tracks-list'));
        // Save search
        state.recentSearches = [v, ...state.recentSearches.filter(s => s !== v)].slice(0, 8);
        safeStorageSet('sh_searches', JSON.stringify(state.recentSearches));
      }
    }, 300));
  }
  renderRecentSearches();
}

function performSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) { DOM.searchDropdown?.classList.remove('show'); return; }
  const results = SONGS.filter(s =>
    s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
  ).slice(0, 6);
  if (!DOM.searchDropdown) return;
  if (!results.length) { DOM.searchDropdown.classList.remove('show'); return; }
  DOM.searchDropdown.innerHTML = results.map(s => `
    <div class="search-drop-item" data-song-id="${s.id}" role="button" tabindex="0">
      <img src="${s.cover}" alt="${s.title}" onerror="this.style.display='none'"/>
      <div class="search-drop-info">
        <p>${escapeHtml(s.title)}</p>
        <span>${escapeHtml(s.artist)}</span>
      </div>
    </div>`).join('');
  DOM.searchDropdown.classList.add('show');
  DOM.searchDropdown.querySelectorAll('.search-drop-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.songId);
      const idx = state.player.queue.findIndex(s => s.id === id);
      if (idx >= 0) playSong(idx);
      DOM.searchDropdown.classList.remove('show');
      if (DOM.globalSearch) DOM.globalSearch.value = '';
    });
  });
}

function renderRecentSearches() {
  const el = $('recentSearches');
  if (!el) return;
  if (!state.recentSearches.length) {
    el.innerHTML = '<p style="color:var(--text-3);font-size:0.875rem">Your recent searches will appear here.</p>';
    return;
  }
  el.innerHTML = state.recentSearches.map(s => `
    <div class="recent-search-chip" data-query="${escapeHtml(s)}" role="button" tabindex="0">
      <i class="fas fa-clock-rotate-left"></i>
      ${escapeHtml(s)}
    </div>`).join('');
  el.querySelectorAll('.recent-search-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const spi = $('searchPageInput');
      if (spi) { spi.value = chip.dataset.query; spi.dispatchEvent(new Event('input')); spi.focus(); }
    });
  });
}

// ═══════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════

function initAuth() {
  DOM.authBtn?.addEventListener('click', () => {
    if (state.user) {
      // Logout
      state.user = null;
      safeStorageRemove('sh_user');
      updateAuthUI();
      showToast('Signed out successfully', 'info');
    } else {
      openModal(DOM.authModal);
    }
  });
  DOM.authModalClose?.addEventListener('click', () => closeModal(DOM.authModal));

  // Auth tabs
  $$('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      $('loginForm')?.classList.toggle('hidden', tab.dataset.tab !== 'login');
      $('signupForm')?.classList.toggle('hidden', tab.dataset.tab !== 'signup');
    });
  });

  // Login form
  $('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('loginEmail')?.value?.trim();
    const password = $('loginPassword')?.value;
    if (!email || !password) { showToast('Please fill all fields', 'error'); return; }
    // Demo credentials
    const isAdmin = email === 'admin@sangeet.com' && password === 'admin123';
    const user = isAdmin
      ? { name: 'Admin', email, plan: 'Premium', isAdmin: true }
      : { name: email.split('@')[0], email, plan: 'Free' };
    state.user = user;
    safeStorageSet('sh_user', JSON.stringify(user));
    updateAuthUI();
    closeModal(DOM.authModal);
    showToast(`Welcome back, ${user.name}! 🎵`, 'success');
  });

  // Signup form
  $('signupForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('signupName')?.value?.trim();
    const email = $('signupEmail')?.value?.trim();
    const password = $('signupPassword')?.value;
    if (!name || !email || !password) { showToast('Please fill all fields', 'error'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
    const user = { name, email, plan: 'Free' };
    state.user = user;
    safeStorageSet('sh_user', JSON.stringify(user));
    updateAuthUI();
    closeModal(DOM.authModal);
    showToast(`Welcome, ${name}! 🎵`, 'success');
  });

  // Password toggle
  $$('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.innerHTML = `<i class="fas fa-eye${isText ? '' : '-slash'}"></i>`;
    });
  });
}

function updateAuthUI() {
  if (!DOM.authBtn || !DOM.topbarUser) return;
  if (state.user) {
    DOM.authBtn.textContent = 'Sign Out';
    DOM.authBtn.dataset.action = 'logout';
    DOM.topbarUser.innerHTML = `
      <div class="topbar-user-logged">
        <span style="font-size:0.875rem;font-weight:600">${escapeHtml(state.user.name)}</span>
        <div class="topbar-avatar">${state.user.name.charAt(0).toUpperCase()}</div>
      </div>`;
    if (DOM.sidebarUserName) DOM.sidebarUserName.textContent = state.user.name;
    if (DOM.sidebarAvatar) DOM.sidebarAvatar.innerHTML = state.user.name.charAt(0).toUpperCase();
  } else {
    DOM.authBtn.textContent = 'Sign In';
    DOM.authBtn.dataset.action = 'login';
    DOM.topbarUser.innerHTML = `<button class="auth-btn" id="authBtn" data-action="login">Sign In</button>`;
    // Re-bind
    $('authBtn')?.addEventListener('click', () => openModal(DOM.authModal));
    if (DOM.sidebarUserName) DOM.sidebarUserName.textContent = 'Guest';
    if (DOM.sidebarAvatar) DOM.sidebarAvatar.innerHTML = '<i class="fas fa-user"></i>';
  }
}

// ═══════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════

function initTheme() {
  applyTheme(state.theme);
  DOM.themeToggle?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    safeStorageSet('sh_theme', state.theme);
    applyTheme(state.theme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (DOM.themeIcon) {
    DOM.themeIcon.className = `fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`;
  }
}

// ═══════════════════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════════════════

function initModals() {
  // Playlist
  DOM.createPlaylistSidebar?.addEventListener('click', () => openModal(DOM.playlistModal));
  DOM.createPlaylistBtn?.addEventListener('click', () => openModal(DOM.playlistModal));
  DOM.playlistModalClose?.addEventListener('click', () => closeModal(DOM.playlistModal));
  DOM.playlistForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name = DOM.playlistName?.value?.trim();
    if (!name) { showToast('Please enter a playlist name', 'error'); return; }
    const pl = {
      id: Date.now(), name,
      desc: DOM.playlistDesc?.value?.trim() || '',
      songs: [], created: new Date().toISOString()
    };
    state.playlists.push(pl);
    safeStorageSet('sh_playlists', JSON.stringify(state.playlists));
    updateSidebarPlaylists();
    closeModal(DOM.playlistModal);
    DOM.playlistForm.reset();
    showToast(`Playlist "${name}" created! 🎵`, 'success');
    if (state.currentPage === 'library') renderLibrary();
    if (state.currentPage === 'dashboard') updateDashboard();
  });

  // YouTube modal
  DOM.ytModalClose?.addEventListener('click', () => closeModal(DOM.ytModal));

  // Click outside
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.modal-overlay:not(.hidden)').forEach(m => closeModal(m));
      if (!DOM.fullscreenPlayer?.classList.contains('hidden')) closeFullscreen();
    }
  });
}

function openModal(modal) {
  modal?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(modal) {
  modal?.classList.add('hidden');
  if (!DOM.fullscreenPlayer || DOM.fullscreenPlayer.classList.contains('hidden')) {
    document.body.style.overflow = '';
  }
}

// ═══════════════════════════════════════════════════════════
// SIDEBAR PLAYLISTS
// ═══════════════════════════════════════════════════════════

function updateSidebarPlaylists() {
  const container = $('sidebarPlaylists');
  if (!container) return;
  container.innerHTML = state.playlists.map(pl => `
    <div class="playlist-sidebar-item" data-pl-id="${pl.id}" role="button" tabindex="0">
      <i class="fas fa-music"></i>
      <span>${escapeHtml(pl.name)}</span>
    </div>`).join('');
}

function showPlaylistDetail(pl) {
  showToast(`Opening "${pl.name}"`, 'info');
}

// ═══════════════════════════════════════════════════════════
// SIDEBAR COLLAPSE
// ═══════════════════════════════════════════════════════════

function initSidebarCollapse() {
  DOM.sidebarToggle?.addEventListener('click', () => {
    DOM.sidebar?.classList.toggle('collapsed');
  });
  DOM.userMenuBtn?.addEventListener('click', () => {
    if (state.user) {
      state.user = null;
      safeStorageRemove('sh_user');
      updateAuthUI();
      showToast('Signed out', 'info');
    } else {
      openModal(DOM.authModal);
    }
  });
}

// ═══════════════════════════════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════════════════════════════

function initMobileNav() {
  DOM.mobileMenuBtn?.addEventListener('click', () => {
    DOM.sidebar?.classList.toggle('mobile-open');
  });
  $$('.mob-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
  // Close sidebar on outside click
  document.addEventListener('click', e => {
    if (window.innerWidth <= 768 &&
        DOM.sidebar?.classList.contains('mobile-open') &&
        !DOM.sidebar.contains(e.target) &&
        !DOM.mobileMenuBtn?.contains(e.target)) {
      DOM.sidebar.classList.remove('mobile-open');
    }
  });
}

// ═══════════════════════════════════════════════════════════
// CONTEXT MENU
// ═══════════════════════════════════════════════════════════

function initContextMenu() {
  document.addEventListener('click', () => DOM.contextMenu?.classList.add('hidden'));
  document.addEventListener('contextmenu', () => DOM.contextMenu?.classList.add('hidden'));

  $('ctxPlay')?.addEventListener('click', () => {
    if (state.contextSongId !== null) {
      const idx = state.player.queue.findIndex(s => s.id === state.contextSongId);
      if (idx >= 0) playSong(idx);
    }
  });
  $('ctxLike')?.addEventListener('click', () => {
    if (state.contextSongId !== null) toggleFavorite(state.contextSongId);
  });
  $('ctxQueue')?.addEventListener('click', () => {
    if (state.contextSongId === null) return;
    const song = SONGS.find(s => s.id === state.contextSongId);
    if (!song) return;
    // Add after current
    const { queue, currentSongIndex } = state.player;
    const already = queue.findIndex(s => s.id === song.id);
    if (already < 0) queue.splice(currentSongIndex + 1, 0, song);
    updateQueueUI();
    showToast(`"${song.title}" added to queue`, 'success');
  });
  $('ctxShare')?.addEventListener('click', () => {
    const song = SONGS.find(s => s.id === state.contextSongId);
    if (!song) return;
    const text = `🎵 Listen to "${song.title}" by ${song.artist} on SangeetHub!`;
    if (navigator.share) navigator.share({ title: song.title, text });
    else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast('Link copied!', 'success'));
    }
  });
}

function showContextMenu(e, songId) {
  e.preventDefault();
  state.contextSongId = songId;
  const menu = DOM.contextMenu;
  if (!menu) return;
  menu.classList.remove('hidden');
  const x = Math.min(e.clientX, window.innerWidth - menu.offsetWidth - 8);
  const y = Math.min(e.clientY, window.innerHeight - menu.offsetHeight - 8);
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  // Update like label
  const liked = state.favorites.has(songId);
  const likeBtn = $('ctxLike');
  if (likeBtn) likeBtn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i> ${liked ? 'Unlike' : 'Like'}`;
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════

function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    const inInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);
    if (inInput && e.key !== 'Escape') return;

    switch (e.key) {
      case ' ':
        if (!inInput) { e.preventDefault(); togglePlay(); }
        break;
      case 'ArrowRight':
        if (e.ctrlKey || e.metaKey) { e.preventDefault(); nextSong(); }
        break;
      case 'ArrowLeft':
        if (e.ctrlKey || e.metaKey) { e.preventDefault(); prevSong(); }
        break;
      case 'ArrowUp':
        if (e.ctrlKey || e.metaKey) { e.preventDefault(); setVolume(Math.min(1, state.player.volume + 0.1)); }
        break;
      case 'ArrowDown':
        if (e.ctrlKey || e.metaKey) { e.preventDefault(); setVolume(Math.max(0, state.player.volume - 0.1)); }
        break;
      case 'm':
        if (!inInput) { e.preventDefault(); toggleMute(); }
        break;
      case 'f':
        if (!inInput) { e.preventDefault(); if (DOM.fullscreenPlayer?.classList.contains('hidden')) openFullscreen(); else closeFullscreen(); }
        break;
      case 's':
        if (!inInput && (e.ctrlKey || e.metaKey)) { e.preventDefault(); toggleShuffle(); }
        break;
    }
  });
}

// ═══════════════════════════════════════════════════════════
// TRACK ROW REFRESH
// ═══════════════════════════════════════════════════════════

function refreshAllTrackRows() {
  const song = currentSong();
  $$('.track-row').forEach(row => {
    const id = parseInt(row.dataset.songId);
    row.classList.toggle('playing', !!(song && song.id === id));
  });
}

// ═══════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════

function showToast(message, type = 'info') {
  if (!DOM.toastContainer) return;
  const icons = { info: 'fa-circle-info', success: 'fa-circle-check', error: 'fa-circle-exclamation', warning: 'fa-triangle-exclamation' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info} toast-icon"></i><span class="toast-text">${escapeHtml(message)}</span>`;
  DOM.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ═══════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// ═══════════════════════════════════════════════════════════
// AMBIENT CANVAS (Background Particle Effect)
// ═══════════════════════════════════════════════════════════

function initAmbientCanvas() {
  const canvas = $('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.y -= s.speed;
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

// Initialize ambient canvas on load
window.addEventListener('DOMContentLoaded', initAmbientCanvas);
