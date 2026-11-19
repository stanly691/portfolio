import { useEffect, useRef, useState, type ReactNode } from "react";
import { brief } from "./data.js";
import {
  Button,
  Eyebrow,
  Icon,
  Logo,
  Plus,
  SectionHeading,
  asset,
} from "./components/UI";
import { Header } from "./components/Header";
import { PrinterHero, FolderHero } from "./components/PrinterHero";
import { ConnectedIllustration } from "./components/Illustrations";
import { AlisonExperience } from "./components/AlisonExperience";
import { Dialog, EnquiryForm, type DialogContent } from "./components/Dialog";
import { useMotionPreference } from "./hooks/useMotionPreference";
const customers = brief.trust_and_customer_sections.customer_section.customers;
function CustomerSpotlight() {
  const [current, setCurrent] = useState(0);
  const tabs = useRef<HTMLDivElement>(null),
    touch = useRef(0);
  const c = customers[current];
  const choose = (n: number, focus = false) => {
    const next = (n + customers.length) % customers.length;
    setCurrent(next);
    if (focus)
      requestAnimationFrame(() =>
        tabs.current
          ?.querySelectorAll<HTMLButtonElement>("[role=tab]")
          [next]?.focus(),
      );
  };
  return (
    <section id="customers" className="light-section">
      <div className="wrap section">
        <SectionHeading
          eyebrow="WORKING RELATIONSHIPS"
          title={
            <>
              People who count
              <br />
              on ITCS.
            </>
          }
          copy={<p>Good technology starts with a good working relationship.</p>}
        />
        <div
          className="customer-tabs"
          ref={tabs}
          role="tablist"
          aria-label="Customer stories"
        >
          {customers.map((c, i) => (
            <button
              key={c.name}
              id={`customer-tab-${i}`}
              role="tab"
              tabIndex={current === i ? 0 : -1}
              aria-selected={current === i}
              aria-controls="customer-panel"
              onClick={() => choose(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  choose(
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : current + (e.key === "ArrowRight" ? 1 : -1),
                    true,
                  );
                }
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div
          id="customer-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`customer-tab-${current}`}
          onTouchStart={(e) => (touch.current = e.changedTouches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 70) choose(current + (dx < 0 ? 1 : -1));
          }}
        >
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>{c.quote}</blockquote>
          <div className="quote-credit">
            <div>
              <strong>{c.name}</strong>
              <p>{c.sector}</p>
            </div>
            <div className="quote-scope">
              {c.scope.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="quote-controls">
          <span>{String(current + 1).padStart(2, "0")} / 03</span>
          <div>
            <button
              aria-label="Previous customer"
              onClick={() => choose(current - 1)}
            >
              ←
            </button>
            <button
              aria-label="Next customer"
              onClick={() => choose(current + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export function App() {
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const { paused, reduced, toggle } = useMotionPreference();
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
  }, [paused]);
  const show = (title: string, body: ReactNode) => setDialog({ title, body });
  function enquire(service = "") {
    let business = "";
    try {
      business = sessionStorage.getItem("itcs-alison-business") || "";
    } catch {}
    setDialog({
      title: "Start a conversation.",
      body: (
        <EnquiryForm
          key={service}
          service={service}
          company={service === "Alison" ? business : ""}
        />
      ),
    });
  }
  function service(i: number) {
    const s = brief.services[i];
    show(
      s.title,
      <>
        <h3>{s.benefit}</h3>
        <p>{s.description}</p>
        <ul className="detail-list">
          {s.capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        {s.qualification && <p className="small-copy">{s.qualification}</p>}
        <Button onClick={() => enquire(s.title)}>
          Talk to us about {s.short.toLowerCase()}
        </Button>
      </>,
    );
  }
  const folder = new URLSearchParams(location.search).get("hero") === "folder";
  const sectors = [
    "Keep learning connected.",
    "Protect client confidence.",
    "Keep public services moving.",
    "Support the people who care.",
    "Connect people and properties.",
    "Put security at the centre.",
  ];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header onEnquire={() => enquire()} />
      <main id="main">
        {folder ? (
          <FolderHero paused={paused} onService={service} onEnquire={enquire} />
        ) : (
          <PrinterHero
            paused={paused}
            onService={service}
            onEnquire={enquire}
          />
        )}
        <section className="trust-section" aria-label="Customer references">
          <div className="wrap trust">
            <p className="eyebrow">
              IN GOOD
              <br />
              COMPANY
            </p>
            <div className="customer-logos">
              <img
                src={asset("official/siderise.png")}
                alt="Siderise"
                width="300"
                height="90"
              />
              <img
                src={asset("official/sony.png")}
                alt="Sony UK Technology Centre"
                width="300"
                height="152"
              />
              <img
                src={asset("official/renault.png")}
                alt="Renault"
                width="150"
                height="150"
              />
            </div>
            <p className="trust-caption">
              Connected technology.
              <br />
              Lasting relationships.
            </p>
          </div>
        </section>
        <section
          className="wrap certification-overview"
          aria-label="Company certifications"
        >
          <div className="accreditations">
            <div>
              <Eyebrow>STANDARDS BEHIND THE SERVICE</Eyebrow>
              <p>
                Quality. Security.
                <br />
                Responsibility.
              </p>
            </div>
            <div className="certification-list">
              {[
                ["9001", "Quality management"],
                ["27001", "Information security"],
                ["14001", "Environmental management"],
              ].map(([n, label]) => (
                <div key={n}>
                  <img
                    src={asset(`official/iso${n}.jpg`)}
                    alt={`ITCS ISO ${n} company-published certification badge`}
                    loading="lazy"
                  />
                  <span>
                    ISO {n}
                    <small>{label}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="wrap section" id="expertise">
          <SectionHeading
            eyebrow="HERE TO HELP"
            title={
              <>
                What do you need
                <br />
                help with?
              </>
            }
            copy={<p>{brief.service_overview.description}</p>}
          />
          <div className="service-grid">
            {brief.services.map((s, i) => (
              <button
                className={`service-card ${i > 2 ? "secondary" : ""}`}
                key={s.slug}
                onClick={() => service(i)}
              >
                <div className="card-top">
                  <Icon index={i} />
                  <Plus />
                </div>
                <h3>{s.title}</h3>
                <p>{s.benefit}</p>
                <span className="card-action">
                  Explore {s.short.toLowerCase()}
                </span>
              </button>
            ))}
          </div>
        </section>
        <CustomerSpotlight />
        <section id="how-we-work" className="wrap section">
          <div className="approach-layout">
            <div>
              <Eyebrow>PEOPLE YOU CAN TALK TO</Eyebrow>
              <h2>
                A conversation.
                <br />
                Then a clear plan.
              </h2>
              <p>{brief.people_and_approach.description}</p>
              <Button onClick={() => enquire()}>Tell us what you need</Button>
            </div>
            <figure>
              <ConnectedIllustration />
              <figcaption>THE RIGHT EXPERTISE. WORKING TOGETHER.</figcaption>
            </figure>
          </div>
          <div className="steps">
            {brief.people_and_approach.steps.map((s, i) => (
              <div key={s.title}>
                <span className="step-marker">
                  {String(i + 1).padStart(2, "0")}
                  <i />
                </span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </section>
        <AlisonExperience
          paused={paused}
          dialogOpen={!!dialog}
          onEnquire={enquire}
          onNotes={show}
        />
        <section id="sectors" className="wrap section">
          <SectionHeading
            eyebrow="BUILT AROUND YOUR WORLD"
            title={
              <>
                Support that fits
                <br />
                the way you work.
              </>
            }
            copy={<p>{brief.sectors.description}</p>}
          />
          <div className="sector-grid">
            {brief.sectors.homepage_items.map((s, i) => (
              <button
                key={s}
                onClick={() =>
                  show(
                    s,
                    <>
                      <p>
                        {sectors[i]} We’ll discuss your organisation’s systems,
                        security and day-to-day needs, then agree the right
                        people and a practical next step.
                      </p>
                      <Button onClick={() => enquire()}>
                        Discuss your organisation
                      </Button>
                    </>,
                  )
                }
              >
                <span>{s}</span>
                <small>{sectors[i]}</small>
                <Plus />
              </button>
            ))}
          </div>
        </section>
        <section className="faq-section">
          <div className="wrap section faq-layout">
            <div>
              <Eyebrow>A FEW USEFUL ANSWERS</Eyebrow>
              <h2>
                Let’s clear
                <br />
                things up.
              </h2>
              <p>Still have a question?</p>
              <Button variant="text" onClick={() => enquire()}>
                Ask our team
              </Button>
            </div>
            <div>
              {brief.faq.map((f) => (
                <details key={f.question}>
                  <summary>
                    {f.question}
                    <Plus />
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="closing-section">
          <div className="wrap section closing">
            <div>
              <Eyebrow>LET’S WORK IT OUT</Eyebrow>
              <h2>
                What’s on
                <br />
                your mind?
              </h2>
              <p>{brief.enquiry_and_footer.closing_description}</p>
              <Button onClick={() => enquire()}>Start a conversation</Button>
            </div>
            <div className="contact-side">
              <p>Prefer a conversation?</p>
              <a href="tel:01656660016">01656 660 016</a>
              <p>
                Number One, Waterton Park
                <br />
                Bridgend, CF31 3PH
              </p>
              <Logo />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <div>
              <Logo />
              <p>
                Your business.
                <br />
                Our expertise.
              </p>
            </div>
            <div>
              <h3>How we can help</h3>
              <a href="#expertise">Our services</a>
              <a href="#sectors">Your sector</a>
              <a href="#meet-alison">Meet Alison</a>
            </div>
            <div>
              <h3>Get to know us</h3>
              <a href="#how-we-work">Our people & approach</a>
              <a href="#customers">Customer stories</a>
              <button disabled>
                Careers<span className="sr-only"> — page planned</span>
              </button>
            </div>
            <div>
              <h3>Let’s stay connected</h3>
              <a href="tel:01656660016">01656 660 016</a>
              <button onClick={() => enquire()}>Start a conversation</button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} ITCS (UK) Ltd · Company No. 05251472
            </span>
            <div>
              <button
                onClick={() =>
                  show(
                    "Your privacy.",
                    <>
                      <p>
                        This experiment has no analytics or live enquiry
                        backend. Your optional business name stays in your
                        browser’s session storage. Enquiry details remain on
                        this page and disappear when it reloads.
                      </p>
                      <p>
                        Character assets and prerecorded AI voice clips load
                        from this site. No microphone access or live account
                        lookups are used.
                      </p>
                    </>,
                  )
                }
              >
                Privacy
              </button>
              <button
                onClick={() =>
                  show(
                    "Cookie preferences.",
                    <>
                      <p>
                        No tracking cookies or analytics are used. Only the
                        optional business name is held in session storage.
                      </p>
                      <Button
                        onClick={() => {
                          try {
                            sessionStorage.removeItem("itcs-alison-business");
                          } catch {}
                          show(
                            "Business name cleared.",
                            <p>
                              The stored business name has been removed. Reload
                              the page to clear the current field.
                            </p>,
                          );
                        }}
                      >
                        Clear business name
                      </Button>
                    </>,
                  )
                }
              >
                Cookie preferences
              </button>
              <button
                id="motion"
                aria-pressed={paused}
                disabled={reduced}
                title={
                  reduced
                    ? "Reduced motion is enabled in your device settings"
                    : undefined
                }
                onClick={toggle}
              >
                {reduced
                  ? "Reduced motion"
                  : paused
                    ? "Resume motion"
                    : "Pause motion"}
              </button>
            </div>
          </div>
        </div>
      </footer>
      <Dialog content={dialog} onClose={() => setDialog(null)} />
    </>
  );
}
