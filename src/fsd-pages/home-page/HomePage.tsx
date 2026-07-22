import { Header } from '@/widgets/header/ui';
import { HeroSection } from '@/widgets/hero-section/ui';

import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.page_content}>
        <Header />
        <HeroSection />
      </div>
    </main>
  );
};
