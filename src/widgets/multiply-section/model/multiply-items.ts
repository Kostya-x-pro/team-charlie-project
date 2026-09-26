export const MULTIPLY_ITEM_KEYS = [
  'mediaBuyers',
  'businesses',
  'partners',
] as const;

export type MultiplyItemKey = (typeof MULTIPLY_ITEM_KEYS)[number];
