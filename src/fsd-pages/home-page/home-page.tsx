'use client';

import Image from 'next/image';

import { useTranslation } from 'react-i18next';

import SnakeIcon from '@/shared/assets/icons/logo_small_icon.svg';
import snakeImage from '@/shared/assets/images/hero_page_snake.png';
import { Text } from '@/shared/ui/text';

import styles from './home-page.module.css';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      {/* for icons */}
      <SnakeIcon className={styles.arrowIcon} aria-hidden='true' />
      {/* for images */}
      <Image
        src={snakeImage}
        alt='Snake'
        loading='eager'
        width={200}
        height={200}
      />
      <h1>Team Charlie Project</h1>

      <h1>{t('title')}</h1>

      {/* for text */}
      <Text tag='h1' size='20' weight='bold' lineHeight='24' color='white'>
        We run an{' '}
        <Text tag='span' size='20' weight='bold' color='yellow'>
          in-house team
        </Text>{' '}
        of media buyers, designers, creatives, developers, and copywriters — no
        middlemen, no outsourcing
      </Text>

      <Text family='stolzl' size='20' color='white' opacity='70'>
        Custom tools, fast integrations and scalable architecture
      </Text>

      <Text
        tag='span'
        family='halvar'
        size='20'
        weight='bold'
        color='yellow'
        transform='uppercase'
        underline
        noWrap
      >
        Team
      </Text>
    </main>
  );
};
