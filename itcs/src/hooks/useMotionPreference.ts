import { useCallback, useEffect, useState } from "react";
export function useMotionPreference() {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion:reduce)").matches,
  );
  const [manual, setManual] = useState(() => {
    try {
      return sessionStorage.getItem("itcs-motion") === "paused";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion:reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const toggle = useCallback(
    () =>
      setManual((previous) => {
        const next = !previous;
        try {
          sessionStorage.setItem("itcs-motion", next ? "paused" : "running");
        } catch {}
        return next;
      }),
    [],
  );
  return { paused: reduced || manual, reduced, toggle };
}
