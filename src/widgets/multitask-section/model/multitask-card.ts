type TranslationKey = 'flexible' | 'creatives' | 'copywriting' | 'mediaBuying';

interface MultiTaskCard {
  translationKey: TranslationKey;
  className: string;
}

export const MULTI_TASK_CARDS: MultiTaskCard[] = [
  { translationKey: 'flexible', className: 'card_flexible' },
  { translationKey: 'creatives', className: 'card_creatives' },
  { translationKey: 'copywriting', className: 'card_copywriting_top' },
  { translationKey: 'mediaBuying', className: 'card_media_buying' },
  { translationKey: 'copywriting', className: 'card_copywriting_bottom' },
];
