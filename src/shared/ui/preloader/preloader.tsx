'use client';

import { useEffect, useState } from 'react';

import LogoIcon from '@/shared/assets/icons/logo_small_icon.svg';
import { AnimatedGrid } from '@/shared/ui/animated-grid';

import styles from './preloader.module.css';

const INITIAL_PROGRESS = 45;
const MAX_FAKE_PROGRESS = 75;
const PROGRESS_INTERVAL = 75;

interface Props {
  waitForPageLoad?: boolean;
}

export const Preloader = (props: Props) => {
  const { waitForPageLoad = false } = props;
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = INITIAL_PROGRESS;
    let isPageLoaded = false;
    let hideTimeoutId: number | undefined;

    const hideWhenReady = () => {
      if (!waitForPageLoad || !isPageLoaded || currentProgress < MAX_FAKE_PROGRESS) return;

      hideTimeoutId = window.setTimeout(() => setIsVisible(false), 150);
    };

    const handlePageLoad = () => {
      isPageLoaded = true;
      hideWhenReady();
    };

    if (waitForPageLoad) {
      isPageLoaded = document.readyState === 'complete';

      if (!isPageLoaded) {
        window.addEventListener('load', handlePageLoad, { once: true });
      }
    }

    const progressIntervalId = window.setInterval(() => {
      currentProgress = Math.min(currentProgress + 1, MAX_FAKE_PROGRESS);
      setProgress(currentProgress);

      if (currentProgress === MAX_FAKE_PROGRESS) {
        window.clearInterval(progressIntervalId);
        hideWhenReady();
      }
    }, PROGRESS_INTERVAL);

    return () => {
      window.clearInterval(progressIntervalId);
      window.removeEventListener('load', handlePageLoad);

      if (hideTimeoutId !== undefined) {
        window.clearTimeout(hideTimeoutId);
      }
    };
  }, [waitForPageLoad]);

  if (!isVisible) return null;

  return (
    <div className={styles.preloader}>
      <AnimatedGrid />

      <div className={styles.logo} aria-hidden='true'>
        <LogoIcon aria-hidden='true' />
      </div>

      <div className={styles.content}>
        <div
          className={styles.progress_value}
          role='progressbar'
          aria-label='Loading'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          {progress}%
        </div>

        <div className={styles.progress_track} aria-hidden='true'>
          <div
            className={styles.progress_fill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
