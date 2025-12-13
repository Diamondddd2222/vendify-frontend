import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StatusViewer.css";

const IMAGE_DURATION = 5000; // 5s
const VIDEO_FALLBACK = 8000; // fallback 8s

export default function StatusViewer() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const raw = state?.statuses || [];
  const items = Array.isArray(raw) ? raw : [raw];

  const mediaItems = items.filter(Boolean).map((s) => ({
    mediaUrl: s.mediaUrl,
    mediaType: s.mediaType || (s.mediaUrl?.includes(".mp4") ? "video" : "image"),
    caption: s.caption || "",
    brandName: s.brandName || s.userId?.brandName || "Vendify",
    logo: s.userId?.logo || "",
    createdAt: s.createdAt || "",
  }));

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timer = useRef(null);
  const startTime = useRef(null);
  const elapsed = useRef(0);
  const holding = useRef(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const durations = useRef(
    mediaItems.map((m) => (m.mediaType === "image" ? IMAGE_DURATION : VIDEO_FALLBACK))
  );

  const startX = useRef(0);
  const startY = useRef(0);

  // ----- NAVIGATION -----
  const goNext = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    elapsed.current = 0;
    setProgress(0);

    if (index < mediaItems.length - 1) {
      setIndex((i) => i + 1);
    } else {
      navigate("/Status");
    }
  }, [index, mediaItems.length, navigate]);

  const goPrev = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    elapsed.current = 0;
    setProgress(0);

    if (index > 0) {
      setIndex((i) => i - 1);
    } else {
      navigate("/Status");
    }
  }, [index, navigate]);

  // ----- TIMER -----
  const startTimer = useCallback(
    (duration) => {
      if (timer.current) clearInterval(timer.current);

      startTime.current = Date.now() - elapsed.current;

      timer.current = setInterval(() => {
        if (paused || holding.current) return;

        elapsed.current = Date.now() - startTime.current;
        const p = Math.min(elapsed.current / duration, 1);
        setProgress(p);

        if (p >= 1) {
          clearInterval(timer.current);
          timer.current = null;
          goNext();
        }
      }, 50);
    },
    [paused, goNext]
  );

  // ----- EFFECT TO START TIMER -----
  useEffect(() => {
    const current = mediaItems[index];
    if (!current) return;

    if (current.mediaType !== "video") {
      startTimer(durations.current[index]);
      return;
    }

    const v = videoRef.current;
    if (!v) return;

    const onLoadedMetadata = () => {
      durations.current[index] = v.duration * 1000;
      startTimer(durations.current[index]);
    };

    if (!isNaN(v.duration) && v.duration > 0) {
      onLoadedMetadata();
    } else {
      v.addEventListener("loadedmetadata", onLoadedMetadata);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      v?.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [index, mediaItems, startTimer]);

  // ----- VIDEO HANDLERS -----
  const onMeta = (e) => {
    const ms = Math.floor(e.target.duration * 1000);
    durations.current[index] = ms > 0 ? ms : VIDEO_FALLBACK;
    startTimer(durations.current[index]);
  };

  const pause = () => {
    setPaused(true);
    if (videoRef.current) videoRef.current.pause();
  };

  const resume = () => {
    setPaused(false);
    if (videoRef.current) videoRef.current.play();
  };

  const holdStart = () => {
    holding.current = true;
    pause();
  };

  const holdEnd = () => {
    holding.current = false;
    resume();
  };

  // ----- TAP & TOUCH -----
  const onTap = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width * 0.33) goPrev();
    else if (x > rect.width * 0.66) goNext();
    else paused ? resume() : pause();
  };

  const touchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const touchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? goNext() : goPrev();
    } else {
      onTap({ clientX: e.changedTouches[0].clientX });
    }
  };

  // ----- KEYBOARD -----
  useEffect(() => {
    const k = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [goNext, goPrev, navigate]);

  if (!mediaItems.length) return <div>No Status Found</div>;

  const current = mediaItems[index];

  return (
    <div
      className="sv-container"
      ref={containerRef}
      onMouseDown={holdStart}
      onMouseUp={holdEnd}
      onMouseLeave={holdEnd}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onClick={onTap}
    >
      {/* TOP BAR */}
      <div className="sv-top">
        <div className="sv-user">
          {current.logo ? (
            <img src={current.logo} className="sv-avatar" />
          ) : (
            <div className="sv-avatar-fallback">{current.brandName[0]}</div>
          )}
          <div>
            <div className="sv-brand">{current.brandName}</div>
            <div className="sv-time">{new Date(current.createdAt).toLocaleString()}</div>
          </div>
        </div>

        <button
          className="sv-close"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/Status");
          }}
        >
          ✕
        </button>
      </div>

      {/* PROGRESS */}
      <div className="sv-progress">
        {mediaItems.map((_, i) => (
          <div className="sv-segment" key={i}>
            <div
              className="sv-fill"
              style={{
                width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* MEDIA */}
      <div className="sv-media">
        {current.mediaType === "video" ? (
          <video
            ref={videoRef}
            src={current.mediaUrl}
            autoPlay
            playsInline
            muted
            className="sv-el"
            onLoadedMetadata={onMeta}
          />
        ) : (
          <img src={current.mediaUrl} className="sv-el" />
        )}

        {current.caption && <div className="sv-caption">{current.caption}</div>}
      </div>

      {/* MESSAGE BAR */}
      <div className="sv-message-bar">
        <input type="text" placeholder="Message..." className="sv-input" />
        <button className="sv-send-btn">Send</button>
      </div>
    </div>
  );
}
