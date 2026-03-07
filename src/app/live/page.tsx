"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { liveStreamApi, subscriptionApi, type LiveStreamPlayback } from "@/lib/api";
import Hls from "hls.js";

export default function LivePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const streamIdParam = searchParams.get("stream");

  const [playback, setPlayback] = useState<LiveStreamPlayback | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/signin?redirect=/live");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setAccessDenied(false);
      try {
        if (streamIdParam) {
          const res = await liveStreamApi.getPlaybackById(streamIdParam);
          if (!cancelled && res.success && res.data) setPlayback(res.data);
        } else {
          const res = await liveStreamApi.getActivePlayback();
          if (!cancelled && res.success) setPlayback(res.data ?? null);
        }
      } catch {
        if (!cancelled) setAccessDenied(true);
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

          {!loading && !accessDenied && playback === null && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
              <p className="text-gray-300">No live stream is currently available. Check back later.</p>
            </div>
          )}

          {!loading && !accessDenied && playback && (
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
