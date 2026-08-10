import Image from 'next/image';

import snakeImage from '@/shared/assets/images/multibenefits_page_snake.png';
import { Text } from '@/shared/ui/text';

import { BENEFIT_ITEMS } from '../../model/benefits_items';
import { Marquee } from '../marquee/marquee';
import styles from './benefits-section.module.css';

export const BenefitsSection = () => {
  return (
    <section className={styles.section} id='benefits'>
      <div className={styles.section_container}>
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
          MULTI-BENEFITS
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
              Results can only be
              <Text
                tag='span'
                size='40'
                weight='bold'
                lineHeight='40'
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
              size='16'
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
              {BENEFIT_ITEMS.map(item => (
                <li className={styles.section_item} key={item}>
                  <Text
                    tag='p'
                    family='halvar'
                    size='20'
                    weight='regular'
                    lineHeight='24'
                    color='white'
                  >
                    {item}
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
