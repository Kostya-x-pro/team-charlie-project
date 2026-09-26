'use client';

import { useTranslation } from 'react-i18next';

import ArrowUp from '@/shared/assets/icons/arrow-up-icon.svg';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

import styles from './footer.module.css';
import { FOOTER_LINKS } from './model/footer-links';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.footer_container)}>
        <nav aria-label={t('footer.socialsLabel')}>
          <ul className={styles.footer_items}>
            {FOOTER_LINKS.map(({ translationKey, href }) => (
              <li key={translationKey}>
                <Text
                  className={styles.footer_link}
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
                  {t(translationKey)}
                </Text>
              </li>
            ))}
          </ul>
        </nav>

        <Text
          className={styles.footer_scroll_top}
          tag='a'
          href='#home'
          size='20'
          weight='bold'
          lineHeight='normal'
          color='yellow'
          transform='uppercase'
          underline
          noWrap
        >
          {t('footer.scrollTop')}
          <ArrowUp className={styles.footer_arrow} aria-hidden='true' />
        </Text>
      </div>
    </footer>
  );
};
