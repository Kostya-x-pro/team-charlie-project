'use client';

import { useState } from 'react';

import { Footer } from '@/widgets/footer';

import ArrowDownIcon from '@/shared/assets/icons/Arrow_down_icon.svg';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';

import { MULTIPLY_ITEMS } from './model/multiply-item';
import styles from './multiply-section.module.css';

export const MultiplySection = () => {
  const [activeTabId, setActiveTabId] = useState<number>(0);

  const activeTab = MULTIPLY_ITEMS[activeTabId];

  return (
    <div className={styles.section_wrapper}>
      <section className={styles.section}>
        <div className='container'>
          <Text
            className={styles.subtitle}
            tag='div'
            size='40'
            weight='bold'
            lineHeight='normal'
            color='yellow'
            align='right'
            transform='uppercase'
            letterSpacing='display-accent'
            noWrap
          >
            MULTIPLY WITH US
          </Text>
          <div className={styles.wrapper}>
            <div className={styles.tabs}>
              {MULTIPLY_ITEMS.map(item => (
                <Button
                  key={item.id}
                  variant='secondary'
                  active={item.id === activeTabId}
                  onClick={() => setActiveTabId(item.id)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <div className={styles.items}>
              {activeTab && (
                <div className={styles.item}>
                  <Text
                    tag='p'
                    family='halvar'
                    size='20'
                    weight='regular'
                    lineHeight='24'
                    color='white'
                    align='center'
                  >
                    {activeTab.firstText}
                  </Text>
                  <ArrowDownIcon className={styles.arrow_icon} />
                  <Text
                    tag='p'
                    family='halvar'
                    size='20'
                    weight='regular'
                    lineHeight='24'
                    color='white'
                    align='center'
                  >
                    {activeTab.secondText}
                  </Text>
                  <ArrowDownIcon className={styles.arrow_icon} />
                  <Button variant='primary'>{activeTab.buttonText}</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
