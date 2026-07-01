import { Hero } from '@/components/sections/Hero';
import { Card, Container, Section } from '@/components/ui';
import {
  eventHighlights,
  galleryHighlights,
  previousEventStats,
  siteConfig,
  socialLinks,
  sponsorCta,
  whyAttendItems,
} from '@/lib/constants';

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <Section
        id="about"
        eyebrow="About"
        title="Tasmania’s only professional indoor bull riding event."
      >
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-base leading-7 text-brand-silver">
              Island Stampede brings together Australia’s best riders alongside
              international competitors from Brazil and New Zealand.
            </p>
          </Card>
          <Card>
            <p className="text-base leading-7 text-brand-silver">
              This not-for-profit event delivers a premium entertainment
              experience while supporting the Launceston Children’s Ward
              Auxiliary.
            </p>
          </Card>
        </Container>
      </Section>
      <Section
        id="event-information"
        eyebrow="Event information"
        title="Everything fans need before the gates open."
      >
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {eventHighlights.map((item) => (
              <Card key={item.label} className="gap-2">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-blue">
                  {item.label}
                </p>
                <p className="text-xl font-semibold text-brand-white">
                  {item.value}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <Section
        id="why-attend"
        eyebrow="Why attend"
        title="Two nights of elite competition, entertainment, and atmosphere."
      >
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {whyAttendItems.map((item) => (
              <Card key={item}>
                <p className="text-lg font-semibold text-brand-white">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <Section
        id="previous-event"
        eyebrow="Previous event"
        title="Tasmania’s biggest bull riding event keeps growing."
      >
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {previousEventStats.map((item) => (
              <Card key={item.label} className="items-start gap-3 text-left">
                <p className="text-4xl font-black text-brand-blue">
                  {item.value}
                </p>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-silver">
                  {item.label}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <Section id="sponsors" eyebrow="Sponsors" title="Proudly Supported By">
        <Container className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <p className="text-base leading-7 text-brand-silver">
              Partner with one of Tasmania’s fastest-growing sporting events.
            </p>
          </Card>
          <Card>
            <a
              href={sponsorCta.href}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-white transition hover:bg-brand-white hover:text-brand-black"
            >
              {sponsorCta.label}
            </a>
          </Card>
        </Container>
      </Section>
      <Section
        id="gallery"
        eyebrow="Gallery"
        title="Moments the launch site is ready to showcase."
      >
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {galleryHighlights.map((item) => (
              <Card key={item}>
                <p className="text-lg font-semibold text-brand-white">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <Section
        id="social"
        eyebrow="Social"
        title="Follow @islandstampede for event updates."
      >
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {socialLinks.map((link) => (
              <Card key={link.platform}>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-blue">
                  {link.platform}
                </p>
                <a
                  href={link.href}
                  className="text-lg font-semibold text-brand-white hover:text-brand-blue"
                >
                  {siteConfig.socialHandle}
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
