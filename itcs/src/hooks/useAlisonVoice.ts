import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { asset } from "../components/UI";
type Envelope = { interval: number; duration: number; levels: number[] };
export function useAlisonVoice(
  audioRef: RefObject<HTMLAudioElement>,
  sectionRef: RefObject<HTMLElement>,
  dialogOpen: boolean,
) {
  const [enabled, setEnabled] = useState(false),
    [status, setStatus] = useState("off");
  const manifest = useRef<Record<string, Envelope>>({}),
    current = useRef(""),
    sequence = useRef(0),
    enabledRef = useRef(false);
  const stop = useCallback(() => {
    sequence.current++;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setStatus(enabledRef.current ? "ready" : "off");
  }, []);
  const play = useCallback(
    async (id: string) => {
      stop();
      const token = sequence.current;
      current.current = id;
      const audio = audioRef.current;
      if (!audio) return;
      setStatus("loading");
      audio.src = asset(`alison/voice/${id}.mp3`);
      if (!manifest.current[id])
        fetch(asset("alison/voice/manifest.json"))
          .then((r) => {
            if (!r.ok) throw Error();
            return r.json();
          })
          .then((m) => {
            manifest.current = m;
          })
          .catch(() => {});
      try {
        await audio.play();
      } catch {
        if (token === sequence.current) setStatus("error");
      }
    },
    [stop],
  );
  const enable = useCallback(
    (id: string) => {
      enabledRef.current = true;
      setEnabled(true);
      play(id);
    },
    [play],
  );
  const mute = useCallback(() => {
    enabledRef.current = false;
    setEnabled(false);
    stop();
  }, [stop]);
  const level = useCallback(() => {
    const audio = audioRef.current,
      env = manifest.current[current.current];
    if (!audio || audio.paused || !env) return 0;
    const position = audio.currentTime / env.interval,
      idx = Math.floor(position),
      fraction = position - idx;
    return (
      (env.levels[idx] || 0) * (1 - fraction) +
      (env.levels[idx + 1] || 0) * fraction
    );
  }, []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const speaking = () => setStatus("speaking"),
      end = () => setStatus("ready"),
      error = () => setStatus("error");
    audio.addEventListener("playing", speaking);
    audio.addEventListener("ended", end);
    audio.addEventListener("error", error);
    const hide = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("pagehide", stop);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) stop();
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => {
      sequence.current++;
      audio.pause();
      audio.removeAttribute("src");
      audio.removeEventListener("playing", speaking);
      audio.removeEventListener("ended", end);
      audio.removeEventListener("error", error);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("pagehide", stop);
      io.disconnect();
    };
  }, [stop]);
  useEffect(() => {
    if (dialogOpen) stop();
  }, [dialogOpen, stop]);
  return { enabled, status, level, play, enable, mute, stop };
}
