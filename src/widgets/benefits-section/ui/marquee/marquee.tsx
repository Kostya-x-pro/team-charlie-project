'use client';

import { useTranslation } from 'react-i18next';

import TextDiver from '@/shared/assets/icons/text-diver-icon.svg';
import { Text } from '@/shared/ui/text';

import styles from './marquee.module.css';

const MARQUEE_GROUP_INDEXES = [0, 1] as const;
const MARQUEE_ITEM_INDEXES = [0, 1, 2, 3] as const;

export const Marquee = () => {
  const { t } = useTranslation();
  const marqueeText = t('marquee');
  return (
    <div className={styles.marquee}>
      <span className={styles.visually_hidden}>{marqueeText}</span>

      <div className={styles.marquee_track} aria-hidden='true'>
        {MARQUEE_GROUP_INDEXES.map(groupIndex => (
          <div className={styles.marquee_content} key={groupIndex}>
            {MARQUEE_ITEM_INDEXES.map(itemIndex => (
              <span className={styles.marquee_item} key={itemIndex}>
                <Text
                  className={styles.marquee_text}
                  tag='span'
                  family='halvar'
                  size='50'
                  weight='light'
                  lineHeight='normal'
                  letterSpacing='display-accent'
                  transform='uppercase'
                  color='yellow'
                >
                  {marqueeText}
                </Text>

                <TextDiver className={styles.marquee_icon} aria-hidden='true' />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
