// Shared components for Marxist.com homepage
// All exported to window at the end of the file.

// ─── PrintButton ────────────────────────────────────────────────────────────
// 2.5D pressable button — offset ink shadow, presses into place on :active
function PrintButton({ children, active = false, size = "md", variant = "paper", onClick, style, className = "", ...rest }) {
  const baseStyle = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    border: "2px solid var(--rci-ink)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    whiteSpace: "nowrap",
    userSelect: "none",
    fontSize: size === "sm" ? 11 : size === "lg" ? 15 : 13,
    padding: size === "sm" ? "7px 12px 6px" : size === "lg" ? "14px 22px 12px" : "10px 16px 9px",
    background:
      variant === "ink" ? "var(--rci-ink)" :
      variant === "red" ? "var(--rci-red)" :
      "var(--rci-offwhite)",
    color:
      variant === "ink" ? "var(--rci-offwhite)" :
      variant === "red" ? "var(--rci-offwhite)" :
      "var(--rci-ink)",
    boxShadow: active ? "0 0 0 var(--rci-ink)" : "3px 3px 0 var(--rci-ink)",
    transform: active ? "translate(3px, 3px)" : "translate(0,0)",
    transition: "transform 80ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 80ms cubic-bezier(0.2,0.7,0.1,1), background 80ms",
    position: "relative",
    ...style,
  };
  return (
    <button
      className={"pbtn " + className}
      style={baseStyle}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

// ─── Eyebrow / RedRule / Hairline ───────────────────────────────────────────
function Eyebrow({ children, style }) {
  return (
    <span style={{
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--rci-red)",
      ...style
    }}>{children}</span>
  );
}

function SectionRule({ style, divider = "hairline" }) {
  if (divider === "red-rule") {
    return <div style={{ height: 2, background: "var(--rci-red)", margin: "0", ...style }} />;
  }
  if (divider === "thick-slab") {
    return <div style={{ height: 8, background: "var(--rci-ink)", margin: "0", ...style }} />;
  }
  // hairline default — two-line newspaper rule
  return (
    <div style={{ ...style }}>
      <div style={{ height: 1, background: "var(--rci-ink)" }} />
      <div style={{ height: 1, background: "var(--rci-ink)", marginTop: 2 }} />
    </div>
  );
}

// ─── ArticleCard ────────────────────────────────────────────────────────────
// Treatments: clean | offset | taped | stamped
function ArticleCard({ kicker, title, byline, image, size = "md", treatment = "clean", titleFont, style }) {
  const titleSize = size === "xl" ? 36 : size === "lg" ? 26 : size === "sm" ? 17 : 20;
  const isSerif = titleFont === "serif";
  const titleStyle = isSerif
    ? {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: titleSize + 2,
        lineHeight: 1.1,
        textTransform: "none",
        letterSpacing: "-0.005em",
        color: "var(--fg)",
        margin: "0 0 4px",
      }
    : {
        fontFamily: "var(--font-headline)",
        fontWeight: 700,
        fontSize: titleSize,
        lineHeight: 1.02,
        textTransform: "uppercase",
        letterSpacing: "0.005em",
        color: "var(--fg)",
        margin: "0 0 4px",
      };

  // Treatment wrappers
  const wrap = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "relative",
    ...style,
  };
  const imgWrap = {
    position: "relative",
    width: "100%",
    aspectRatio: size === "xl" ? "16/10" : size === "sm" ? "16/10" : "4/3",
    overflow: "hidden",
    background: "var(--rci-ink)",
  };

  // Treatment-specific image wrapper styling
  let imgWrapExtra = {};
  let cardExtra = {};
  let tapeEl = null;
  let stampEl = null;

  if (treatment === "offset") {
    imgWrapExtra = { boxShadow: "5px 5px 0 var(--rci-ink)", border: "1.5px solid var(--rci-ink)" };
  } else if (treatment === "taped") {
    imgWrapExtra = { border: "1.5px solid var(--rci-ink)" };
    cardExtra = { paddingTop: 14 };
    tapeEl = (
      <div style={{
        position: "absolute",
        top: -2,
        left: "28%",
        width: 80,
        height: 22,
        background: "rgba(232, 220, 160, 0.55)",
        backdropFilter: "blur(0px)",
        border: "1px solid rgba(120, 110, 70, 0.18)",
        transform: "rotate(-2.5deg)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        zIndex: 3,
      }} />
    );
  } else if (treatment === "stamped") {
    imgWrapExtra = { border: "1.5px solid var(--rci-ink)" };
    stampEl = (
      <div style={{
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 3,
        padding: "3px 7px",
        border: "1.5px solid var(--rci-red)",
        color: "var(--rci-red)",
        fontFamily: "var(--font-condensed)",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.18em",
        background: "rgba(246,239,239,0.85)",
        transform: "rotate(-4deg)",
        textTransform: "uppercase",
      }}>{kicker || "Read"}</div>
    );
  } else {
    // clean
    imgWrapExtra = { border: "1.5px solid var(--rci-ink)" };
  }

  return (
    <article style={{ ...wrap, ...cardExtra }}>
      <div style={{ ...imgWrap, ...imgWrapExtra }}>
        {tapeEl}
        {stampEl}
        {image ? (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("${image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "contrast(1.05) saturate(0.95)",
          }} />
        ) : (
          // Slab placeholder
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--rci-ink)",
            color: "var(--rci-offwhite)",
            fontFamily: "var(--font-display)", fontSize: 16, padding: 12,
            textAlign: "center", lineHeight: 1, textTransform: "uppercase", letterSpacing: ".02em",
          }}>{title}</div>
        )}
        {/* faint grain on image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('ds/textures/film-grain.jpg')",
          backgroundSize: "cover",
          mixBlendMode: "multiply",
          opacity: 0.12,
          pointerEvents: "none",
        }} />
      </div>
      <div>
        {kicker && treatment !== "stamped" && <div style={{ marginBottom: 4 }}><Eyebrow>{kicker}</Eyebrow></div>}
        <h3 style={titleStyle}>{title}</h3>
        {byline && (
          <div style={{
            fontFamily: "var(--font-condensed)",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--rci-ash)",
            textTransform: "uppercase",
            marginTop: 2,
          }}>{byline}</div>
        )}
      </div>
    </article>
  );
}

// ─── SectionHead ────────────────────────────────────────────────────────────
// A heading row with red label + double hairline rule
function SectionHead({ label, divider = "hairline", extra }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <SectionRule divider={divider} style={{ marginBottom: 10 }} />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
        <Eyebrow style={{ fontSize: 14, letterSpacing: "0.22em" }}>{label}</Eyebrow>
        {extra && <div style={{ fontFamily: "var(--font-condensed)", fontSize: 12, letterSpacing: "0.14em", color: "var(--rci-ash)", textTransform: "uppercase" }}>{extra}</div>}
      </div>
    </div>
  );
}

// Export to window so other JSX files can use them
Object.assign(window, { PrintButton, Eyebrow, SectionRule, ArticleCard, SectionHead });
