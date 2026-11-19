import { useEffect, useRef, useState } from "react";
import { asset } from "./UI";
interface AvatarProps {
  paused: boolean;
  getSpeechLevel: () => number;
}
export function AlisonAvatar({ paused, getSpeechLevel }: AvatarProps) {
  const host = useRef<HTMLDivElement>(null),
    pausedRef = useRef(paused),
    speechRef = useRef(getSpeechLevel);
  const [failed, setFailed] = useState(false);
  pausedRef.current = paused;
  speechRef.current = getSpeechLevel;
  useEffect(() => {
    let disposed = false,
      instance: { dispose: () => void } | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          import("../avatar.js")
            .then((m) => {
              if (disposed || !host.current) return;
              return m.mountAvatar(
                host.current,
                asset,
                () => pausedRef.current,
                () => speechRef.current(),
              );
            })
            .then((i) => {
              if (!i) return;
              if (disposed) i.dispose();
              else instance = i;
            })
            .catch(() => {
              if (!disposed) setFailed(true);
            });
        }
      },
      { rootMargin: "240px" },
    );
    if (host.current) io.observe(host.current);
    return () => {
      disposed = true;
      io.disconnect();
      instance?.dispose();
    };
  }, []);
  return (
    <div className="presenter-canvas" id="avatar" ref={host}>
      <div className="presenter-loading">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="32" r="16" />
          <path d="M20 92V82c0-37 60-37 60 0v10" />
        </svg>
        <p role="status">
          {failed
            ? "Character unavailable. You can still hear Alison."
            : "Preparing Alison…"}
        </p>
      </div>
    </div>
  );
}
