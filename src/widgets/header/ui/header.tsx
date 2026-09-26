'use client';

import { Fragment } from 'react';

import { useTranslation } from 'react-i18next';

import LogoIcon from '@/shared/assets/icons/logo_small_icon.svg';
import { useChangeLocale } from '@/shared/lib/i18n/use-change-locale';
import { Text } from '@/shared/ui/text';

import { HEADER_NAV_ITEMS } from '../model/nav-items';
import styles from './header.module.css';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const changeLocale = useChangeLocale();
  const currentLocale = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';

  return (
    <header className={styles.header}>
      <a
        className={styles.logo_button}
        href='#home'
        aria-label={t('header.homeLabel')}
      >
        <LogoIcon className={styles.logo_icon} aria-hidden='true' />
      </a>

      <nav className={styles.nav} aria-label={t('header.navigationLabel')}>
        {HEADER_NAV_ITEMS.map(({ href, translationKey }) => (
          <Text
            className={styles.nav_link}
            tag='a'
            href={href}
            color='yellow'
            size='20'
            weight='bold'
            lineHeight='normal'
            transform='uppercase'
            underline
            noWrap
            key={href}
          >
            {t(translationKey)}
          </Text>
        ))}

        <div
          className={styles.language_switcher}
          aria-label={t('header.language.switchLabel')}
        >
          {(['en', 'ru'] as const).map((locale, index) => (
            <Fragment key={locale}>
              {index > 0 && (
                <span className={styles.language_separator}>/</span>
              )}

              <button
                className={styles.language_button}
                type='button'
                aria-pressed={currentLocale === locale}
                onClick={() => changeLocale(locale)}
              >
                <Text
                  tag='span'
                  size='20'
                  weight='bold'
                  color={currentLocale === locale ? 'white' : 'yellow'}
                  transform='uppercase'
                  underline={currentLocale !== locale}
                  noWrap
                >
                  {t(`header.language.${locale}`)}
                </Text>
              </button>
            </Fragment>
          ))}
        </div>
      </nav>
    </header>
  );
};
