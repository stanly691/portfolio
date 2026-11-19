import { useEffect, useRef, useState } from "react";
import { brief } from "../data.js";
import { Logo, Button } from "./UI";
interface HeaderProps {
  onEnquire: () => void;
}
export function Header({ onEnquire }: HeaderProps) {
  const [open, setOpen] = useState(""),
    [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const mobileState = useRef(mobile);
  mobileState.current = mobile;
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function outside(e: PointerEvent) {
      if (!header.current?.contains(e.target as Node)) setOpen("");
    }
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen("");
        setMobile(false);
        if (mobileState.current) mobileButton.current?.focus();
        else trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const close = () => {
    setOpen("");
    setMobile(false);
  };
  const groups = [
    {
      title: "Services",
      overview: "expertise",
      items: brief.services.map((s) => ({ label: s.title, href: "" })),
    },
    {
      title: "Sectors",
      overview: "sectors",
      items: brief.header.navigation[1].items.map((label) => ({
        label,
        href: "",
      })),
    },
    {
      title: "About ITCS",
      overview: "",
      items: [
        { label: "Our people & approach", href: "how-we-work" },
        { label: "Customer stories", href: "customers" },
        { label: "Careers", href: "" },
        { label: "Accreditations", href: "" },
      ],
    },
  ];
  return (
    <header className="site-header" ref={header}>
      <div className="header-inner">
        <a href="./" aria-label="ITCS home">
          <Logo />
        </a>
        <button
          ref={mobileButton}
          className="mobile-menu"
          aria-controls="navigation"
          aria-expanded={mobile}
          onClick={() => setMobile((v) => !v)}
        >
          Menu{" "}
          <span
            className={mobile ? "menu-glyph open" : "menu-glyph"}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
        <nav
          id="navigation"
          className={mobile ? "open" : ""}
          aria-label="Main navigation"
        >
          {groups.map((g) => (
            <div className="nav-group" key={g.title}>
              <button
                className="nav-trigger"
                aria-expanded={open === g.title}
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setOpen(open === g.title ? "" : g.title);
                }}
              >
                {g.title}
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="m3 4.5 3 3 3-3" />
                </svg>
              </button>
              {open === g.title && (
                <div className="nav-panel">
                  {g.overview && (
                    <a href={`#${g.overview}`} onClick={close}>
                      Explore {g.title.toLowerCase()}
                    </a>
                  )}
                  {g.items.map((item) =>
                    item.href ? (
                      <a
                        key={item.label}
                        href={`#${item.href}`}
                        onClick={close}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button key={item.label} disabled>
                        {item.label}
                        <span className="sr-only"> — page planned</span>
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
          <a href="#meet-alison" onClick={close}>
            Meet Alison
          </a>
          <button disabled>
            Insights<span className="sr-only"> — page planned</span>
          </button>
          <Button
            onClick={() => {
              close();
              onEnquire();
            }}
          >
            Let’s talk
          </Button>
        </nav>
      </div>
    </header>
  );
}
