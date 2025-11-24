import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StatusViewer.css";

const DEFAULT_IMAGE_DURATION = 5000; // 5s
const FALLBACK_VIDEO_DURATION = 8000; // 8s

export default function StatusViewer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const rawStatuses = state?.statuses || [];
  const items = Array.isArray(rawStatuses) ? rawStatuses : [rawStatuses];

  const mediaItems = items.filter(Boolean).map((s) => ({
    mediaUrl: s.mediaUrl || "",
    mediaType: s.mediaType || (s.mediaUrl?.includes(".mp4") ? "video" : "image"),
    caption: s.caption || "",
    brandName: s.brandName || s.userId?.brandName || "Vendify",
    logo: s.userId?.logo || "",
    createdAt: s.createdAt || null,
  }));

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef(null);
  const startRef = useRef(null);
  const elapsedRef = useRef(0);
  const isHoldingRef = useRef(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const durationsRef = useRef(mediaItems.map(it => it.mediaType === "image" ? DEFAULT_IMAGE_DURATION : FALLBACK_VIDEO_DURATION));


  //NEW: touch refs
const touchStartX = useRef(0)
const touchStartY = useRef(0)

  const goNext = useCallback(() => {
    if (index < mediaItems.length - 1) {
      setIndex(i => i + 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else {
      navigate(-1);
    }
  }, [index, mediaItems.length, navigate]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      setIndex(i => i - 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else {
      navigate(-1);
    }
  }, [index, navigate]);

  const startTimer = useCallback((duration) => {
    if (!duration) return goNext();
    if (timerRef.current) clearInterval(timerRef.current);
    startRef.current = Date.now() - elapsedRef.current;
    timerRef.current = setInterval(() => {
      if (paused || isHoldingRef.current) return;
      const now = Date.now();
      elapsedRef.current = now - startRef.current;
      const p = Math.min(elapsedRef.current / duration, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        goNext();
      }
    }, 50);
  }, [paused, goNext]);

  const pause = () => {
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (videoRef.current && !videoRef.current.paused) videoRef.current.pause();
  };

  const resume = () => {
    setPaused(false);
    if (videoRef.current && videoRef.current.paused) videoRef.current.play();
    startTimer(durationsRef.current[index]);
  };

  // start timer on index change
  useEffect(() => {
    setProgress(0);
    elapsedRef.current = 0;

    const current = mediaItems[index];

    if (current.mediaType === "video" && videoRef.current) {
      const v = videoRef.current;
      if (v.duration && !isNaN(v.duration)) {
        durationsRef.current[index] = Math.floor(v.duration * 1000) || FALLBACK_VIDEO_DURATION;
        startTimer(durationsRef.current[index]);
      }
    } else {
      startTimer(durationsRef.current[index]);
    }

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [index, mediaItems, startTimer]);

  const onVideoLoadedMeta = (e) => {
    const ms = Math.floor(e.target.duration * 1000) || FALLBACK_VIDEO_DURATION;
    durationsRef.current[index] = ms;
    if (!paused && !isHoldingRef.current) startTimer(ms);
  };

  const onHoldStart = (e) => { e.preventDefault(); isHoldingRef.current = true; pause(); };
  const onHoldEnd = (e) => { e.preventDefault(); isHoldingRef.current = false; resume(); };

  const onContainerClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const w = rect.width;
    if (x < w * 0.3) goPrev();
    else if (x > w * 0.7) goNext();
    else paused ? resume() : pause();
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - (touchStartX.current || 0);
    const dy = t.clientY - (touchStartY.current || 0);
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? goNext() : goPrev();
    else onContainerClick({ clientX: t.clientX, clientY: t.clientY });
  };

  useEffect(() => {
    const onKey = e => { if(e.key==="ArrowRight") goNext(); if(e.key==="ArrowLeft") goPrev(); if(e.key==="Escape") navigate(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, navigate]);

  if (!mediaItems.length) return <div className="status-viewer-empty"><button onClick={()=>navigate(-1)}>Close</button></div>;

  const current = mediaItems[index];

  return (
    <div className="status-viewer" ref={containerRef}
      onMouseDown={onHoldStart} 
      onMouseUp={onHoldEnd} 
      onMouseLeave={onHoldEnd} 
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd} 
      onClick={onContainerClick}
    >
      {/* Top bar */}
      <div className="sv-topbar">
        <div className="sv-user">
          {current.logo ? <img src={current.logo} className="sv-avatar" alt={current.brandName}/> :
            <div className="sv-avatar sv-avatar-fallback">{current.brandName[0]}</div>}
          <div className="sv-meta">
            <div className="sv-brand">{current.brandName}</div>
            {current.createdAt && <div className="sv-time">{new Date(current.createdAt).toLocaleString()}</div>}
          </div>
        </div>
        <button className="sv-close" onClick={()=>navigate('/Status')}>✕</button>
      </div>

      {/* Progress bars */}
      <div className="sv-progress-row">
        {mediaItems.map((it,i)=>(
          <div className="sv-progress-segment" key={i}>
            <div className="sv-progress-fill" style={{width: i<index ? "100%" : i===index ? `${Math.round(progress*100)}%` : "0%", background: i<=index ? "var(--vendify)" : "rgba(255,255,255,0.25)"}}/>
          </div>
        ))}
      </div>

      {/* Media */}
      <div className="sv-media">
        {current.mediaType==="video" ? 
          <video ref={videoRef} src={current.mediaUrl} className="sv-media-el" playsInline autoPlay muted onLoadedMetadata={onVideoLoadedMeta}/> :
          <img src={current.mediaUrl} className="sv-media-el" alt="status"/>}
        {current.caption && <div className="sv-caption">{current.caption}</div>}
      </div>
    </div>
  );
}
