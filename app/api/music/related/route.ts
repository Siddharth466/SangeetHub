import { NextRequest } from "next/server";
import { findDemoRelated, getProviderUrl, normalizeTracks, providerHeaders } from "@/lib/music";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const trackId = (request.nextUrl.searchParams.get("trackId") || "").trim().slice(0, 180);
  if (!trackId) {
    return Response.json({ tracks: [], providerConfigured: Boolean(process.env.MUSIC_API_BASE_URL) });
  }

  const baseUrl = process.env.MUSIC_API_BASE_URL;
  if (!baseUrl) {
    return Response.json({
      tracks: findDemoRelated(trackId),
      providerConfigured: false,
    });
  }

  try {
    const template = process.env.MUSIC_API_RELATED_PATH || "/tracks/{id}/related";
    const path = template.replace("{id}", encodeURIComponent(trackId));
    const url = getProviderUrl(path);
    if (!url) throw new Error("Music provider URL is not configured.");

    const upstream = await fetch(url, {
      headers: providerHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      return Response.json(
        { error: `Music provider returned HTTP ${upstream.status} for related tracks.` },
        { status: 502 },
      );
    }

    const payload: unknown = await upstream.json();
    return Response.json({
      tracks: normalizeTracks(payload),
      providerConfigured: true,
    });
  } catch (error) {
    console.error("Related-track proxy failed:", error);
    return Response.json(
      { error: "Could not load related tracks from the music provider." },
      { status: 502 },
    );
  }
}
