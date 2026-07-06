// Marxist.com — In Defence of Marxism (Magazine) page
// Standalone sibling to app.jsx / media.jsx. Loaded by magazine.html.
// Site chrome (Masthead/Nav/Footer) wraps the preserved IDOM body (.idom-app).
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (mirror homepage; Magazine is this page) ─────────────────
;

// ── IDOM page content data ───────────────────────────────────────────────────
window.IDOM_PAGE = {
  topnav: ["News", "Magazine", "Theory", "Books", "Events", "Donate"],
  sectionNav: [
    { id: "intro", label: "Introduction" },
    { id: "latest", label: "Latest Issue" },
    { id: "archive", label: "Archive" },
    { id: "subscribe", label: "Subscribe" },
  ],
  languages: ["English","Español","Deutsch","Français","Italiano","Português","Ελληνικά","Türkçe","العربية"],

  intro: {
    pre: "In defence of",
    mark: "Marxism",
    standfirst: "Theoretical quarterly of the Revolutionary Communist International",
    body: "A journal of ideas for those who wish to change the world. Each issue takes up a single great question — of history, science, art or revolution — and confronts it with the methods of Marxism. Published four times a year, in nine languages, on every continent.",
  },

  // Latest issue — #53
  latest: {
    no: "53",
    season: "Spring 2026",
    theme: "Latin America",
    subtitle: "An Unfinished Revolution",
    cover: "assets/IDOM_53_cover.jpg",
    blurb: "From the wars of independence to the Bolivarian present, Latin America has been a continent of permanent upheaval — and of revolutions left half-finished. This issue asks what it will take to complete the task.",
    price: "£5 · €6 · $7",
    contents: [
      { p: "02", k: "Editorial", t: "Latin America – an unfinished revolution", a: "" },
      { p: "08", k: "Venezuela", t: "A balance sheet of the Venezuelan Revolution", a: "Jorge Martín" },
      { p: "18", k: "Art", t: "Mexican Muralism: Art born of revolution", a: "Carlos Márquez" },
      { p: "28", k: "History", t: "Excerpts on Latin America", a: "Leon Trotsky" },
      { p: "38", k: "Economics", t: "Why did the Wall Street Crash happen?", a: "James Kilby" },
    ],
  },

  // Archive — newest first
  archive: [
    { no: "53", title: "Latin America – An Unfinished Revolution", season: "Spring 2026", img: "assets/IDOM_53_cover.jpg" },
    { no: "52", title: "Sudan: From Revolution to Barbarism", season: "Winter 2025", img: "assets/IDOM_52_cover.jpg" },
    { no: "51", title: "The Permanent Revolution", season: "Autumn 2025", img: "assets/IDOM_51_cover.jpg" },
    { no: "50", title: "Reform or Revolution", season: "Summer 2025", img: "assets/IDOM_50_cover.jpg" },
    { no: "49", title: "1945: Liberation, Revolution & Betrayal", season: "Spring 2025", img: "assets/IDOM_49_cover.jpg" },
    { no: "48", title: "Science: Progress, Crisis and Revolution", season: "Winter 2025", img: "assets/IDOM_48_cover.jpg" },
    { no: "47", title: "The Struggle for World Revolution", season: "Autumn 2024", img: "assets/IDOM_47_cover.jpg" },
    { no: "46", title: "The Necessity of Art", season: "Summer 2024", img: "assets/IDOM_46_thumb.jpg" },
    { no: "45", title: "The African Revolution", season: "Spring 2024", img: "assets/IDOM_45_cover_website.jpg" },
    { no: "44", title: "Lenin: 100 Years On", season: "Winter 2024", img: "assets/IDOM_44_small.jpg" },
    { no: "43", title: "The Struggle for Communism", season: "Autumn 2023", img: "assets/IDOM_43_cover_small.jpg" },
    { no: "42", title: "The State", season: "Summer 2023", img: "assets/IDOM_42_cover.jpg" },
    { no: "41", title: "The Fall of Woman", season: "Spring 2023", img: "assets/IDOM_41_cover.jpg" },
    { no: "40", title: "Blood and Gold", season: "Winter 2023", img: "assets/IDOM_40_small.jpg" },
    { no: "39", title: "The Struggle for Rational Thought", season: "Autumn 2022", img: "assets/IDOM_39_small.jpg" },
    { no: "38", title: "The Civil War: America's Second Revolution", season: "Summer 2022", img: "assets/IDOM_38_small.jpg" },
    { no: "37", title: "The Need for Revolutionary Leadership", season: "Spring 2022", img: "assets/IDOM_37_cover_small.jpg" },
    { no: "36", title: "Marxism vs. Libertarianism", season: "Winter 2022", img: "assets/IDOM_36_cover.jpg" },
    { no: "35", title: "Barbarism, Civilisation & the Marxist View of History", season: "Autumn 2021", img: "assets/IDOM_35_cover.jpg" },
    { no: "34", title: "Marxism versus Postmodernism", season: "Summer 2021", img: "assets/IDOM_34_cover.jpg" },
  ],

  subscribe: {
    plans: {
      digital: {
        key: "digital", name: "Digital", tag: "Read anywhere",
        annual: 20, quarter: 6, currency: "£",
        features: [
          "Every new issue in PDF & EPUB",
          "Full access to the digital archive (issues 1–53)",
          "Searchable, on any device",
          "Delivered the day each issue ships",
        ],
      },
      print: {
        key: "print", name: "Print", tag: "The journal in your hands",
        annual: 35, quarter: 10, currency: "£",
        features: [
          "Four issues posted worldwide",
          "Heavy art-paper, perfect-bound",
          "Collector's editions, archival quality",
          "Postage included to any country",
        ],
      },
      both: {
        key: "both", name: "Print + Digital", tag: "The complete edition", best: true,
        annual: 45, quarter: 13, currency: "£",
        features: [
          "Everything in Print and Digital",
          "Read instantly, then receive the printed copy",
          "Full archive access included",
          "Best value — save over a third",
        ],
      },
    },
  },

  footerLinks: {
    Magazine: ["Latest issue", "All issues", "By topic", "Editorial board", "Write for us"],
    "Get involved": ["Subscribe", "Donate", "Join the RCI", "Bookshop", "Contact"],
  },
};

