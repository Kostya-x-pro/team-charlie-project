import Image from 'next/image';

import multitaskSnakeImage from '@/shared/assets/images/multitask_page_snake.png';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

import { MULTI_TASK_CARDS } from './model/multitask-card';
import styles from './multitask-section.module.css';

export const MultitaskSection = () => {
  return (
    <section
      id='team'
      className={styles.section}
      aria-labelledby='multitask-title'
    >
      <Text
        id='multitask-title'
        className={styles.section_title}
        tag='h2'
        size='20'
        weight='bold'
        lineHeight='normal'
        color='yellow'
        align='right'
        transform='uppercase'
        letterSpacing='display-accent'
        noWrap
      >
        Multi-tasks
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
            We run an{' '}
            <Text
              tag='span'
              size='20'
              weight='bold'
              lineHeight='24'
              color='yellow'
            >
              in-house team
            </Text>{' '}
            of media buyers, designers, creatives, developers, and copywriters —
            no middlemen, no outsourcing
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
              key={`${card.title}-${card.className}`}
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
                {card.title}
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
                {card.description}
              </Text>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
