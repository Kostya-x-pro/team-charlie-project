import LogoIcon from '@/shared/assets/icons/logo_small_icon.svg';
import { Text } from '@/shared/ui/text';

import { HEADER_NAV_ITEMS } from '../model/nav-items';
import styles from './header.module.css';

// Todo - временно используется обычный `button` в переспективе это нужно делать через shared/button
export const Header = () => {
  return (
    <header className={styles.header}>
      <button className={styles.logo_button} type='button' aria-label='Home'>
        <LogoIcon className={styles.logo_icon} aria-hidden='true' />
      </button>

      <nav className={styles.nav} aria-label='Main navigation'>
        {HEADER_NAV_ITEMS.map(item => (
          <button className={styles.nav_button} type='button' key={item.label}>
            <Text
              tag='span'
              size='20'
              weight='bold'
              lineHeight='normal'
              color='yellow'
              transform='uppercase'
              underline
              noWrap
            >
              {item.label}
            </Text>
          </button>
        ))}

        <button
          className={styles.language_button}
          type='button'
          aria-label='Switch language'
        >
          <Text
            tag='span'
            size='20'
            weight='bold'
            lineHeight='normal'
            color='yellow'
            transform='uppercase'
            noWrap
          >
            <Text
              tag='span'
              size='20'
              weight='bold'
              lineHeight='normal'
              color='white'
              transform='uppercase'
            >
              Eng
            </Text>
            /
            <Text
              tag='span'
              size='20'
              weight='bold'
              lineHeight='normal'
              color='yellow'
              transform='uppercase'
              underline
            >
              Рус
            </Text>
          </Text>
        </button>
      </nav>
    </header>
  );
};
