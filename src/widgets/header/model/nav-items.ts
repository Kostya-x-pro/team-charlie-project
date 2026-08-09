type SectionHref = '#team' | '#benefits' | '#join-us';

interface NavItem {
  label: string;
  href: SectionHref;
}

export const HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'Team', href: '#team' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Join Us', href: '#join-us' },
];
