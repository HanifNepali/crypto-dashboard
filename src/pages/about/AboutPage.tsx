import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { projectContent } from '@/data/projectContent';
import { Check } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentHead';

function CtaLink({ label, href }: { label: string; href: string }) {
  function prefetchDashboard() {
    if (href === '/dashboard') {
      import('@/pages/dashboard/DashboardPage');
    }
  }
  return (
    <Link
      to={href}
      onMouseEnter={prefetchDashboard}
      onFocus={prefetchDashboard}
      className="inline-flex items-center justify-center rounded-sm bg-crypto-accent px-6 py-3 text-[15px] font-semibold text-black transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {label}
    </Link>
  );
}

function ContentHeader({ heading }: { heading: string }) {
  return (
    <SectionHeading className="mb-3">
      <SectionHeading.Title className="text-2xl mb-2 tracking-tight">
        {heading}
      </SectionHeading.Title>
    </SectionHeading>
  );
}

export function AboutPage() {
  useDocumentTitle('Crypto Dashboard — Project Overview');
  const { hero, overview, techStack, decisions, scope, accessibility, finalCta, disclaimer } =
    projectContent;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 py-20">
        {/* Intro */}
        <section className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {hero.eyebrow}
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tighter text-foreground sm:text-5xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-base text-foreground/80 leading-relaxed">
            {hero.description}
          </p>
          <CtaLink label={hero.primaryCta.label} href={hero.primaryCta.href} />
        </section>

        {/* Overiew */}
        <section>
          <ContentHeader heading={overview.heading} />

          <p className="text-base text-foreground/80 leading-relaxed">{overview.paragraph}</p>
        </section>

        {/* Tech Stack */}
        <section>
          <ContentHeader heading={techStack.heading} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {techStack.items.map((item) => (
              <div
                key={item.name}
                className="shadow-md rounded-xl border border-border bg-card p-4"
              >
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="mt-2 text-[15px] text-foreground/80">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation decision */}
        <section>
          <ContentHeader heading={decisions.heading} />

          <ul>
            {decisions.items.map((item) => (
              <li key={item.title} className="mt-6 flex gap-4">
                <span
                  aria-hidden="true"
                  className="shrink-0 block w-1.5 h-1.5 rounded-full bg-foreground/70 mt-3"
                ></span>
                <div>
                  <p className="font-medium text-lg text-foreground">{item.title}</p>
                  <p className="mt-2  text-foreground/80">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Responsive */}
        <section>
          <ContentHeader heading={scope.heading} />

          <div className="flex flex-col gap-3">
            {scope.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-foreground/80">
                {p}
              </p>
            ))}
          </div>
          <span className="mt-5 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            For best results: View {scope.breakpoint}
          </span>
        </section>

        {/* Accessibility */}
        <section>
          <ContentHeader heading={accessibility.heading} />

          <ul className="text-foreground/80">
            {accessibility.items.map((item, i) => (
              <li key={i} className="flex gap-2 mb-4">
                <Check className="mt-1 size-5 shrink-0 text-accent-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-start gap-4 rounded-xl border border-border shadow-md bg-card p-8">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
            {finalCta.heading}
          </h2>
          <p className="text-foreground/80 mb-4">{finalCta.description}</p>
          <CtaLink label={finalCta.cta.label} href={finalCta.cta.href} />
        </section>

        <p className="text-[12px] leading-relaxed text-foreground/80">{disclaimer}</p>
      </main>
    </div>
  );
}
