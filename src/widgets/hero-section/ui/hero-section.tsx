import Image from 'next/image';

import snakeImage from '@/shared/assets/images/hero_page_snake.png';
import { Text } from '@/shared/ui/text';

import { SOCIAL_ITEMS } from '../model/social-items';
import styles from './hero-section.module.css';

export const HeroSection = () => {
  return (
    <section className={styles.hero} aria-labelledby='home-hero-title'>
      <div className={styles.hero_content}>
        <div className={styles.hero_text}>
          <Text
            className={styles.hero_title}
            tag='h1'
            size='60'
            weight='bold'
            lineHeight='54'
            color='white'
            transform='uppercase'
            letterSpacing='display'
          >
            Practice
            <br />
            Makes{' '}
            <Text
              tag='span'
              size='60'
              weight='bold'
              lineHeight='54'
              color='yellow'
              transform='uppercase'
              letterSpacing='display-accent'
              noWrap
            >
              Profit
            </Text>
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
            We provide effective solutions, tested and refined
            <br />
            on our own products and ad budgets
          </Text>
        </div>

        <button className={styles.hero_button} type='button'>
          <Text
            tag='span'
            size='20'
            weight='bold'
            lineHeight='normal'
            color='dark'
            transform='uppercase'
            letterSpacing='button'
            noWrap
          >
            Get in Touch
          </Text>
        </button>
      </div>

      <div className={styles.snake_wrapper} aria-hidden='true'>
        <Image
          className={styles.snake_image}
          src={snakeImage}
          alt='background snake'
          fill
          preload
          sizes='(max-width: 767px) 115vw, (max-width: 1023px) 82vw, 60vw'
        />
      </div>

      <div className={styles.socials} aria-label='Social links'>
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
    </section>
  );
};
