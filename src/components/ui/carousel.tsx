import * as React from "react";

import { cn } from "@/lib/utils";

export type CarouselSlide = {
  src: string;
  alt: string;
};

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: CarouselSlide[];
  title?: string;
  ariaLabel?: string;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  transitionDuration?: number;
  initialIndex?: number;
}

function clampIndex(index: number, max: number) {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(index, max - 1));
}

function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  const matchMedia = window.matchMedia;
  if (!matchMedia) return false;
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(value);
        continue;
      }
      (ref as React.MutableRefObject<T>).current = value;
    }
  };
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      slides,
      title,
      ariaLabel = "Carrossel",
      loop = false,
      autoplay = false,
      autoplayInterval = 4500,
      transitionDuration = 450,
      initialIndex = 0,
      className,
      ...props
    },
    ref
  ) => {
    const slideCount = slides.length;
    const id = React.useId();
    const viewportId = `${id}-viewport`;
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [autoplayStopped, setAutoplayStopped] = React.useState(false);
    const [isInteracting, setIsInteracting] = React.useState(false);
    const prefersReducedMotion = getPrefersReducedMotion();

    const canLoop = loop && slideCount > 1;
    const canAutoplay = autoplay && slideCount > 1 && !prefersReducedMotion;

    const safeInitialIndex = clampIndex(initialIndex, slideCount);
    const [activeIndex, setActiveIndex] = React.useState(safeInitialIndex);
    const [transitionEnabled, setTransitionEnabled] = React.useState(true);
    const [positionIndex, setPositionIndex] = React.useState(() => (canLoop ? safeInitialIndex + 1 : safeInitialIndex));

    React.useEffect(() => {
      const clamped = clampIndex(initialIndex, slideCount);
      setActiveIndex(clamped);
      setTransitionEnabled(false);
      const nextPosition = canLoop ? clamped + 1 : clamped;
      setPositionIndex(nextPosition);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }, [initialIndex, slideCount, canLoop]);

    const goTo = React.useCallback(
      (nextIndex: number, options?: { stopAutoplay?: boolean }) => {
        if (slideCount <= 1) return;

        const clamped = clampIndex(nextIndex, slideCount);
        const nextPosition = canLoop ? clamped + 1 : clamped;

        if (options?.stopAutoplay !== false) setAutoplayStopped(true);

        setActiveIndex(clamped);
        setPositionIndex(nextPosition);
      },
      [slideCount, canLoop]
    );

    const goNext = React.useCallback(
      (options?: { stopAutoplay?: boolean }) => {
        if (slideCount <= 1) return;

        if (canLoop) {
          const nextPosition = positionIndex + 1;
          if (options?.stopAutoplay !== false) setAutoplayStopped(true);
          setActiveIndex((prev) => (prev + 1) % slideCount);
          setPositionIndex(nextPosition);
          return;
        }

        const nextIndex = Math.min(activeIndex + 1, slideCount - 1);
        if (nextIndex === activeIndex) return;
        if (options?.stopAutoplay !== false) setAutoplayStopped(true);
        setActiveIndex(nextIndex);
        setPositionIndex(nextIndex);
      },
      [activeIndex, canLoop, positionIndex, slideCount]
    );

    const goPrev = React.useCallback(
      (options?: { stopAutoplay?: boolean }) => {
        if (slideCount <= 1) return;

        if (canLoop) {
          const nextPosition = positionIndex - 1;
          if (options?.stopAutoplay !== false) setAutoplayStopped(true);
          setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
          setPositionIndex(nextPosition);
          return;
        }

        const nextIndex = Math.max(activeIndex - 1, 0);
        if (nextIndex === activeIndex) return;
        if (options?.stopAutoplay !== false) setAutoplayStopped(true);
        setActiveIndex(nextIndex);
        setPositionIndex(nextIndex);
      },
      [activeIndex, canLoop, positionIndex, slideCount]
    );

    const isAutoplayPaused = autoplayStopped || isInteracting;

    React.useEffect(() => {
      if (!canAutoplay) return;
      if (isAutoplayPaused) return;

      const timer = window.setInterval(() => {
        goNext({ stopAutoplay: false });
      }, Math.max(1000, autoplayInterval));

      return () => {
        window.clearInterval(timer);
      };
    }, [autoplayInterval, canAutoplay, goNext, isAutoplayPaused]);

    const renderSlides = React.useMemo(() => {
      if (!canLoop) return slides;
      const first = slides[0];
      const last = slides[slideCount - 1];
      return [last, ...slides, first];
    }, [canLoop, slideCount, slides]);

    const stepPercent = renderSlides.length > 0 ? 100 / renderSlides.length : 100;
    const translatePercent = positionIndex * stepPercent;
    const duration = prefersReducedMotion ? 0 : Math.max(0, transitionDuration);
    const isAtStart = !canLoop && activeIndex === 0;
    const isAtEnd = !canLoop && activeIndex === slideCount - 1;

    if (slideCount === 0) return null;

    return (
      <div
        ref={mergeRefs(ref)}
        className={cn("relative", className)}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => setIsInteracting(false)}
        onFocusCapture={() => setIsInteracting(true)}
        onBlurCapture={() => setIsInteracting(false)}
        {...props}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">{title}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goPrev()}
              disabled={isAtStart}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground backdrop-blur transition hover:bg-accent/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              aria-controls={viewportId}
              aria-label="Ver item anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="h-5 w-5">
                <path
                  d="M14.5 6.5 9 12l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goNext()}
              disabled={isAtEnd}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground backdrop-blur transition hover:bg-accent/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              aria-controls={viewportId}
              aria-label="Ver próximo item"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="h-5 w-5">
                <path
                  d="M9.5 6.5 15 12l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          id={viewportId}
          className="mt-4 overflow-hidden rounded-3xl bg-transparent"
          role="region"
          aria-roledescription="carrossel"
          aria-label={ariaLabel}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goPrev();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goNext();
            }
            if (event.key === "Home") {
              event.preventDefault();
              goTo(0);
            }
            if (event.key === "End") {
              event.preventDefault();
              goTo(slideCount - 1);
            }
          }}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{
              width: `${renderSlides.length * 100}%`,
              transform: `translateX(-${translatePercent}%)`,
              transition: transitionEnabled ? `transform ${duration}ms ease` : "none",
            }}
            onTransitionEnd={() => {
              if (!canLoop) return;

              if (positionIndex === 0) {
                setTransitionEnabled(false);
                setPositionIndex(slideCount);
                setActiveIndex(slideCount - 1);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setTransitionEnabled(true);
                  });
                });
                return;
              }

              if (positionIndex === slideCount + 1) {
                setTransitionEnabled(false);
                setPositionIndex(1);
                setActiveIndex(0);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setTransitionEnabled(true);
                  });
                });
              }
            }}
          >
            {renderSlides.map((slide, index) => {
              const logicalIndex = canLoop ? (index - 1 + slideCount) % slideCount : index;
              const isActive = logicalIndex === activeIndex;

              return (
                <div
                  key={`${slide.src}-${index}`}
                  className="shrink-0"
                  style={{ width: `${100 / renderSlides.length}%` }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${logicalIndex + 1} de ${slideCount}`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-auto w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition",
                index === activeIndex ? "bg-brand" : "bg-foreground/15 hover:bg-foreground/25"
              )}
              aria-controls={viewportId}
              aria-label={`Ir para item ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export { Carousel };
