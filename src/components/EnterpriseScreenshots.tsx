"use client";

import {
  enterpriseScreenshots,
  type EnterpriseScreenshot,
} from "@/lib/enterprise-screenshots";
import { site } from "@/lib/site";
import { useCallback, useEffect, useState } from "react";

const total = enterpriseScreenshots.length;

export function EnterpriseScreenshots() {
  const [index, setIndex] = useState(0);
  const slide = enterpriseScreenshots[index];

  const go = useCallback((direction: -1 | 1) => {
    setIndex((current) => (current + direction + total) % total);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    for (const shot of enterpriseScreenshots) {
      const img = new window.Image();
      img.src = shot.src;
      if (shot.src2x) {
        const hiRes = new window.Image();
        hiRes.src = shot.src2x;
      }
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  return (
    <section
      id="enterprise-see-platform"
      className="enterprise-screenshots"
      aria-labelledby="enterprise-screenshots-heading"
    >
      <header className="enterprise-block-header">
        <h2
          id="enterprise-screenshots-heading"
          className="enterprise-block-title"
        >
          See the platform
        </h2>
        <span className="tlc-accent-line" aria-hidden />
        <p className="enterprise-block-lead">
          Sample screens from the {site.name} admin experience—not a complete
          product walkthrough.{" "}
          <a href="/contact" className="enterprise-inline-link">
            Request a free demo
          </a>{" "}
          for a live look at the platform.
        </p>
      </header>

      <div
        className="enterprise-screenshots-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Platform screenshots"
      >
        <div
          className="enterprise-screenshots-carousel-card"
          id="enterprise-screenshots-panel"
        >
          <div className="enterprise-screenshots-carousel-meta">
            <p className="enterprise-screenshots-carousel-count" aria-live="polite">
              <span className="sr-only">
                Screen {index + 1} of {total}:{" "}
              </span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <p className="enterprise-screenshots-carousel-title">{slide.caption}</p>
          </div>

          <SlideImage key={slide.src} shot={slide} />

          <div className="enterprise-screenshots-carousel-nav">
            <button
              type="button"
              onClick={() => go(-1)}
              className="enterprise-screenshots-carousel-arrow"
              aria-label={`Previous: ${
                enterpriseScreenshots[(index - 1 + total) % total].caption
              }`}
            >
              <span aria-hidden>‹</span>
            </button>

            <div
              className="enterprise-screenshots-carousel-dots"
              role="tablist"
              aria-label="Choose a screen"
            >
              {enterpriseScreenshots.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-controls="enterprise-screenshots-panel"
                  id={`enterprise-screenshot-tab-${i}`}
                  onClick={() => goTo(i)}
                  className={`enterprise-screenshots-carousel-dot${i === index ? " is-active" : ""}`}
                >
                  <span className="sr-only">{shot.caption}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="enterprise-screenshots-carousel-arrow"
              aria-label={`Next: ${
                enterpriseScreenshots[(index + 1) % total].caption
              }`}
            >
              <span aria-hidden>›</span>
            </button>
          </div>
        </div>

        <ul className="enterprise-screenshots-carousel-labels">
          {enterpriseScreenshots.map((shot, i) => (
            <li key={shot.src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                className={`enterprise-screenshots-carousel-label${i === index ? " is-active" : ""}`}
                aria-current={i === index ? "true" : undefined}
              >
                {shot.caption}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const TALL_SLIDE_HEIGHT = 720;

function SlideImage({ shot }: { shot: EnterpriseScreenshot }) {
  const isTall = shot.height > TALL_SLIDE_HEIGHT;

  return (
    <div className="enterprise-screenshots-carousel-stage" aria-live="polite">
      <div
        className="enterprise-screenshots-carousel-viewport"
        style={{ "--shot-width": `${shot.width}px` } as React.CSSProperties}
      >
        <div key={shot.src} className="enterprise-screenshots-carousel-slide">
          <div className="enterprise-screenshots-carousel-scroll">
            <img
              src={shot.src}
              srcSet={
                shot.src2x
                  ? `${shot.src} ${shot.width}w, ${shot.src2x} ${shot.width2x ?? shot.width * 2}w`
                  : undefined
              }
              sizes={`min(100%, ${shot.width}px)`}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              className="enterprise-screenshots-carousel-img"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <p
        className={`enterprise-screenshots-carousel-hint${isTall ? " enterprise-screenshots-carousel-hint--visible" : ""}`}
      >
        {isTall ? "Scroll the image to read" : "\u00a0"}
      </p>
    </div>
  );
}
