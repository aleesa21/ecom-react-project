import { useState, useRef, useEffect } from "react";
import "../css/FeaturedProducts.css";

function Showcase({ items, addToCart, checkincart }) {
  const list = items.slice(0, 6);
  const n = list.length;
  const [sel, setSel] = useState(0);

  const rackRef = useRef(null);
  const wheelLock = useRef(0);
  const dragStartX = useRef(null);

  useEffect(() => {
    const el = rackRef.current;
    if (!el) return;

   
    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      e.preventDefault();
      if (Math.abs(delta) < 16) return;

      const now = Date.now();
      if (now - wheelLock.current < 280) return;
      wheelLock.current = now;

      setSel((s) => (s + (delta > 0 ? 1 : -1) + n) % n);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [n]);

  if (n === 0) return null;

  const safeSel = ((sel % n) + n) % n;
  const cur = list[safeSel];
  const inCart = checkincart(cur);
  const go = (d) => setSel((s) => (s + d + n) % n);

  const ghostWord = (cur.category || "CURATED").split(/\s+/)[0];

  return (
    <div
      className="fp-showcase"
      tabIndex={0}
      style={{ "--fp-bg": `var(--fp-tone-${safeSel % 5})` }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      {/* Shared metal gradients, defined once */}
      <svg className="fp-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient
            id="fpChrome"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="54"
          >
            <stop offset="0" stopColor="#f4f6f8" />
            <stop offset="0.45" stopColor="#9aa3ab" />
            <stop offset="1" stopColor="#4a5258" />
          </linearGradient>
          <linearGradient id="fpClip" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3a4046" />
            <stop offset="0.5" stopColor="#1d2125" />
            <stop offset="1" stopColor="#3a4046" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="fp-ghost"
        aria-hidden="true"
        style={{ "--fp-len": ghostWord.length }}
      >
        <span key={ghostWord} className="fp-ghost-word">
          {ghostWord}
        </span>
      </div>

      {/* ---------- LEFT: BIG PRODUCT STAGE ---------- */}
      <div className="fp-stage">
        <div className="fp-stage-top">
          <p className="fp-pill">
            <span>{cur.category}</span>
          </p>

          <div className="fp-nav">
            <button
              type="button"
              className="fp-nav-btn"
              onClick={() => go(-1)}
              aria-label="Previous piece"
            >
              ←
            </button>
            <button
              type="button"
              className="fp-nav-btn"
              onClick={() => go(1)}
              aria-label="Next piece"
            >
              →
            </button>
          </div>
        </div>

        <div className="fp-hero-media">
          <div className="fp-hero-bob" key={cur.id}>
            <img
              src={cur.image}
              alt={cur.title}
              loading="eager"
              decoding="async"
              draggable="false"
            />
            <span className="fp-hero-shadow" aria-hidden="true" />
          </div>
        </div>

        <div className="fp-stage-foot" key={`foot-${cur.id}`}>
          <div className="fp-copy">
            <h3 className="fp-title">{cur.title}</h3>
            <div className="fp-price">${cur.price}</div>
          </div>

          <button
            type="button"
            className={`fp-cta ${inCart ? "is-added" : ""}`}
            onClick={() => addToCart(cur)}
            aria-label={inCart ? "In bag" : `Add ${cur.title} to bag`}
          >
            <span>{inCart ? "In bag" : "Add to bag"}</span>
            <span className="fp-cta-icon" aria-hidden="true">
              {inCart ? "✓" : "→"}
            </span>
          </button>
        </div>
      </div>

      {/* ---------- RIGHT: HANGER RACK ---------- */}
      <div
        className="fp-rack-side"
        ref={rackRef}
        onPointerDown={(e) => {
          dragStartX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragStartX.current !== null) {
            const dx = e.clientX - dragStartX.current;
            if (Math.abs(dx) > 36) go(dx < 0 ? 1 : -1);
          }
          dragStartX.current = null;
        }}
      >
        <div className="fp-rack-meta">
          <span>On the rack</span>
          <span>
            {String(safeSel + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>

        <div className="fp-rack-zone">
          <div className="fp-rod" aria-hidden="true" />

          <div className="fp-hang-stack">
            {list.map((item, i) => {
              let offset = i - safeSel;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;

              const abs = Math.abs(offset);
              const isFront = offset === 0;
              const isOut = abs > 2; // front piece + 2 either side

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`fp-garment ${isFront ? "is-front" : ""} ${
                    isOut ? "is-out" : ""
                  }`}
                  style={{
                    "--card-tone": `var(--fp-tone-${i % 5})`,
                    "--offset": offset,
                    "--abs": abs,
                    zIndex: isFront ? 30 : 20 - abs,
                  }}
                  onClick={() => setSel(i)}
                  aria-pressed={isFront}
                  aria-label={`${item.title} — $${item.price}`}
                >
                  <span className="fp-garment-swing">
                    <span className="fp-hanger" aria-hidden="true">
                      <svg viewBox="0 0 236 54" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M118 12 V32"
                          fill="none"
                          stroke="url(#fpChrome)"
                          strokeWidth="3"
                          strokeLinecap="butt"
                        />
                        <path
                          className="fp-h-ext"
                          d="M118 31 V46"
                          fill="none"
                          stroke="url(#fpChrome)"
                          strokeWidth="3"
                        />
                        <g className="fp-h-bar">
                          <polyline
                            points="48,40 118,29 188,40"
                            fill="none"
                            stroke="url(#fpChrome)"
                            strokeWidth="3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                          <rect x="48" y="39" width="140" height="4" rx="2" fill="url(#fpChrome)" />
                          <rect x="51" y="40" width="20" height="14" rx="3" fill="url(#fpClip)" />
                          <rect x="53" y="42" width="16" height="2" rx="1" fill="#fff" opacity="0.18" />
                          <rect x="165" y="40" width="20" height="14" rx="3" fill="url(#fpClip)" />
                          <rect x="167" y="42" width="16" height="2" rx="1" fill="#fff" opacity="0.18" />
                        </g>
                      </svg>
                    </span>

                    <span className="fp-look-card">
                      <span className="fp-look-top">
                        <span className="fp-look-idx">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="fp-look-price">${item.price}</span>
                      </span>

                      <span className="fp-look-img">
                        <img
                          src={item.image}
                          alt=""
                          loading="eager"
                          decoding="async"
                          draggable="false"
                        />
                      </span>

                      <span className="fp-look-title">{item.title}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="fp-rail-nav" role="tablist" aria-label="Select product">
          {list.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`fp-rail-dot ${i === safeSel ? "is-active" : ""}`}
              onClick={() => setSel(i)}
              aria-label={item.title}
              aria-selected={i === safeSel}
            />
          ))}
          <span className="fp-rail-text">Scroll</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts({
  categories,
  filter,
  setFilter,
  items,
  addToCart,
  checkincart,
}) {
  const count = Math.min(items.length, 6);

  return (
    <section className="fp-section">
      <div className="section-3 padding fp-root">
        <div className="fp-head">
          <h2 className="fp-h2">
            Featured <span>Products</span>
          </h2>
          <p className="fp-head-note">
            Curated for you. Pick a category, then scroll or drag the rack to browse.
          </p>
        </div>

        <div className="fp-bar">
          <div className="fp-seg" role="group" aria-label="Filter by category">
            {categories.map((cat) => {
              const active = filter.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  className={`fp-seg-btn ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <span className="fp-bar-count">{count} picks</span>
        </div>

        {items.length === 0 ? (
          <p className="fp-empty">Nothing here yet. Try another category.</p>
        ) : (
          <Showcase
            key={filter}
            items={items}
            addToCart={addToCart}
            checkincart={checkincart}
          />
        )}
      </div>
    </section>
  );
}