import Image from 'next/image';

import { Header } from '@/widgets/header';

import snakeImage from '@/shared/assets/images/hero_page_snake.png';

import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.page_content}>
        <Header />

        <div className={styles.snake_wrapper} aria-hidden='true'>
          <Image
            className={styles.snake_image}
            src={snakeImage}
            alt='background snake'
            priority
          />
        </div>
      </div>
    </main>
  );
};
