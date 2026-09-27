'use client';

import { useState } from 'react';

import { BenefitsSection } from '@/widgets/benefits-section';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header/ui';
import { HeroSection } from '@/widgets/hero-section/ui';
import { MultiplySection } from '@/widgets/multiply-section';
import { MultitaskSection } from '@/widgets/multitask-section';

import styles from './home-page.module.css';

export const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className={styles.page}>
      {isMobileMenuOpen ? (
        <Header
          className={styles.menu_header}
          isMenuOpen
          mobileMenuOnly
          onMenuOpenChange={setIsMobileMenuOpen}
        />
      ) : (
        <>
          <HeroSection
            header={
              <Header
                isMenuOpen={false}
                onMenuOpenChange={setIsMobileMenuOpen}
              />
            }
          />
          <MultitaskSection />
          <BenefitsSection />
          <MultiplySection footer={<Footer />} />
        </>
      )}
    </main>
  );
};
