'use client';
import type { ReactNode } from 'react';

import Image from 'next/image';

import { useTranslation } from 'react-i18next';

import snakeImage from '@/shared/assets/images/hero_page_snake.png';
import { cn } from '@/shared/lib/cn';
import { AnimatedGrid } from '@/shared/ui/animated-grid';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';

import { SOCIAL_ITEMS } from '../../model/social-items';
import { TitleCarousel } from '../title-carousel/title-carousel';
import styles from './hero-section.module.css';

interface Props {
  header: ReactNode;
}

export const HeroSection = ({ header }: Props) => {
  const { t } = useTranslation();
  const titleItems = [
    t('hero.title.accents.profit'),
    t('hero.title.accents.skills'),
    t('hero.title.accents.growth'),
  ] as const;

  return (
    <section
      id='home'
      className={styles.section}
      aria-labelledby='home-hero-title'
    >
      <AnimatedGrid />

      <div className={cn('container', styles.hero_container)}>
        {header}
        <div className={styles.hero}>
          <div className={styles.hero_content}>
            <div className={styles.hero_text}>
              <Text
                id='home-hero-title'
                className={styles.hero_title}
                tag='h1'
                size='60'
                weight='bold'
                lineHeight='54'
                color='white'
                transform='uppercase'
                letterSpacing='display'
                aria-label={`${t('hero.title.firstLine')} ${t(
                  'hero.title.secondLine',
                )} ${titleItems[0]}`}
              >
                {t('hero.title.firstLine')}
                <br />
                {t('hero.title.secondLine')}{' '}
                <TitleCarousel items={titleItems} />
              </Text>

              <Text
                className={styles.hero_description}
                tag='p'
                family='stolzl'
                size='16'
                weight='regular'
                lineHeight='24'
                color='white'
              >
                {t('hero.description.firstLine')}
                <br />
                {t('hero.description.secondLine')}
              </Text>
            </div>

            <Button variant='primary'>{t('hero.action')}</Button>
          </div>

          <div className={styles.snake_wrapper} aria-hidden='true'>
            <Image
              className={styles.snake_image}
              src={snakeImage}
              alt=''
              fill
              preload
              sizes='(max-width: 767px) 115vw, (max-width: 1023px) 82vw, 60vw'
            />
          </div>

          <div className={styles.socials} aria-label={t('hero.socialsLabel')}>
            {SOCIAL_ITEMS.map(({ label, Icon }) => (
              <button
                className={styles.social_button}
                type='button'
                aria-label={label}
                key={label}
              >
                <Icon className={styles.social_icon} aria-hidden='true' />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
