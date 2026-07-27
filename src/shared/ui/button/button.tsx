import { ReactNode } from "react";

import styles from "./button.module.css";

interface GetInTouchButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({
  children,
  onClick,
}: GetInTouchButtonProps) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.top} aria-hidden="true" />
      <span className={styles.side} aria-hidden="true" />
      <span className={styles.front}>{children}</span>
    </button>
  );
}
