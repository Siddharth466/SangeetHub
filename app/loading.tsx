export default function Loading() {
  return (
    <main className="main-content" aria-label="Loading SangeetHub">
      <div className="loading-line"><span /></div>
      <div className="eyebrow">SANGEETHUB</div>
      <h1 style={{ marginTop: 12, fontSize: 24 }}>Getting your music ready…</h1>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>Loading the player interface.</p>
    </main>
  );
}
