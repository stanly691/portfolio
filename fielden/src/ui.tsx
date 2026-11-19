import { useEffect, useRef, type ReactNode } from "react";
export function Icon({
  name,
}: {
  name:
    | "search"
    | "bag"
    | "heart"
    | "menu"
    | "close"
    | "plus"
    | "leaf"
    | "sun"
    | "foot";
}) {
  const paths = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M8 9V6a4 4 0 0 1 8 0v3" />
      </>
    ),
    heart: (
      <path d="M20.8 4.7a5.3 5.3 0 0 0-7.5 0L12 6l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 21l8.8-8.8a5.3 5.3 0 0 0 0-7.5Z" />
    ),
    menu: <path d="M3 7h18M3 16h18" />,
    close: <path d="m5 5 14 14M19 5 5 19" />,
    plus: <path d="M12 4v16M4 12h16" />,
    leaf: (
      <>
        <path d="M20 3C9 2 2 6 4 14s17 8 16-11Z" />
        <path d="M3 22 16 8" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
      </>
    ),
    foot: (
      <>
        <path d="M5 17c3-1 3-4 4-7 1-4 4-6 7-4 4 3 2 7 0 9-2 2-1 6-5 7-3 1-8-2-6-5Z" />
        <path d="m9 13 6 2" />
      </>
    ),
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  hero = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  className?: string;
  hero?: boolean;
  sizes?: string;
}) {
  return (
    <img
      className={className}
      src={`./images/${name}.webp`}
      srcSet={`./images/${name}-small.webp 640w, ./images/${name}.webp ${name === "hero" ? 1672 : 1200}w`}
      sizes={sizes}
      alt={alt}
      loading={hero ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : undefined}
      decoding="async"
    />
  );
}
export function Modal({
  open,
  onClose,
  label,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement;
    dialog.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button
        className="icon-button close-modal"
        onClick={onClose}
        aria-label={`Close ${label}`}
      >
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  );
}
