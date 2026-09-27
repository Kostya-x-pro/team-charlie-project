'use client';

import { Fragment, useState } from 'react';

import { useTranslation } from 'react-i18next';

import LinkedinIcon from '@/shared/assets/icons/in_icon.svg';
import InstagramIcon from '@/shared/assets/icons/instagram_icon.svg';
import LogoIcon from '@/shared/assets/icons/logo_small_icon.svg';
import TelegramIcon from '@/shared/assets/icons/tg_icon.svg';
import { cn } from '@/shared/lib/cn';
import { useChangeLocale } from '@/shared/lib/i18n/use-change-locale';
import { AnimatedGrid } from '@/shared/ui/animated-grid';
import { Text } from '@/shared/ui/text';

import { HEADER_NAV_ITEMS } from '../model/nav-items';
import styles from './header.module.css';

interface Props {
  className?: string;
  compactMobileLogo?: boolean;
  homeHref?: string;
  isMenuOpen?: boolean;
  mobileMenuOnly?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
  sectionPrefix?: string;
}

const MENU_SOCIALS = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Telegram', Icon: TelegramIcon },
  { label: 'LinkedIn', Icon: LinkedinIcon },
] as const;

export const Header = ({
  className,
  compactMobileLogo = false,
  homeHref = '#home',
  isMenuOpen: controlledMenuOpen,
  mobileMenuOnly = false,
  onMenuOpenChange,
  sectionPrefix = '',
}: Props) => {
  const { t, i18n } = useTranslation();
  const changeLocale = useChangeLocale();
  const currentLocale = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isMenuOpen = controlledMenuOpen ?? internalMenuOpen;
  const setMenuOpen = (nextIsOpen: boolean) => {
    if (controlledMenuOpen === undefined) {
      setInternalMenuOpen(nextIsOpen);
    }

    onMenuOpenChange?.(nextIsOpen);
  };

  return (
    <header
      className={cn(
        styles.header,
        mobileMenuOnly && styles.mobile_menu_only,
        compactMobileLogo && styles.compact_mobile_logo,
        className,
      )}
    >
      <a
        className={styles.logo_button}
        href={homeHref}
        aria-label={t('header.homeLabel')}
      >
        <LogoIcon className={styles.logo_icon} aria-hidden='true' />
      </a>

      <nav className={styles.nav} aria-label={t('header.navigationLabel')}>
        {HEADER_NAV_ITEMS.map(({ href, translationKey }) => (
          <Text
            className={styles.nav_link}
            tag='a'
            href={`${sectionPrefix}${href}`}
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

      <button
        className={styles.menu_button}
        type='button'
        aria-expanded={isMenuOpen}
        aria-controls={isMenuOpen ? 'mobile-navigation' : undefined}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        {t(isMenuOpen ? 'header.closeMenuLabel' : 'header.menuLabel')}
      </button>

      {isMenuOpen && (
        <section
          className={styles.mobile_menu}
          id='mobile-navigation'
          aria-label={t('header.navigationLabel')}
          onKeyDown={event => {
            if (event.key === 'Escape') setMenuOpen(false);
          }}
        >
          <AnimatedGrid />
          <div className={styles.mobile_menu_header}>
            <a
              className={styles.mobile_menu_logo}
              href={`${sectionPrefix}#home`}
              aria-label={t('header.homeLabel')}
              onClick={() => setMenuOpen(false)}
            >
              <LogoIcon aria-hidden='true' />
            </a>
            <button
              className={styles.mobile_menu_close}
              type='button'
              aria-label={t('header.closeMenuLabel')}
              onClick={() => setMenuOpen(false)}
            >
              X
            </button>
          </div>
          <div className={styles.mobile_menu_main}>
            <nav
              className={styles.mobile_nav}
              aria-label={t('header.navigationLabel')}
            >
              <Text
                className={styles.mobile_nav_link}
                tag='a'
                href={`${sectionPrefix}#home`}
                size='30'
                weight='bold'
                color='yellow'
                transform='uppercase'
                underline
                onClick={() => setMenuOpen(false)}
              >
                {t('header.homeLabel')}
              </Text>
              {HEADER_NAV_ITEMS.map(({ href, translationKey }) => (
                <Text
                  className={styles.mobile_nav_link}
                  tag='a'
                  href={`${sectionPrefix}${href}`}
                  size='30'
                  weight='bold'
                  color='yellow'
                  transform='uppercase'
                  underline
                  key={href}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(translationKey)}
                </Text>
              ))}
            </nav>
            <div className={styles.mobile_menu_footer}>
              <div className={styles.mobile_socials}>
                {MENU_SOCIALS.map(({ label, Icon }) => (
                  <a
                    className={styles.mobile_social_link}
                    href='#'
                    aria-label={label}
                    key={label}
                  >
                    <Icon aria-hidden='true' />
                  </a>
                ))}
              </div>
              <div className={styles.mobile_language_switcher}>
                <button
                  className={cn(
                    styles.mobile_language_button,
                    currentLocale === 'en' && styles.mobile_language_active,
                  )}
                  type='button'
                  aria-pressed={currentLocale === 'en'}
                  aria-label={t('header.language.switchLabel')}
                  onClick={() => {
                    setMenuOpen(false);
                    changeLocale('en');
                  }}
                >
                  ENG
                </button>
                <span className={styles.mobile_language_separator}>/</span>
                <button
                  className={cn(
                    styles.mobile_language_button,
                    currentLocale === 'ru' && styles.mobile_language_active,
                  )}
                  type='button'
                  aria-pressed={currentLocale === 'ru'}
                  aria-label={t('header.language.switchLabel')}
                  onClick={() => {
                    setMenuOpen(false);
                    changeLocale('ru');
                  }}
                >
                  РУС
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </header>
  );
};
