import { useRef, useState } from "react";
import { brief } from "../data.js";
import { conversations } from "../conversations.js";
import { useAlisonVoice } from "../hooks/useAlisonVoice";
import { AlisonAvatar } from "./AlisonAvatar";
import { Button, Eyebrow, SectionHeading, Logo } from "./UI";
interface AlisonProps {
  paused: boolean;
  dialogOpen: boolean;
  onEnquire: (service?: string) => void;
  onNotes: (title: string, body: React.ReactNode) => void;
}
export function AlisonExperience({
  paused,
  dialogOpen,
  onEnquire,
  onNotes,
}: AlisonProps) {
  const [greeting, setGreeting] = useState(false);
  const welcome =
    "Hello, I’m Alison. I can help your team with customer enquiries, sales follow-ups and everyday tasks. Choose a business and a conversation to see how we could work together.";
  const [context, setContext] = useState(0),
    [example, setExample] = useState(0),
    [step, setStep] = useState(0),
    [business, setBusiness] = useState(() => {
      try {
        return sessionStorage.getItem("itcs-alison-business") || "";
      } catch {
        return "";
      }
    });
  const section = useRef<HTMLElement>(null),
    audio = useRef<HTMLAudioElement>(null);
  const voice = useAlisonVoice(audio, section, dialogOpen);
  const script = conversations[context][example],
    line = script[step],
    scenario = brief.alison.scenarios[context].examples[example],
    clip = greeting ? "welcome-0" : `${context}-${example}-${step}`;
  function select(c: number, e: number) {
    voice.stop();
    setGreeting(false);
    setContext(c);
    setExample(e);
    setStep(0);
  }
  function advance() {
    setGreeting(false);
    const next = step + 1;
    setStep(next);
    if (voice.enabled) voice.play(`${context}-${example}-${next}`);
  }
  function name(value: string) {
    setBusiness(value);
    try {
      sessionStorage.setItem("itcs-alison-business", value);
    } catch {}
  }
  function transcript() {
    if (greeting) {
      onNotes("Say hello", <p>{welcome}</p>);
      return;
    }
    onNotes(
      scenario.title,
      <div className="transcript">
        {script.map((l, i) => (
          <div key={i}>
            <p>
              <strong>Alison</strong>
              {l[0]}
            </p>
            {l[1] && (
              <p className="transcript-customer">
                <strong>Customer</strong>
                {l[1]}
              </p>
            )}
          </div>
        ))}
      </div>,
    );
  }
  function notes() {
    const data = [
      [
        "Order reference, delivery postcode, issue and preferred next step.",
        "Order management, courier tracking and customer support.",
        "Your team handles identity checks, policy decisions and unresolved delivery issues.",
      ],
      [
        "Property details, availability, contact preference and requirements.",
        "Property listings, CRM and booking requests.",
        "The agent confirms appointments, valuations and advice.",
      ],
      [
        "Symptoms, affected users, timing, equipment and approvals.",
        "Help desk, asset register and identity systems.",
        "Engineers investigate issues. Authorised people approve access.",
      ],
      [
        "Requirements, relevant records, timing and review responsibilities.",
        "CRM, help desk and approved document sources.",
        "Your team approves actions. Qualified specialists make compliance decisions.",
      ],
    ][context];
    onNotes(
      "A clear handover.",
      <>
        <h3>What Alison gathers</h3>
        <p>{data[0]}</p>
        <h3>What could connect</h3>
        <p>{data[1]}</p>
        <h3>Where people take over</h3>
        <p>{data[2]}</p>
        <p className="small-copy">
          Illustrative conversations. No live records are accessed.
        </p>
      </>,
    );
  }
  return (
    <section id="meet-alison" className="alison-section" ref={section}>
      <div className="wrap section">
        <SectionHeading
          eyebrow="BUSINESS AI, CONNECTED BY ITCS"
          title={
            <>
              Meet Alison.
              <br />
              <span className="red">More gets done.</span>
            </>
          }
          copy={
            <>
              <h3>Support. Sales. Everyday operations.</h3>
              <p>
                Handle routine enquiries, follow-ups and information gathering.
                Connect Alison to your business tools, with clear handovers when
                a person is needed.
              </p>
            </>
          }
        />
        <div className="alison-experience">
          <div className="presenter">
            <Logo className="presenter-brand" />
            <div className="preview-tag">
              <span />
              Interactive preview
            </div>
            <AlisonAvatar paused={paused} getSpeechLevel={voice.level} />
            <div className="presenter-caption">
              <div>
                <strong>Alison</strong>
                <span>
                  {business
                    ? `At ${business}.`
                    : "A connected part of your team."}
                </span>
              </div>
              <div
                className={`voice-indicator ${voice.status}`}
                data-state={voice.status}
                aria-hidden="true"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
            </div>
            <div className="voice-control">
              <Button
                variant="text"
                className="say-hello"
                onClick={() => {
                  setGreeting(true);
                  voice.enable("welcome-0");
                }}
              >
                Say hello
              </Button>
              <Button
                variant="outline"
                id="voice"
                aria-pressed={voice.enabled}
                onClick={() =>
                  voice.enabled ? voice.mute() : voice.enable(clip)
                }
              >
                {voice.enabled ? "Mute voice" : "Hear Alison"}
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="m11 5-6 5H2v4h3l6 5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
                </svg>
              </Button>
              <span id="voice-status" role="status">
                {
                  {
                    off: "British English · sound off",
                    loading: "Preparing voice…",
                    speaking: "Alison is speaking",
                    ready: "Voice on · ready",
                    error: "Audio could not play. Try Hear again.",
                  }[voice.status]
                }
              </span>
            </div>
            <audio ref={audio} preload="none" data-alison-audio="true" />
          </div>
          <div className="conversation-column">
            <label htmlFor="business-name">
              Picture Alison at your business <span>(optional)</span>
            </label>
            <input
              id="business-name"
              value={business}
              onChange={(e) => name(e.target.value)}
              placeholder="Your business name"
              autoComplete="organization"
              maxLength={80}
            />
            <div
              className="scenario-tabs"
              role="group"
              aria-label="Business context"
            >
              {brief.alison.scenarios.map((s, i) => (
                <button
                  key={s.business}
                  data-context={i}
                  aria-pressed={context === i}
                  onClick={() => select(i, 0)}
                >
                  {s.business}
                </button>
              ))}
            </div>
            <div id="scenario-choices" className="scenario-choices">
              {brief.alison.scenarios[context].examples.map((s, i) => (
                <button
                  key={s.title}
                  data-example={i}
                  aria-pressed={example === i}
                  onClick={() => select(context, i)}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <div className="conversation" id="conversation" aria-live="polite">
              <span className="chat-label">
                ALISON /{" "}
                {greeting
                  ? "SAY HELLO"
                  : scenario.channel === "Team workflow"
                    ? "TEAM WORKFLOW"
                    : scenario.channel.toUpperCase() + " CONVERSATION"}
              </span>
              <p className="chat-bubble">{greeting ? welcome : line[0]}</p>
            </div>
            <div id="customer-options" className="customer-options">
              {greeting ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setGreeting(false);
                    setStep(0);
                    if (voice.enabled) voice.play(`${context}-${example}-0`);
                  }}
                >
                  Try a conversation
                </Button>
              ) : line[1] ? (
                <button onClick={advance}>
                  <span className="reply-label">YOUR REPLY</span>
                  {line[1]}
                  <span className="reply-plus" aria-hidden="true">
                    +
                  </span>
                </button>
              ) : (
                <Button variant="text" onClick={() => onEnquire("Alison")}>
                  Explore this for your business
                </Button>
              )}
            </div>
            <div className="conversation-controls">
              <button
                onClick={() => {
                  voice.stop();
                  setGreeting(false);
                  setStep(0);
                }}
              >
                Start again
              </button>
              <button onClick={() => voice.enable(clip)}>Hear again</button>
              <button onClick={transcript}>Read conversation</button>
              <button onClick={notes}>View notes</button>
            </div>
          </div>
        </div>
        <div className="alison-cta">
          <div>
            <h3>Make Alison part of your team.</h3>
            <p>Your CRM. Your help desk. Your way of working.</p>
          </div>
          <Button onClick={() => onEnquire("Alison")}>
            Let’s talk about Alison
          </Button>
        </div>
      </div>
    </section>
  );
}
