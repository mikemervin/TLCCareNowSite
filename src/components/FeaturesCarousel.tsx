"use client";

import { useCallback, useEffect, useState } from "react";
import { FeatureIcon } from "@/components/FeatureIcon";
import { featureHighlights } from "@/lib/product";

const total = featureHighlights.length;

export function FeaturesCarousel() {
  const [index, setIndex] = useState(0);
  const slide = featureHighlights[index];

  const go = useCallback((direction: -1 | 1) => {
    setIndex((current) => (current + direction + total) % total);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  return (
    <div
      className="features-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Why TLC CareNow"
    >
      <div className="features-carousel-card" id="features-carousel-panel">
        <p className="features-carousel-count" aria-live="polite">
          <span className="sr-only">
            Feature {index + 1} of {total}:{" "}
          </span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>

        <div key={slide.title} className="features-carousel-slide" aria-live="polite">
          <span className="features-carousel-icon" aria-hidden>
            <FeatureIcon icon={slide.icon} />
          </span>
          <h3 className="features-carousel-title">{slide.title}</h3>
          <p className="features-carousel-text">{slide.description}</p>
        </div>

        <div className="features-carousel-nav">
          <button
            type="button"
            onClick={() => go(-1)}
            className="features-carousel-arrow"
            aria-label={`Previous: ${
              featureHighlights[(index - 1 + total) % total].title
            }`}
          >
            <span aria-hidden>‹</span>
          </button>

          <div
            className="features-carousel-dots"
            role="tablist"
            aria-label="Choose a topic"
          >
            {featureHighlights.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-controls="features-carousel-panel"
                id={`feature-tab-${i}`}
                onClick={() => goTo(i)}
                className={`features-carousel-dot${i === index ? " is-active" : ""}`}
              >
                <span className="sr-only">{item.title}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="features-carousel-arrow"
            aria-label={`Next: ${featureHighlights[(index + 1) % total].title}`}
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      </div>

      <ul className="features-carousel-labels">
        {featureHighlights.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => goTo(i)}
              className={`features-carousel-label${i === index ? " is-active" : ""}`}
              aria-current={i === index ? "true" : undefined}
            >
              {item.shortLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
