// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./StatusViewer.css";

// const DEFAULT_IMAGE_DURATION = 5000; 
// const FALLBACK_VIDEO_DURATION = 8000; 

// export default function StatusViewer() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const rawStatuses = state?.statuses || [];
//   const items = Array.isArray(rawStatuses) ? rawStatuses : [rawStatuses];

//   const mediaItems = items.filter(Boolean).map((s) => ({
//     mediaUrl: s.mediaUrl || "",
//     mediaType: s.mediaType || (s.mediaUrl?.includes(".mp4") ? "video" : "image"),
//     caption: s.caption || "",
//     brandName: s.brandName || s.userId?.brandName || "Vendify",
//     logo: s.userId?.logo || "",
//     createdAt: s.createdAt || null,
//   }));

//   const [index, setIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const timerRef = useRef(null);
//   const startRef = useRef(null);
//   const elapsedRef = useRef(0);
//   const isHoldingRef = useRef(false);
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const durationsRef = useRef(mediaItems.map(it => it.mediaType === "image" ? DEFAULT_IMAGE_DURATION : FALLBACK_VIDEO_DURATION));


  
// const touchStartX = useRef(0)
// const touchStartY = useRef(0)

//   const goNext = useCallback(() => {
//     if (index < mediaItems.length - 1) {
//       setIndex(i => i + 1);
//       setProgress(0);
//       elapsedRef.current = 0;
//     } else {
//       navigate(-1);
//     }
//   }, [index, mediaItems.length, navigate]);

//   const goPrev = useCallback(() => {
//     if (index > 0) {
//       setIndex(i => i - 1);
//       setProgress(0);
//       elapsedRef.current = 0;
//     } else {
//       navigate(-1);
//     }
//   }, [index, navigate]);

//   const startTimer = useCallback((duration) => {
//     if (!duration) return goNext();
//     if (timerRef.current) clearInterval(timerRef.current);
//     startRef.current = Date.now() - elapsedRef.current;
//     timerRef.current = setInterval(() => {
//       if (paused || isHoldingRef.current) return;
//       const now = Date.now();
//       elapsedRef.current = now - startRef.current;
//       const p = Math.min(elapsedRef.current / duration, 1);
//       setProgress(p);
//       if (p >= 1) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//         goNext();
//       }
//     }, 50);
//   }, [paused, goNext]);

//   const pause = () => {
//     setPaused(true);
//     if (timerRef.current) clearInterval(timerRef.current);
//     if (videoRef.current && !videoRef.current.paused) videoRef.current.pause();
//   };

//   const resume = () => {
//     setPaused(false);
//     if (videoRef.current && videoRef.current.paused) videoRef.current.play();
//     startTimer(durationsRef.current[index]);
//   };

  
//   useEffect(() => {
//     setProgress(0);
//     elapsedRef.current = 0;

//     const current = mediaItems[index];

//     if (current.mediaType === "video" && videoRef.current) {
//       const v = videoRef.current;
//       if (v.duration && !isNaN(v.duration)) {
//         durationsRef.current[index] = Math.floor(v.duration * 1000) || FALLBACK_VIDEO_DURATION;
//         startTimer(durationsRef.current[index]);
//       }
//     } else {
//       startTimer(durationsRef.current[index]);
//     }

//     return () => { if (timerRef.current) clearInterval(timerRef.current); };
//   }, [index, mediaItems, startTimer]);

//   const onVideoLoadedMeta = (e) => {
//     const ms = Math.floor(e.target.duration * 1000) || FALLBACK_VIDEO_DURATION;
//     durationsRef.current[index] = ms;
//     if (!paused && !isHoldingRef.current) startTimer(ms);
//   };

//   const onHoldStart = (e) => { e.preventDefault(); isHoldingRef.current = true; pause(); };
//   const onHoldEnd = (e) => { e.preventDefault(); isHoldingRef.current = false; resume(); };

//   const onContainerClick = (e) => {
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
//     const w = rect.width;
//     if (x < w * 0.3) goPrev();
//     else if (x > w * 0.7) goNext();
//     else paused ? resume() : pause();
//   };

//   const onTouchStart = (e) => {
//     const t = e.touches[0];
//     touchStartX.current = t.clientX;
//     touchStartY.current = t.clientY;
//   };

//   const onTouchEnd = (e) => {
//     const t = e.changedTouches[0];
//     const dx = t.clientX - (touchStartX.current || 0);
//     const dy = t.clientY - (touchStartY.current || 0);
//     if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? goNext() : goPrev();
//     else onContainerClick({ clientX: t.clientX, clientY: t.clientY });
//   };

//   useEffect(() => {
//     const onKey = e => { if(e.key==="ArrowRight") goNext(); if(e.key==="ArrowLeft") goPrev(); if(e.key==="Escape") navigate(-1); };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [goNext, goPrev, navigate]);

