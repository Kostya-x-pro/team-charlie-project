import TextDiver from '@/shared/assets/icons/text-diver-icon.svg';
import { Text } from '@/shared/ui/text';

import styles from './marquee.module.css';

const MARQUEE_TEXT = 'DREAM BIG EARN BIGGER!';

export const Marquee = () => {
  return (
    <div className={styles.marquee}>
      <div className={styles.marquee_track}>
        <div className={styles.marquee_content} aria-hidden={false}>
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className={styles.marquee_item}>
              <Text
                tag='span'
                family='halvar'
                size='70'
                weight='light'
                lineHeight='normal'
                letterSpacing='display-accent'
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
  );
};
