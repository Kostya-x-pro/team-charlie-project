type FooterLinkKey = 'instagram' | 'telegram' | 'linkedin';

interface FooterLink {
  translationKey: `footer.links.${FooterLinkKey}`;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { translationKey: 'footer.links.instagram', href: '#' },
  { translationKey: 'footer.links.telegram', href: '#' },
  { translationKey: 'footer.links.linkedin', href: '#' },
];
