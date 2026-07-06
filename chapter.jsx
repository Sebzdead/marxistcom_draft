// chapter.jsx — long-form chapter reader (wireframe: "Reading a book").
// Renders one chapter of a book from window.__BOOKS as clean, readable HTML
// (marxists.org-style), inside the marxist.com design system. Chrome comes from
// book-chrome.jsx; PrintButton etc. from components.jsx.

const { useState, useEffect, useMemo, useRef } = React;

// Static "Featured in" + related placeholders — no live data source yet.
const FEATURED_IN = [
  { kind: "Marxist University Course", title: "The State: Instrument of Class Rule", href: "theory-curriculum.html" },
  { kind: "Article", title: "Lenin's State and Revolution and the tasks of today", href: "article.html" },
];

function ChapterNav({ book, idx, compact }) {
  const chapters = book.chapters;
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
  const link = (ch, dir) =>
    ch ? `chapter.html?book=${book.slug}&ch=${ch.id}` : null;

  return (
    <div className={"chap-nav" + (compact ? " chap-nav--compact" : "")}>
      <a className={"chap-nav-btn prev" + (prev ? "" : " is-disabled")}
         href={prev ? link(prev) : undefined}
         aria-disabled={!prev}>
        <span className="chap-nav-arrow">‹</span>
        <span className="chap-nav-text">
          <span className="chap-nav-dir">Previous</span>
          {prev && <span className="chap-nav-ttl">{prev.label}</span>}
        </span>
      </a>

      <a className="chap-nav-btn home" href={`book.html?book=${book.slug}`}>
        <span className="chap-nav-text center">
          <span className="chap-nav-dir">Contents</span>
          <span className="chap-nav-ttl">{book.title}</span>
        </span>
      </a>

      <a className={"chap-nav-btn next" + (next ? "" : " is-disabled")}
         href={next ? link(next) : undefined}
         aria-disabled={!next}>
        <span className="chap-nav-text right">
          <span className="chap-nav-dir">Next</span>
          {next && <span className="chap-nav-ttl">{next.label}</span>}
        </span>
        <span className="chap-nav-arrow">›</span>
      </a>
    </div>
  );
}