// ── Site chrome: Masthead / Nav / Footer (verbatim from media.jsx) ──────────


// ── Nav Component ───────────────────────────────────────────────────────────


// ── Footer Component ────────────────────────────────────────────────────────


// ── Podcast Card Component ──────────────────────────────────────────────────

// ── IDOM section nav (verbatim from IDOM Nav.jsx) ───────────────────────────
function IdNav() {
  const D = window.IDOM_PAGE;
  const [solid, setSolid] = React.useState(false);
  const [active, setActive] = React.useState("intro");

  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = D.sectionNav.map(s => s.id);
    const onScroll = () => {
      const mark = window.innerHeight * 0.4;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mark) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <header className={"idnav" + (solid ? " solid" : "")}>
      <div className="idnav-inner">
        <a className="idnav-lock" href="#intro" onClick={(e) => jump(e, "intro")}>
          <span className="pre">In defence of</span>
          <span className="mk">Marxism</span>
        </a>
        <nav className="idnav-links">
          {D.sectionNav.map(s => (
            <a key={s.id} href={"#" + s.id}
               className={active === s.id ? "active" : ""}
               onClick={(e) => jump(e, s.id)}>{s.label}</a>
          ))}
        </nav>
        <a href="index.html" className="idnav-home-btn">MARXIST.COM</a>
        <button className="idnav-menubtn" aria-label="Menu"><i data-lucide="menu"></i></button>
      </div>
    </header>
  );
}

