import { ReactNode } from "react";

import styles from "./tab.module.css";

import TabArrow from '@/shared/assets/icons/Tab_arrow.svg'

interface TabProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const Tab = ({
  children,
  active = false,
  onClick,
}: TabProps) => {
  return (
    <button
      type="button"
      className={`${styles.tab} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>
      <TabArrow className={styles.arrow}/> 
    </button>
  );
}
