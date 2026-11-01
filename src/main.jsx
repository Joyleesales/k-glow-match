import React, { useState, useRef, useEffect, useContext } from "react";
import { createRoot } from "react-dom/client";
import { products, metrics } from "./catalog";
import "./style.css";
import { api, preparePhoto, runTask } from "./youcam";
import { refineRecommendations, inRoutineOrder, routinePosition, routineSteps } from "./recommendations";
import { LanguageContext, languages, initialLanguage, translate, translateError, translateTree } from "./i18n";
const money = (n) => `$${n.toFixed(2)}`;
function Portrait({ photo, lip, blush, amount = 55, before = false }) {
  const language = useContext(LanguageContext);
  return (
    <div className="portrait">
      {photo ? (
        <img src={photo} alt={translate("Your uploaded selfie", language)} />
      ) : (
        <svg
          viewBox="0 0 400 500"
          role="img"
          aria-label={translate("Illustrated demo face", language)}
        >
          <defs>
            <linearGradient id="bg" x2="1" y2="1">
              <stop stopColor="#e9d8c8" />
              <stop offset="1" stopColor="#c6cdb5" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill="url(#bg)" />
          <ellipse cx="200" cy="480" rx="150" ry="130" fill="#f8f3e7" />
          <path d="M68 380Q30 60 200 36Q370 50 332 380" fill="#352e29" />
          <path d="M162 315L158 396Q200 425 242 396L238 315" fill="#cc977b" />
          <ellipse cx="200" cy="218" rx="103" ry="145" fill="#e6b398" />
          <path
            d="M92 190Q67 60 200 49Q319 50 311 190Q257 163 231 99Q200 151 92 190"
            fill="#352e29"
          />
          <path
            d="M131 208Q150 196 170 207M230 207Q250 195 270 207"
            stroke="#50372e"
            strokeWidth="5"
            fill="none"
          />
          <ellipse cx="153" cy="218" rx="5" ry="6" fill="#362c28" />
          <ellipse cx="248" cy="218" rx="5" ry="6" fill="#362c28" />
          <path
            d="M202 220L192 261Q202 268 214 260"
            stroke="#bb856e"
            fill="none"
            strokeWidth="3"
          />
          <path d="M169 293Q198 276 230 293Q200 321 169 293" fill="#b97573" />
          <path d="M174 294Q200 299 225 294" stroke="#8a4e52" fill="none" />
        </svg>
      )}
      {!before && (
        <div className="makeup-overlay" style={{ opacity: amount / 100 }}>
          <span className="lips" style={{ background: lip }} />
          <span className="cheek left" style={{ background: blush }} />
          <span className="cheek right" style={{ background: blush }} />
        </div>
      )}
    </div>
  );
}
function LanguageSwitch({ language, onChange }) {
  return <div className="language-switch" role="group" aria-label={translate("Language", language)}>
    {languages.map(code => <button key={code} type="button" lang={code} aria-pressed={language === code} onClick={() => onChange(code)}>{code.toUpperCase()}</button>)}
  </div>;
}
function App() {
  const [language, setLanguage] = useState(initialLanguage);
  const [skinAge, setSkinAge] = useState(null);
  useEffect(() => {
    document.documentElement.lang = language;
    try { localStorage.setItem('k-glow-language', language); } catch { /* Storage can be disabled. */ }
  }, [language]);
  const [stage, S] = useState(0),
    [photo, P] = useState(null),
    [busy, B] = useState(false),
    [error, E] = useState(""),
    [cart, C] = useState({}),
    [bag, G] = useState(false),
    [filter, F] = useState("matched"),
    [lip, L] = useState("#b45c70"),
    [blush, H] = useState("#d88c90"),
    [amount, A] = useState(55),
    [before, V] = useState(false),
    [toast, T] = useState(""),
    [done, D] = useState(false);
  const [ageRange, setAgeRange] = useState("");
  const [hasReport, setHasReport] = useState(false);
  const [liveReady, setLiveReady] = useState(false),
    [consent, setConsent] = useState(false),
    [sourceFile, setSourceFile] = useState(null),
    [photoToken, setPhotoToken] = useState(""),
    [reportMetrics, setReportMetrics] = useState(metrics),
    [liveReport, setLiveReport] = useState(false),
    [progress, setProgress] = useState(""),
    [vtoBusy, setVtoBusy] = useState(false),
    [vtoError, setVtoError] = useState(""),
    [vtoResult, setVtoResult] = useState(null);
  useEffect(() => {
    api("config")
      .then((r) => setLiveReady(r.configured))
      .catch(() => setLiveReady(false));
  }, []);
  const currentLook = JSON.stringify([lip, blush, amount]);
  const renderedLook = vtoResult?.look === currentLook ? vtoResult.url : null;
  const validScores = reportMetrics.filter((m) => m.score !== null);
  const balance = validScores.length
    ? Math.round(
        validScores.reduce((n, m) => n + m.score, 0) / validScores.length,
      )
    : null;
  const input = useRef(),
    timer = useRef();
  useEffect(
    () => () => {
      if (photo) URL.revokeObjectURL(photo);
    },
    [photo],
  );
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => T(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!bag) return;
    const previous = document.activeElement,
      previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e) => {
      if (e.key === "Escape") {
        G(false);
        return;
      }
      if (e.key !== "Tab") return;
      const buttons = [
        ...document.querySelectorAll(
          '[role="dialog"] button:not(:disabled), [role="dialog"] a[href]',
        ),
      ];
      if (!buttons.length) return;
      if (e.shiftKey && document.activeElement === buttons[0]) {
        e.preventDefault();
        buttons.at(-1).focus();
      } else if (!e.shiftKey && document.activeElement === buttons.at(-1)) {
        e.preventDefault();
        buttons[0].focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handle);
      previous?.focus();
    };
  }, [bag]);
  const go = (n) => {
    S(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const add = (p) => {
    C((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    D(false);
    T(`${p.brand} added to your bag`);
  };
  const count = Object.values(cart).reduce((a, b) => a + b, 0),
    total = products.reduce((a, p) => a + p.price * (cart[p.id] || 0), 0);
  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    E("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      E("Please choose a JPG, PNG, or WebP photo.");
      e.target.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      E("Please choose a photo smaller than 10 MB.");
      e.target.value = "";
      return;
    }
    P(URL.createObjectURL(file));
    setSourceFile(file);
    setPhotoToken("");
    setHasReport(false);
    setSkinAge(null);
    setVtoResult(null);
    setConsent(false);
    setLiveReport(false);
    setReportMetrics(metrics);
    setVtoError("");
  }
  async function analyze(live = false) {
    E("");
    B(true);
    setProgress("Preparing your skin story…");
    try {
      if (live) {
        if (!sourceFile || !consent)
          throw Error("Choose a selfie and allow YouCam processing first.");
        setProgress("Preparing and uploading your photo…");
        const image = await preparePhoto(sourceFile);
        const uploaded = await api("upload", { image });
        setPhotoToken(uploaded.photoToken);
        const result = await runTask(
          "skin",
          uploaded.photoToken,
          {},
          setProgress,
        );
        const types = [
          "moisture",
          "age_spot",
          "dark_circle_v2",
          "wrinkle",
          "texture",
        ];
        setReportMetrics(
          metrics.map((m, i) => ({
            ...m,
            score:
              result.scores.find((s) => s.type === types[i])?.score ?? null,
            description: "YouCam skin analysis score.",
          })),
        );
        setSkinAge(result.skinAge ?? null);
        setLiveReport(true);
      } else {
        setSkinAge(null);
        setReportMetrics(metrics);
        setLiveReport(false);
        setPhotoToken("");
        setVtoResult(null);
      }
      setHasReport(true);
      go(1);
    } catch (e) {
      E(e.message);
    } finally {
      B(false);
      setProgress("");
    }
  }
  async function renderMakeup() {
    setVtoBusy(true);
    setVtoError("");
    const look = currentLook;
    try {
      const result = await runTask("makeup", photoToken, {
        lip,
        blush,
        intensity: amount,
      });
      setVtoResult({ look, url: result.imageUrl });
      V(false);
    } catch (e) {
      setVtoError(e.message);
    } finally {
      setVtoBusy(false);
    }
  }
  const concernMetrics = reportMetrics
    .filter(
      (m) => m.score !== null && products.some((p) => p.concern === m.concern),
    )
    .sort((a, b) => a.score - b.score);
  const selected = (
    concernMetrics.some((m) => m.score < 70)
      ? concernMetrics.filter((m) => m.score < 70)
      : concernMetrics.slice(0, 2)
  ).map((m) => m.concern);
  const routine = inRoutineOrder(refineRecommendations(
    products.filter((p) => selected.includes(p.concern)),
    ageRange,
  )
    .filter(
      (p, i, list) =>
        list.findIndex((other) => other.concern === p.concern) === i,
    )
    .slice(0, 3));
  const visible = inRoutineOrder(refineRecommendations(
    products.filter(
      (p) =>
        filter === "all" ||
        (filter === "matched"
          ? selected.includes(p.concern)
          : p.concern === filter),
    ),
    ageRange,
  ));
  const content = (
    <>
      <header>
        <a
          className="logo"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go(0);
          }}
        >
          k-glow<span>match ✳</span>
        </a>
        <span className="header-note">SEOUL INSPIRED. YOU CENTERED.</span>
        <div className="header-actions">
        <LanguageSwitch language={language} onChange={setLanguage} />
        <button className="bag-button" onClick={() => G(true)}>
          Bag <span>{count}</span>
        </button>
        </div>
      </header>
      <main>
        <nav className="steps" aria-label="Your glow journey">
          {[
            "Your selfie",
            "Skin story",
            "Your matches",
            "Try a little color",
          ].map((s, i) => (
            <button
              key={s}
              disabled={busy || vtoBusy || (i > 0 && !hasReport)}
              aria-current={stage === i ? "step" : undefined}
              onClick={() => go(i)}
            >
              <b>{i + 1 < stage + 1 ? "✓" : `0${i + 1}`}</b>
              <span>{s}</span>
            </button>
          ))}
        </nav>
        <div className="mode">
          <span /> {liveReport ? "YOUCAM LIVE RESULTS" : "INTERACTIVE DEMO"}{" "}
          <em>
            {liveReport
              ? "Photo processed by YouCam"
              : "Sample mode · Photos stay in this tab"}
          </em>
        </div>
        {stage === 0 && (
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">A LITTLE SCIENCE. A LOT OF SEOUL.</p>
              <h1>
                Your glow,
                <br />
                <i>decoded.</i>
              </h1>
              <p className="intro">
                Meet your skin. Find your K-beauty ritual.
                <br />
                Try on a new shade of you.
              </p>
              <div className="hero-pills">
                <span>01 Scan</span>
                <span>02 Match</span>
                <span>03 Play</span>
              </div>
              <p className="small">
                Designed for the YouCam API Hackathon
                <br />
                Skin AI + Makeup Virtual Try-On
              </p>
            </div>
            <div className="upload-card">
              <div className="photo-wrap">
                <Portrait photo={photo} before />
                <span className="image-tag">
                  {photo ? "YOUR SELFIE" : "MEET YOUR DEMO MUSE"}
                </span>
                <div className="scan-corner c1" />
                <div className="scan-corner c2" />
              </div>
              <div className="upload-body">
                <h2>A fresh face. A fresh start.</h2>
                <p>Natural light, no filters. Your glow is enough.</p>
                <input
                  ref={input}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="user"
                  onChange={upload}
                  hidden
                />
                <button
                  className="primary full"
                  disabled={busy || vtoBusy}
                  onClick={() => input.current.click()}
                >
                  {photo ? "Change selfie" : "Take or upload a selfie"}{" "}
                  <span>↗</span>
                </button>
                {photo && (
                  <div className="live-consent">
                    <label>
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />{" "}
                      Allow this selfie to be sent to YouCam for skin analysis
                      and makeup try-on.
                    </label>
                    <p>
                      Live processing uses your API credits. The demo option
                      keeps your photo in this tab.
                    </p>
                    <button
                      className="primary full"
                      disabled={!liveReady || !consent || busy}
                      onClick={() => analyze(true)}
                    >
                      {busy ? progress : "Analyze with YouCam →"}
                    </button>
                    {!liveReady && (
                      <p>
                        Live API unavailable. Start the API server or explore
                        the demo.
                      </p>
                    )}
                  </div>
                )}
                <button
                  className="text-button"
                  disabled={busy}
                  onClick={() => analyze(false)}
                >
                  {busy
                    ? "Processing your skin story…"
                    : photo
                      ? "Explore my sample report →"
                      : "Just exploring? Try the demo →"}
                </button>
                {error && (
                  <p role="alert" className="error">
                    {translateError(error, language)}
                  </p>
                )}
                <p className="privacy">
                  ◎ You choose: private demo or YouCam processing.
                </p>
              </div>
            </div>
            <span className="hero-star">✳</span>
          </section>
        )}
        {stage === 1 && (
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / YOUR SKIN STORY</p>
                <h1>
                  A little insight.
                  <br />
                  <i>A brighter ritual.</i>
                </h1>
              </div>
              <p>
                Skin is personal. Let’s start with what it needs.
                <br />
                <strong>
                  {liveReport
                    ? "Analyzed by YouCam Skin AI."
                    : "Illustrative sample report, not a real analysis."}
                </strong>
              </p>
            </div>
            <div className="report-grid">
              <div className="report-photo">
                <Portrait photo={photo} before />
                <div className="score score-summary">
                  <div>
                  <b>
                    {balance ?? "—"}
                    <span>/100</span>
                  </b>
                  <p>
                    {liveReport
                      ? "Average score"
                      : "Sample skin balance"}
                  </p>
                  </div>
                  <div className="skin-age" aria-live="polite">
                    <p>Skin age</p>
                    <strong>{skinAge ?? "—"}</strong>
                    {skinAge === null && <p>{liveReport ? "Not returned by YouCam" : "Not available in demo"}</p>}
                  </div>
                </div>
              </div>
              <div className="metrics">
                <div className="report-title">
                  <h2>Your skin, at a glance</h2>
                  <span className="pill">
                    {liveReport ? "YOUCAM SKIN AI" : "SAMPLE REPORT"}
                  </span>
                </div>
                <p className="muted">
                  Higher score = more balanced. Missing results are marked
                  unavailable.
                </p>
                {reportMetrics.map((m) => (
                  <div className="metric" key={m.name}>
                    <div>
                      <strong>{m.name}</strong>
                      <span>
                        {m.score ?? "Unavailable"}
                        <small> / 100</small>
                      </span>
                    </div>
                    <div className="track">
                      <span
                        style={{
                          width: `${m.score ?? 0}%`,
                          background: m.score < 60 ? "#bd8b65" : "#73836d",
                        }}
                      />
                    </div>
                    <p>{m.description}</p>
                  </div>
                ))}
                <button className="primary full" onClick={() => go(2)}>
                  Find my K-beauty matches <span>→</span>
                </button>
              </div>
            </div>
            <p className="footnote">
              {liveReport
                ? "YouCam cosmetic analysis. Scores are not a medical diagnosis."
                : "Demo scores are fixed and do not assess your photo. Cosmetic inspiration only; not a diagnosis."}
            </p>
          </section>
        )}
        {stage === 2 && (
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / YOUR CURATED SHELF</p>
                <h1>
                  Good skin days
                  <br />
                  <i>start here.</i>
                </h1>
              </div>
              <div>
                <p>
                  A little hydration. A little radiance.
                  <br />
                  {liveReport ? "K-beauty favorites for your YouCam skin story." : "K-beauty favorites for your sample skin story."}
                </p>
                <button className="text-button" onClick={() => go(3)}>
                  Next: find your color →
                </button>
              </div>
            </div>
            <div className="age-preference">
              <div>
                <label htmlFor="age-range">
                  Your age range <span>Optional</span>
                </label>
                <p id="age-help">
                  Skip this if you prefer. Choosing a range refines matches within
                  each routine step; your skin report still guides product selection.
                </p>
              </div>
              <select
                id="age-range"
                aria-describedby="age-help"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
              >
                <option value="">Prefer not to say</option>
                <option value="20s">20s</option>
                <option value="30s">30s</option>
                <option value="40s">40s</option>
                <option value="50s+">50s+</option>
              </select>
            </div>
            {ageRange && (
              <p className="muted" role="status">
                {`Refined for ${ageRange}:`} Products stay in routine order.{" "}
                Editorial demo preferences, not an assessment of your skin.
              </p>
            )}
            <div className="filters">
              {[
                ["matched", "Your matches"],
                ["all", "All essentials"],
                ["moisture", "Hydration"],
                ["spots", "Radiance"],
                ["makeup", "Makeup"],
              ].map(([id, label]) => (
                <button
                  className={filter === id ? "active" : ""}
                  onClick={() => F(id)}
                  key={id}
                >
                  {label}
                </button>
              ))}
            </div>
            <ol className="routine-steps" aria-label="Skincare routine order">
              {routineSteps.map((step) => (
                <li key={step.number}><b>{step.number}</b><span>{step.label}</span></li>
              ))}
            </ol>
            <p className="routine-note">Toner and sunscreen are not in the current eight-product catalog.</p>
            <div className="routine-card">
              <div>
                <p className="eyebrow">YOUR CURATED RITUAL</p>
                <h2>A small ritual, picked for you.</h2>
                <p>{routine.map((p) => p.type).join(" → ")}</p>
                <span>
                  {liveReport ? "Based on your YouCam skin concerns" : "Based on your sample skin concerns"}
                  {ageRange ? ` · Refined for ${ageRange}` : ""}
                </span>
              </div>
              <button
                className="primary"
                disabled={!routine.length}
                onClick={() => {
                  C((c) => {
                    const next = { ...c };
                    routine.forEach((p) => {
                      next[p.id] = (next[p.id] || 0) + 1;
                    });
                    return next;
                  });
                  D(false);
                  T("Your curated ritual was added to your bag");
                }}
              >
                Add ritual ·{" "}
                {money(routine.reduce((sum, p) => sum + p.price, 0))}{" "}
                <span>+</span>
              </button>
            </div>
            <div className="product-grid">
              {visible.map((p) => (
                <article className="product" key={p.id}>
                  <p className="routine-product-step">{routinePosition(p).label}</p>
                  <div
                    className="product-image"
                    style={{ background: `${p.color}20` }}
                  >
                    <span className="match-label">
                      {p.concern === "makeup"
                        ? "COLOR PLAY"
                        : `FOR ${p.concern.toUpperCase()}`}
                    </span>
                    <img src={p.image} alt={`${p.brand} ${p.name}`} />
                  </div>
                  <p className="brand">{p.brand}</p>
                  <h3>{p.name}</h3>
                  <p className="product-size">{p.size}</p>
                  <p className="product-reason">
                    {p.type} ·{" "}
                    {p.concern === "makeup"
                      ? "Try a fresh look"
                      : `Selected for ${p.concern}`}
                  </p>
                  <a
                    className="product-source"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View product details ↗
                  </a>
                  <div className="product-bottom">
                    <strong>{money(p.price)}</strong>
                    <button
                      onClick={() => add(p)}
                      aria-label={`Add ${p.name} to bag`}
                    >
                      Add to bag +
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="footnote">
              Product photos belong to their brands. USD reference prices
              checked Oct 22, 2026; prices and availability may change. Demo bag
              only.{" "}
              <a
                href="https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence"
                target="_blank"
                rel="noreferrer"
              >
                COSRX
              </a>{" "}
              /{" "}
              <a
                href="https://beautyofjoseon.com"
                target="_blank"
                rel="noreferrer"
              >
                Beauty of Joseon
              </a>{" "}
              /{" "}
              <a
                href="https://romandbeauty.com"
                target="_blank"
                rel="noreferrer"
              >
                rom&nd
              </a>
            </p>
          </section>
        )}
        {stage === 3 && (
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / A LITTLE COLOR THERAPY</p>
                <h1>
                  Same you.
                  <br />
                  <i>New mood.</i>
                </h1>
              </div>
              <p>
                Find a shade that feels like you.
                <br />
                {liveReport
                  ? "YouCam Makeup VTO · Render your chosen shades."
                  : "Mock overlay preview · Analyze a selfie with YouCam for live try-on."}
              </p>
            </div>
            <div className="try-grid">
              <div>
                <div className="try-photo">
                  <Portrait
                    photo={
                      liveReport && !before && renderedLook
                        ? renderedLook
                        : photo
                    }
                    lip={lip}
                    blush={blush}
                    amount={amount}
                    before={liveReport || before}
                  />
                  <span className="image-tag">
                    {before
                      ? "ORIGINAL"
                      : liveReport
                        ? renderedLook
                          ? "YOUCAM MAKEUP RESULT"
                          : "ORIGINAL · RENDER TO TRY ON"
                        : "MOCK COLOR PREVIEW"}
                  </span>
                </div>
                <button
                  className="compare"
                  disabled={liveReport && !renderedLook}
                  onClick={() => V(!before)}
                >
                  {before ? "Show makeup preview" : "Compare with original"} ↔
                </button>
              </div>
              <div className="shade-panel">
                <span className="pill">YOUR COLOR STUDIO</span>
                <h2>A soft touch of Seoul.</h2>
                <p>
                  {liveReport
                    ? "Choose colors, then render with YouCam. Each render uses API credits. Colors are approximate mood shades."
                    : "Choose a lip and cheek mood. Fixed overlays are illustrative and may not align with uploaded faces."}
                </p>
                <h3>
                  Lip mood <span>· Juicy Lasting Tint</span>
                </h3>
                <div className="swatches">
                  {[
                    ["Mulled Peach", "#b45c70"],
                    ["Cherry", "#a73443"],
                    ["Peach", "#df8a73"],
                    ["Bare", "#ae7c6f"],
                  ].map(([n, c]) => (
                    <button
                      key={n}
                      aria-pressed={lip === c}
                      onClick={() => L(c)}
                    >
                      <span style={{ background: c }} />
                      {n}
                    </button>
                  ))}
                </div>
                <h3>
                  Cheek mood <span>· Better Than Cheek</span>
                </h3>
                <div className="swatches">
                  {[
                    ["Rose", "#d88c90"],
                    ["Berry", "#ba6c95"],
                    ["Apricot", "#e9a078"],
                  ].map(([n, c]) => (
                    <button
                      key={n}
                      aria-pressed={blush === c}
                      onClick={() => H(c)}
                    >
                      <span style={{ background: c }} />
                      {n}
                    </button>
                  ))}
                </div>
                <label className="range-label" htmlFor="intensity">
                  Intensity <b>{amount}%</b>
                </label>
                <input
                  id="intensity"
                  type="range"
                  min="0"
                  max="100"
                  value={amount}
                  onChange={(e) => A(+e.target.value)}
                />
                {liveReport && (
                  <div className="live-render">
                    <button
                      className="primary full"
                      disabled={vtoBusy || !photoToken}
                      onClick={renderMakeup}
                    >
                      {vtoBusy
                        ? "YouCam is rendering…"
                        : "Render with YouCam →"}
                    </button>
                    {vtoError && (
                      <p role="alert" className="error">
                        {translateError(vtoError, language)}
                      </p>
                    )}
                    {vtoResult && !renderedLook && (
                      <p className="small">
                        Colors changed. Render again to preview this look.
                      </p>
                    )}
                  </div>
                )}
                <p className="small">
                  Shade names describe demo colors; product cart variants remain
                  Mulled Peach and Blueberry Chip.
                </p>
                <button
                  className="primary full"
                  onClick={() => {
                    add(products[6]);
                    add(products[7]);
                  }}
                >
                  Add lip + cheek duo ·{" "}
                  {money(products[6].price + products[7].price)} <span>+</span>
                </button>
                <button className="text-button" onClick={() => G(true)}>
                  Review my glow bag →
                </button>
              </div>
            </div>
          </section>
        )}
        <footer>
          <a
            className="logo"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              go(0);
            }}
          >
            k-glow<span>match ✳</span>
          </a>
          <p>Your skin. Your shades. Your kind of glow.</p>
          <span>MADE FOR THE YOUCAM API HACKATHON · PROTOTYPE</span>
        </footer>
      </main>
      {toast && (
        <div className="toast" role="status">
          ✓ {toast}
        </div>
      )}
      {bag && (
        <div className="modal-backdrop" onClick={() => G(false)}>
          <section
            className="cart"
            role="dialog"
            aria-modal="true"
            aria-label="Your glow bag"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") G(false);
            }}
          >
            <div className="cart-header">
              <h2>
                Your glow bag <small>({count})</small>
              </h2>
              <LanguageSwitch language={language} onChange={setLanguage} />
              <button autoFocus onClick={() => G(false)} aria-label="Close bag">
                ✕
              </button>
            </div>
            {done ? (
              <div className="empty">
                <span>✳</span>
                <h2>Your demo ritual is complete.</h2>
                <p>No payment was taken and no order was placed.</p>
                <button
                  className="primary"
                  onClick={() => {
                    G(false);
                    go(2);
                  }}
                >
                  Keep exploring
                </button>
              </div>
            ) : (
              <>
                {count === 0 ? (
                  <div className="empty">
                    <span>♡</span>
                    <h2>A little room for glow.</h2>
                    <p>Your bag is waiting for its first favorite.</p>
                    <button
                      className="primary"
                      onClick={() => {
                        G(false);
                        go(stage === 0 ? 0 : 2);
                      }}
                    >
                      Explore your ritual
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {products
                        .filter((p) => cart[p.id])
                        .map((p) => (
                          <div className="cart-row" key={p.id}>
                            <img src={p.image} alt="" />
                            <div>
                              <p className="brand">{p.brand}</p>
                              <h3>{p.name}</h3>
                              <div className="quantity">
                                <button
                                  aria-label={`Decrease ${p.name}`}
                                  onClick={() =>
                                    C((c) => ({
                                      ...c,
                                      [p.id]: Math.max(0, c[p.id] - 1),
                                    }))
                                  }
                                >
                                  −
                                </button>
                                <span>{cart[p.id]}</span>
                                <button
                                  aria-label={`Increase ${p.name}`}
                                  onClick={() =>
                                    C((c) => ({ ...c, [p.id]: c[p.id] + 1 }))
                                  }
                                >
                                  +
                                </button>
                                <button
                                  onClick={() =>
                                    C((c) => ({ ...c, [p.id]: 0 }))
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <strong>{money(p.price * cart[p.id])}</strong>
                          </div>
                        ))}
                    </div>
                    <div className="cart-total">
                      <span>Total (USD)</span>
                      <strong>{money(total)}</strong>
                    </div>
                    <p className="small">
                      Demo bag. No shipping, tax, payment, or order fulfillment.
                    </p>
                    <button
                      className="primary full"
                      onClick={() => {
                        D(true);
                        C({});
                      }}
                    >
                      Finish demo <span>→</span>
                    </button>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
  return <LanguageContext.Provider value={language}>{translateTree(content, language)}</LanguageContext.Provider>;
}
createRoot(document.getElementById("root")).render(<App />);

