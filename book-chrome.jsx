// book-chrome.jsx
// Shared site chrome (Masthead / Nav / Footer) + a generated typographic book
// cover, used by both the book overview (book.jsx) and chapter reader
// (chapter.jsx). Mirrors the chrome in classics.jsx / reader.jsx so the new
// long-form reading pages sit inside the same design system. Exported to window.

const { useState: _useState, useEffect: _useEffect, useRef: _useRef } = React;

const _R = (id, fallback) =>
  (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory & History", href: "theory.html" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookshop", href: "https://wellred-books.com/" },
];







// Generated typographic cover — print-shop slab in the RCI palette. `size`
// controls the scale ("lg" for the overview hero, "sm" for the chapter header).
function BookCover({ title, author, size = "lg" }) {
  return (
    <div className={"book-cover book-cover--" + size} aria-hidden="true">
      <div className="book-cover-spine" />
      <div className="book-cover-grain" />
      <div className="book-cover-inner">
        <div className="book-cover-author">{author}</div>
        <div className="book-cover-rule" />
        <div className="book-cover-title">{title}</div>
        <div className="book-cover-foot">
          <span>RCI Classics</span>
          <span className="book-cover-star">★</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NAV_TABS, BookCover, R: _R });
