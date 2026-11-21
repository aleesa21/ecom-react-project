import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import "../css/Hero.css";

/*
  Edit this list: one entry per image.
  bg     = hero background when this product is in front
  ink    = text colour on that background
  colour = the big word behind the products + the little label in the pill
*/
const PRODUCTS = [
  {
    img: "p1.png",
    name: "Stone Tee",
    colour: "Stone",
    bg: "#c9cfd4",
    ink: "#16191c",
  },
  {
    img: "p2.png",
    name: "Sage Linen Shirt",
    colour: "Sage",
    bg: "#c8d6bb",
    ink: "#18230f",
  },
  {
    img: "p3.png",
    name: "Sunset Print Tee",
    colour: "Sunset",
    bg: "#eebd9f",
    ink: "#3a1707",
  },
  {
    img: "p4.png",
    name: "Washed Denim Shorts",
    colour: "Denim",
    bg: "#b9cee4",
    ink: "#0d2037",
  },
];

const COUNT = PRODUCTS.length;
const STEP_DEG = 360 / COUNT;
const mod = (n, m) => ((n % m) + m) % m;

export default function Hero() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const stepRef = useRef(0);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const sizeRef = useRef({ rx: 180, ry: 80, base: 30 });

  /* place every card on the ring */
  const paint = useCallback(() => {
    const { rx, ry, base } = sizeRef.current;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const theta = ((i * STEP_DEG - angleRef.current) * Math.PI) / 180;
      const depth = Math.cos(theta); // 1 front, -1 back
      const t = (depth + 1) / 2; // 0..1

      const x = Math.sin(theta) * rx;
      const y = (1 - depth) * -ry + base;
      const scale = 0.55 + 0.45 * t;
      const turn = -Math.sin(theta) * 30; // side cards turn towards the centre
      const lean = Math.sin(theta) * 3;

      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) perspective(1200px) rotateY(${turn}deg) rotate(${lean}deg) scale(${scale})`;
      el.style.opacity = String(0.72 + 0.28 * t);
      el.style.filter = `blur(${((1 - t) * 2.2).toFixed(2)}px)`;
      el.style.zIndex = String(Math.round(t * 10));
    });
  }, []);

  const animate = useCallback(() => {
    const target = stepRef.current * STEP_DEG;
    const diff = target - angleRef.current;
    if (Math.abs(diff) < 0.05) {
      angleRef.current = target;
      paint();
      rafRef.current = null;
      return;
    }
    angleRef.current += diff * 0.1;
    paint();
    rafRef.current = requestAnimationFrame(animate);
  }, [paint]);

  const rotate = useCallback(
    (delta) => {
      stepRef.current += delta;
      setActive(mod(stepRef.current, COUNT));
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        angleRef.current = stepRef.current * STEP_DEG;
        paint();
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [animate, paint],
  );

  /* hero height = screen height - whatever sits above it (your navbar) */
  useEffect(() => {
    const setNavHeight = () => {
      const el = heroRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top > 0) el.style.setProperty("--nav-h", `${Math.round(top)}px`);
    };
    setNavHeight();
    window.addEventListener("resize", setNavHeight);
    return () => window.removeEventListener("resize", setNavHeight);
  }, []);

  /* size the ring from the stage so it fits every screen */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const size = Math.min(w * 0.8, h * 1.0);
      const base = h * 0.07;
      el.style.setProperty("--card", `${size}px`);
      el.style.setProperty("--base", `${base}px`);
      sizeRef.current = {
        rx: Math.min(w * 0.45, w / 2 - size * 0.25),
        ry: h * 0.17,
        base,
      };
      paint();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paint]);

  /* wheel over the ring rotates it */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let acc = 0;
    let lastWheel = 0;
    let lastMove = 0;
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel > 200) acc = 0;
      lastWheel = now;
      acc += e.deltaY;
      if (Math.abs(acc) > 40 && now - lastMove > 600) {
        rotate(acc > 0 ? 1 : -1);
        lastMove = now;
        acc = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [rotate]);

  const touchX = useRef(null);
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) rotate(dx < 0 ? 1 : -1);
    touchX.current = null;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") rotate(1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") rotate(-1);
  };

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = stageRef.current;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty("--ty", `${(nx * 8).toFixed(2)}deg`);
    el.style.setProperty("--tx", `${(-ny * 6).toFixed(2)}deg`);
  };
  const onPointerLeave = () => {
    const el = stageRef.current;
    el.style.setProperty("--ty", "0deg");
    el.style.setProperty("--tx", "0deg");
  };

  const goTo = (index) => {
    let offset = mod(index - stepRef.current, COUNT);
    if (offset > COUNT / 2) offset -= COUNT;
    if (offset !== 0) rotate(offset);
  };

  const p = PRODUCTS[active];

  // share the current colours with the header
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hero-bg", p.bg);
    root.style.setProperty("--hero-ink", p.ink);
  }, [p.bg, p.ink]);

  return (
    <section
      className="hero"
      ref={heroRef}
      style={{ "--bg": p.bg, "--ink": p.ink }}
    >
      {/* giant word behind the products */}
      <div className="hero-ghost" aria-hidden="true">
        {PRODUCTS.map((item, i) => (
          <span
            key={item.colour}
            className={`ghost-word ${i === active ? "is-active" : ""}`}
          >
            {item.colour}
          </span>
        ))}
      </div>

      <div className="hero-rail" role="group" aria-label="Choose a product">
        {PRODUCTS.map((item, i) => (
          <button
            key={item.img}
            type="button"
            className={`rail-dot ${i === active ? "is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Show ${item.name}`}
            aria-pressed={i === active}
          />
        ))}
        <span className="rail-label">
          <span className="hint-desktop">Scroll</span>
          <span className="hint-touch">Swipe</span>
        </span>
        <span className="rail-cue" aria-hidden="true" />
      </div>

      <div className="hero-top">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            Colour of the moment
            <b className="eyebrow-colour" key={p.colour}>
              {p.colour}
            </b>
          </p>

          <h1 className="hero-title" aria-label="Colour your everyday.">
            <span className="t-line" aria-hidden="true">
              <span className="t-inner">
                <span className="t-grad">Colour</span> your
              </span>
            </span>
            <span className="t-line" aria-hidden="true">
              <span className="t-inner t-serif">everyday.</span>
            </span>
          </h1>

          <p className="hero-text">
            Tees, shirts and shorts in colours that move with you. Premium
            quality, honest prices, delivered to your door.
          </p>

          <div className="hero-btns">
            <button
              type="button"
              className="btn-solid"
              onClick={() => navigate("/products")}
            >
              Explore collection
              <span className="btn-arrow" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              className="btn-line"
              onClick={() => navigate("/about")}
            >
              Our story
            </button>
          </div>
        </div>

        <div className="hero-stage-wrap">
          <div
            className="orbit-stage"
            ref={stageRef}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Featured products. Scroll or use arrow keys to rotate."
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
          >
            {PRODUCTS.map((item, i) => (
              <button
                key={item.img}
                type="button"
                className="orbit-card"
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => goTo(i)}
                aria-label={item.name}
                tabIndex={-1}
              >
                <span
                  className="orbit-shadow"
                  style={{ animationDelay: `${i * -1.3}s` }}
                />
                <span
                  className="orbit-bob"
                  style={{ animationDelay: `${i * -1.3}s` }}
                >
                  <span className="orbit-tilt">
                    <img src={item.img} alt={item.name} draggable="false" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
