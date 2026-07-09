// gen-books.js
// Reads the long-form book source markdown in /references and emits a single
// plain-JS data file (books-data.js) that sets window.__BOOKS. The chapter
// reader renders the per-chapter markdown client-side with `marked`.
//
// Run standalone (`node gen-books.js`) or via build.js, which calls it before
// copying assets into /dist.

const fs = require('fs');
const path = require('path');

const REF = path.join(__dirname, 'references', 'stateandrev');
const OUT = path.join(__dirname, 'books-data.js');

// ── Per-book manifests ───────────────────────────────────────────────────────
// Explicit ordering + titles so we never rely on parsing them out of the prose.
const BOOKS = [
  {
    slug: 'state-and-revolution',
    title: 'The State and Revolution',
    subtitle: 'The Marxist Theory of the State & the Tasks of the Proletariat in the Revolution',
    author: 'V. I. Lenin',
    written: 'August – September 1917',
    date: '1917',
    buyUrl: 'https://wellred-books.com/product/state-and-revolution-lenin/',
    tags: ['The State', 'Revolution', 'Dialectical Materialism'],
    blurb:
      'Written on the eve of the October Revolution, while Lenin was in hiding, <em>The State and Revolution</em> is his most important theoretical work. ' +
      'Returning to the words of Marx and Engels themselves, Lenin strips away the distortions of the reformists and opportunists to re-establish the genuine revolutionary content of Marxism on the question of the state. ' +
      'He shows that the state is not a neutral arbiter standing above society, but an instrument of class rule — and that the working class cannot simply lay hold of the existing state machine, but must smash it and replace it with its own organs of power, which then begin to wither away.',
    chapters: [
      { file: 'The State and Revolution Preface.md',        part: 'Front Matter', label: 'Preface',     title: 'Preface to the First Edition' },
      { file: 'The State and Revolution.md',                part: 'The Text',     label: 'Chapter I',   title: 'Class Society and the State' },
      { file: 'The State and Revolution 1.md',              part: 'The Text',     label: 'Chapter II',  title: 'The Experience of 1848–51' },
      { file: 'The State and Revolution 2.md',              part: 'The Text',     label: 'Chapter III', title: 'Experience of the Paris Commune of 1871' },
      { file: 'The State and Revolution 3.md',              part: 'The Text',     label: 'Chapter IV',  title: 'Supplementary Explanations by Engels' },
      { file: 'The State and Revolution 4.md',              part: 'The Text',     label: 'Chapter V',   title: 'The Economic Basis of the Withering Away of the State' },
      { file: 'The State and Revolution 5.md',              part: 'The Text',     label: 'Chapter VI',  title: 'The Vulgarisation of Marxism by the Opportunists' },
      { file: 'Postscript to The State and Revolution.md',  part: 'Appendix',     label: 'Postscript',  title: 'Postscript to the First Edition' },
    ],
  },
];

// ── Markdown cleaning ────────────────────────────────────────────────────────
function clean(raw) {
  let s = raw.replace(/\r\n/g, '\n');

  // 1. Strip YAML frontmatter.
  s = s.replace(/^---\n[\s\S]*?\n---\n/, '');

  // 2. Drop marxists.org chapter-header GIFs.
  s = s.replace(/^!\[[^\]]*\]\([^)]*staterev\/pics\/[^)]*\)\s*$/gim, '');

  // 2b. Some clips open with stray horizontal rules (left over once the YAML and
  //     header GIF are removed). Strip any run of leading rules / blank lines so
  //     the TOC block below sits at the very start for the split in step 3.
  s = s.replace(/^\s*(?:-{3,}[ \t]*\n\s*)+/, '');

  // 3. Split on horizontal rules and discard any leading block that is just the
  //    in-page section TOC (links to #s1, #s2 …) or now-empty image/separators.
  let segs = s.split(/\n-{3,}\n/);
  const isFront = (seg) => {
    const lines = seg.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return true;
    return lines.every((l) => /\]\(#s\d/.test(l) || /^!\[/.test(l));
  };
  while (segs.length > 1 && isFront(segs[0])) segs.shift();
  s = segs.join('\n\n* * *\n\n');

  // 4. Remove the trailing "next chapter" navigation link the clips carry.
  s = s.replace(/\n\[[^\]]+\]\(https?:\/\/www\.marxists\.org\/[^)]*staterev\/[^)]*\)\s*$/i, '');

  return s.trim();
}

// ── Build ────────────────────────────────────────────────────────────────────
const out = {};
for (const book of BOOKS) {
  const chapters = book.chapters.map((ch, i) => {
    const md = clean(fs.readFileSync(path.join(REF, ch.file), 'utf8'));
    return { id: i, part: ch.part, label: ch.label, title: ch.title, md };
  });
  out[book.slug] = {
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle,
    author: book.author,
    written: book.written,
    date: book.date,
    buyUrl: book.buyUrl,
    tags: book.tags,
    blurb: book.blurb,
    chapters,
  };
}

const banner =
  '// AUTO-GENERATED by gen-books.js — do not edit by hand.\n' +
  '// Source: references/stateandrev/*.md\n';
fs.writeFileSync(OUT, banner + 'window.__BOOKS = ' + JSON.stringify(out) + ';\n');

const total = Object.values(out).reduce((n, b) => n + b.chapters.length, 0);
console.log(`gen-books: wrote ${Object.keys(out).length} book(s), ${total} chapters → books-data.js`);
