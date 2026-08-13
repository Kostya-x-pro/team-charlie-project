import LinkedinIcon from '@/shared/assets/icons/in_icon.svg';
import InstagramIcon from '@/shared/assets/icons/instagram_icon.svg';
import TelegramIcon from '@/shared/assets/icons/tg_icon.svg';

interface SocialItem {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const SOCIAL_ITEMS: SocialItem[] = [
  {
    label: 'Instagram',
    Icon: InstagramIcon,
  },
  {
    label: 'Telegram',
    Icon: TelegramIcon,
  },
  {
    label: 'LinkedIn',
    Icon: LinkedinIcon,
  },
];
