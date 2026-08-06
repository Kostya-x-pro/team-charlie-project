import {
  createElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './text.module.css';

type TextTag =
  | 'a'
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'strong'
  | 'small';

type TextFamily = 'halvar' | 'stolzl';
type TextSize = '16' | '20' | '40' | '60';
type TextWeight = 'light' | 'regular' | 'bold';
type TextLineHeight = 'normal' | '24' | '54';
type TextColor = 'white' | 'yellow' | 'dark' | 'purple' | 'inherit';
type TextAlign = 'left' | 'center' | 'right';
type TextTransform = 'none' | 'uppercase';
type TextLetterSpacing = 'normal' | 'display' | 'display-accent' | 'button';

interface BaseProps<T extends TextTag> {
  tag?: T;
  children: ReactNode;
  className?: string;
  family?: TextFamily;
  size?: TextSize;
  weight?: TextWeight;
  lineHeight?: TextLineHeight;
  color?: TextColor;
  align?: TextAlign;
  transform?: TextTransform;
  letterSpacing?: TextLetterSpacing;
  underline?: boolean;
  opacity?: '70' | '100';
  noWrap?: boolean;
}

type Props<T extends TextTag = 'div'> = BaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BaseProps<T>>;

export const Text = <T extends TextTag = 'div'>(props: Props<T>) => {
  const {
    tag = 'div',
    children,
    className,
    family = 'halvar',
    size = '16',
    weight = 'regular',
    lineHeight = '24',
    color = 'inherit',
    align = 'left',
    transform = 'none',
    letterSpacing = 'normal',
    underline = false,
    opacity = '100',
    noWrap = false,
    ...otherProps
  } = props;

  return createElement(
    tag,
    {
      ...otherProps,
      className: cn(
        styles.text,
        styles[`family_${family}`],
        styles[`size_${size}`],
        styles[`weight_${weight}`],
        styles[`line_height_${lineHeight}`],
        styles[`color_${color}`],
        styles[`align_${align}`],
        styles[`transform_${transform}`],
        styles[`letter_spacing_${letterSpacing}`],
        styles[`opacity_${opacity}`],
        underline && styles.underline,
        noWrap && styles.no_wrap,
        className,
      ),
    },
    children,
  );
};
