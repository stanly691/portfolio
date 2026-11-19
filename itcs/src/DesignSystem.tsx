import { useState } from "react";
import { Logo, Button, Eyebrow, Icon, asset } from "./components/UI";
import {
  ConnectedIllustration,
  PrinterIllustration,
} from "./components/Illustrations";
export function DesignSystem() {
  const [selected, setSelected] = useState(0);
  return (
    <main className="system">
      <div className="wrap">
        <a className="text-link" href="../">
          Back to ITCS
        </a>
        <div className="system-heading">
          <Eyebrow>ITCS / DESIGN SYSTEM / 01</Eyebrow>
          <h1>
            Connected.
            <br />
            <span>By design.</span>
          </h1>
          <p>
            A precise interface. Original digital illustration.
            <br />
            One consistent language for the whole website.
          </p>
          <span className="system-version">
            REACT + TYPESCRIPT / CONNECTED, ILLUSTRATED
          </span>
        </div>
        <section className="system-section">
          <Eyebrow>IDENTITY</Eyebrow>
          <h2>Authentically ITCS.</h2>
          <div className="system-logos">
            <div>
              <Logo />
            </div>
            <div>
              <Logo dark />
            </div>
          </div>
          <p>Official artwork. Original proportions. The red remains red.</p>
        </section>
        <section className="system-section">
          <Eyebrow>COLOUR</Eyebrow>
          <h2>Red with a reason.</h2>
          <div className="swatches">
            {[
              ["Brand red", "#ED1C24"],
              ["Action red", "#D71922"],
              ["Ink", "#171717"],
              ["Surface", "#222225"],
              ["Canvas", "#EFEFED"],
              ["Paper", "#F2F0E8"],
            ].map(([name, hex]) => (
              <div key={name}>
                <span style={{ background: hex }} />
                <strong>{name}</strong>
                <code>{hex}</code>
              </div>
            ))}
          </div>
        </section>
        <section className="system-section">
          <Eyebrow>TYPOGRAPHY</Eyebrow>
          <h2>Clarity. At every scale.</h2>
          <div className="type-specimen">
            <h1>Business IT.</h1>
            <h2>All connected.</h2>
            <h3>Your business. Our expertise.</h3>
            <p>
              The shared body type, a defined scale, measured line lengths and
              comfortable leading establish the hierarchy.
            </p>
            <code>MONOSPACE / SERVICE BRIEF / ITCS</code>
          </div>
        </section>
        <section className="system-section">
          <Eyebrow>COMPONENTS</Eyebrow>
          <h2>Familiar and purposeful.</h2>
          <div className="system-controls">
            <Button>Start a conversation</Button>
            <Button variant="outline">Explore a service</Button>
            <Button variant="text">View the details</Button>
            <Button disabled>Unavailable</Button>
          </div>
          <div className="system-icons">
            {Array.from({ length: 6 }, (_, i) => (
              <Icon key={i} index={i} />
            ))}
          </div>
          <label className="system-field">
            Business email
            <input type="email" placeholder="you@yourbusiness.co.uk" />
          </label>
          <div
            className="scenario-tabs"
            role="group"
            aria-label="Example selection"
          >
            {["IT support", "Cyber security", "Connectivity"].map((t, i) => (
              <button
                key={t}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="system-note">
            Visible keyboard focus · 44px minimum targets · Explicit labels · No
            autoplay audio
          </p>
        </section>
        <section className="system-section">
          <Eyebrow>ILLUSTRATION & MOTION</Eyebrow>
          <h2>Drawn with intention.</h2>
          <div className="system-art">
            <div>
              <PrinterIllustration />
              <h3>The service printer</h3>
              <p>
                A shallow red housing, recessed slot and a 2.6-second mechanical
                paper feed. The proportions and motion follow the supplied
                reconstruction specification.
              </p>
            </div>
            <div>
              <ConnectedIllustration />
              <h3>Connected expertise</h3>
              <p>
                One digital illustration language: red paths, considered
                geometry, soft depth and the genuine ITCS logo.
              </p>
            </div>
          </div>
        </section>
        <section className="system-section">
          <Eyebrow>ALISON</Eyebrow>
          <h2>A calm, connected presence.</h2>
          <p className="system-text">
            Chest-up framing at eye level. Natural attention and blinking.
            Forty-nine locally hosted British-English voice clips, with explicit
            activation, mute and replay. Audio-driven mouth movement. Every
            conversation works in text, too.
          </p>
        </section>
        <div className="system-footer">
          ITCS / CONNECTED, ILLUSTRATED / DESIGN SYSTEM 1.0
        </div>
      </div>
    </main>
  );
}
