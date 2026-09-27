import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import ArrowIcon from '@/shared/assets/icons/Arrow.svg';
import { cn } from '@/shared/lib/cn';

import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary';
type ButtonIconPosition = 'left' | 'right';

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  active?: boolean;
  withIcon?: boolean;
  iconPosition?: ButtonIconPosition;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonAsButton | ButtonAsLink;

export const Button = (props: Props) => {
  const {
    children,
    variant = 'primary',
    active = false,
    withIcon = false,
    iconPosition = 'right',
    className,
    href,
    ...otherProps
  } = props;

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const hasIcon = isSecondary || withIcon;

  const sharedClassName = cn(
    styles.button,
    styles[`button_${variant}`],
    active && styles.button_active,
    className,
  );

  const content = (
    <>
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
    </>
  );

  if (href) {
    const anchorProps = otherProps as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a
        href={href}
        className={cn(sharedClassName, anchorProps.className)}
        aria-pressed={isSecondary ? active : undefined}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const buttonProps = otherProps as ButtonHTMLAttributes<HTMLButtonElement>;
  const { type = 'button', disabled } = buttonProps;

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(sharedClassName, disabled && styles.button_disabled)}
      aria-pressed={isSecondary ? active : undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
};
