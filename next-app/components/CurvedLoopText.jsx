"use client";

import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from 'react/jsx-runtime';
import { useRef, useEffect, useState, useMemo } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion'; // ------------------------------------------------------------ //
// MAIN COMPONENT
// ------------------------------------------------------------ //
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 400
 * @framerIntrinsicHeight 200
 * @framerDisableUnlink
 */ export default function CurvedLoop({
  text = {
    text: 'Framer University',
    font: { fontFamily: 'sans-serif', fontWeight: '400', fontSize: 64 },
    color: '#999999',
  },
  direction = 'left',
  baseVelocity = 50,
  curveAmount = 200,
  draggable = true,
  fade = true,
}) {
  const measureRef = useRef(null);
  const tspansRef = useRef([]);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [spacing, setSpacing] = useState(0);
  // Use completely static IDs based on component props to ensure consistency
  const staticId = useMemo(() => {
    // Create a deterministic hash from props that will be consistent across SSR/client
    const propsString = `${text.text}-${curveAmount}-${direction}-${baseVelocity}`;
    let hash = 0;
    for (let i = 0; i < propsString.length; i++) {
      const char = propsString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }, [text.text, curveAmount, direction, baseVelocity]);
  const pathId = `curve-${staticId}`;
  const fadeGradientId = `fadeGradient-${staticId}`;
  const fadeMaskId = `fadeMask-${staticId}`;
  const pathD = `M0,300 Q500,${300 - curveAmount} 1000,300`;
  const defaultVelocity = useMotionValue(1);
  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  // Transform scroll velocity into a factor that affects marquee speed
  const velocityFactor = useTransform(defaultVelocity, [0, 1e3], [0, 5], {
    clamp: false,
  });
  // Convert baseVelocity to the correct direction
  const actualBaseVelocity =
    direction === 'left' ? -baseVelocity : baseVelocity;
  // Reference to track if mouse is hovering
  const isHovered = useRef(false);
  // Direction factor for changing direction based on scroll or drag
  const directionFactor = useRef(1);
  // Process text to ensure proper spacing
  const processedText = useMemo(() => {
    // Remove any trailing spaces first
    const trimmedText = text.text.trim();
    // Add two non-breaking spaces to ensure visible gap
    return trimmedText + '\xa0\xa0';
  }, [text]);
  // Measure text width and set up path
  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text]);
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [curveAmount]);
  const calculatedRepeats = Math.ceil(pathLength / spacing) + 2;
  const ready = pathLength > 0 && spacing > 0;
  useAnimationFrame((t, delta) => {
    if (!ready || tspansRef.current.length === 0 || isHovered.current) return;
    if (isDragging.current) {
      // Apply drag velocity directly to text positions
      tspansRef.current.forEach((tspan) => {
        if (!tspan) return;
        let x = parseFloat(tspan.getAttribute('x') || '0');
        x += dragVelocity.current; // Wrap text around when it goes off screen
        const maxX = (tspansRef.current.length - 1) * spacing;
        if (x < -spacing) x = maxX;
        if (x > maxX) x = -spacing;
        tspan.setAttribute('x', x.toString());
      }); // Add decay to dragVelocity when not moving
      dragVelocity.current *= 0.9; // Stop completely if velocity is very small
      if (Math.abs(dragVelocity.current) < 0.01) {
        dragVelocity.current = 0;
      }
      return;
    } // Calculate regular movement
    let moveBy = directionFactor.current * actualBaseVelocity * (delta / 1e3); // Adjust movement based on scroll velocity
    if (!isDragging.current) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    moveBy += dragVelocity.current; // Gradually decay drag velocity back to zero
    if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
      dragVelocity.current *= 0.96;
    } else if (!isDragging.current) {
      dragVelocity.current = 0;
    } // Apply movement to each text span
    tspansRef.current.forEach((tspan) => {
      if (!tspan) return;
      let x = parseFloat(tspan.getAttribute('x') || '0');
      x += moveBy; // Wrap text around when it goes off screen
      const maxX = (tspansRef.current.length - 1) * spacing;
      if (x < -spacing) x = maxX;
      if (x > maxX) x = -spacing;
      tspan.setAttribute('x', x.toString());
    });
  });
  const lastPointerPosition = useRef({ x: 0, y: 0 });
  const handlePointerDown = (e) => {
    if (!draggable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grabbing';
    isDragging.current = true;
    lastPointerPosition.current = { x: e.clientX, y: e.clientY }; // Pause automatic animation by setting velocity to 0
    dragVelocity.current = 0;
  };
  const handlePointerMove = (e) => {
    if (!draggable) return;
    if (!isDragging.current) return;
    const currentPosition = { x: e.clientX, y: e.clientY }; // Calculate delta from last position
    const deltaX = currentPosition.x - lastPointerPosition.current.x; // Update drag velocity based on horizontal movement
    dragVelocity.current = deltaX * 0.3; // Update last position
    lastPointerPosition.current = currentPosition;
  };
  const handlePointerUp = (e) => {
    if (!draggable) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grab';
    isDragging.current = false;
  };
  const cursorStyle = draggable
    ? isDragging.current
      ? 'grabbing'
      : 'grab'
    : 'default';
  return /*#__PURE__*/ _jsx(motion.div, {
    onHoverStart: () => (isHovered.current = true),
    onHoverEnd: () => (isHovered.current = false),
    style: {
      visibility: ready ? 'visible' : 'hidden',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    children: /*#__PURE__*/ _jsxs('svg', {
      viewBox: '0 0 1000 600',
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        userSelect: 'none',
        width: '100%',
        aspectRatio: '1000 / 600',
        overflow: 'visible',
        display: 'block',
        fill: text.color,
        fontFamily: text.font.fontFamily,
        fontSize: text.font.fontSize,
        letterSpacing: text.font.letterSpacing,
        lineHeight: text.font.lineHeight,
        textRendering: 'geometricPrecision',
        fontKerning: 'normal',
        fontVariantLigatures: 'none',
        WebkitFontSmoothing: 'antialiased',
      },
      children: [
        /*#__PURE__*/ _jsx('text', {
          ref: measureRef,
          xmlSpace: 'preserve',
          style: {
            visibility: 'hidden',
            opacity: 0,
            pointerEvents: 'none',
            cursor: cursorStyle,
          },
          children: processedText,
        }),
        /*#__PURE__*/ _jsxs('defs', {
          children: [
            /*#__PURE__*/ _jsx('path', {
              ref: pathRef,
              id: pathId,
              d: pathD,
              fill: 'none',
              stroke: 'transparent',
            }),
            fade &&
              /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                  /*#__PURE__*/ _jsxs('linearGradient', {
                    id: fadeGradientId,
                    x1: '0%',
                    y1: '0%',
                    x2: '100%',
                    y2: '0%',
                    children: [
                      /*#__PURE__*/ _jsx('stop', {
                        offset: '0%',
                        stopColor: 'white',
                        stopOpacity: '0',
                      }),
                      /*#__PURE__*/ _jsx('stop', {
                        offset: '15%',
                        stopColor: 'white',
                        stopOpacity: '1',
                      }),
                      /*#__PURE__*/ _jsx('stop', {
                        offset: '80%',
                        stopColor: 'white',
                        stopOpacity: '1',
                      }),
                      /*#__PURE__*/ _jsx('stop', {
                        offset: '100%',
                        stopColor: 'white',
                        stopOpacity: '0',
                      }),
                    ],
                  }),
                  /*#__PURE__*/ _jsx('mask', {
                    id: fadeMaskId,
                    children: /*#__PURE__*/ _jsx('rect', {
                      width: '100%',
                      height: '100%',
                      fill: `url(#${fadeGradientId})`,
                    }),
                  }),
                ],
              }),
          ],
        }),
        ready &&
          /*#__PURE__*/ _jsx('text', {
            fontWeight: text.font.fontWeight,
            xmlSpace: 'preserve',
            mask: fade ? `url(#${fadeMaskId})` : undefined,
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerUp,
            onPointerCancel: handlePointerUp,
            children: /*#__PURE__*/ _jsx('textPath', {
              href: `#${pathId}`,
              xmlSpace: 'preserve',
              children: Array.from({ length: calculatedRepeats }).map((_, i) =>
                /*#__PURE__*/ _jsx(
                  'tspan',
                  {
                    x: i * spacing,
                    ref: (el) => {
                      if (el) tspansRef.current[i] = el;
                    },
                    children: processedText,
                  },
                  i,
                ),
              ),
            }),
          }),
      ],
    }),
  });
} // ------------------------------------------------------------ //
// PROPERTY CONTROLS
// ------------------------------------------------------------ //
CurvedLoop.displayName = 'Curved Loop Text';
export const __FramerMetadata__ = {
  exports: {
    default: {
      type: 'reactComponent',
      name: 'CurvedLoop',
      slots: [],
      annotations: {
        framerContractVersion: '1',
        framerSupportedLayoutWidth: 'any-prefer-fixed',
        framerSupportedLayoutHeight: 'any-prefer-fixed',
        framerDisableUnlink: '',
        framerIntrinsicHeight: '200',
        framerIntrinsicWidth: '400',
      },
    },
    __FramerMetadata__: { type: 'variable' },
  },
};
