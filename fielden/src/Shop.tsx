import { useEffect, useRef, useState } from "react";
import { Photo, Icon } from "./ui";
import type { Product } from "./data";
export function ShopMenu({
  browse,
}: {
  browse: (audience?: string, category?: string) => void;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        ref.current.open = false;
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", key);
    };
  }, []);
  function go(a = "", c = "All") {
    if (ref.current) ref.current.open = false;
    browse(a, c);
  }
  return (
    <details className="shop-menu" ref={ref}>
      <summary>
        Shop <span>⌄</span>
      </summary>
      <div className="mega-menu">
        <div>
          <p className="eyebrow">The collection</p>
          <button onClick={() => go()}>All styles</button>
          <button onClick={() => go("Women")}>Women</button>
          <button onClick={() => go("Men")}>Men</button>
          <button onClick={() => go("", "Accessories")}>Accessories</button>
        </div>
        <div>
          <p className="eyebrow">Shop by feeling</p>
          <button onClick={() => go("", "Everyday")}>The everyday edit</button>
          <button onClick={() => go("", "Outdoors")}>Into the outdoors</button>
          <button onClick={() => go("", "Accessories")}>
            The weekend essentials
          </button>
          <p className="mega-note">
            Familiar shapes.
            <br />A fresh perspective.
          </p>
        </div>
        <button className="mega-image" onClick={() => go("Women")}>
          <Photo name="women" alt="The women’s autumn edit" />
          <span>The autumn edit</span>
        </button>
        <button className="mega-image" onClick={() => go("", "Outdoors")}>
          <Photo name="forest" alt="A path through the forest" />
          <span>Find your outside</span>
        </button>
      </div>
    </details>
  );
}
export function ProductCard({
  product: p,
  saved,
  onSave,
  onView,
}: {
  product: Product;
  saved: boolean;
  onSave: () => void;
  onView: () => void;
}) {
  const alternate = p.gallery?.[1];
  return (
    <article className="product">
      <div className="product-image">
        <span className="product-tag">{p.tag}</span>
        <button
          className={`icon-button favorite ${saved ? "is-saved" : ""}`}
          aria-label={`${saved ? "Unsave" : "Save"} ${p.name}`}
          aria-pressed={saved}
          onClick={onSave}
        >
          <Icon name="heart" />
        </button>
        <button
          className={`product-photo ${alternate ? "has-alternate" : ""}`}
          aria-label={`View ${p.name}`}
          onClick={onView}
        >
          <Photo
            name={p.image}
            alt={`${p.name} in ${p.color}`}
            sizes="(max-width:700px) 50vw,25vw"
          />
          {alternate && (
            <Photo
              name={alternate}
              alt=""
              className="product-alternate"
              sizes="(max-width:700px) 50vw,25vw"
            />
          )}
        </button>
        <button className="quick-view" onClick={onView}>
          Discover the details <Icon name="plus" />
        </button>
      </div>
      <div className="product-title">
        <h3>
          <button onClick={onView}>{p.name}</button>
        </h3>
        <span>£{p.price}</span>
      </div>
      <p className="product-colour">{p.color}</p>
      <div className="product-meta">
        <span className="swatches" aria-label={p.color}>
          <span className="current" style={{ backgroundColor: p.colors[0] }} />
        </span>
        <span>{p.category}</span>
      </div>
    </article>
  );
}
export function ProductDetails({
  product: p,
  onAdd,
}: {
  product: Product;
  onAdd: (size: string) => void;
}) {
  const [active, setActive] = useState(0),
    [zoom, setZoom] = useState(false),
    [size, setSize] = useState(""),
    [sizeHelp, setSizeHelp] = useState(false);
  const gallery = p.gallery || [p.image];
  const accessory = p.category === "Accessories";
  const sizes =
    p.id === "rib"
      ? ["UK 4–7", "UK 8–11"]
      : accessory
        ? ["One size"]
        : ["4", "5", "6", "7", "8", "9", "10", "11"];
  return (
    <div className="product-expanded">
      <div className="product-gallery">
        <button
          className={`gallery-main ${zoom ? "zoomed" : ""}`}
          onClick={() => setZoom((x) => !x)}
          aria-label={
            zoom ? "Zoom out of product image" : "Zoom into product image"
          }
        >
          <Photo
            name={gallery[active]}
            alt={`${p.name} — ${active === 0 ? "studio view" : active === 1 && p.id in { roam: 1, moor: 1, ease: 1, still: 1 } ? "alternate view" : "styling inspiration"}`}
            sizes="(max-width:700px) 100vw,60vw"
          />
          <span className="zoom-caption">
            {zoom ? "− Zoom out" : "+ Explore the detail"}
          </span>
        </button>
        <div className="gallery-thumbnails">
          {gallery.map((image, i) => (
            <button
              key={image}
              onClick={() => {
                setActive(i);
                setZoom(false);
              }}
              aria-label={`View image ${i + 1} of ${p.name}`}
              aria-pressed={active === i}
            >
              <Photo name={image} alt="" sizes="100px" />
            </button>
          ))}
        </div>
        <p className="gallery-note">
          {active > 0 &&
          !["shoe-top", "boot-back", "white-top", "loafer-top"].includes(
            gallery[active],
          )
            ? "Styling inspiration from the FIELDEN edit."
            : "Considered from every angle."}
        </p>
      </div>
      <div className="product-detail">
        <p className="eyebrow">
          {p.category} / {p.tag}
        </p>
        <h1 id="page-heading" tabIndex={-1}>{p.name}</h1>
        <p className="detail-price">
          £{p.price} <span>GBP</span>
        </p>
        <p>{p.description}</p>
        <div className="detail-colour-row">
          <span style={{ backgroundColor: p.colors[0] }} />
          <p>{p.color}</p>
        </div>
        <fieldset>
          <legend>
            {accessory ? "Choose an option" : "Select your UK size"}
          </legend>
          <div className="size-options">
            {sizes.map((s) => (
              <button
                key={s}
                aria-pressed={size === s}
                className={size === s ? "selected" : ""}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        {!accessory && (
          <button
            className="text-link size-guide-link"
            onClick={() => setSizeHelp((x) => !x)}
            aria-expanded={sizeHelp}
          >
            Find your size
          </button>
        )}
        {sizeHelp && (
          <div className="inline-size-guide">
            <p>Illustrative UK / EU conversion</p>
            <div>
              {[
                "4 / 37",
                "5 / 38",
                "6 / 39",
                "7 / 41",
                "8 / 42",
                "9 / 43",
                "10 / 44",
                "11 / 46",
              ].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <small>
              Final fit measurements would be confirmed before production.
            </small>
          </div>
        )}
        <button
          className="button dark add-bag"
          disabled={!size}
          onClick={() => onAdd(size)}
        >
          {size ? "Add to bag" : "Select your size"}
        </button>
        <p className="demo-note">
          Independent design concept · no payment taken.
        </p>
        <div className="product-accordions">
          <details open>
            <summary>The considered details</summary>
            <p>
              {p.color}. Tonal finishing and a pared-back silhouette. An
              original FIELDEN product concept.
            </p>
          </details>
          <details>
            <summary>Materials & care</summary>
            <p>
              {p.color.toLowerCase().includes("suede")
                ? "Brush gently with a suede brush once dry. Keep away from direct heat."
                : p.color.toLowerCase().includes("leather")
                  ? "Wipe gently with a soft, dry cloth. Test any leather care product on a hidden area first."
                  : "Follow the care label for the final product. Brush off dry surface dirt gently and store away from direct heat."}
            </p>
          </details>
          <details>
            <summary>Delivery & returns</summary>
            <p>
              This collection is a visual design concept. Orders, delivery and
              returns are not enabled.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

