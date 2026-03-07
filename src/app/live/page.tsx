"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { type LiveStreamPlayback } from "@/lib/api";
import Hls from "hls.js";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchPlayback(
  endpoint: string,
  token: string | null
): Promise<{ status: number; data: LiveStreamPlayback | null; success: boolean; message?: string }> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (res.status === 403) {
    return { status: 403, data: null, success: false, message: json.message };
  }
  if (res.ok && json.success) {
    return { status: res.status, data: json.data ?? null, success: true };
  }
  return { status: res.status, data: null, success: false, message: json.message };
}

export default function LivePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const streamIdParam = searchParams.get("stream");

  const [playback, setPlayback] = useState<LiveStreamPlayback | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/signin?redirect=/live");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    (async () => {
      setLoading(true);
      setAccessDenied(false);
      setServerError(null);
      try {
        const endpoint = streamIdParam
          ? `/live-streams/playback/${streamIdParam}`
          : "/live-streams/playback/active";
        const result = await fetchPlayback(endpoint, token);
        if (cancelled) return;
        if (result.status === 403) {
          setAccessDenied(true);
          setPlayback(undefined);
        } else if (result.success) {
          setPlayback(result.data ?? null);
        } else {
          setServerError(result.message || "Something went wrong. Please try again.");
          setPlayback(undefined);
        }
      } catch {
        if (!cancelled) setServerError("Unable to load live stream. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user, streamIdParam]);

  useEffect(() => {
    if (!playback?.playbackUrl || !videoRef.current) return;
    const video = videoRef.current;
    const url = playback.playbackUrl;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      return () => { video.src = ""; };
    }
  }, [playback?.playbackUrl]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Live stream</h1>

          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {!loading && accessDenied && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
              <p className="text-gray-300 mb-4">
                Live streaming is available only for paid or trial plan members.
              </p>
              <Link
                href="/pricing"
                className="inline-block px-6 py-3 bg-secondary text-white font-medium rounded-lg hover:opacity-90"
              >
                Upgrade to watch
              </Link>
            </div>
          )}

          {!loading && !accessDenied && serverError && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
              <p className="text-gray-300 mb-4">{serverError}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-secondary text-white font-medium rounded-lg hover:opacity-90"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !accessDenied && !serverError && playback === null && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
              <p className="text-gray-300">No live stream is currently available. Check back later.</p>
            </div>
          )}

          {!loading && !accessDenied && !serverError && playback && (
            <div className="space-y-4">
              {playback.title && (
                <p className="text-gray-300 text-lg">{playback.title}</p>
              )}
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  controls
                  playsInline
                  muted={false}
                />
              </div>
              <p className="text-gray-500 text-sm">
                Status: {playback.status}. If the stream has not started yet, the player will connect when the host goes live.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
