'use client';

import Image from 'next/image';

import { useTranslation } from 'react-i18next';

import { Header } from '@/widgets/header/ui';

import notFoundSnake from '@/shared/assets/images/hero_page_snake.png';
import { AnimatedGrid } from '@/shared/ui/animated-grid';
import { Button } from '@/shared/ui/button';

import styles from './not-found.module.css';

export const NotFound = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';

  return (
    <main className={styles.page}>
      <AnimatedGrid />

      <Header
        className={styles.header}
        homeHref={`/${locale}`}
        sectionPrefix={`/${locale}`}
        mobileMenuOnly
      />

      <div className={styles.content}>
        <h1 className={styles.title} aria-label={t('notFound.title')}>
          <span aria-hidden='true'>4</span>
          <span aria-hidden='true'>0</span>
          <span aria-hidden='true'>4</span>
        </h1>

        <Button className={styles.back_button} href={`/${locale}`}>
          {t('notFound.back')}
        </Button>
      </div>

      <Image
        className={styles.snake}
        src={notFoundSnake}
        alt=''
        priority
        aria-hidden='true'
      />
    </main>
  );
};
