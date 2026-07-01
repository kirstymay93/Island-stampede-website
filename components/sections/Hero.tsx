import { Button, Container } from '@/components/ui';
import { siteConfig } from '@/lib/constants';

export function Hero() {
  return (
    <section id="home" className="py-20 md:py-28" aria-labelledby="hero-title">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-blue">
            LET’S RIDE TASMANIA
          </p>
          <h1
            id="hero-title"
            className="max-w-4xl text-5xl font-black text-brand-white md:text-7xl"
          >
            Professional Bull Riding Returns to the Silverdome
          </h1>
          <p className="max-w-3xl text-xl font-medium text-brand-silver">
            {siteConfig.eventDate} | {siteConfig.venue}
          </p>
          <p className="max-w-3xl text-base leading-7 text-brand-silver md:text-lg">
            The biggest and most exciting bull riding event in Tasmania returns
            for two massive nights of world-class competition, entertainment and
            family fun.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="#tickets">Buy Tickets</Button>
            <Button href="#sponsors" variant="secondary">
              Become a Sponsor
            </Button>
          </div>
        </div>
        <div className="surface-panel animate-fade-up rounded-[2rem] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-brand-blue">
            Event snapshot
          </p>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-silver">
                Prize money
              </p>
              <p className="mt-2 text-3xl font-black text-brand-white">
                $30,000
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-silver">
                International riders
              </p>
              <p className="mt-2 text-lg font-semibold text-brand-white">
                Australia, Brazil, New Zealand
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-silver">
                Contractor
              </p>
              <p className="mt-2 text-lg font-semibold text-brand-white">
                Diamond A Cattle
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
