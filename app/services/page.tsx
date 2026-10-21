import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { services } from "@/lib/hospital";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Emergency, intensive care, surgery, radiology, laboratory, dialysis, obstetrics and gynaecology, antenatal care, and dentistry at Ibom Multi-Specialty Hospital.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The care this hospital is built to give."
        lede="Each service below is part of the same campus at Ekit Itam. Emergency care is available through the night. The other clinics keep the published daytime hours."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[220px_1fr] lg:py-24">
        <nav className="lg:sticky lg:top-28 lg:self-start" aria-label="Services">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
            On this page
          </p>
          <ol className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  className="text-sm font-semibold text-muted hover:text-navy"
                  href={`#${service.slug}`}
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="space-y-16">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="border-t border-line pt-10"
            >
              <p className="font-serif text-sm text-navy">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight text-ink">
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-ink">{service.summary}</p>
              <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