// ── IDOM hero (verbatim from IDOM Hero.jsx) ─────────────────────────────────
// Hero — scroll DOWN the full length of Caspar David Friedrich's "Wanderer".
// On reaching the foot of the painting, the field fades white → black into the
// particle-track image; the magazine spread and the short intro paragraph live
// inside that transition (spread just above the paragraph).
function Hero() {
  const D = window.IDOM_PAGE.intro;

  return (
    <section id="intro">
      <div className="hero">
        <img className="hero-bg hero-bg2" src="uploads/2.png" alt="" />
        <div className="hero-vignette"></div>

        <div className="hero-stage">
          <div className="hero-title">
            <div className="hero-pre">{D.pre}</div>
            <h1 className="hero-mark">{D.mark}</h1>
            <div className="hero-rule"></div>
            <p className="hero-stand">{D.standfirst}</p>
          </div>

          <div className="hero-fade">
            <img className="hero-spread" src="uploads/magazines spread.png" alt="Three issues of In Defence of Marxism" />
            <p className="hero-introtext">{D.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── IDOM sections: Latest / Archive / Subscribe (verbatim from Sections.jsx) ─
function Latest() {
  const L = window.IDOM_PAGE.latest;
  return (
    <section id="latest" className="latest sec">
      <div className="wrap">
        <p className="sec-kicker">The current issue · Out now</p>
        <div className="sec-head">
          <h2 className="sec-title">Latest Issue</h2>
          <span className="sec-aside">Published quarterly · {L.season}</span>
        </div>
        <div className="latest-grid">
          <div className="latest-coverwrap">
            <div className="latest-cover">
              <img src={L.cover} alt={"In Defence of Marxism, issue " + L.no} />
            </div>
            <div className="latest-buy">
              <a className="btn btn-red" href="#"><i data-lucide="shopping-cart"></i>Buy · {L.price.split(" · ")[0]}</a>
              <a className="btn btn-ghost" href="#subscribe"><i data-lucide="book-open"></i>Subscribe</a>
            </div>
          </div>
          <div className="latest-body">
            <div className="latest-meta">
              <span className="latest-no">Issue {L.no}</span>
              <span className="latest-season">{L.season}</span>
            </div>
            <h3 className="latest-title">{L.theme}</h3>
            <p className="latest-sub">{L.subtitle}</p>
            <p className="latest-blurb">{L.blurb}</p>
            <p className="latest-cont-h">In this issue</p>
            <ul className="contents">
              {L.contents.map((c, i) => (
                <li key={i}>
                  <a href="#">
                    <span className="contents-p">{c.p}</span>
                    <span className="contents-main">
                      <span className="contents-k">{c.k}</span>
                      <span className="contents-t">{c.t}</span>
                      <span className="contents-a">{c.a}</span>
                    </span>
                    <i data-lucide="arrow-right"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Archive() {
  const A = window.IDOM_PAGE.archive;
  return (
    <section id="archive" className="archive sec">
      <div className="wrap">
        <p className="sec-kicker">Every issue · 2021 — today</p>
        <div className="sec-head">
          <h2 className="sec-title">The Archive</h2>
          <span className="sec-aside">Twenty issues · order back numbers below</span>
        </div>
        <div className="arch-grid">
          {A.map(it => (
            <div className="arch-item" key={it.no}>
              <a className="arch-cover" href="#" aria-label={"Issue " + it.no}>
                <img src={it.img} alt={it.title} />
                <span className="arch-no">No. {it.no}</span>
              </a>
              <div className="arch-meta">
                <div className="arch-season">{it.season}</div>
                <div className="arch-title">{it.title}</div>
                <a className="arch-buy" href="#"><i data-lucide="shopping-cart"></i>Buy this issue</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Subscribe() {
  const S = window.IDOM_PAGE.subscribe;
  const order = ["digital", "print", "both"];
  const [term, setTerm] = React.useState("annual");
  const A = window.IDOM_PAGE.archive;
  // a few covers floated in the background as a gallery wash
  const bg = [
    { src: A[0].img, top: "-4%", left: "-3%", w: 280, rot: -6 },
    { src: A[5].img, top: "44%", left: "8%", w: 240, rot: 5 },
    { src: A[12].img, top: "8%", right: "-2%", w: 300, rot: 7 },
    { src: A[9].img, bottom: "-6%", right: "12%", w: 250, rot: -4 },
  ];
  return (
    <section id="subscribe" className="subscribe sec">
      <div className="sub-art" aria-hidden="true">
        {bg.map((b, i) => (
          <img key={i} src={b.src} alt=""
            style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom,
                     width: b.w, transform: "rotate(" + b.rot + "deg)" }} />
        ))}
      </div>
      <div className="wrap sub-inner">
        <div className="sub-head">
          <p className="sec-kicker">Read every issue</p>
          <h2 className="sub-h2">Subscribe</h2>
          <p className="sub-lead">Join thousands of readers across nine languages. Have the journal of revolutionary ideas delivered to your door, your inbox, or both — and support the work of the International.</p>
        </div>

        <div className="sub-toggle">
          <div className="sub-toggle-inner">
            <button className={term === "annual" ? "on" : ""} onClick={() => setTerm("annual")}>Annual</button>
            <button className={term === "quarter" ? "on" : ""} onClick={() => setTerm("quarter")}>Per issue</button>
          </div>
        </div>

        <div className="sub-plans">
          {order.map(key => {
            const p = S.plans[key];
            const amt = term === "annual" ? p.annual : p.quarter;
            const per = term === "annual" ? "per year · 4 issues" : "per issue";
            return (
              <div className={"plan" + (p.best ? " best" : "")} key={key}>
                {p.best && <span className="plan-flag">Best value</span>}
                <h3 className="plan-name">{p.name}</h3>
                <p className="plan-tag">{p.tag}</p>
                <div className="plan-price">
                  <span className="plan-cur">{p.currency}</span>
                  <span className="plan-amt">{amt}</span>
                </div>
                <div className="plan-per">{per}</div>
                <ul className="plan-feats">
                  {p.features.map((f, i) => (
                    <li key={i}><i data-lucide="check"></i><span>{f}</span></li>
                  ))}
                </ul>
                <a className={"btn " + (p.best ? "plan-best-btn" : "btn-red")} href="#">
                  Choose {p.name}<i data-lucide="arrow-right"></i>
                </a>
              </div>
            );
          })}
        </div>

        <p className="sub-foot">Already a subscriber? <a href="#">Sign in</a> &nbsp;·&nbsp; Institutions &amp; libraries, <a href="#">enquire here</a>.</p>
      </div>
    </section>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  // Render lucide icons once after mount — the IDOM body's icons are static.
  // The rAF + timeout retries cover lucide loading slightly after mount.
  // NOTE: deliberately NO MutationObserver here. Re-running createIcons on
  // every DOM mutation (e.g. opening the menu drawer) re-scans the whole
  // document and, on this long image-heavy page, froze the tab.
  useEffect(() => {
    const draw = () => { if (window.lucide) window.lucide.createIcons(); };
    draw();
    const raf = requestAnimationFrame(draw);
    const t = setTimeout(draw, 300);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="idom-app">
        <IdNav />
        <Hero />
        <Latest />
        <Archive />
        <Subscribe />
      </div>
      <div className="mag-chrome mag-foot" data-mode="dark">
        <Footer />
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
