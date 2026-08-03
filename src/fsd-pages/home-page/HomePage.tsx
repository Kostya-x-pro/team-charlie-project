import { BenefitsSection } from '@/shared/widgets/benefits-section/ui/BenefitsSection';

import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <BenefitsSection />
    </main>
  );
};