//   if (!mediaItems.length) return <div className="status-viewer-empty"><button onClick={()=>navigate(-1)}>Close</button></div>;

//   const current = mediaItems[index];

//   return (
//     <div className="status-viewer" ref={containerRef}
//       onMouseDown={onHoldStart} 
//       onMouseUp={onHoldEnd} 
//       onMouseLeave={onHoldEnd} 
//       onTouchStart={onTouchStart} 
//       onTouchEnd={onTouchEnd} 
//       onClick={onContainerClick}
//     >
     
//       <div className="sv-topbar">
//         <div className="sv-user">
//           {current.logo ? <img src={current.logo} className="sv-avatar" alt={current.brandName}/> :
//             <div className="sv-avatar sv-avatar-fallback">{current.brandName[0]}</div>}
//           <div className="sv-meta">
//             <div className="sv-brand">{current.brandName}</div>
//             {current.createdAt && <div className="sv-time">{new Date(current.createdAt).toLocaleString()}</div>}
//           </div>
//         </div>
//         <button className="sv-close" onClick={()=>navigate('/Status')}>✕</button>
//       </div>

    
//       <div className="sv-progress-row">
//         {mediaItems.map((it,i)=>(
//           <div className="sv-progress-segment" key={i}>
//             <div className="sv-progress-fill" style={{width: i<index ? "100%" : i===index ? `${Math.round(progress*100)}%` : "0%", background: i<=index ? "var(--vendify)" : "rgba(255,255,255,0.25)"}}/>
//           </div>
//         ))}
//       </div>

    
//       <div className="sv-media">
//         {current.mediaType==="video" ? 
//           <video ref={videoRef} src={current.mediaUrl} className="sv-media-el" playsInline autoPlay muted onLoadedMetadata={onVideoLoadedMeta}/> :
//           <img src={current.mediaUrl} className="sv-media-el" alt="status"/>}
//         {current.caption && <div className="sv-caption">{current.caption}</div>}
//       </div>
//     </div>
//   );
// }


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

  // touch
  const startX = useRef(0);
  const startY = useRef(0);

  // NEXT
  const goNext = useCallback(() => {
    if (index < mediaItems.length - 1) {
      setIndex((i) => i + 1);
      setProgress(0);
      elapsed.current = 0;
    } else {
      navigate(-1);
    }
  }, [index, mediaItems.length, navigate]);

  // PREV
  const goPrev = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setProgress(0);
      elapsed.current = 0;
    } else {
      navigate(-1);
    }
  }, [index, navigate]);

  // TIMER
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

  // ON INDEX CHANGE
  useEffect(() => {
    setProgress(0);
    elapsed.current = 0;

    const current = mediaItems[index];

    if (current.mediaType === "video" && videoRef.current) {
      const v = videoRef.current;

      // If metadata already loaded
      if (!isNaN(v.duration) && v.duration > 0) {
        durations.current[index] = v.duration * 1000;
        startTimer(durations.current[index]);
      }
    } else {
      startTimer(durations.current[index]);
    }

    return () => timer.current && clearInterval(timer.current);
  }, [index, mediaItems, startTimer]);

  // VIDEO metadata
  const onMeta = (e) => {
    const ms = Math.floor(e.target.duration * 1000);
    durations.current[index] = ms > 0 ? ms : VIDEO_FALLBACK;
    startTimer(durations.current[index]);
  };

  // PAUSE + RESUME
  const pause = () => {
    setPaused(true);
    if (timer.current) clearInterval(timer.current);
    if (videoRef.current) videoRef.current.pause();
  };

  const resume = () => {
    setPaused(false);
    if (videoRef.current) videoRef.current.play();
    startTimer(durations.current[index]);
  };

  // HOLD
  const holdStart = () => {
    holding.current = true;
    pause();
  };

  const holdEnd = () => {
    holding.current = false;
    resume();
  };

  // TAP Navigation
  const onTap = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width * 0.33) goPrev();
    else if (x > rect.width * 0.66) goNext();
    else paused ? resume() : pause();
  };

  // TOUCH start/end for swipe
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

  // Keyboard
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
            <div className="sv-time">
              {new Date(current.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <button
          className="sv-close"
          onClick={(e) => {
          e.stopPropagation();   // prevent triggering next/prev
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
                width:
                  i < index
                    ? "100%"
                    : i === index
                    ? `${progress * 100}%`
                    : "0%",
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

        {current.caption && (
          <div className="sv-caption">{current.caption}</div>
        )}
      </div>

      {/* MESSAGE BAR */}
      <div className="sv-message-bar">
        <input
          type="text"
          placeholder="Message..."
          className="sv-input"
        />
        <button className="sv-send-btn">Send</button>
      </div>
    </div>
  );
}
