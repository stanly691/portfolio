import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button, Eyebrow } from "./UI";
import { brief } from "../data.js";
export interface DialogContent {
  title: string;
  body: ReactNode;
}
export function Dialog({
  content,
  onClose,
}: {
  content: DialogContent | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null),
    returnFocus = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (content && !el.open) {
      returnFocus.current = document.activeElement as HTMLElement;
      el.showModal();
    } else if (!content && el.open) {
      el.close();
      returnFocus.current?.focus();
    }
  }, [content]);
  return (
    <dialog
      ref={ref}
      id="dialog"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="dialog-close"
        aria-label="Close dialog"
        onClick={onClose}
      >
        ×
      </button>
      {content && (
        <>
          <Eyebrow>ITCS / LET’S CONNECT</Eyebrow>
          <h2 id="dialog-title">{content.title}</h2>
          {content.body}
        </>
      )}
    </dialog>
  );
}
export function EnquiryForm({
  service = "",
  company = "",
}: {
  service?: string;
  company?: string;
}) {
  const [result, setResult] = useState("");
  return (
    <>
      <p>
        Tell us what’s on your mind. This creates a local preview; nothing is
        sent to ITCS.
      </p>
      <form
        id="enquiry"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const selected = (
            e.currentTarget.elements.namedItem("service") as HTMLSelectElement
          ).selectedOptions[0].textContent;
          setResult(
            `${data.get("name")} · ${selected}. Nothing has been sent. To speak to ITCS, call 01656 660 016.`,
          );
        }}
      >
        <div className="form-grid">
          <label>
            Name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Company
            <input
              name="company"
              autoComplete="organization"
              defaultValue={company}
            />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
        </div>
        <label>
          Service
          <select
            name="service"
            defaultValue={
              service === "Alison" ? "alison" : service || "Not sure yet"
            }
          >
            <option>Not sure yet</option>
            {brief.services.map((s) => (
              <option key={s.title}>{s.title}</option>
            ))}
            <option value="alison">Alison · Business assistant</option>
          </select>
        </label>
        <label>
          Message
          <textarea
            name="message"
            required
            rows={4}
            defaultValue={
              service === "Alison"
                ? "I’d like to explore Alison across support, sales and routine workflows for my business."
                : ""
            }
          />
        </label>
        <label className="consent">
          <input type="checkbox" required />I understand this is a local preview
          and no message will be sent.
        </label>
        <Button type="submit">Preview enquiry</Button>
        {result && (
          <div className="form-result" id="enquiry-result" role="status">
            <h3>Your enquiry preview is ready.</h3>
            <p>{result}</p>
          </div>
        )}
      </form>
    </>
  );
}
