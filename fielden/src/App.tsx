import { useState } from "react";
import {
  products,
  stories,
  matchesProduct,
  type Product,
  type StoryKey,
} from "./data";
import { Icon, Modal, Photo } from "./ui";

export default function App() {
  const [filter, setFilter] = useState("All");
  const [audience, setAudience] = useState("");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<{ product: Product; size: string }[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [story, setStory] = useState<StoryKey | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [notice, setNotice] = useState("");
  const shown = products.filter(
    (p) =>
      filter === "All" ||
      (filter === "Saved" ? saved.includes(p.id) : p.category === filter),
  );
  function browse(value = "", category = "All") {
    setAudience(value);
    setFilter(category);
    setMenu(false);
    document
      .getElementById("collection")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  function view(p: Product) {
    setSelected(p);
    setSize("");
    setSearch(false);
  }
  function favorite(p: Product) {
    setSaved((old) =>
      old.includes(p.id) ? old.filter((id) => id !== p.id) : [...old, p.id],
    );
  }
  const nav = (
    <>
      <button onClick={() => browse()}>New arrivals</button>
      <button onClick={() => browse("Women")}>Women</button>
      <button onClick={() => browse("Men")}>Men</button>
      <button onClick={() => setStory("philosophy")}>Our philosophy</button>
      <a href="#journal" onClick={() => setMenu(false)}>
        Field notes
      </a>
    </>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        <span>A considered collection. A quieter way of living.</span>
        <span>Discover the autumn edit</span>
      </div>
      <header className="header">
        <button
          className="icon-button mobile-menu"
          aria-label="Open navigation"
          onClick={() => setMenu(true)}
        >
          <Icon name="menu" />
        </button>
        <a className="wordmark" href="#" aria-label="FIELDEN home">
          fielden<span>®</span>
        </a>
        <nav aria-label="Main navigation">{nav}</nav>
        <div className="header-tools">
          <button
            className="icon-button"
            aria-label="Search the collection"
            onClick={() => setSearch(true)}
          >
            <Icon name="search" />
          </button>
          <button
            className="icon-button saved-button"
            aria-label={`View saved items (${saved.length})`}
            onClick={() => browse("", "Saved")}
          >
            <Icon name="heart" />
            {saved.length > 0 && <span className="count">{saved.length}</span>}
          </button>
          <button
            className="bag-button"
            aria-label={`Open bag (${bag.length})`}
            onClick={() => setBagOpen(true)}
          >
            <Icon name="bag" />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{bag.length}</span>
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Photo
            name="hero"
            alt="An unhurried walk along a windswept Cornish coastal path"
            hero
            sizes="(max-width: 560px) 1400px, 100vw"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow">Made for life, outside.</p>
            <h1 id="hero-title">
              A little closer
              <br />
              to <em>nature.</em>
            </h1>
            <p>
              Considered footwear for the everyday.
              <br />
              And everything beyond it.
            </p>
            <div className="hero-actions">
              <button className="button light" onClick={() => browse("Women")}>
                Explore women
              </button>
              <button
                className="button outline-light"
                onClick={() => browse("Men")}
              >
                Explore men
              </button>
            </div>
          </div>
          <div className="hero-bottom">
            <span>THE AUTUMN COLLECTION</span>
            <span>Take the long way home.</span>
            <a href="#collection" aria-label="Discover the collection below">
              SCROLL TO DISCOVER <span className="scroll-line" />
            </a>
          </div>
        </section>
        <section className="introduction section-pad">
          <p className="eyebrow">Less noise. More feeling.</p>
          <h2>
            Life feels better
            <br />
            when you find <em>your own pace.</em>
          </h2>
          <p>
            Rooted in nature. Refined for the everyday. Meet a collection of
            <br className="desktop-break" /> timeless essentials that take you
            wherever life unfolds.
          </p>
          <button className="text-link" onClick={() => setStory("philosophy")}>
            The FIELDEN philosophy
          </button>
        </section>
        <section
          className="collection section-pad"
          id="collection"
          aria-labelledby="collection-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your everyday, considered</p>
              <h2 id="collection-title">
                {audience
                  ? `${audience}’s essentials.`
                  : "Meet your new essentials."}
              </h2>
            </div>
            <button
              className="text-link"
              onClick={() => {
                setFilter("All");
                setAudience("");
              }}
            >
              View the collection
            </button>
          </div>
          <div className="collection-filters" aria-label="Filter collection">
            {[
              "All",
              "Everyday",
              "Outdoors",
              ...(saved.length || filter === "Saved" ? ["Saved"] : []),
            ].map((x) => (
              <button
                key={x}
                className={filter === x ? "active" : ""}
                onClick={() => setFilter(x)}
                aria-pressed={filter === x}
              >
                {x === "All" ? "The full edit" : x}
                {x === "Saved" ? ` (${saved.length})` : ""}
              </button>
            ))}
            <span>{shown.length} considered styles</span>
          </div>
          <div className="product-grid">
            {shown.map((p) => (
              <article className="product" key={p.id}>
                <div className="product-image">
                  <span className="product-tag">{p.tag}</span>
                  <button
                    className={`icon-button favorite ${saved.includes(p.id) ? "is-saved" : ""}`}
                    aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                    aria-pressed={saved.includes(p.id)}
                    onClick={() => favorite(p)}
                  >
                    <Icon name="heart" />
                  </button>
                  <button
                    className="product-photo"
                    aria-label={`View ${p.name}`}
                    onClick={() => view(p)}
                  >
                    <Photo
                      name={p.image}
                      alt={`${p.name} in ${p.color}`}
                      sizes="(max-width: 700px) 50vw, 25vw"
                    />
                  </button>
                  <button className="quick-view" onClick={() => view(p)}>
                    Discover the details <Icon name="plus" />
                  </button>
                </div>
                <div className="product-title">
                  <h3>
                    <button onClick={() => view(p)}>{p.name}</button>
                  </h3>
                  <span>£{p.price}</span>
                </div>
                <p className="product-colour">{p.color}</p>
                <div
                  className="swatches"
                  aria-label={`Colour direction: ${p.color}`}
                >
                  {p.colors.map((c, i) => (
                    <span
                      key={c}
                      className={i === 0 ? "current" : ""}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && (
            <p className="empty-state">
              Your favourites will feel at home here. Select a heart to save a
              style.
            </p>
          )}
        </section>
        <section className="category-grid" aria-label="Explore the collections">
          <article className="category">
            <Photo
              name="women"
              alt="Stone suede shoes and relaxed linen on sunlit country-house steps"
            />
            <div>
              <p className="eyebrow">Ease in every step</p>
              <h2>For her everyday.</h2>
              <button
                className="text-link on-dark"
                onClick={() => browse("Women")}
              >
                Explore women
              </button>
            </div>
          </article>
          <article className="category">
            <Photo
              name="men"
              alt="Leather walking boots and natural layers beside an old stone wall"
            />
            <div>
              <p className="eyebrow">Room to roam</p>
              <h2>For his own path.</h2>
              <button
                className="text-link on-dark"
                onClick={() => browse("Men")}
              >
                Explore men
              </button>
            </div>
          </article>
        </section>
        <section className="material-story" id="materials">
          <div className="material-image">
            <Photo
              name="craft"
              alt="A close study of warm suede, fine stitching and a gum sole on limestone"
            />
          </div>
          <div className="material-copy">
            <p className="eyebrow">Considered in every detail</p>
            <h2>
              Good things
              <br />
              take <em>feeling.</em>
            </h2>
            <p>
              The texture of suede. The warmth of leather. The quiet confidence
              of a well-made essential.
            </p>
            <p>
              Simple by design. Rich in the details that matter. A collection
              imagined to feel as natural as the way you move.
            </p>
            <button className="text-link" onClick={() => setStory("materials")}>
              A closer look at our materials
            </button>
            <div className="material-signoff">
              <span className="signature">Naturally, fielden.</span>
              <span>LESS, BUT BETTER.</span>
            </div>
          </div>
        </section>
        <section className="principles" aria-label="Design principles">
          <div>
            <Icon name="foot" />
            <h3>Room to be yourself.</h3>
            <p>Easy shapes. An unhurried spirit.</p>
          </div>
          <div>
            <Icon name="leaf" />
            <h3>Inspired by the natural.</h3>
            <p>Earthy colours. Tactile materials.</p>
          </div>
          <div>
            <Icon name="sun" />
            <h3>For more of the everyday.</h3>
            <p>Familiar favourites, thoughtfully refined.</p>
          </div>
        </section>
        <section className="journal section-pad" id="journal">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Stories for the way</p>
              <h2>Field notes.</h2>
            </div>
            <span className="journal-subtitle">
              A slower look at the world around us.
            </span>
          </div>
          <div className="journal-grid">
            {(
              [
                {
                  key: "coast",
                  image: "hero",
                  category: "Places · On the coast",
                  title: "The art of taking the long way.",
                },
                {
                  key: "wardrobe",
                  image: "women",
                  category: "Everyday rituals · The considered wardrobe",
                  title: "Less, but a little better.",
                },
                {
                  key: "care",
                  image: "craft",
                  category: "Care & consideration · The small things",
                  title: "Time well spent.",
                },
              ] as const
            ).map((s) => (
              <button
                className="journal-card"
                key={s.key}
                onClick={() => setStory(s.key)}
              >
                <div className={`journal-image journal-${s.image}`}>
                  <Photo
                    name={s.image}
                    alt={s.title}
                    sizes="(max-width:700px) 100vw, 33vw"
                  />
                </div>
                <p className="eyebrow">{s.category}</p>
                <h3>{s.title}</h3>
                <span className="text-link">Read the story</span>
              </button>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <p className="eyebrow">A note from the outside</p>
            <h2>
              Good things.
              <br />
              <em>Every so often.</em>
            </h2>
            <p>
              New collections, thoughtful stories and reasons to get outside.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
          >
            <label htmlFor="newsletter">Your email address</label>
            <div className="email-row">
              <input
                id="newsletter"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
              <button type="submit">Join the list</button>
            </div>
            <p aria-live="polite">
              {subscribed
                ? "Thank you. This design preview has not sent or stored your email."
                : "An occasional letter. Always considered."}
            </p>
          </form>
        </div>
        <div className="footer-links">
          <p>
            Thoughtful footwear.
            <br />
            For a life well wandered.
          </p>
          <div>
            <h3>Explore</h3>
            <button onClick={() => browse("Women")}>Women</button>
            <button onClick={() => browse("Men")}>Men</button>
            <button onClick={() => browse()}>The full collection</button>
          </div>
          <div>
            <h3>Our world</h3>
            <button onClick={() => setStory("philosophy")}>
              Our philosophy
            </button>
            <button onClick={() => setStory("materials")}>Materials</button>
            <a href="#journal">Field notes</a>
          </div>
          <div>
            <h3>Here to help</h3>
            <button onClick={() => setInfo("Size guide")}>Size guide</button>
            <button onClick={() => setInfo("Delivery & returns")}>
              Delivery & returns
            </button>
            <button onClick={() => setInfo("Contact")}>Contact</button>
          </div>
          <div className="region">
            <span>United Kingdom · GBP £</span>
            <p>Made for life, outside.</p>
          </div>
        </div>
        <a
          className="footer-wordmark"
          href="#"
          aria-label="Back to FIELDEN home"
        >
          fielden<span>®</span>
        </a>
        <div className="footer-bottom">
          <span>© 2026 FIELDEN · Independent design concept</span>
          <span>AI-generated imagery · No purchases or payments</span>
          <button onClick={() => setInfo("Privacy")}>Privacy</button>
        </div>
      </footer>
      <div className="sr-only" role="status">
        {notice}
      </div>
      <Modal
        open={menu}
        onClose={() => setMenu(false)}
        label="navigation"
        className="menu-modal"
      >
        <a className="wordmark" href="#" onClick={() => setMenu(false)}>
          fielden
        </a>
        <nav aria-label="Mobile navigation">{nav}</nav>
        <Photo name="women" alt="FIELDEN women’s collection" />
        <p>For the everyday. And the beyond.</p>
      </Modal>
      <Modal
        open={search}
        onClose={() => setSearch(false)}
        label="search"
        className="search-modal"
      >
        <p className="eyebrow">Find your everyday</p>
        <h2>Something in mind?</h2>
        <label className="search-field">
          <Icon name="search" />
          <input
            aria-label="Search styles"
            autoFocus
            placeholder="Try suede, boots or everyday…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="search-results">
          {products
            .filter((p) => matchesProduct(p, query))
            .map((p) => (
              <button key={p.id} onClick={() => view(p)}>
                <Photo name={p.image} alt={p.color} />
                <span>
                  {p.name}
                  <small>{p.color}</small>
                </span>
                <span>£{p.price}</span>
              </button>
            ))}
          {!products.some((p) => matchesProduct(p, query)) && (
            <p>No styles found. Try “suede” or “leather”.</p>
          )}
        </div>
      </Modal>
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        label="product details"
        className="product-modal"
      >
        {selected && (
          <>
            <Photo
              name={selected.image}
              alt={`${selected.name} in ${selected.color}`}
            />
            <div className="product-detail">
              <p className="eyebrow">{selected.tag}</p>
              <h2>{selected.name}</h2>
              <p className="detail-price">£{selected.price}</p>
              <p>{selected.description}</p>
              <p className="detail-colour">{selected.color}</p>
              <fieldset>
                <legend>Choose your UK size</legend>
                <div className="size-options">
                  {["4", "5", "6", "7", "8", "9", "10", "11"].map((x) => (
                    <button
                      type="button"
                      key={x}
                      className={size === x ? "selected" : ""}
                      aria-pressed={size === x}
                      onClick={() => setSize(x)}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </fieldset>
              <button
                className="button dark add-bag"
                disabled={!size}
                onClick={() => {
                  setBag((old) => [...old, { product: selected, size }]);
                  setNotice(
                    `${selected.name}, size ${size}, added to your preview bag.`,
                  );
                  setSelected(null);
                  setBagOpen(true);
                }}
              >
                {" "}
                {size ? "Add to bag" : "Select your size"}
              </button>
              <p className="demo-note">
                Design preview · illustrative products and prices.
              </p>
            </div>
          </>
        )}
      </Modal>
      <Modal
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        label="bag"
        className="bag-modal"
      >
        <p className="eyebrow">A good place to start</p>
        <h2>
          Your bag <span>({bag.length})</span>
        </h2>
        {bag.length === 0 ? (
          <div className="empty-state">
            <Icon name="bag" />
            <p>A little room for something good.</p>
            <button
              className="button dark"
              onClick={() => {
                setBagOpen(false);
                browse();
              }}
            >
              Explore the collection
            </button>
          </div>
        ) : (
          <>
            <div className="bag-items">
              {bag.map((item, i) => (
                <div className="bag-item" key={`${item.product.id}-${i}`}>
                  <Photo name={item.product.image} alt={item.product.name} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>
                      {item.product.color} · UK {item.size}
                    </p>
                    <button
                      className="text-link"
                      onClick={() =>
                        setBag((old) => old.filter((_, index) => index !== i))
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <span>£{item.product.price}</span>
                </div>
              ))}
            </div>
            <div className="bag-total">
              <span>Subtotal</span>
              <span>
                £{bag.reduce((sum, item) => sum + item.product.price, 0)}
              </span>
            </div>
            <p className="preview-note">
              This is a design preview. Checkout and payment are not enabled.
            </p>
            <button className="button dark" onClick={() => setBagOpen(false)}>
              Continue exploring
            </button>
          </>
        )}
      </Modal>
      <Modal
        open={!!story}
        onClose={() => setStory(null)}
        label="story"
        className="story-modal"
      >
        {story && (
          <>
            <Photo name={stories[story].image} alt={stories[story].title} />
            <div>
              <p className="eyebrow">{stories[story].eyebrow}</p>
              <h2>{stories[story].title}</h2>
              {stories[story].body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </>
        )}
      </Modal>
      <Modal
        open={!!info}
        onClose={() => setInfo(null)}
        label="information"
        className="info-modal"
      >
        <p className="eyebrow">FIELDEN</p>
        <h2>{info}</h2>
        {info === "Size guide" ? (
          <>
            <p>Illustrative UK / EU size guide for this collection concept.</p>
            <table>
              <thead>
                <tr>
                  <th>UK</th>
                  <th>EU</th>
                </tr>
              </thead>
              <tbody>
                {[4, 5, 6, 7, 8, 9, 10, 11].map((s, i) => (
                  <tr key={s}>
                    <td>{s}</td>
                    <td>{[37, 38, 39, 41, 42, 43, 44, 46][i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              Final product measurements would be provided by the manufacturer.
            </p>
          </>
        ) : (
          <p>
            {info === "Privacy"
              ? "This prototype uses no analytics, tracking cookies or external checkout. Form entries are not transmitted. Your preview bag and saved styles exist only while this page is open."
              : info === "Contact"
                ? "FIELDEN is an independent portfolio design concept, not an operating retailer. No customer support or purchasing service is connected."
                : "This is a design concept, so no orders are shipped and no payments are collected. Delivery and returns details would be defined before a real store launches."}
          </p>
        )}
      </Modal>
    </>
  );
}
