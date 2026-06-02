"use client";

import { useCallback, useEffect, useState } from "react";
import { FeatureIcon } from "@/components/FeatureIcon";
import { featureHighlights } from "@/lib/product";

const total = featureHighlights.length;

function CarouselChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="features-carousel-arrow-icon"
    >
      {direction === "prev" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

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
      aria-label="App highlights"
    >
      <div className="features-carousel-card" id="features-carousel-panel">
        <div
          className="features-carousel-tabs"
          role="tablist"
          aria-label="Feature topics"
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
              className={`features-carousel-tab${i === index ? " is-active" : ""}`}
            >
              {item.shortLabel}
            </button>
          ))}
        </div>

        <div
          className="features-carousel-progress"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Highlight ${index + 1} of ${total}`}
        >
          <span
            className="features-carousel-progress-fill"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>

        <div key={slide.title} className="features-carousel-slide" aria-live="polite">
          <span className="features-carousel-icon" aria-hidden>
            <FeatureIcon icon={slide.icon} />
          </span>
          <h3 className="features-carousel-title">{slide.shortLabel}</h3>
          <p className="features-carousel-eyebrow">{slide.title}</p>
          <p className="features-carousel-text">{slide.description}</p>
        </div>

        <div className="features-carousel-nav">
          <button
            type="button"
            onClick={() => go(-1)}
            className="features-carousel-arrow"
            aria-label={`Previous: ${slide.shortLabel}`}
          >
            <CarouselChevron direction="prev" />
          </button>

          <p className="features-carousel-counter" aria-live="polite">
            <span className="sr-only">Highlight </span>
            {index + 1} of {total}
          </p>

          <button
            type="button"
            onClick={() => go(1)}
            className="features-carousel-arrow"
            aria-label={`Next: ${
              featureHighlights[(index + 1) % total].shortLabel
            }`}
          >
            <CarouselChevron direction="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
