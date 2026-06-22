// book.jsx — book overview / landing page (wireframe: "Book page").
// Cover + metadata + buy CTA + intro, the full chapter list, and related reads.

const { useState, useEffect, useMemo } = React;

const READ_MORE = [
  { cat: "Economics", title: "Imperialism: the highest stage of capitalism", href: "article.html" },
  { cat: "History", title: "The October Revolution and the birth of workers' power", href: "history.html" },
  { cat: "Theory", title: "What is the State? A Marxist introduction", href: "theory.html" },
];

function ChapterList({ book }) {
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
            {p.items.map((ch) => (
              <li key={ch.id} className="chap-list-item">
                <a href={`chapter.html?book=${book.slug}&ch=${ch.id}`}>
                  <span className="chap-list-label">{ch.label}</span>
                  <span className="chap-list-ttl">{ch.title}</span>
                  <span className="chap-list-go">Read ›</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const book = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("book") || "state-and-revolution";
    return (window.__BOOKS || {})[slug] || null;
  }, []);

  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  if (!book) {
    return (
      <div className="site">
        <div className="site-header">
          <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Nav active="Classics" onOpenMenu={() => setMenuOpen(true)} />
        </div>
        <main className="site-main" style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Book not found</h2>
          <PrintButton variant="red" size="md" href="theory.html">Back to Theory</PrintButton>
        </main>
        <Footer />
      </div>
    );
  }

  const firstReadable = book.chapters.find((c) => c.part !== "Front Matter") || book.chapters[0];

  return (
    <div className="site">
      <div className="site-header">
        <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Nav active="Classics" onOpenMenu={() => setMenuOpen(true)} />
      </div>

      <main className="site-main book-page">
        {/* ── Book header ─────────────────────────────────────────── */}
        <header className="book-head">
          <div className="book-head-cover">
            <BookCover title={book.title} author={book.author} size="lg" />
          </div>
          <div className="book-head-meta">
            <div className="book-head-eyebrow">RCI Classics</div>
            <h1 className="book-head-title">{book.title}</h1>
            {book.subtitle && <p className="book-head-sub">{book.subtitle}</p>}
            <div className="book-head-byline">
              <span>{book.author}</span><span className="dot">•</span><span>{book.date}</span>
            </div>

            <div className="book-head-actions">
              <PrintButton variant="red" size="lg" href={`chapter.html?book=${book.slug}&ch=${firstReadable.id}`}>
                Start Reading ›
              </PrintButton>
              <a className="buy-btn" href={book.buyUrl} target="_blank" rel="noopener noreferrer">
                <span className="buy-btn-mark">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M19 5h-8M19 5v8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="square"/></svg>
                </span>
                <span className="buy-btn-text">Buy from<br/><strong>WellRed Books</strong></span>
              </a>
            </div>

            <div className="book-head-tags">
              {book.tags.map((t) => <a className="book-tag" href="theory.html" key={t}>{t}</a>)}
            </div>
          </div>
        </header>

        {/* ── Intro ───────────────────────────────────────────────── */}
        <section className="book-intro">
          <p className="book-intro-lead" dangerouslySetInnerHTML={{ __html: book.blurb }} />
        </section>

        {/* ── Chapter list ────────────────────────────────────────── */}
        <ChapterList book={book} />

        {/* ── Read more ───────────────────────────────────────────── */}
        <section className="book-more">
          <SectionHead label="Read More" divider="thick-slab" />
          <div className="book-more-grid">
            {READ_MORE.map((a, i) => (
              <a className="more-card" href={a.href} key={i}>
                <div className="more-card-thumb"><span>{a.cat[0]}</span></div>
                <div className="more-card-body">
                  <div className="more-card-cat">{a.cat}</div>
                  <div className="more-card-title">{a.title}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
