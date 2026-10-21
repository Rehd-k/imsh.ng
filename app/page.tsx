import { Suspense } from "react";
import { ButtonLink } from "@/components/button-link";
import { QrFrame } from "@/components/qr-frame";
import { StoreLinks } from "@/components/store-links";
import { appFeatures, facts, hospital, services } from "@/lib/hospital";
import { readDownloadConfig } from "@/lib/app-download";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,71,141,0.09),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy">
              Uyo, Akwa Ibom · Since 2015
            </p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Specialist care,{" "}
              <span className="italic text-navy">without leaving</span> Akwa
              Ibom.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {hospital.name} was commissioned by the Akwa Ibom State
              Government so that intensive care, complex surgery, and advanced
              diagnostics could happen here in Ekit Itam.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services">Explore services</ButtonLink>
              <ButtonLink href="/app/get" variant="ghost">
                Get the patient app
              </ButtonLink>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-10">
            <svg
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 text-gold/25"
              viewBox="0 0 200 200"
            >
              {Array.from({ length: 16 }, (_, index) => (
                <line
                  key={index}
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  transform={`rotate(${index * 22.5} 100 100)`}
                />
              ))}
              <circle cx="100" cy="100" r="26" fill="currentColor" />
            </svg>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Emergency
              </p>
              <a
                className="mt-3 block font-serif text-4xl leading-tight tracking-tight hover:text-gold sm:text-5xl"
                href={`tel:${hospital.phoneTel}`}
              >
                {hospital.phoneDisplay}
              </a>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/80">
                <span className="h-2 w-2 rounded-full bg-leaf-bright" />
                Open 24 hours
              </p>
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Clinics and reception
                </p>
                <p className="mt-2 text-base text-white/85">
                  {hospital.clinicHours}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {hospital.street}
                  <br />
                  {hospital.locality}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-label="Hospital facts">
        <dl className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.value}
              className="border-t border-line px-5 py-10 first:border-t-0 sm:border-t-0 sm:border-l sm:px-8 sm:first:border-l-0"
            >
              <dt className="font-serif text-4xl tracking-tight text-ink">
                {fact.value}
              </dt>
              <dd className="mt-3 max-w-xs text-base leading-relaxed text-muted">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              Services
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              Nine services, one campus.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Emergency care runs through the night. Clinics are open every
              day of the week. Several results also appear in the patient app
              once the hospital releases them.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <a
                key={service.slug}
                href={`/services#${service.slug}`}
                className="group flex flex-col bg-paper p-7 transition-colors hover:bg-white"
              >
                <span className="font-serif text-sm text-navy">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-ink group-hover:text-navy">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                  {service.summary}
                </p>
                <span className="mt-6 text-sm font-semibold text-navy">
                  Read more
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<AppDownloadFallback />}>
        <AppDownloadBand />
      </Suspense>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              Visit
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-ink">
              Ekit Itam II, on the road between Uyo and Ikot Ekpene.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {hospital.clinicHours}. {hospital.emergencyHours}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
              href={`tel:${hospital.phoneTel}`}
            >
              Call {hospital.phoneDisplay}
            </a>
            <ButtonLink href="/contact" variant="ghost">
              Directions and hours
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function AppDownloadFallback() {
  return (
    <section className="bg-ink py-20 text-white" aria-busy="true">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          The patient app
        </p>
        <h2 className="mt-3 font-serif text-4xl">Loading the download code…</h2>
      </div>
    </section>
  );
}

async function AppDownloadBand() {
  const config = await readDownloadConfig();

  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The patient app
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight md:text-5xl">
            Appointments, results, and bills, on the phone you already carry.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            Patients sign in with their hospital patient ID and date of birth.
            The app shows what the hospital has already recorded.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {appFeatures.map((feature) => (
              <li key={feature.title}>
                <p className="font-semibold">{feature.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  {feature.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] bg-paper p-8 text-ink">
          <div className="flex justify-center">
            <QrFrame hasQr={config.hasQr} updatedAt={config.qrUpdatedAt} />
          </div>
          <div className="mt-6">
            <StoreLinks
              appStoreUrl={config.appStoreUrl}
              playStoreUrl={config.playStoreUrl}
            />
          </div>
          <ButtonLink href="/app/get" variant="ghost" className="mt-6">
            Open the download page
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
