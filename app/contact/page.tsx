import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { hospital } from "@/lib/hospital";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit ${hospital.name} at ${hospital.street}. Call ${hospital.phoneDisplay} or email ${hospital.email}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come to Ekit Itam, or call ahead."
        lede="Clinics and reception keep daytime hours every day of the week. If the need cannot wait, the emergency department is open through the night."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <section className="rounded-3xl border border-line bg-white p-8">
          <h2 className="font-serif text-3xl text-ink">The hospital</h2>
          <dl className="mt-8 space-y-6 text-base">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                Address
              </dt>
              <dd className="mt-2 leading-relaxed text-ink">
                {hospital.name}
                <br />
                {hospital.street}
                <br />
                {hospital.locality}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                Telephone
              </dt>
              <dd className="mt-2">
                <a
                  className="font-serif text-3xl text-ink hover:text-navy"
                  href={`tel:${hospital.phoneTel}`}
                >
                  {hospital.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                Email
              </dt>
              <dd className="mt-2">
                <a
                  className="break-all text-lg text-ink hover:text-navy"
                  href={`mailto:${hospital.email}`}
                >
                  {hospital.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                Clinics and reception
              </dt>
              <dd className="mt-2 text-lg text-ink">{hospital.clinicHours}</dd>
            </div>
          </dl>
          <a
            className="mt-8 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-ink"
            href={hospital.mapUrl}
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </section>

        <section className="rounded-3xl bg-ink p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Emergency
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight">
            Do not wait for clinic hours.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            {hospital.emergencyHours} Call the hospital number, or come
            directly to the emergency department at Ekit Itam II.
          </p>
          <a
            className="mt-8 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-deep"
            href={`tel:${hospital.phoneTel}`}
          >
            Call {hospital.phoneDisplay}
          </a>
        </section>
      </div>
    </>
  );
}
