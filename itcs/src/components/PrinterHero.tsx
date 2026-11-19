import { useEffect, useRef, useState } from "react";
import { brief } from "../data.js";
import { Button, Logo, Icon, Eyebrow, Plus } from "./UI";
import { PrinterIllustration } from "./Illustrations";
import { ParticleLogo } from "./ParticleLogo";
const services = brief.services;
interface HeroProps {
  paused: boolean;
  onService: (index: number) => void;
  onEnquire: (service?: string) => void;
}
function PaperSurface() {
  return (
    <svg
      className="paper-surface"
      viewBox="0 0 500 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="paper-shade" x2="1" y2="0">
          <stop stopColor="#deddd6" />
          <stop offset=".024" stopColor="#f7f6ef" />
          <stop offset=".5" stopColor="#F2F0E8" />
          <stop offset=".98" stopColor="#eeede5" />
          <stop offset="1" stopColor="#dbdad3" />
        </linearGradient>
        <linearGradient id="paper-roller" x2="0" y2="1">
          <stop stopColor="#000" stopOpacity=".18" />
          <stop offset=".07" stopColor="#000" stopOpacity="0" />
          <stop offset=".93" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".38" />
        </linearGradient>
      </defs>
      <path
        d={`M0 0H500V495${Array.from({ length: 100 }, (_, i) => `l-5 ${i % 2 ? -3 : 3}`).join("")}Z`}
        fill="url(#paper-shade)"
      />
      <path d="M0 0H500V495H0Z" fill="url(#paper-roller)" />
    </svg>
  );
}
export function PrinterHero({ paused, onService, onEnquire }: HeroProps) {
  const [selected, setSelected] = useState(0),
    [replay, setReplay] = useState(0),
    [printing, setPrinting] = useState(!paused);
  const sheet = useRef<HTMLDivElement>(null);
  const service = services[selected];
  useEffect(() => {
    if (!sheet.current) return;
    if (paused) {
      setPrinting(false);
      return;
    }
    setPrinting(true);
    const animation = sheet.current.animate(
      [
        { transform: "translateY(-102%)" },
        { transform: "translateY(-72%)", offset: 0.26 },
        { transform: "translateY(-69%)", offset: 0.31 },
        { transform: "translateY(-35%)", offset: 0.65 },
        { transform: "translateY(-33%)", offset: 0.7 },
        { transform: "translateY(0)" },
      ],
      { duration: 2600, easing: "cubic-bezier(.2,.55,.3,1)" },
    );
    animation.finished.then(() => setPrinting(false)).catch(() => {});
    return () => animation.cancel();
  }, [selected, replay, paused]);
  const choose = (i: number) => {
    if (i === selected) setReplay((v) => v + 1);
    else setSelected(i);
  };
  function choices(start: number, end: number) {
    return services.slice(start, end).map((s, i) => (
      <button
        key={s.slug}
        data-print={start + i}
        aria-pressed={selected === start + i}
        onClick={() => choose(start + i)}
      >
        <Icon index={start + i} />
        <span>{s.title}</span>
        <span className="service-choice-dot" aria-hidden="true" />
      </button>
    ));
  }
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-intro">
        <Eyebrow>
          MANAGED IT SUPPORT <span> / </span> CYBER SECURITY <span> / </span>{" "}
          TELECOMS
        </Eyebrow>
        <h1 id="hero-heading">
          Business IT.
          <br className="mobile-break" /> <span>All connected.</span>
        </h1>
        <p>
          IT, security and connectivity for UK businesses.
          <br />
          Choose a service. We’ll print the essentials.
        </p>
      </div>
      <div className="printer-stage">
        <div className="service-choices left">{choices(0, 3)}</div>
        <div className={`printer-column ${printing ? "printing" : ""}`}>
          <div className="printer-device">
            <PrinterIllustration printing={printing} />
            <div className="slot-lip" />
          </div>
          <div className="paper-window">
            <div className="receipt-sheet" ref={sheet}>
              <article
                className="receipt"
                id="receipt"
                aria-label={`${service.title} service brief`}
              >
                <PaperSurface />
                <div className="receipt-inner">
                  <div className="receipt-brand">
                    <Logo dark />
                    <span>
                      YOUR BUSINESS.
                      <br />
                      OUR EXPERTISE.
                    </span>
                  </div>
                  <div className="receipt-meta">
                    <span>SERVICE BRIEF</span>
                    <span>ITCS / {String(selected + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="receipt-content">
                    <div>
                      <h2>{service.title}</h2>
                      <strong>{service.benefit}</strong>
                      <p>{service.description}</p>
                    </div>
                    <div>
                      <h3>WHAT WE CAN HELP WITH</h3>
                      <ul>
                        {service.capabilities.slice(0, 4).map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="receipt-actions">
                    <Button onClick={() => onEnquire(service.title)}>
                      Let’s talk
                    </Button>
                    <button onClick={() => onService(selected)}>
                      View service details <Plus />
                    </button>
                  </div>
                  <div className="receipt-footer">
                    <span className="barcode" aria-hidden="true" />
                    <span>
                      ONE CONNECTED TEAM.
                      <br />
                      SINCE 2004.
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className="service-choices right">{choices(3, 6)}</div>
      </div>
      <div className="hero-tools">
        <span id="print-status" role="status" aria-live="polite">
          <i className={printing ? "active" : ""} />
          {printing
            ? "Printing your service brief…"
            : `${service.title} brief ready.`}
        </span>
        <button id="reprint" onClick={() => setReplay((v) => v + 1)}>
          <svg
            viewBox="0 0 20 20"
            className="icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <path d="M4 6a7 7 0 1 1-1 7M4 2v5h5" />
          </svg>
          Print again
        </button>
      </div>
      <div className="hero-bottom">
        <span>UK-wide support. Established 2004.</span>
        <button onClick={() => onEnquire()}>
          Not sure where to start? <u>Let’s talk</u>
        </button>
      </div>
    </section>
  );
}
export function FolderHero({ paused, onService, onEnquire }: HeroProps) {
  return (
    <section className="folder-hero wrap section">
      <div>
        <Eyebrow>ONE CONNECTED TECHNOLOGY PARTNER</Eyebrow>
        <h1>
          Business IT.
          <br />
          <span>All connected.</span>
        </h1>
        <p>
          Managed IT support, cyber security and business telecoms. Fully
          managed, or working alongside your own IT team.
        </p>
        <Button onClick={() => onEnquire()}>Talk to our team</Button>
        <a className="text-link" href="#expertise">
          Explore services
        </a>
      </div>
      <div className="folder-object">
        <div className="folder-cards">
          {services.map((s, i) => (
            <button key={s.slug} onClick={() => onService(i)}>
              <Icon index={i} />
              {s.title}
              <Plus />
            </button>
          ))}
        </div>
        <div className="folder-pocket">
          <ParticleLogo paused={paused} />
          <span>EVERYTHING IN THE RIGHT PLACE.</span>
        </div>
      </div>
    </section>
  );
}
