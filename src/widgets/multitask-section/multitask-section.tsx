'use client';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';

import multitaskSnakeImage from '@/shared/assets/images/multitask_page_snake.png';
import { cn } from '@/shared/lib/cn';
import { AnimatedGrid } from '@/shared/ui/animated-grid';
import { Text } from '@/shared/ui/text';

import { MULTI_TASK_CARDS } from './model/multitask-card';
import styles from './multitask-section.module.css';

export const MultitaskSection = () => {
  const { t } = useTranslation();
  return (
    <section
      id='team'
      className={styles.section}
      aria-labelledby='multitask-title'
    >
      <AnimatedGrid />

      <div className={cn('container', styles.content_layer)}>
        <Text
          id='multitask-title'
          className={styles.section_title}
          tag='h2'
          size='30'
          weight='bold'
          lineHeight='27'
          color='yellow'
          align='right'
          transform='uppercase'
          letterSpacing='display-accent'
          noWrap
        >
          {t('multitask.title')}
        </Text>

        <div className={styles.content}>
          <article className={styles.main_card}>
            <Text
              className={styles.main_card_text}
              tag='p'
              size='20'
              weight='bold'
              lineHeight='24'
              color='white'
            >
              {t('multitask.intro.beforeAccent')}{' '}
              <Text
                tag='span'
                size='20'
                weight='bold'
                lineHeight='24'
                color='yellow'
              >
                {t('multitask.intro.accent')}
              </Text>{' '}
              {t('multitask.intro.afterAccent')}
            </Text>

            <Image
              className={styles.image}
              src={multitaskSnakeImage}
              alt=''
              width={507}
              height={394}
            />
          </article>

          <div className={styles.cards_grid}>
            {MULTI_TASK_CARDS.map(card => (
              <article
                className={cn(styles.task_card, styles[card.className])}
                key={card.className}
              >
                <Text
                  className={styles.card_title}
                  tag='h3'
                  size='20'
                  weight='bold'
                  lineHeight='24'
                  color='yellow'
                  transform='uppercase'
                >
                  {t(`multitask.cards.${card.translationKey}.title`)}
                </Text>

                <Text
                  className={styles.card_description}
                  tag='p'
                  family='stolzl'
                  size='20'
                  weight='regular'
                  lineHeight='24'
                  color='white'
                  opacity='70'
                >
                  {t(`multitask.cards.${card.translationKey}.description`)}
                </Text>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
