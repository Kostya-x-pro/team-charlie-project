import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/shared/assets/icons/logo_small_icon.svg';
import snakeImg from '@/shared/assets/images/not-found-snake.png';
import { Button } from '@/shared/ui/button';

import styles from './not-found-page.module.css';

export const NotFoundPage = () => {
  return (
    <>
      <header className={styles.header}>
        <div className='container'>
          <Link href='/'>
            <Logo className={styles.logo} />
          </Link>
        </div>
      </header>
      <section className={styles.section}>
        <div className='container'>
          <div className={styles.content}>
            <div className={styles.text}>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </div>
            <Button href='/' variant='primary'>
              Oops, take me back
            </Button>
          </div>
        </div>
        <Image className={styles.image} src={snakeImg} alt='snake' />
      </section>
    </>
  );
};
