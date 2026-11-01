"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="main-content">
      <section className="empty-state">
        <div className="empty-icon">!</div>
        <h2>Something interrupted the music.</h2>
        <p>{error.message || "The page hit an unexpected error. Try loading it again."}</p>
        <button className="create-button" onClick={() => reset()}>Try again</button>
      </section>
    </main>
  );
}
