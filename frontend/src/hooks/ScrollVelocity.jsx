import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { logoKeong } from "../assets/Assets"; // Ganti path jika perlu

// Hook untuk mendapatkan lebar elemen
function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 200,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 20,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
}) => {
  function VelocityText({
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping.input,
      velocityMapping.output,
      { clamp: false }
    );

    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);

    const wrap = (min, max, value) => {
      const range = max - min;
      return ((((value - min) % range) + range) % range) + min;
    };

    const x = useTransform(baseX, (v) =>
      copyWidth > 0 ? `${wrap(-copyWidth * numCopies, 0, v)}px` : "0px"
    );

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      if (copyWidth <= 0) return;

      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      const factor = velocityFactor.get();

      directionFactor.current = factor < 0 ? -1 : 1;
      moveBy += directionFactor.current * moveBy * Math.abs(factor);

      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies; i++) {
      spans.push(
        <span
          className={`flex-shrink-0 ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
          style={{ minWidth: "auto" }}
        >
          <img
            src={logoKeong}
            alt={`scroll-img-${i}`}
            className="h-20 w-auto mb-5"
          />
        </span>
      );
    }

    return (
      <div
        className={`relative overflow-hidden ${parallaxClassName}`}
        style={parallaxStyle}
      >
        <motion.div
          className={`flex whitespace-nowrap will-change-transform ${scrollerClassName}`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          className={className}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        />
      ))}
    </section>
  );
};

export default ScrollVelocity;
