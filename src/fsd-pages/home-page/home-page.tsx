import { BenefitsSection } from '@/widgets/benefits-section';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header/ui';
import { HeroSection } from '@/widgets/hero-section/ui';
import { MultiplySection } from '@/widgets/multiply-section';
import { MultitaskSection } from '@/widgets/multitask-section';

import styles from './home-page.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <HeroSection header={<Header />} />
      <MultitaskSection />
      <BenefitsSection />
      <MultiplySection footer={<Footer />} />
    </main>
  );
};