function ChapterList({ book, currentId }) {
  // Group chapters by part, preserving order.
  const parts = [];
  book.chapters.forEach((ch) => {
    let p = parts.find((x) => x.part === ch.part);
    if (!p) { p = { part: ch.part, items: [] }; parts.push(p); }
    p.items.push(ch);
  });

  return (
    <nav className="chap-list" aria-label="Chapter list">
      <SectionHead label="Chapter List" divider="thick-slab" />
      {parts.map((p) => (
        <div className="chap-list-part" key={p.part}>
          <div className="chap-list-part-h">{p.part}</div>
          <ol className="chap-list-items">
            {p.items.map((ch) => {
              const active = ch.id === currentId;
              return (
                <li key={ch.id} className={"chap-list-item" + (active ? " is-active" : "")}>
                  <a href={`chapter.html?book=${book.slug}&ch=${ch.id}`}>
                    <span className="chap-list-label">{ch.label}</span>
                    <span className="chap-list-ttl">{ch.title}</span>
                    {active && <span className="chap-list-now">Reading</span>}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [theme, setTheme] = useState("paper");
  const proseRef = useRef(null);

  // Resolve ?book= & ?ch= up front.
  const { book, idx, error } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("book") || "state-and-revolution";
    const ch = parseInt(params.get("ch") || "0", 10);
    const books = window.__BOOKS || {};
    const book = books[slug];
    if (!book) return { error: "book" };
    const idx = Number.isFinite(ch) && book.chapters[ch] ? ch : 0;
    return { book, idx };
  }, []);

  const chapter = book && book.chapters[idx];

  const html = useMemo(() => {
    if (!chapter) return "";
    if (window.marked) {
      window.marked.setOptions({ breaks: false, headerIds: false, mangle: false });
      return window.marked.parse(chapter.md);
    }
    return chapter.md;
  }, [chapter]);

  useEffect(() => {
    document.body.dataset.mode = theme === "dark" ? "dark" : "light";
    document.body.dataset.texture = "none";
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idx]);

  if (error) {
    return (
      <div className="site">
        <div className="site-header">
          <Header activeTab="Theory & History" />
        </div>
        <main className="site-main" style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Chapter not found</h2>
          <p style={{ fontFamily: "var(--font-serif)" }}>This text is not available to read online.</p>
          <PrintButton variant="red" size="md" href="theory.html">Back to Theory</PrintButton>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="site" data-reader-theme={theme}>
      <div className="site-header">
        <Header activeTab="Theory & History" />
      </div>

      <main className="site-main reader-page">
        {/* ── Book header band ─────────────────────────────────────── */}
        <header className="reader-head">
          <a className="reader-head-cover" href={`book.html?book=${book.slug}`} aria-label={"Back to " + book.title}>
            <BookCover title={book.title} author={book.author} size="sm" />
          </a>
          <div className="reader-head-meta">
            <a className="reader-head-title" href={`book.html?book=${book.slug}`}>{book.title}</a>
            <div className="reader-head-byline">
              <span>{book.author}</span><span className="dot">•</span><span>{book.date}</span>
            </div>
            <div className="reader-tools">
              <div className="reader-tool-group" role="group" aria-label="Text size">
                <button className="reader-tool-btn" onClick={() => setFontScale((s) => Math.max(0.85, +(s - 0.1).toFixed(2)))} aria-label="Decrease text size">A−</button>
                <button className="reader-tool-btn" onClick={() => setFontScale(1)} aria-label="Reset text size" style={{ fontSize: 13 }}>A</button>
                <button className="reader-tool-btn" onClick={() => setFontScale((s) => Math.min(1.5, +(s + 0.1).toFixed(2)))} aria-label="Increase text size" style={{ fontSize: 17 }}>A+</button>
              </div>
              <div className="reader-tool-group swatches" role="group" aria-label="Reading theme">
                <button className={"reader-swatch paper" + (theme === "paper" ? " is-active" : "")} onClick={() => setTheme("paper")} title="Paper" />
                <button className={"reader-swatch sepia" + (theme === "sepia" ? " is-active" : "")} onClick={() => setTheme("sepia")} title="Sepia" />
                <button className={"reader-swatch dark" + (theme === "dark" ? " is-active" : "")} onClick={() => setTheme("dark")} title="Night" />
              </div>
            </div>
          </div>
        </header>

        <ChapterNav book={book} idx={idx} />

        {/* ── Chapter body ─────────────────────────────────────────── */}
        <article className="reader-article">
          <div className="reader-chapter-head">
            <div className="reader-eyebrow">
              {chapter.part}<span className="dot">•</span>{chapter.label}
            </div>
            <h1 className="reader-chapter-title">{chapter.title}</h1>
          </div>

          <div
            ref={proseRef}
            className="book-prose"
            style={{ fontSize: `calc(var(--prose-fs) * ${fontScale})` }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        <ChapterNav book={book} idx={idx} compact />

        {/* ── Featured in ──────────────────────────────────────────── */}
        <section className="reader-featured">
          <SectionHead label="Featured in" />
          <div className="reader-featured-grid">
            {FEATURED_IN.map((f, i) => (
              <a className="featured-card" href={f.href} key={i}>
                <div className="featured-card-thumb">
                  <span>{f.kind === "Article" ? "✶" : "◆"}</span>
                </div>
                <div className="featured-card-body">
                  <div className="featured-card-kind">{f.kind}</div>
                  <div className="featured-card-title">{f.title}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Chapter list ─────────────────────────────────────────── */}
        <ChapterList book={book} currentId={idx} />
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
