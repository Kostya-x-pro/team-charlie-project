'use client';

import { useId, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import styles from './animated-grid.module.css';
import AnimatedGridSvg from './animated-grid.svg';

gsap.registerPlugin(useGSAP);

const FLOW_DURATION = 12.5;
const HALF_FLOW_DURATION = FLOW_DURATION / 2;

const RIGHT_POSITION_X_RATIO = 1.15;
const LEFT_POSITION_X_RATIO = 0.11;
const LEFT_POSITION_Y_RATIO = 0.56;
const BOTTOM_POSITION_Y_RATIO = 1.15;

export const AnimatedGrid = () => {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const gridLayerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const gridLayer = gridLayerRef.current;

      if (!root || !gridLayer) return;

      const svg = gridLayer.querySelector<SVGSVGElement>('svg');
      const glow = gridLayer.querySelector<SVGEllipseElement>(
        '[data-grid-glow="true"]',
      );
      const mask = gridLayer.querySelector<SVGMaskElement>(
        '[data-grid-mask="true"]',
      );
      const maskLayer = gridLayer.querySelector<SVGGElement>(
        '[data-grid-mask-layer="true"]',
      );
      const filter = gridLayer.querySelector<SVGFilterElement>(
        '[data-grid-filter="true"]',
      );
      const filterLayer = gridLayer.querySelector<SVGGElement>(
        '[data-grid-filter-layer="true"]',
      );

      if (!svg || !glow || !mask || !maskLayer || !filter || !filterLayer) {
        return;
      }

      /*
       * Inline SVG выводится несколько раз на одной странице.
       * У каждого экземпляра должны быть уникальные mask/filter ID.
       */
      const maskId = `animated-grid-mask-${instanceId}`;
      const filterId = `animated-grid-filter-${instanceId}`;

      mask.setAttribute('id', maskId);
      maskLayer.setAttribute('mask', `url(#${maskId})`);

      filter.setAttribute('id', filterId);
      filterLayer.setAttribute('filter', `url(#${filterId})`);

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) return;

      const viewBox = svg.getAttribute('viewBox')?.split(/\s+/).map(Number);
      const currentCenterX = Number(glow.getAttribute('cx'));
      const currentCenterY = Number(glow.getAttribute('cy'));

      if (!viewBox || viewBox.length !== 4) return;

      const [, , viewBoxWidth, viewBoxHeight] = viewBox;

      if (!viewBoxWidth || !viewBoxHeight) return;

      const rightX = viewBoxWidth * RIGHT_POSITION_X_RATIO;
      const leftX = viewBoxWidth * LEFT_POSITION_X_RATIO;
      const leftY = viewBoxHeight * LEFT_POSITION_Y_RATIO;
      const bottomY = viewBoxHeight * BOTTOM_POSITION_Y_RATIO;

      const verticalMidpointProgress =
        (leftY - currentCenterY) / (bottomY - currentCenterY);

      const verticalEasePower =
        Math.log(verticalMidpointProgress) / Math.log(0.5);

      const glowPosition = {
        x: rightX,
        y: currentCenterY,
      };

      glow.setAttribute('cx', String(rightX));

      const updateGlowPosition = () => {
        glow.setAttribute('cx', String(glowPosition.x));
        glow.setAttribute('cy', String(glowPosition.y));
      };

      const flow = gsap
        .timeline({
          repeat: -1,
          yoyo: true,
        })
        .to(
          glowPosition,
          {
            y: bottomY,
            duration: FLOW_DURATION,
            ease: progress => progress ** verticalEasePower,
            onUpdate: updateGlowPosition,
          },
          0,
        )
        .to(
          glowPosition,
          {
            x: leftX,
            duration: HALF_FLOW_DURATION,
            ease: 'sine.inOut',
          },
          0,
        )
        .to(
          glowPosition,
          {
            x: rightX,
            duration: HALF_FLOW_DURATION,
            ease: 'sine.inOut',
          },
          HALF_FLOW_DURATION,
        );

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;

          flow.paused(!entry.isIntersecting);
        },
        {
          threshold: 0.05,
        },
      );

      observer.observe(root);

      return () => {
        observer.disconnect();
        glow.setAttribute('cx', String(currentCenterX));
        glow.setAttribute('cy', String(currentCenterY));
      };
    },
    {
      scope: rootRef,
      dependencies: [instanceId],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={rootRef} className={styles.grid} aria-hidden='true'>
      <div ref={gridLayerRef} className={styles.grid_layer}>
        <AnimatedGridSvg className={styles.grid_svg} focusable='false' />
      </div>
    </div>
  );
};
