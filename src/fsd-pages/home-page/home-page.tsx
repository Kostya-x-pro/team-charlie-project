import { BenefitsSection } from '@/widgets/benefits-section/benefits-section';

import styles from './home-page.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <BenefitsSection />
    </main>
  );
};
