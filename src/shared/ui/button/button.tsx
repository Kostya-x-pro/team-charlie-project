import type { ButtonHTMLAttributes, ReactNode } from 'react';

import ArrowIcon from '@/shared/assets/icons/Arrow.svg';
import { cn } from '@/shared/lib/cn';

import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary';
type ButtonIconPosition = 'left' | 'right';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  active?: boolean;
  withIcon?: boolean;
  iconPosition?: ButtonIconPosition;
}

export const Button = (props: Props) => {
  const {
    children,
    variant = 'primary',
    active = false,
    withIcon = false,
    iconPosition = 'right',
    className,
    type = 'button',
    disabled,
    ...otherProps
  } = props;
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const hasIcon = isSecondary || withIcon;

  return (
    <button
      className={cn(
        styles.button,
        styles[`button_${variant}`],
        active && styles.button_active,
        disabled && styles.button_disabled,
        className,
      )}
      type={type}
      disabled={disabled}
      aria-pressed={isSecondary ? active : undefined}
      {...otherProps}
    >
      {isPrimary && (
        <>
          <span className={styles.button_top} aria-hidden='true' />
          <span className={styles.button_side} aria-hidden='true' />
        </>
      )}

      <span className={styles.button_content}>
        {hasIcon && iconPosition === 'left' && (
          <ArrowIcon
            className={cn(styles.button_icon, styles.button_icon_left)}
            aria-hidden='true'
          />
        )}

        <span className={styles.button_label}>{children}</span>

        {hasIcon && iconPosition === 'right' && (
          <ArrowIcon className={styles.button_icon} aria-hidden='true' />
        )}
      </span>
    </button>
  );
};
