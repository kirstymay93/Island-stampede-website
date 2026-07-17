export const EVENT = {
  name: 'ISLAND STAMPEDE',
  tagline: "LET'S RIDE TASMANIA",
  subtitle: 'Professional Bull Riding Returns to the Silverdome',
  presenter: 'Presented by Bucking Good Rodeo Promotions',
  venue: 'Launceston Silverdome, Tasmania',
  address: '55 Oakden Rd, Prospect, Launceston TAS 7250',
  dates: '2–3 October 2026',
  time: '5:00 PM – 9:00 PM',
  phone: '0408 191 404',
  email: 'event@eventavenue.com.au',
  ticketUrl: 'https://premier.ticketek.com.au/Shows/Show.aspx?sh=RODEOTAS26',
};

export const WHY_ATTEND = [
  { icon: 'flash', title: 'Pro Bull Riding', desc: "Australia's top riders go head-to-head with the country's rankest bucking bulls." },
  { icon: 'shield-checkmark', title: 'Protection Athletes', desc: 'Watch elite bullfighters showcase extraordinary skill and bravery in the arena.' },
  { icon: 'musical-notes', title: 'Music & Lights', desc: 'A full production of live music, lighting and feature events all night long.' },
  { icon: 'people', title: 'Family-Friendly', desc: 'A high-energy night out built for families, couples and groups alike.' },
  { icon: 'beer', title: 'Food & Licensed Bars', desc: 'Food vendors and licensed bars keeping the atmosphere buzzing.' },
  { icon: 'heart', title: 'Riding For A Cause', desc: 'Proceeds support the Launceston Children\u2019s Ward Auxiliary at the LGH.' },
];

export const EVENT_INFO = [
  { icon: 'calendar', label: 'Dates', value: 'Fri 2 & Sat 3 October 2026' },
  { icon: 'time', label: 'Times', value: '5:00 PM – 9:00 PM each night' },
  { icon: 'location', label: 'Venue', value: 'Silverdome, 55 Oakden Rd, Prospect, Launceston' },
  { icon: 'car', label: 'Parking', value: 'On-site parking & rideshare drop-off zone' },
  { icon: 'accessibility', label: 'Accessibility', value: 'Disabled access available — contact the organiser' },
  { icon: 'ticket', label: 'Seating', value: 'General Admission · Reserved · 18+ VIP packages' },
];

// available:true = open sponsorship slot (conversion driver)
export const SPONSORS: { name: string; available?: boolean }[] = [
  { name: "BECK'S MITRE 10" },
  { name: 'BUCKING GOOD RODEO' },
  { name: 'YOUR BRAND HERE', available: true },
  { name: 'YOUR BRAND HERE', available: true },
  { name: 'YOUR BRAND HERE', available: true },
  { name: 'YOUR BRAND HERE', available: true },
];

export const TESTIMONIALS = [
  { name: 'Jess M.', tag: 'Silverdome 2025', quote: 'The energy in that arena is unreal — closest thing to a UFC night in Tasmania.' },
  { name: 'Dylan R.', tag: 'First-Timer', quote: 'Took the whole family. Kids were on their feet the entire night. Already booked for next year.' },
  { name: 'Priya K.', tag: 'Corporate Guest', quote: 'A packed house, brilliant production, and it all supports a great cause. Loved it.' },
];

export const FAQS = [
  { q: 'How do I buy tickets?', a: 'Official tickets are sold through Ticketek (search "Island Stampede Bullride 2026"). Tap BUY TICKETS to register for priority access and we\u2019ll send you the secure Ticketek link before they sell out — the Saturday main event regularly sells out.' },
  { q: 'What are the entry requirements?', a: 'All attendees need a valid ticket. Doors open from 5:00 PM. VIP Meet & Greet packages are strictly 18+. Standard bag checks apply.' },
  { q: 'Is it suitable for families?', a: 'Absolutely. Island Stampede is a family-friendly event with all-ages seating, music, food vendors and licensed bars for the adults.' },
  { q: 'Is parking available?', a: 'Yes — parking is available at the Silverdome (55 Oakden Rd, Prospect), plus a dedicated rideshare pickup and drop-off zone.' },
  { q: 'Where is the venue?', a: 'The Launceston Silverdome, 55 Oakden Rd, Prospect, Launceston TAS 7250 — a fully covered indoor arena, so the event runs rain, hail or shine.' },
  { q: 'Who runs the event and where do proceeds go?', a: 'Island Stampede is presented by Bucking Good Rodeo Promotions. Proceeds are donated to the 4K Launceston Children\u2019s Ward Auxiliary, supporting sick children and families at the Launceston General Hospital.' },
];

export const GALLERY = ['hero', 'gallery1', 'gallery2', 'gallery3', 'gallery4'] as const;
