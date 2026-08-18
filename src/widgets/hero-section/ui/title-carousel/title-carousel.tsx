'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { Text } from '@/shared/ui/text';

import styles from './title-carousel.module.css';

interface Props {
  items: readonly [string, string, string];
}

const ITEM_HEIGHT = 54;
const HOLD_DURATION = 1.5;
const MOVE_DURATION = 0.45;
const RESET_DURATION = 0.4;

export const TitleCarousel = ({ items }: Props) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);

  const carouselItems = [...items].reverse();

  useGSAP(
    () => {
      const track = trackRef.current;

      if (!track) return;

      gsap.set(track, {
        y: -ITEM_HEIGHT * 2,
      });

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) return;

      gsap
        .timeline({
          repeat: -1,
        })
        .to(track, {
          y: -ITEM_HEIGHT,
          duration: MOVE_DURATION,
          delay: HOLD_DURATION,
          ease: 'power3.inOut',
        })
        .to(track, {
          y: 0,
          duration: MOVE_DURATION,
          delay: HOLD_DURATION,
          ease: 'power3.inOut',
        })
        .to(track, {
          y: -ITEM_HEIGHT * 2,
          duration: RESET_DURATION,
          delay: HOLD_DURATION,
          ease: 'power4.inOut',
        });
    },
    {
      scope: rootRef,
      dependencies: [...items],
      revertOnUpdate: true,
    },
  );

  return (
    <span ref={rootRef} className={styles.carousel} aria-hidden='true'>
      <span ref={trackRef} className={styles.track}>
        {carouselItems.map(item => (
          <Text
            className={styles.item}
            tag='span'
            size='60'
            weight='bold'
            lineHeight='54'
            color='yellow'
            transform='uppercase'
            letterSpacing='display-accent'
            noWrap
            key={item}
          >
            {item}
          </Text>
        ))}
      </span>
    </span>
  );
};
