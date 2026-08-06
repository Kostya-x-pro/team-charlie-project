import { Header } from '@/widgets/header/ui';
import { HeroSection } from '@/widgets/hero-section/ui';

import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.first_section} aria-label='Hero section'>
        <div className={styles.first_section_content}>
          <Header />
          <HeroSection />
        </div>
      </section>
    </main>
  );
};
