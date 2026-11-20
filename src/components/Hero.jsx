import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../css/Hero.css";


const PRODUCTS = [
  {
    img: "f1.png",
    name: "Stone Tee",
    word: "Stone",
    bg: "#cfd4d8",
    ink: "#16191c",
    price: "$24",
    details: [["Fabric", "Heavyweight cotton"], ["Fit", "Relaxed, boxy"]],
  },
  {
    img: "f2.png",
    name: "Sage Linen Shirt",
    word: "Linen",
    bg: "#cfd9c3",
    ink: "#18230f",
    price: "$42",
    details: [["Fabric", "Washed linen blend"], ["Fit", "Easy, button-down"]],
  },
  {
    img: "f3.png",
    name: "Sunset Print Tee",
    word: "Sunset",
    bg: "#f2c6a8",
    ink: "#3a1707",
    price: "$28",
    details: [["Print", "Hand-finished graphic"], ["Fit", "Regular"]],
  },
  {
    img: "f4.png",
    name: "Washed Denim Shorts",
    word: "Denim",
    bg: "#c3d5e8",
    ink: "#0d2037",
    price: "$36",
    details: [["Fabric", "Stone-washed denim"], ["Fit", "Straight, knee-length"]],
  },
];

const COUNT = PRODUCTS.length;
const STEP_DEG = 360 / COUNT;
const mod = (n, m) => ((n % m) + m) % m;

export default function Hero() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const stepRef = useRef(0);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const sizeRef = useRef({ rx: 180, ry: 55, base: 50 });

  const paint = useCallback(() => {
    const { rx, ry, base } = sizeRef.current;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const theta = ((i * STEP_DEG - angleRef.current) * Math.PI) / 180;
      const depth = Math.cos(theta); // 1 front, -1 back
      const t = (depth + 1) / 2;

      const x = Math.sin(theta) * rx;
      const y = (1 - depth) * -ry + base;
      const scale = 0.58 + 0.42 * t;

      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = String(0.5 + 0.5 * t);
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
    angleRef.current += diff * 0.11;
    paint();
    rafRef.current = requestAnimationFrame(animate);
  }, [paint]);

  const rotate = useCallback(
    (delta) => {
      stepRef.current += delta;
      setActive(mod(stepRef.current, COUNT));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        angleRef.current = stepRef.current * STEP_DEG;
        paint();
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [animate, paint]
  );

  // size the ring from the stage so it works on every screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      sizeRef.current = { rx: w * 0.3, ry: w * 0.085, base: h * 0.09 };
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

  // wheel over the stage rotates the ring
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

  const goTo = (index) => {
    let offset = mod(index - stepRef.current, COUNT);
    if (offset > COUNT / 2) offset -= COUNT;
    if (offset !== 0) rotate(offset);
  };

  const p = PRODUCTS[active];

  return (
    <section
      className="hero"
      style={{ "--bg": p.bg, "--ink": p.ink }}
    >
      {/* big word behind everything */}
      <div className="hero-ghost" aria-hidden="true">
        {PRODUCTS.map((item, i) => (
          <span
            key={item.word}
            className={`ghost-word ${i === active ? "is-active" : ""}`}
          >
            {item.word}
          </span>
        ))}
      </div>

      {/* small shop card, top right */}
      <div className="hero-pick">
        <img src={p.img} alt="" />
        <div className="hero-pick-info">
          <span className="hero-pick-name">{p.name}</span>
          <span className="hero-pick-price">{p.price}</span>
        </div>
        <button type="button" onClick={() => navigate("/products")}>
          Shop now
        </button>
      </div>

      <div className="hero-top">
        <div className="hero-copy">
          <p className="hero-eyebrow">New season arrivals</p>
          <h1 className="hero-title">
            Discover extraordinary products
          </h1>
          <p className="hero-text">
            Curated collections from around the world. Premium quality,
            unbeatable prices, delivered to your door.
          </p>
          <div className="hero-btns">
            <button
              type="button"
              className="btn-solid"
              onClick={() => navigate("/products")}
            >
              Explore collection
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
          >
            <div className="orbit-layer">
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
                  <img src={item.img} alt={item.name} draggable="false" />
                </button>
              ))}
            </div>
          </div>
          <p className="orbit-hint">Scroll to rotate</p>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="hero-name">
          <h2 key={p.name}>{p.name}</h2>
        </div>

        {p.details.map(([label, value]) => (
          <div className="hero-detail" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}

        <div className="hero-thumbs">
          {PRODUCTS.map((item, i) => (
            <button
              key={item.img}
              type="button"
              className={`thumb ${i === active ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show ${item.name}`}
              aria-pressed={i === active}
            >
              <img src={item.img} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}