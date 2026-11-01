import { NextRequest } from "next/server";
import { demoTracks, getProviderUrl, normalizeTracks, providerHeaders } from "@/lib/music";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") || "").trim().slice(0, 120);
  const baseUrl = process.env.MUSIC_API_BASE_URL;

  if (!baseUrl) {
    const needle = query.toLowerCase();
    const tracks = needle
      ? demoTracks.filter((track) =>
          [track.title, track.artist, track.album, track.genre]
            .join(" ")
            .toLowerCase()
            .includes(needle),
        )
      : demoTracks;

    return Response.json({
      tracks,
      providerConfigured: false,
      message: "Demo catalogue only. Add a provider in .env.local to enable real search and playback.",
    });
  }

  try {
    const path = process.env.MUSIC_API_SEARCH_PATH || "/search";
    const url = getProviderUrl(path);
    if (!url) throw new Error("Music provider URL is not configured.");
    if (query) url.searchParams.set("q", query);

    const upstream = await fetch(url, {
      headers: providerHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      return Response.json(
        { error: `Music provider returned HTTP ${upstream.status}.` },
        { status: 502 },
      );
    }

    const payload: unknown = await upstream.json();
    return Response.json({
      tracks: normalizeTracks(payload),
      providerConfigured: true,
    });
  } catch (error) {
    console.error("Music search proxy failed:", error);
    return Response.json(
      { error: "Music search is temporarily unavailable. Check your provider configuration." },
      { status: 502 },
    );
  }
}
