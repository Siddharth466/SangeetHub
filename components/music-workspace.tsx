"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import { demoTracks, type Track } from "@/lib/music";

type View = "home" | "favorites" | "playlists";
type Playlist = { id: string; name: string; trackIds: string[] };

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
}

function Icon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<string, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></>,
    heart: <path d="M20.8 8.8c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 8.8 2.3Z"/>,
    list: <><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
    play: <path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none"/>,
    pause: <><path d="M8 5h3v14H8z" fill="currentColor" stroke="none"/><path d="M15 5h3v14h-3z" fill="currentColor" stroke="none"/></>,
    next: <><path d="m5 5 10 7-10 7z" fill="currentColor" stroke="none"/><path d="M19 5v14"/></>,
    prev: <><path d="m19 5-10 7 10 7z" fill="currentColor" stroke="none"/><path d="M5 5v14"/></>,
    shuffle: <><path d="m16 3 4 4-4 4M4 7h2c5 0 7 10 12 10h2"/><path d="m16 13 4 4-4 4M4 17h2c1.8 0 3.2-1.4 4.5-3"/></>,
    repeat: <><path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></>,
    volume: <><path d="M4 10v4h4l5 4V6l-5 4z"/><path d="M17 9a5 5 0 0 1 0 6M19.5 6.5a9 9 0 0 1 0 11"/></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    music: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    queue: <><path d="M4 6h12M4 11h12M4 16h8"/><path d="m17 15 4 3-4 3z" fill="currentColor" stroke="none"/></>,
  };
  return <svg {...common}>{paths[name] ?? paths.music}</svg>;
}

