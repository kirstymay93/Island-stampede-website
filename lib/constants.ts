import type {
  CallToAction,
  DetailItem,
  NavItem,
  SocialLink,
  StatItem,
} from '@/lib/types';

export const brandColors = {
  black: '#000000',
  blue: '#0066FF',
  white: '#FFFFFF',
  silver: '#C0C0C0',
} as const;

export const siteConfig = {
  name: 'Island Stampede',
  shortName: 'Island Stampede',
  description: "Tasmania's Premier Indoor Professional Bull Riding Event.",
  eventDate: '2–3 October 2026',
  venue: 'Launceston Silverdome',
  socialHandle: '@islandstampede',
  footerTitle: 'Island Stampede © 2026',
} as const;

export const navigationItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Event Info', href: '#event-information' },
  { label: 'Why Attend', href: '#why-attend' },
  { label: 'Previous Event', href: '#previous-event' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Social', href: '#social' },
];

export const eventHighlights: DetailItem[] = [
  { label: 'Dates', value: '2–3 October 2026' },
  { label: 'Venue', value: 'Launceston Silverdome' },
  { label: 'Prize Money', value: '$30,000' },
  { label: 'Competition', value: 'Professional Bull Riding' },
];

export const whyAttendItems = [
  "Australia's toughest bucking bulls",
  'International riders',
  '$30,000 prize money',
  'Live music',
  'Family friendly',
  'Food & licensed bars',
  'VIP hospitality',
  'Merchandise',
  'Charity support',
] as const;

export const previousEventStats: StatItem[] = [
  { label: 'Attendees', value: '6,000+' },
  { label: 'Sell-out result', value: 'Saturday sold out' },
  { label: 'Raised for charity', value: '$50,000+' },
];

export const galleryHighlights = [
  'Bull riding action',
  'Crowd atmosphere',
  'VIP experience',
  'Rider celebrations',
  'Behind the scenes',
  'Charity presentation',
] as const;

export const socialLinks: SocialLink[] = [
  { platform: 'Instagram', href: 'https://instagram.com/islandstampede' },
  { platform: 'Facebook', href: 'https://facebook.com/islandstampede' },
  { platform: 'TikTok', href: 'https://tiktok.com/@islandstampede' },
];

export const sponsorCta: CallToAction = {
  label: 'View Sponsorship Opportunities',
  href: '#sponsors',
};
