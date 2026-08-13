type SectionHref = '#team' | '#benefits' | '#join-us';
type TranslationKey =
  | 'header.navigation.team'
  | 'header.navigation.benefits'
  | 'header.navigation.joinUs';

interface NavItem {
  translationKey: TranslationKey;
  href: SectionHref;
}

export const HEADER_NAV_ITEMS: NavItem[] = [
  { translationKey: 'header.navigation.team', href: '#team' },
  { translationKey: 'header.navigation.benefits', href: '#benefits' },
  { translationKey: 'header.navigation.joinUs', href: '#join-us' },
];