function CoverArt({ track, large = false }: { track: Track; large?: boolean }) {
  const style: CSSProperties = track.coverUrl
    ? { backgroundImage: \`linear-gradient(145deg, rgba(12,10,20,.12), rgba(12,10,20,.48)), url("\${track.coverUrl}")\` }
    : {};
  return (
    <div className={\`album-art art-\${track.accent} \${large ? "album-art-large" : ""}\`} style={style} aria-label={\`Cover art for \${track.album}\`} role="img">
      {!track.coverUrl && <><span className="art-orbit art-orbit-one" /><span className="art-orbit art-orbit-two" /><span className="art-glyph">♪</span><span className="art-index">SH / 0{track.id.replace(/\D/g, "").slice(-1) || "1"}</span></>}
    </div>
  );
}

export default function MusicWorkspace() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>(demoTracks);
  const [libraryTracks, setLibraryTracks] = useState<Track[]>(demoTracks);
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [providerConfigured, setProviderConfigured] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.82);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [activePlaylistId, setActivePlaylistId] = useState("");
  const [playlistDialog, setPlaylistDialog] = useState<"create" | "add" | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [trackToAdd, setTrackToAdd] = useState<Track | null>(null);
  const [toast, setToast] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem("sangeethub:favorites") || "[]");
      const savedPlaylists = JSON.parse(localStorage.getItem("sangeethub:playlists") || "[]");
      if (Array.isArray(savedFavorites)) setFavorites(savedFavorites.filter((id): id is string => typeof id === "string"));
      if (Array.isArray(savedPlaylists)) {
        setPlaylists(savedPlaylists.filter((item): item is Playlist =>
          item && typeof item.id === "string" && typeof item.name === "string" && Array.isArray(item.trackIds),
        ));
      }
    } catch {
      try {
        localStorage.removeItem("sangeethub:favorites");
        localStorage.removeItem("sangeethub:playlists");
      } catch {
        // Storage may be disabled by the browser; the in-memory app still works.
      }
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem("sangeethub:favorites", JSON.stringify(favorites)); } catch { /* Keep favorites in memory if storage is blocked. */ }
  }, [favorites, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem("sangeethub:playlists", JSON.stringify(playlists)); } catch { /* Keep playlists in memory if storage is blocked. */ }
  }, [playlists, storageReady]);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setSearchLoading(true);
      try {
        const response = await fetch(\`/api/music/search?q=\${encodeURIComponent(query.trim())}\`, { cache: "no-store" });
        const payload = await response.json() as { tracks?: Track[]; providerConfigured?: boolean; error?: string };
        if (!response.ok) throw new Error(payload.error || "Search could not be completed.");
        if (!cancelled) {
          const nextTracks = Array.isArray(payload.tracks) ? payload.tracks : [];
          setTracks(nextTracks);
          setLibraryTracks((existing) => {
            const byId = new Map(existing.map((track) => [track.id, track]));
            nextTracks.forEach((track) => byId.set(track.id, track));
            return Array.from(byId.values());
          });
          setProviderConfigured(Boolean(payload.providerConfigured));
          setApiError("");
        }
      } catch (error) {
        if (!cancelled) {
          setApiError(error instanceof Error ? error.message : "Search is unavailable.");
          if (!query.trim()) setTracks(demoTracks);
        }
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    }, query.trim() ? 300 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (!currentTrack?.streamUrl) {
      audio.pause();
      return;
    }
    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
        showNotice("The provider's audio URL could not be played in this browser.");
      });
    } else {
      audio.pause();
    }
    // Track changes and play/pause changes should both update the audio element.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrack?.id, currentTrack?.streamUrl, volume]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const activePlaylist = playlists.find((playlist) => playlist.id === activePlaylistId) ?? null;

  const visibleTracks = useMemo(() => {
    let result = tracks;
    if (view === "favorites") result = libraryTracks.filter((track) => favorites.includes(track.id));
    if (view === "playlists" && activePlaylist) {
      result = activePlaylist.trackIds
        .map((id) => libraryTracks.find((track) => track.id === id))
        .filter((track): track is Track => Boolean(track));
    }
    if (genre !== "All") result = result.filter((track) => track.genre.toLowerCase() === genre.toLowerCase());
    return result;
  }, [tracks, libraryTracks, view, favorites, activePlaylist, genre]);

  const genres = useMemo(() => ["All", ...Array.from(new Set(tracks.map((track) => track.genre).filter(Boolean)))], [tracks]);

  function showNotice(message: string) {
    setToast(message);
  }

  async function enqueueRelated(track: Track) {
    try {
      const response = await fetch(\`/api/music/related?trackId=\${encodeURIComponent(track.id)}\`, { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json() as { tracks?: Track[] };
      const related = (payload.tracks || []).filter((candidate) =>
        candidate.id !== track.id && candidate.id !== "" && candidate.title && candidate.artist,
      );
      if (!related.length) return;
      setQueue((existing) => {
        // Ignore a slow recommendation response if the listener has started another track.
        if (existing[0]?.id !== track.id) return existing;
        const known = new Set(existing.map((item) => item.id));
        return [...existing, ...related.filter((item) => !known.has(item.id))];
      });
    } catch (error) {
      console.warn("Could not load related songs:", error);
    }
  }

  function playTrack(track: Track) {
    setCurrentTrack(track);
    setQueue([track]);
    setQueueIndex(0);
    setCurrentTime(0);
    setDuration(track.durationSeconds || 0);

    if (!track.streamUrl) {
      setIsPlaying(false);
      showNotice("This is demo catalogue data. Connect a provider that returns streamUrl or previewUrl to play audio.");
      return;
    }

    setIsPlaying(true);
    void enqueueRelated(track);
  }

  function addToQueue(track: Track) {
    setQueue((existing) => existing.some((item) => item.id === track.id) ? existing : [...existing, track]);
    showNotice(\`Added “\${track.title}” to your queue.\`);
  }

  function goToQueueIndex(index: number) {
    const track = queue[index];
    if (!track) return;
    setQueueIndex(index);
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.durationSeconds || 0);
    setIsPlaying(Boolean(track.streamUrl));
    if (!track.streamUrl) showNotice("This queue item has no playable audio URL yet.");
  }

  function playNext() {
    if (!queue.length) return;
    if (shuffle && queue.length > 1) {
      const choices = queue.map((_, index) => index).filter((index) => index !== queueIndex);
      goToQueueIndex(choices[Math.floor(Math.random() * choices.length)]);
      return;
    }
    if (queueIndex < queue.length - 1) {
      goToQueueIndex(queueIndex + 1);
      return;
    }
    if (repeat && queue.length) {
      goToQueueIndex(0);
      return;
    }
    setIsPlaying(false);
  }

  function playPrevious() {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    if (queueIndex > 0) goToQueueIndex(queueIndex - 1);
    else if (repeat && queue.length) goToQueueIndex(queue.length - 1);
  }

  function toggleFavorite(track: Track) {
    const liked = favorites.includes(track.id);
    setFavorites((existing) => liked ? existing.filter((id) => id !== track.id) : [...existing, track.id]);
    showNotice(liked ? "Removed from favorites." : "Saved to favorites.");
  }

  function openAddToPlaylist(track: Track) {
    setTrackToAdd(track);
    setSelectedPlaylistId(playlists[0]?.id || "");
    setPlaylistDialog("add");
  }

  function createPlaylist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = playlistName.trim();
    if (!name) return;
    const playlist: Playlist = {
      id: \`playlist-\${Date.now()}\`,
      name,
      trackIds: trackToAdd ? [trackToAdd.id] : [],
    };
    setPlaylists((existing) => [...existing, playlist]);
    setPlaylistName("");
    setTrackToAdd(null);
    setPlaylistDialog(null);
    setActivePlaylistId(playlist.id);
    setView("playlists");
    showNotice(\`Playlist “\${name}” created.\`);
  }

  function addTrackToPlaylist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trackToAdd || !selectedPlaylistId) return;
    setPlaylists((existing) => existing.map((playlist) =>
      playlist.id === selectedPlaylistId && !playlist.trackIds.includes(trackToAdd.id)
        ? { ...playlist, trackIds: [...playlist.trackIds, trackToAdd.id] }
        : playlist,
    ));
    setPlaylistDialog(null);
    setTrackToAdd(null);
    showNotice("Song added to playlist.");
  }

  function playAllVisible() {
    if (!visibleTracks.length) return;
    const playable = visibleTracks.find((track) => Boolean(track.streamUrl));
    if (!playable) {
      showNotice("Connect your music provider to enable browser playback.");
      return;
    }
    const start = visibleTracks.indexOf(playable);
    const ordered = [...visibleTracks.slice(start), ...visibleTracks.slice(0, start)];
    setQueue(ordered);
    setQueueIndex(0);
    setCurrentTrack(ordered[0]);
    setCurrentTime(0);
    setIsPlaying(true);
    void enqueueRelated(ordered[0]);
  }

  function togglePlayback() {
    if (!currentTrack) {
      playAllVisible();
      return;
    }
    if (!currentTrack.streamUrl) {
      showNotice("Connect your music provider to enable browser playback.");
      return;
    }
    setIsPlaying((playing) => !playing);
  }

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const currentIsFavorite = currentTrack ? favorites.includes(currentTrack.id) : false;

  return (
    <div className="music-app">
      <audio
        ref={audioRef}
        src={currentTrack?.streamUrl}
        preload="none"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || currentTrack?.durationSeconds || 0)}
        onEnded={playNext}
        onError={() => {
          if (currentTrack?.streamUrl) {
            setIsPlaying(false);
            showNotice("Audio could not be loaded. Check that the provider URL is playable and allows browser access.");
          }
        }}
      />

      <header className="topbar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setView("home"); setActivePlaylistId(""); }}>
          <span className="brand-mark"><Icon name="music" /></span>
          <span>Sangeet<span className="brand-light">Hub</span></span>
        </a>
        <label className="search-box">
          <Icon name="search" />
          <input
            value={query}
            onChange={(event) => { setQuery(event.target.value); setView("home"); setActivePlaylistId(""); }}
            placeholder="Search songs, artists, or albums"
            aria-label="Search songs, artists, or albums"
          />
          {query && <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear search"><Icon name="close" /></button>}
          <kbd>⌘ K</kbd>
        </label>
        <div className="topbar-meta"><span className={providerConfigured ? "provider-dot connected" : "provider-dot"} />{providerConfigured ? "Provider connected" : "Demo mode"}</div>
        <button className="mobile-menu-button" onClick={() => setMobileNavOpen((open) => !open)} aria-label="Toggle navigation"><Icon name="list" /></button>
      </header>

      <div className="app-grid">
        <aside className={\`sidebar \${mobileNavOpen ? "sidebar-open" : ""}\`}>
          <div className="side-label">MENU</div>
          <nav className="primary-nav" aria-label="Main navigation">
            <button className={view === "home" ? "nav-link active" : "nav-link"} onClick={() => { setView("home"); setActivePlaylistId(""); setQuery(""); setGenre("All"); setMobileNavOpen(false); }}>
              <Icon name="home" /> <span>Discover</span>
            </button>
            <button className={view === "favorites" ? "nav-link active" : "nav-link"} onClick={() => { setView("favorites"); setActivePlaylistId(""); setQuery(""); setGenre("All"); setMobileNavOpen(false); }}>
              <Icon name="heart" /> <span>Favorites</span><span className="nav-count">{favorites.length}</span>
            </button>
            <button className={view === "playlists" ? "nav-link active" : "nav-link"} onClick={() => { setView("playlists"); setQuery(""); setGenre("All"); setMobileNavOpen(false); }}>
              <Icon name="list" /> <span>Your playlists</span>
            </button>
          </nav>

          <div className="sidebar-divider" />
          <div className="side-section-head"><span className="side-label">YOUR COLLECTION</span><button className="tiny-add" onClick={() => { setTrackToAdd(null); setPlaylistDialog("create"); }} aria-label="Create playlist"><Icon name="plus" /></button></div>
          <div className="playlist-nav">
            {playlists.length === 0 && <p className="sidebar-empty">Your playlists will appear here.</p>}
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                className={activePlaylistId === playlist.id ? "playlist-nav-item selected" : "playlist-nav-item"}
                onClick={() => { setView("playlists"); setActivePlaylistId(playlist.id); setGenre("All"); setMobileNavOpen(false); }}
              >
                <span className="playlist-mini-art"><Icon name="music" /></span>
                <span className="playlist-nav-name">{playlist.name}</span>
                <span className="playlist-nav-count">{playlist.trackIds.length}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="local-note"><span className="local-note-icon">✓</span><div><strong>Private by default</strong><small>Favorites and playlists stay in this browser.</small></div></div>
            <button className="new-playlist-button" onClick={() => { setTrackToAdd(null); setPlaylistDialog("create"); }}><Icon name="plus" /> New playlist</button>
          </div>
        </aside>

        <main className="main-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">YOUR MUSIC SPACE</p>
              <h1>{view === "favorites" ? "Your favorites." : view === "playlists" && activePlaylist ? activePlaylist.name : view === "playlists" ? "Your playlists." : "Find your next repeat."}</h1>
              <p className="welcome-subtitle">{view === "favorites" ? "The songs you’ve saved for later." : view === "playlists" && activePlaylist ? \`\${activePlaylist.trackIds.length} songs in this playlist\` : view === "playlists" ? "Make a collection for every mood." : "Search a track, press play, and let the queue do the rest."}</p>
            </div>
            <div className="welcome-actions">
              <span className="quiet-chip"><span className="live-pulse" /> LIGHTWEIGHT PLAYER</span>
              <button className="create-button" onClick={() => { setTrackToAdd(null); setPlaylistDialog("create"); }}><Icon name="plus" /> Create playlist</button>
            </div>
          </section>

          <section className="quick-tools">
            <div className="filter-tabs" aria-label="Filter by genre">
              {genres.map((item) => <button key={item} className={genre === item ? "filter-tab selected" : "filter-tab"} onClick={() => setGenre(item)}>{item}</button>)}
            </div>
            <button className="play-all-button" onClick={playAllVisible}><Icon name="play" /> Play all</button>
          </section>

          {apiError && <div className="inline-error" role="status">{apiError}</div>}

          {view === "playlists" && !activePlaylist ? (
            <section className="playlist-gallery">
              {playlists.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon"><Icon name="list" /></div>
                  <h2>Your first playlist starts here.</h2>
                  <p>Create a collection and add songs as you discover them.</p>
                  <button className="create-button" onClick={() => setPlaylistDialog("create")}><Icon name="plus" /> Create playlist</button>
                </div>
              ) : playlists.map((playlist, index) => (
                <button key={playlist.id} className={\`playlist-card playlist-tone-\${index % 4}\`} onClick={() => setActivePlaylistId(playlist.id)}>
                  <span className="playlist-card-icon"><Icon name="music" /></span>
                  <span className="playlist-card-title">{playlist.name}</span>
                  <span className="playlist-card-meta">{playlist.trackIds.length} songs</span>
                  <span className="playlist-card-open">Open →</span>
                </button>
              ))}
            </section>
          ) : (
            <section className="track-section">
              <div className="section-heading">
                <div><p className="eyebrow">{view === "favorites" ? "SAVED BY YOU" : view === "playlists" ? "YOUR MIX" : query ? "SEARCH RESULTS" : "PICKED FOR YOU"}</p><h2>{query ? \`Results for “\${query}”\` : view === "favorites" ? "Liked songs" : activePlaylist ? "Playlist tracks" : "Discover music"}</h2></div>
                <span className="result-count">{searchLoading ? "Searching…" : \`\${visibleTracks.length} tracks\`}</span>
              </div>

              {searchLoading ? <div className="loading-line"><span /></div> : visibleTracks.length === 0 ? (
                <div className="empty-state compact">
                  <div className="empty-icon"><Icon name={view === "favorites" ? "heart" : "search"} /></div>
                  <h2>{view === "favorites" ? "Nothing saved yet." : "No tracks found."}</h2>
                  <p>{view === "favorites" ? "Tap the heart on a song to keep it here." : "Try another title, artist, album, or genre."}</p>
                </div>
              ) : (
                <div className="track-grid">
                  {visibleTracks.map((track, index) => (
                    <article className={currentTrack?.id === track.id ? "track-card playing-card" : "track-card"} key={track.id}>
                      <div className="track-art-wrap">
                        <CoverArt track={track} />
                        <button className="cover-play-button" onClick={() => playTrack(track)} aria-label={\`Play \${track.title}\`}><Icon name="play" /></button>
                        <span className="track-number">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="track-card-body">
                        <div className="track-copy"><h3 title={track.title}>{track.title}</h3><p>{track.artist}</p></div>
                        <div className="track-card-meta"><span>{track.album}</span><span>{track.durationSeconds ? formatTime(track.durationSeconds) : "—"}</span></div>
                        <div className="track-card-actions">
                          <button className={favorites.includes(track.id) ? "card-icon-button liked" : "card-icon-button"} onClick={() => toggleFavorite(track)} aria-label={favorites.includes(track.id) ? "Remove from favorites" : "Add to favorites"}><Icon name="heart" /></button>
                          <button className="card-icon-button" onClick={() => openAddToPlaylist(track)} aria-label={\`Add \${track.title} to a playlist\`}><Icon name="plus" /></button>
                          <button className="card-icon-button" onClick={() => addToQueue(track)} aria-label={\`Add \${track.title} to queue\`}><Icon name="queue" /></button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>

        <aside className="queue-sidebar">
          <div className="queue-heading"><div><p className="eyebrow">UP NEXT</p><h2>Your queue</h2></div><span className="queue-total">{queue.length}</span></div>
          {currentTrack && <div className="now-playing-card">
            <div className="now-playing-art"><CoverArt track={currentTrack} /></div>
            <div className="now-playing-copy"><span className="playing-label"><span className="equalizer"><i /><i /><i /></span> NOW PLAYING</span><strong>{currentTrack.title}</strong><small>{currentTrack.artist}</small></div>
          </div>}
          <div className="queue-list">
            {queue.length === 0 ? <div className="queue-empty"><Icon name="queue" /><p>Your queue is empty.</p><small>Play a song and similar tracks will be added automatically.</small></div> : queue.map((track, index) => (
              <button className={index === queueIndex ? "queue-row queue-row-current" : "queue-row"} key={\`\${track.id}-\${index}\`} onClick={() => goToQueueIndex(index)}>
                <CoverArt track={track} />
                <span className="queue-row-copy"><strong>{track.title}</strong><small>{track.artist}</small></span>
                {index === queueIndex ? <span className="queue-playing-dot">●</span> : <span className="queue-row-time">{formatTime(track.durationSeconds)}</span>}
              </button>
            ))}
          </div>
          <div className="similar-note"><div className="similar-note-icon">✳</div><div><strong>Keep the music going</strong><p>Related tracks are added after the song you start playing.</p></div></div>
        </aside>
      </div>

      <footer className="player-bar">
        <div className="player-track">
          {currentTrack ? <CoverArt track={currentTrack} /> : <div className="player-placeholder"><Icon name="music" /></div>}
          <div className="player-track-copy"><strong>{currentTrack?.title || "Choose a song"}</strong><small>{currentTrack?.artist || "Your next favorite is waiting"}</small></div>
          <button className={currentIsFavorite ? "player-like liked" : "player-like"} onClick={() => currentTrack && toggleFavorite(currentTrack)} aria-label="Toggle current song favorite" disabled={!currentTrack}><Icon name="heart" /></button>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button className={shuffle ? "transport-button active" : "transport-button"} onClick={() => setShuffle((value) => !value)} aria-label="Toggle shuffle"><Icon name="shuffle" /></button>
            <button className="transport-button" onClick={playPrevious} aria-label="Previous track" disabled={!currentTrack}><Icon name="prev" /></button>
            <button className="main-play-button" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Icon name="pause" /> : <Icon name="play" />}</button>
            <button className="transport-button" onClick={playNext} aria-label="Next track" disabled={!currentTrack}><Icon name="next" /></button>
            <button className={repeat ? "transport-button active" : "transport-button"} onClick={() => setRepeat((value) => !value)} aria-label="Toggle repeat"><Icon name="repeat" /></button>
          </div>
          <div className="progress-row"><span>{formatTime(currentTime)}</span><input aria-label="Seek through track" type="range" min="0" max={Math.max(duration, 1)} step="0.1" value={Math.min(currentTime, Math.max(duration, 1))} onChange={(event) => { const value = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = value; setCurrentTime(value); }} style={{ "--progress": \`\${progress}%\` } as CSSProperties} /><span>{formatTime(duration)}</span></div>
        </div>

        <div className="player-extra"><span className="player-mode">{currentTrack?.streamUrl ? "BROWSER AUDIO" : "READY"} </span><Icon name="volume" /><input aria-label="Volume" className="volume-range" type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ "--progress": \`\${volume * 100}%\` } as CSSProperties} /></div>
      </footer>

      {playlistDialog && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPlaylistDialog(null); }}>
          <div className="playlist-modal" role="dialog" aria-modal="true" aria-labelledby="playlist-modal-title">
            <button className="modal-close" onClick={() => setPlaylistDialog(null)} aria-label="Close dialog"><Icon name="close" /></button>
            <p className="eyebrow">{playlistDialog === "create" ? "YOUR COLLECTION" : "SAVE THIS SONG"}</p>
            <h2 id="playlist-modal-title">{playlistDialog === "create" ? "Create a playlist" : "Add to playlist"}</h2>
            {playlistDialog === "create" ? (
              <form onSubmit={createPlaylist}>
                <label htmlFor="playlist-name">Playlist name</label>
                <input id="playlist-name" autoFocus maxLength={48} value={playlistName} onChange={(event) => setPlaylistName(event.target.value)} placeholder="Late night favourites" required />
                <button className="create-button modal-submit" type="submit"><Icon name="plus" /> Create playlist</button>
              </form>
            ) : playlists.length === 0 ? (
              <div className="modal-empty"><p>You don’t have a playlist yet.</p><button className="create-button" onClick={() => setPlaylistDialog("create")}>Create one now</button></div>
            ) : (
              <form onSubmit={addTrackToPlaylist}>
                <label htmlFor="playlist-select">Choose a playlist</label>
                <select id="playlist-select" value={selectedPlaylistId} onChange={(event) => setSelectedPlaylistId(event.target.value)}>
                  {playlists.map((playlist) => <option value={playlist.id} key={playlist.id}>{playlist.name}</option>)}
                </select>
                <button className="create-button modal-submit" type="submit">Add song</button>
              </form>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast-message" role="status">{toast}</div>}
    </div>
  );
}
