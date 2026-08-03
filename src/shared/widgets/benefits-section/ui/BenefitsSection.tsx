import Image from 'next/image';

import TextDiver from '@/shared/assets/icons/text-diver-icon.svg';
import snakeImage from '@/shared/assets/images/multibenefits_page_snake.png';
import { Text } from '@/shared/ui/text';

import styles from './BenefitsSection.module.css';

const MARQUEE_TEXT = 'DREAM BIG EARN BIGGER!';

export const BenefitsSection = () => {
  return (
    <section className={styles.section}>
      <div className='container'>
        <Text
          className={styles.section_subtitle}
          tag='div'
          size='40'
          weight='bold'
          lineHeight='normal'
          color='yellow'
          align='right'
          transform='uppercase'
          letterSpacing='display-accent'
          noWrap
        >
          MULTI-BENEFITS
        </Text>

        <div className={styles.section_main}>
          <div className={styles.section_content}>
            <Text
              className={styles.section_title}
              tag='h2'
              size='50'
              weight='bold'
              lineHeight='54'
              color='white'
              letterSpacing='display'
              family='halvar'
            >
              Results can only be
              <Text
                tag='span'
                size='60'
                weight='bold'
                lineHeight='54'
                color='yellow'
                letterSpacing='display-accent'
                noWrap
              >
                {' '}
                guaranteed{' '}
              </Text>
              when you control every step
            </Text>
            <Text
              className={styles.section_description}
              tag='p'
              family='halvar'
              size='20'
              weight='regular'
              lineHeight='24'
              color='white'
            >
              That’s why we built a full-time in-house team and custom
              infrastructure – tailored for every task, tested daily in the
              sweepstakes vertical
            </Text>
          </div>

          <div className={styles.section_list_wrapper}>
            <div className={styles.section_image}>
              <Image src={snakeImage} alt='Snake Image' fill preload />
            </div>
            <ul className={styles.section_list}>
              <li className={styles.section_item}>
                <Text
                  tag='p'
                  family='halvar'
                  size='20'
                  weight='regular'
                  lineHeight='24'
                  color='white'
                >
                  We take on outsourced projects across any niche — from iGaming
                  and dating to e-commerce and recruitment
                </Text>
              </li>
              <li className={styles.section_item}>
                <Text
                  tag='p'
                  family='halvar'
                  size='20'
                  weight='regular'
                  lineHeight='24'
                  color='white'
                >
                  We deliver what has already proven effective — many times over
                </Text>
              </li>
              <li className={styles.section_item}>
                <Text
                  tag='p'
                  family='halvar'
                  size='20'
                  weight='regular'
                  lineHeight='24'
                  color='white'
                >
                  We don’t learn at the client’s expense
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.marquee}>
        <div className={styles.marquee_track}>
          <div className={styles.marquee_content} aria-hidden={false}>
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index} className={styles.marquee_item}>
                <Text
                  tag='span'
                  family='halvar'
                  size='70'
                  weight='bold'
                  transform='uppercase'
                  color='yellow'
                  className={styles.marquee_text}
                >
                  {MARQUEE_TEXT}
                </Text>
                <TextDiver className={styles.marquee_icon} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
