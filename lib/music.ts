export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  durationSeconds: number;
  coverUrl?: string;
  streamUrl?: string;
  accent: string;
};

type UnknownRecord = Record<string, unknown>;

export const demoTracks: Track[] = [
  {
    id: "demo-01",
    title: "City After Rain",
    artist: "SangeetHub Sessions",
    album: "Night Drive",
    genre: "Electronic",
    durationSeconds: 218,
    accent: "violet",
  },
  {
    id: "demo-02",
    title: "Slow Morning",
    artist: "The Sunday Club",
    album: "Small Hours",
    genre: "Chill",
    durationSeconds: 194,
    accent: "blue",
  },
  {
    id: "demo-03",
    title: "Paper Skies",
    artist: "June & June",
    album: "Open Windows",
    genre: "Indie",
    durationSeconds: 207,
    accent: "orange",
  },
  {
    id: "demo-04",
    title: "Golden Hour",
    artist: "SangeetHub Sessions",
    album: "Daylight",
    genre: "Electronic",
    durationSeconds: 231,
    accent: "pink",
  },
  {
    id: "demo-05",
    title: "Somewhere Quiet",
    artist: "Northbound",
    album: "Soft Focus",
    genre: "Ambient",
    durationSeconds: 246,
    accent: "teal",
  },
  {
    id: "demo-06",
    title: "Blue Lanterns",
    artist: "The Sunday Club",
    album: "Small Hours",
    genre: "Chill",
    durationSeconds: 202,
    accent: "green",
  },
  {
    id: "demo-07",
    title: "Halfway Home",
    artist: "June & June",
    album: "Open Windows",
    genre: "Indie",
    durationSeconds: 223,
    accent: "lavender",
  },
  {
    id: "demo-08",
    title: "Last Train North",
    artist: "Northbound",
    album: "Soft Focus",
    genre: "Ambient",
    durationSeconds: 239,
    accent: "cyan",
  },
];

function asRecord(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null ? (value as UnknownRecord) : {};
}

function readString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
}

function safeHttpUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function durationInSeconds(record: UnknownRecord): number {
  const seconds = Number(record.durationSeconds ?? record.duration_seconds);
  if (Number.isFinite(seconds) && seconds > 0) return Math.round(seconds);

  const milliseconds = Number(record.durationMs ?? record.duration_ms);
  if (Number.isFinite(milliseconds) && milliseconds > 0) return Math.round(milliseconds / 1000);

  return 0;
}

export function normalizeTrack(input: unknown, index = 0): Track | null {
  const record = asRecord(input);
  const artists = Array.isArray(record.artists) ? record.artists : [];
  const firstArtist = asRecord(artists[0]);
  const albumRecord = asRecord(record.album);
  const images = Array.isArray(albumRecord.images) ? albumRecord.images : [];
  const firstImage = asRecord(images[0]);

  const title = readString(record.title, record.name, record.trackName);
  const artist = readString(
    record.artist,
    record.artistName,
    firstArtist.name,
    typeof record.artists === "string" ? record.artists : "",
  );

  if (!title || !artist) return null;

  return {
    id: readString(record.id, record.trackId, record.uri) || `provider-track-${index}`,
    title,
    artist,
    album: readString(record.albumName, albumRecord.name, record.collectionName) || "Single",
    genre: readString(record.genre, record.category) || "Other",
    durationSeconds: durationInSeconds(record),
    coverUrl: safeHttpUrl(
      record.coverUrl ?? record.cover_url ?? record.artworkUrl ?? record.artworkUrl100 ?? firstImage.url,
    ),
    streamUrl: safeHttpUrl(
      record.streamUrl ?? record.stream_url ?? record.previewUrl ?? record.preview_url ?? record.audioUrl,
    ),
    accent: ["violet", "blue", "orange", "pink", "teal", "green"][index % 6],
  };
}

export function normalizeTracks(payload: unknown): Track[] {
  const root = asRecord(payload);
  const data = root.data;
  const dataRecord = asRecord(data);

  const candidates = Array.isArray(payload)
    ? payload
    : Array.isArray(root.tracks)
      ? root.tracks
      : Array.isArray(root.results)
        ? root.results
        : Array.isArray(data)
          ? data
          : Array.isArray(dataRecord.tracks)
            ? dataRecord.tracks
            : Array.isArray(dataRecord.results)
              ? dataRecord.results
              : [];

  return candidates
    .map((item, index) => normalizeTrack(item, index))
    .filter((track): track is Track => track !== null);
}

export function providerHeaders(): Headers {
  const headers = new Headers({ Accept: "application/json" });
  const key = process.env.MUSIC_API_KEY;
  const headerName = process.env.MUSIC_API_AUTH_HEADER || "Authorization";
  const prefix = process.env.MUSIC_API_AUTH_PREFIX ?? "Bearer";

  if (key) headers.set(headerName, prefix ? `${prefix} ${key}` : key);
  return headers;
}

export function getProviderUrl(path: string): URL | null {
  const base = process.env.MUSIC_API_BASE_URL?.trim();
  if (!base) return null;

  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const relativePath = path.replace(/^\/+/, "");

  try {
    return new URL(relativePath, normalizedBase);
  } catch {
    throw new Error("MUSIC_API_BASE_URL is not a valid URL.");
  }
}

export function findDemoRelated(trackId: string): Track[] {
  const current = demoTracks.find((track) => track.id === trackId);
  if (!current) return demoTracks.slice(0, 3);

  return demoTracks
    .filter((track) => track.id !== current.id)
    .sort((a, b) => Number(b.genre === current.genre) - Number(a.genre === current.genre))
    .slice(0, 3);
}
