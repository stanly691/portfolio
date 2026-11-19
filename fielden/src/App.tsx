import { useState, useEffect } from "react";
import {
  products,
  stories,
  matchesProduct,
  type Product,
  type StoryKey,
} from "./data";
import { Icon, Modal, Photo } from "./ui";
import { ProductCard, ProductDetails, ShopMenu } from "./Shop";
import {
  ActivityEdit,
  CoastCampaign,
  DetailStudy,
  MotionPhoto,
} from "./Editorial";


export default function App() {
  const readLocation = () => {
    const q = new URLSearchParams(location.search);
    return {
      collection: q.has("collection"),
      audience: ["Women", "Men"].includes(q.get("collection") || "")
        ? q.get("collection")!
        : "",
      category: ["Everyday", "Outdoors", "Accessories", "Saved"].includes(
        q.get("category") || "",
      )
        ? q.get("category")!
        : "All",
    };
  };
  const [collectionPage, setCollectionPage] = useState(
    () => readLocation().collection,
  );
  const [filter, setFilter] = useState(() => readLocation().category);
  const [sort, setSort] = useState("featured");
  const [material, setMaterial] = useState("All materials");
  const [maxPrice, setMaxPrice] = useState("Any price");
  useEffect(() => {
    const sync = () => {
      const x = readLocation();
      setCollectionPage(x.collection);
      setAudience(x.audience);
      setFilter(x.category);
      setMaterial("All materials");
      setMaxPrice("Any price");
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const [audience, setAudience] = useState(() => readLocation().audience);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<{ product: Product; size: string }[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [story, setStory] = useState<StoryKey | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [notice, setNotice] = useState("");
  const filtered = products.filter(
    (p) =>
      (filter === "All" ||
        (filter === "Saved" ? saved.includes(p.id) : p.category === filter)) &&
      (!audience || p.category !== "Accessories") &&
      (material === "All materials" ||
        p.color.toLowerCase().includes(material.toLowerCase())) &&
      (maxPrice === "Any price" || p.price <= Number(maxPrice)),
  );
  const sorted = [...filtered].sort((a, b) =>
    sort === "low"
      ? a.price - b.price
      : sort === "high"
        ? b.price - a.price
        : sort === "name"
          ? a.name.localeCompare(b.name)
          : 0,
  );
  const shown = collectionPage ? sorted : sorted.slice(0, 8);
  function browse(value = "", category = "All") {
    setAudience(value);
    setFilter(category);
    setMaterial("All materials");
    setMaxPrice("Any price");
    setCollectionPage(true);
    setMenu(false);
    const q = new URLSearchParams({ collection: value || "all" });
    if (category !== "All") q.set("category", category);
    history.pushState({}, "", location.pathname + "?" + q.toString());
    requestAnimationFrame(() =>
      window.scrollTo({ top: 0, behavior: "instant" }),
    );
  }
  function home(section = "") {
    setCollectionPage(false);
    setAudience("");
    setFilter("All");
    setMaterial("All materials");
    setMaxPrice("Any price");
    setMenu(false);
    history.pushState(
      {},
      "",
      location.pathname + (section ? "#" + section : ""),
    );
    requestAnimationFrame(() => {
      if (section) document.getElementById(section)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
  }
  function view(p: Product) {
    setSelected(p);
    setSearch(false);
  }
  function changeFilter(next: string) {
    setFilter(next);
    if (next === "Accessories") setAudience("");
    if (collectionPage) {
      const q = new URLSearchParams(location.search);
      q.set("collection", next === "Accessories" ? "all" : audience || "all");
      if (next === "All") q.delete("category");
      else q.set("category", next);
      history.replaceState({}, "", location.pathname + "?" + q.toString());
    }
  }
  function favorite(p: Product) {
    setSaved((old) =>
      old.includes(p.id) ? old.filter((id) => id !== p.id) : [...old, p.id],
    );
  }
  const nav = (
    <>
      <ShopMenu browse={browse} />
      <button onClick={() => browse()}>New arrivals</button>
      <button onClick={() => browse("Women")}>Women</button>
      <button onClick={() => browse("Men")}>Men</button>
      <button onClick={() => setStory("philosophy")}>Our philosophy</button>
      <a
        href="#journal"
        onClick={(e) => {
          e.preventDefault();
          home("journal");
        }}
      >
        Field notes
      </a>
    </>
  );
  return (
    <div className={collectionPage ? "site-shell is-collection" : "site-shell"}>
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
        <a
          className="wordmark"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            home();
          }}
          aria-label="FIELDEN home"
        >
          fielden<span>™</span>
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
        {collectionPage && (
          <section className="collection-intro">
            <div className="collection-intro-copy">
              <p className="breadcrumbs">
                <button onClick={() => home()}>Home</button>
                <span>/</span>
                {audience || "The collection"}
              </p>
              <p className="eyebrow">The considered collection</p>
              <h1>
                {filter === "Accessories"
                  ? "The finishing touches."
                  : filter === "Outdoors"
                    ? "A little further out."
                    : audience
                      ? audience + "’s collection."
                      : "Everyday, and beyond."}
              </h1>
              <p>
                Familiar shapes. Beautiful materials. Find the pieces that feel
                like you.
              </p>
              <span className="collection-size-note">
                {audience
                  ? "All footwear styles are unisex. Explore the edit your way."
                  : "Twelve considered styles for a life well wandered."}
              </span>
            </div>
            <Photo
              name={
                filter === "Accessories"
                  ? "weekend"
                  : filter === "Outdoors"
                    ? "forest"
                    : audience === "Women"
                      ? "women"
                      : audience === "Men"
                        ? "men"
                        : "city"
              }
              alt="The FIELDEN seasonal collection"
              hero
            />
          </section>
        )}
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
            <button className="text-link" onClick={() => browse()}>
              View the collection
            </button>
          </div>
          <div className="collection-filters" aria-label="Filter collection">
            {[
              "All",
              "Everyday",
              "Outdoors",
              "Accessories",
              ...(saved.length || filter === "Saved" ? ["Saved"] : []),
            ].map((x) => (
              <button
                key={x}
                className={filter === x ? "active" : ""}
                onClick={() => changeFilter(x)}
                aria-pressed={filter === x}
              >
                {x === "All" ? "The full edit" : x}
                {x === "Saved" ? ` (${saved.length})` : ""}
              </button>
            ))}
            <span>{shown.length} considered styles</span>
          </div>
          {collectionPage && (
            <div className="shop-toolbar">
              <div className="shop-filters">
                <label>
                  Material
                  <select
                    aria-label="Material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  >
                    {[
                      "All materials",
                      "Suede",
                      "Leather",
                      "Canvas",
                      "Ripstop",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Price
                  <select
                    aria-label="Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  >
                    <option value="Any price">Any price</option>
                    <option value="100">Up to £100</option>
                    <option value="150">Up to £150</option>
                    <option value="200">Up to £200</option>
                  </select>
                </label>
              </div>
              <label>
                Sort by
                <select aria-label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>
          )}
          <div className="product-grid">
            {shown.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                saved={saved.includes(p.id)}
                onSave={() => favorite(p)}
                onView={() => view(p)}
              />
            ))}
          </div>
          {!collectionPage && (
            <div className="view-all-row">
              <p>Good things, in good company.</p>
              <button className="button dark" onClick={() => browse()}>
                Explore all {products.length} styles
              </button>
            </div>
          )}
          {shown.length === 0 && (
            <p className="empty-state">
              {filter === "Saved"
                ? "Your favourites will feel at home here. Select a heart to save a style."
                : "No styles match this combination. Try another material or price."}
            </p>
          )}
        </section>
        <ActivityEdit browse={browse} />
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
        <CoastCampaign browse={browse} />
        <DetailStudy />
        <section className="material-story" id="materials">
          <div className="material-image">
            <MotionPhoto
              name="craft-loop"
              poster="craft"
              alt="A slow editorial close-up of suede, cotton laces and fine stitching"
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
        <section className="weekend-edit section-pad">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The things you take with you</p>
              <h2>A well-considered weekend.</h2>
            </div>
            <button
              className="text-link"
              onClick={() => browse("", "Accessories")}
            >
              Explore accessories
            </button>
          </div>
          <div className="weekend-edit-grid">
            <button
              className="weekend-campaign"
              onClick={() => browse("", "Accessories")}
            >
              <Photo
                name="weekend"
                alt="Canvas, soft wool and everyday essentials packed for the weekend"
              />
              <span>Pack lightly. Go freely.</span>
            </button>
            <div className="weekend-products">
              {products
                .filter((p) => p.category === "Accessories")
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    saved={saved.includes(p.id)}
                    onSave={() => favorite(p)}
                    onView={() => view(p)}
                  />
                ))}
            </div>
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
            <a
              href="#journal"
              onClick={(e) => {
                e.preventDefault();
                home("journal");
              }}
            >
              Field notes
            </a>
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
          onClick={(e) => {
            e.preventDefault();
            home();
          }}
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
        <a className="wordmark" href="#" onClick={(e) => { e.preventDefault(); home(); }}>
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
          <ProductDetails
            key={selected.id}
            product={selected}
            onAdd={(chosenSize) => {
              setBag((old) => [
                ...old,
                { product: selected, size: chosenSize },
              ]);
              setNotice(selected.name + " added to your preview bag.");
              setSelected(null);
              setBagOpen(true);
            }}
          />
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
                      {item.product.color} ·{" "}
                      {item.product.category === "Accessories"
                        ? item.size
                        : "UK " + item.size}
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
    </div>
  );
}
