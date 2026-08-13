import { BenefitsSection } from '@/widgets/benefits-section';
import { Header } from '@/widgets/header/ui';
import { HeroSection } from '@/widgets/hero-section/ui';

import styles from './home-page.module.css';
import { MultitaskSection } from '@/widgets/multitask-section';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <HeroSection header={<Header />} />
      <MultitaskSection />
      <BenefitsSection />
    </main>
  );
};
