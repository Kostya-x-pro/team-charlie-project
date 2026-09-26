'use client';

import { type ReactNode, useState } from 'react';

import { useTranslation } from 'react-i18next';

import ArrowDownIcon from '@/shared/assets/icons/arrow-down-icon.svg';
import { cn } from '@/shared/lib/cn';
import { AnimatedGrid } from '@/shared/ui/animated-grid';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';

import {
  MULTIPLY_ITEM_KEYS,
  type MultiplyItemKey,
} from './model/multiply-items';
import styles from './multiply-section.module.css';

interface Props {
  footer: ReactNode;
}

export const MultiplySection = ({ footer }: Props) => {
  const { t } = useTranslation();
  const [activeItemKey, setActiveItemKey] =
    useState<MultiplyItemKey>('mediaBuyers');

  return (
    <section
      id='join-us'
      className={styles.section}
      aria-labelledby='multiply-title'
    >
      <AnimatedGrid />

      <div className={cn('container', styles.content_layer)}>
        <Text
          id='multiply-title'
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
          {t('multiply.title')}
        </Text>

        <div className={styles.section_content}>
          <div
            className={styles.tabs}
            role='group'
            aria-label={t('multiply.optionsLabel')}
          >
            {MULTIPLY_ITEM_KEYS.map(itemKey => (
              <Button
                className={styles.tab}
                key={itemKey}
                variant='secondary'
                active={itemKey === activeItemKey}
                onClick={() => setActiveItemKey(itemKey)}
              >
                {t(`multiply.items.${itemKey}.label`)}
              </Button>
            ))}
          </div>

          <div className={styles.info_card} aria-live='polite'>
            <div className={styles.info_content}>
              <Text
                tag='p'
                size='20'
                weight='bold'
                lineHeight='24'
                color='white'
                align='center'
              >
                {t(`multiply.items.${activeItemKey}.firstText`)}
              </Text>

              <ArrowDownIcon className={styles.arrow_icon} aria-hidden='true' />

              <Text
                tag='p'
                size='20'
                weight='bold'
                lineHeight='24'
                color='white'
                align='center'
              >
                {t(`multiply.items.${activeItemKey}.secondText`)}
              </Text>

              <ArrowDownIcon className={styles.arrow_icon} aria-hidden='true' />

              <Button className={styles.action} variant='primary'>
                {t(`multiply.items.${activeItemKey}.action`)}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {footer}
    </section>
  );
};
