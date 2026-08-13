'use client';

import Image from 'next/image';

import { useTranslation } from 'react-i18next';

import snakeImage from '@/shared/assets/images/multibenefits_page_snake.png';
import { Text } from '@/shared/ui/text';

import { BENEFIT_ITEM_KEYS } from '../../model/benefits-items';
import { Marquee } from '../marquee/marquee';
import styles from './benefits-section.module.css';

export const BenefitsSection = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.section} id='benefits'>
      <div className='container'>
        <Text
          className={styles.section_subtitle}
          tag='div'
          size='30'
          weight='bold'
          lineHeight='normal'
          color='yellow'
          align='right'
          transform='uppercase'
          letterSpacing='display-accent'
          noWrap
        >
          {t('benefits.title')}
        </Text>

        <div className={styles.section_main}>
          <div className={styles.section_content}>
            <Text
              className={styles.section_title}
              tag='h2'
              size='40'
              weight='bold'
              lineHeight='40'
              color='white'
              letterSpacing='display'
              family='halvar'
            >
              {t('benefits.heading.beforeAccent')}{' '}
              <Text
                tag='span'
                size='40'
                weight='bold'
                lineHeight='40'
                color='yellow'
                letterSpacing='display-accent'
                noWrap
              >
                {t('benefits.heading.accent')}
              </Text>{' '}
              {t('benefits.heading.afterAccent')}
            </Text>
            <Text
              className={styles.section_description}
              tag='p'
              family='halvar'
              size='16'
              weight='regular'
              lineHeight='24'
              color='white'
            >
              {t('benefits.description')}
            </Text>
          </div>

          <div className={styles.section_list_wrapper}>
            <div className={styles.section_image}>
              <Image src={snakeImage} alt='' fill preload />
            </div>
            <ul className={styles.section_list}>
              {BENEFIT_ITEM_KEYS.map(itemKey => (
                <li className={styles.section_item} key={itemKey}>
                  <Text
                    tag='p'
                    family='halvar'
                    size='20'
                    weight='regular'
                    lineHeight='24'
                    color='white'
                  >
                    {t(`benefits.items.${itemKey}`)}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
};
