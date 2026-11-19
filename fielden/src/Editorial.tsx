import { useEffect, useRef, useState } from "react";
import { Photo } from "./ui";
export function MotionPhoto({
  name,
  poster,
  alt,
}: {
  name: string;
  poster: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false),
    [paused, setPaused] = useState(false),
    [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      mq.removeEventListener("change", update);
      io.disconnect();
    };
  }, []);
  const animate = visible && !paused && !reduced;
  return (
    <div className="motion-photo" ref={ref}>
      <picture>
        {animate && (
          <source srcSet={`./motion/${name}.webp`} type="image/webp" />
        )}
        <img
          src={animate ? `./motion/${name}.gif` : `./images/${poster}.webp`}
          alt={alt}
          loading="lazy"
        />
      </picture>
      <button
        className="motion-control"
        onClick={() => setPaused((x) => !x)}
        disabled={reduced}
        aria-label={
          reduced
            ? "Reduced motion enabled"
            : `${paused ? "Play" : "Pause"} ${name.replace("-loop", "")} animation`
        }
      >
        <span aria-hidden="true">{animate ? "Ⅱ" : "▷"}</span>
        {reduced ? "Still moment" : paused ? "Play motion" : "Pause motion"}
      </button>
    </div>
  );
}
export function ActivityEdit({
  browse,
}: {
  browse: (audience?: string, category?: string) => void;
}) {
  const edits = [
    {
      image: "city",
      label: "Everyday",
      title: "The city, at your pace.",
      category: "Everyday",
    },
    {
      image: "forest",
      label: "The outdoors",
      title: "A little further out.",
      category: "Outdoors",
    },
    {
      image: "weekend",
      label: "Life in between",
      title: "Room for the weekend.",
      category: "Accessories",
    },
  ];
  return (
    <section className="activity-edit section-pad">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A way of being</p>
          <h2>Where will the day take you?</h2>
        </div>
        <span className="journal-subtitle">
          The right things. For your kind of day.
        </span>
      </div>
      <div className="activity-grid">
        {edits.map((e) => (
          <button
            className="activity-card"
            key={e.category}
            onClick={() => browse("", e.category)}
          >
            <Photo name={e.image} alt={e.title} />
            <div>
              <p className="eyebrow">{e.label}</p>
              <h3>{e.title}</h3>
              <span className="text-link">Explore the edit</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
export function CoastCampaign({
  browse,
}: {
  browse: (audience?: string, category?: string) => void;
}) {
  return (
    <section className="coast-campaign">
      <MotionPhoto
        name="shore-loop"
        poster="shore"
        alt="A slow editorial camera drift across the Cornish shoreline"
      />
      <div className="coast-copy">
        <p className="eyebrow">Out of office. Into the open.</p>
        <h2>
          Somewhere between
          <br />
          <em>here and nowhere.</em>
        </h2>
        <p>Good shoes. Fresh air. No particular plans.</p>
        <button className="button light" onClick={() => browse("", "Outdoors")}>
          Find your outside
        </button>
      </div>
      <span className="campaign-caption">FIELDEN JOURNEYS / THE COAST</span>
    </section>
  );
}
export function DetailStudy() {
  const [detail, setDetail] = useState(0);
  const details = [
    {
      label: "The natural shape",
      title: "Room to move.",
      copy: "A generous toe profile. An uncomplicated silhouette. Space for your everyday to unfold.",
      image: "shoe-top",
    },
    {
      label: "The tactile finish",
      title: "Texture tells a story.",
      copy: "The soft nap of suede, tonal cotton laces and a quiet line of stitching. Considered from every angle.",
      image: "craft",
    },
    {
      label: "The quiet details",
      title: "Nothing unnecessary.",
      copy: "A warm gum sole, restrained panel lines and an earthy palette. The familiar, thoughtfully refined.",
      image: "shoe",
    },
  ];
  const d = details[detail];
  return (
    <section className="detail-study section-pad">
      <div className="detail-study-copy">
        <p className="eyebrow">A closer consideration</p>
        <h2>
          Everything you need.
          <br />
          <em>Nothing you don’t.</em>
        </h2>
        <p>Meet The Roam, our study in the art of the everyday.</p>
        <div className="detail-tabs" aria-label="Explore design details">
          {details.map((x, i) => (
            <button
              key={x.label}
              aria-pressed={detail === i}
              className={detail === i ? "active" : ""}
              onClick={() => setDetail(i)}
            >
              <span>{x.label}</span>
              <span aria-hidden="true">{detail === i ? "−" : "+"}</span>
            </button>
          ))}
        </div>
        <div className="detail-description" aria-live="polite">
          <h3>{d.title}</h3>
          <p>{d.copy}</p>
        </div>
      </div>
      <div className="detail-study-photo">
        <Photo name={d.image} alt={`${d.label}: ${d.title}`} />
        <span>THE ROAM / STONE SUEDE</span>
      </div>
    </section>
  );
}
