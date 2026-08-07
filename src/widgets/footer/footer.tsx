import Image from 'next/image';

import ArrowUp from '@/shared/assets/icons/Arrow_up_icon.svg';
import snakeImg from '@/shared/assets/images/multiplay_page_snake.png';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

import styles from './footer.module.css';
import { SOCIAL_LINKS } from './model/social';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.footer_container)}>
        <div className={styles.footer_content}>
          <ul className={styles.footer_items}>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label} className={styles.footer_item}>
                <Text
                  className={styles.footer_item_link}
                  tag='a'
                  href={href}
                  size='20'
                  weight='bold'
                  lineHeight='normal'
                  color='yellow'
                  transform='uppercase'
                  underline
                  noWrap
                >
                  {label}
                </Text>
              </li>
            ))}
          </ul>
          <Text
            className={styles.footer_scroll_top}
            tag='a'
            href={'#'}
            size='20'
            weight='bold'
            lineHeight='normal'
            color='yellow'
            transform='uppercase'
            underline
            noWrap
            key={''}
          >
            Scroll to Top
            <ArrowUp />
          </Text>
        </div>
        <Image className={styles.image} src={snakeImg} alt='snake decor' />
      </div>
    </footer>
  );
};
