import Image from 'next/image';

import SnakeIcon from '@/shared/assets/icons/logo_small_icon.svg';
import snakeImage from '@/shared/assets/images/hero_page_snake.png';

import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      {/* for icons */}
      <SnakeIcon className={styles.arrowIcon} aria-hidden='true' />
      {/* for images */}
      <Image src={snakeImage} alt='Snake' width={200} height={200} />
      <h1>Team Charlie Project</h1>
    </main>
  );
};
